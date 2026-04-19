import json
import os
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart


def handler(event: dict, context) -> dict:
    """Принимает RSVP-заявку с сайта свадьбы и отправляет письмо с уведомлением на email организаторов."""

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

    name = body.get("name", "").strip()
    coming = body.get("coming", "yes")
    guests = body.get("guests", "1")
    attendance = body.get("attendance", "").strip()
    dietary = body.get("dietary", "").strip()

    if not name:
        return {
            "statusCode": 400,
            "headers": {**cors_headers, "Content-Type": "application/json"},
            "body": json.dumps({"error": "Имя обязательно"}),
        }

    email_address = os.environ.get("SMTP_EMAIL", "")
    email_password = os.environ.get("SMTP_PASSWORD", "")

    coming_text = "✅ Придёт" if coming == "yes" else "❌ Не сможет прийти"
    guests_text = f"{guests} чел." if coming == "yes" else "—"
    attendance_map = {"ceremony": "Церемония в ЗАГСе + пир", "feast": "Только пир в НеКлубе"}
    attendance_text = attendance_map.get(attendance, "—")

    html_body = f"""
    <div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; background: #1a0e06; color: #e8d5b0; padding: 30px; border-radius: 8px;">
      <h2 style="color: #e8b84b; font-family: Georgia, serif; border-bottom: 1px solid rgba(201,147,58,0.3); padding-bottom: 15px;">
        💌 Новый ответ на приглашение
      </h2>
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
        <tr>
          <td style="padding: 10px 0; color: #c9933a; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; width: 140px;">Гость</td>
          <td style="padding: 10px 0; font-size: 18px;">{name}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #c9933a; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">Присутствие</td>
          <td style="padding: 10px 0; font-size: 18px;">{coming_text}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; color: #c9933a; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;">Количество</td>
          <td style="padding: 10px 0; font-size: 18px;">{guests_text}</td>
        </tr>
        {"<tr><td style='padding: 10px 0; color: #c9933a; font-size: 13px; text-transform: uppercase; letter-spacing: 2px;'>Участие</td><td style='padding: 10px 0; font-size: 18px;'>" + attendance_text + "</td></tr>" if coming == "yes" else ""}
        {"<tr><td style='padding: 10px 0; color: #c9933a; font-size: 13px; text-transform: uppercase; letter-spacing: 2px; vertical-align: top;'>Пожелания</td><td style='padding: 10px 0; font-size: 16px;'>" + dietary + "</td></tr>" if dietary else ""}
      </table>
      <p style="margin-top: 30px; color: rgba(232,213,176,0.4); font-size: 13px; border-top: 1px solid rgba(201,147,58,0.2); padding-top: 15px;">
        Катерина &amp; Кирилл · 08.08.2026
      </p>
    </div>
    """

    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"{'✅' if coming == 'yes' else '❌'} RSVP: {name} {'придёт' if coming == 'yes' else 'не сможет'} на свадьбу"
    msg["From"] = email_address
    msg["To"] = email_address

    msg.attach(MIMEText(html_body, "html", "utf-8"))

    try:
        with smtplib.SMTP_SSL("smtp.gmail.com", 465) as server:
            server.login(email_address, email_password)
            server.sendmail(email_address, email_address, msg.as_string())
    except Exception as e:
        return {
            "statusCode": 500,
            "headers": {**cors_headers, "Content-Type": "application/json"},
            "body": json.dumps({"error": f"Ошибка отправки письма: {str(e)}"}),
        }

    return {
        "statusCode": 200,
        "headers": {**cors_headers, "Content-Type": "application/json"},
        "body": json.dumps({"success": True, "message": "Письмо успешно отправлено"}),
    }