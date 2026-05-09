import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Принимает ссылку на облачное хранилище с сюрпризом для молодожёнов и отправляет её на почту."""

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

    sender_name = body.get("name", "").strip()
    link = body.get("link", "").strip()

    if not sender_name:
        return {
            "statusCode": 400,
            "headers": {**cors_headers, "Content-Type": "application/json"},
            "body": json.dumps({"error": "Укажите ваше имя"}),
        }

    if not link:
        return {
            "statusCode": 400,
            "headers": {**cors_headers, "Content-Type": "application/json"},
            "body": json.dumps({"error": "Вставьте ссылку на файлы"}),
        }

    email_address = os.environ.get("SMTP_EMAIL", "")
    email_password = os.environ.get("SMTP_PASSWORD", "")

    html_body = f"""
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #1a0e06; color: #e8d5b0; padding: 30px; border-radius: 8px;">
      <h2 style="color: #e8b84b; font-family: Georgia, serif; border-bottom: 1px solid rgba(201,147,58,0.3); padding-bottom: 15px;">
        🎁 Сюрприз от {sender_name}
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 10px 0; color: #c9933a; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; width: 140px;">Гость</td>
          <td style="padding: 10px 0; font-size: 18px;">{sender_name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #c9933a; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; vertical-align: top;">Ссылка</td>
          <td style="padding: 10px 0; font-size: 16px; word-break: break-all;">
            <a href="{link}" style="color: #e8b84b;">{link}</a>
          </td>
        </tr>
      </table>
      <p style="margin-top: 20px;">
        <a href="{link}" style="display:inline-block;background:#c9933a;color:#1a0e06;padding:10px 24px;border-radius:4px;text-decoration:none;font-family:Georgia,serif;font-weight:bold;">
          Открыть файлы
        </a>
      </p>
      <p style="margin-top: 30px; color: rgba(232,213,176,0.4); font-size: 13px; border-top: 1px solid rgba(201,147,58,0.2); padding-top: 15px;">
        Катерина &amp; Кирилл · 08.08.2026
      </p>
    </div>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"🎁 Сюрприз от {sender_name} — для молодожёнов"
    msg["From"] = email_address
    msg["To"] = email_address
    msg.attach(MIMEText(html_body, "html", "utf-8"))

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
        server.login(email_address, email_password)
        server.sendmail(email_address, email_address, msg.as_string())

    return {
        "statusCode": 200,
        "headers": {**cors_headers, "Content-Type": "application/json"},
        "body": json.dumps({"success": True}),
    }
