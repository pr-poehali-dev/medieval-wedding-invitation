import json
import os
import base64
import uuid
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import boto3


ALLOWED_TYPES = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
    "video/mp4": "mp4",
    "video/quicktime": "mov",
    "video/x-msvideo": "avi",
    "video/webm": "webm",
}

MAX_SIZE_MB = 50  # bytes limit


def handler(event: dict, context) -> dict:
    """Принимает фото или видео от гостей свадьбы, сохраняет в S3 и отправляет уведомление на почту организаторов."""

    cors_headers = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, X-User-Id, X-Auth-Token, X-Session-Id",
        "Access-Control-Max-Age": "86400",
    }

    if event.get("httpMethod") == "OPTIONS":
        return {"statusCode": 200, "headers": cors_headers, "body": ""}

    try:
        body = json.loads(event.get("body") or "{}")
    except Exception:
        return {
            "statusCode": 400,
            "headers": {**cors_headers, "Content-Type": "application/json"},
            "body": json.dumps({"error": "Неверный формат данных"}),
        }

    sender_name = body.get("name", "Гость").strip()
    file_data_b64 = body.get("file", "")
    content_type = body.get("contentType", "")
    original_name = body.get("fileName", "file")

    if not file_data_b64:
        return {
            "statusCode": 400,
            "headers": {**cors_headers, "Content-Type": "application/json"},
            "body": json.dumps({"error": "Файл не передан"}),
        }

    if content_type not in ALLOWED_TYPES:
        return {
            "statusCode": 400,
            "headers": {**cors_headers, "Content-Type": "application/json"},
            "body": json.dumps({"error": "Недопустимый тип файла"}),
        }

    try:
        file_bytes = base64.b64decode(file_data_b64)
    except Exception:
        return {
            "statusCode": 400,
            "headers": {**cors_headers, "Content-Type": "application/json"},
            "body": json.dumps({"error": "Ошибка декодирования файла"}),
        }

    size_mb = len(file_bytes) / (1024 * 1024)
    if size_mb > MAX_SIZE_MB:
        return {
            "statusCode": 400,
            "headers": {**cors_headers, "Content-Type": "application/json"},
            "body": json.dumps({"error": f"Файл слишком большой. Максимум {MAX_SIZE_MB} МБ"}),
        }

    ext = ALLOWED_TYPES[content_type]
    file_key = f"wedding-media/{uuid.uuid4()}.{ext}"

    s3 = boto3.client(
        "s3",
        endpoint_url="https://bucket.poehali.dev",
        aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
        aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
    )
    s3.put_object(Bucket="files", Key=file_key, Body=file_bytes, ContentType=content_type)

    cdn_url = f"https://cdn.poehali.dev/projects/{os.environ['AWS_ACCESS_KEY_ID']}/files/{file_key}"

    email_address = os.environ.get("SMTP_EMAIL", "")
    email_password = os.environ.get("SMTP_PASSWORD", "")
    media_email = os.environ.get("MEDIA_EMAIL", email_address)

    is_video = content_type.startswith("video/")
    media_label = "видео" if is_video else "фото"
    icon = "🎬" if is_video else "📸"

    preview_html = (
        f'<p><a href="{cdn_url}" style="color:#e8b84b;">▶ Открыть видео</a></p>'
        if is_video
        else f'<img src="{cdn_url}" style="max-width:100%;border-radius:6px;margin-top:12px;" alt="фото от гостя"/>'
    )

    html_body = f"""
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #1a0e06; color: #e8d5b0; padding: 30px; border-radius: 8px;">
      <h2 style="color: #e8b84b; font-family: Georgia, serif; border-bottom: 1px solid rgba(201,147,58,0.3); padding-bottom: 15px;">
        {icon} Новый {media_label} от гостя
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 10px 0; color: #c9933a; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; width: 140px;">Гость</td>
          <td style="padding: 10px 0; font-size: 18px;">{sender_name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #c9933a; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">Файл</td>
          <td style="padding: 10px 0; font-size: 16px;">{original_name} ({size_mb:.1f} МБ)</td>
        </tr>
      </table>
      {preview_html}
      <p style="margin-top: 20px;">
        <a href="{cdn_url}" style="display:inline-block;background:#c9933a;color:#1a0e06;padding:10px 24px;border-radius:4px;text-decoration:none;font-family:Georgia,serif;font-weight:bold;">
          Скачать {media_label}
        </a>
      </p>
      <p style="margin-top: 30px; color: rgba(232,213,176,0.4); font-size: 13px; border-top: 1px solid rgba(201,147,58,0.2); padding-top: 15px;">
        Катерина &amp; Кирилл · 08.08.2026
      </p>
    </div>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"{icon} {media_label.capitalize()} от {sender_name} — свадьба Катерины и Кирилла"
    msg["From"] = email_address
    msg["To"] = media_email
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(email_address, email_password)
        server.sendmail(email_address, media_email, msg.as_string())

    return {
        "statusCode": 200,
        "headers": {**cors_headers, "Content-Type": "application/json"},
        "body": json.dumps({"success": True, "url": cdn_url}),
    }