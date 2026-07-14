# RSVP Storage Setup

Form RSVP gửi dữ liệu tới `NEXT_PUBLIC_RSVP_WEBHOOK_URL`. Cách miễn phí và tiện nhất là Google Sheets + Google Apps Script.

## Google Sheets

1. Tạo một Google Sheet mới.
2. Đặt hàng đầu tiên:

```text
submittedAt | name | attendance | guestCount | message | couple | source | userTimeZone
```

3. Vào `Extensions` -> `Apps Script`.
4. Dán script này:

```javascript
const SHEET_NAME = "Sheet1";

function doPost(event) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
  const body = event.postData && event.postData.contents ? event.postData.contents : "{}";
  const data = JSON.parse(body);

  sheet.appendRow([
    data.submittedAt || new Date().toISOString(),
    data.name || "",
    data.attendance || "",
    data.guestCount || "",
    data.message || "",
    data.couple || "",
    data.source || "",
    data.userTimeZone || "",
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

5. Bấm `Deploy` -> `New deployment`.
6. Chọn type `Web app`.
7. Set:
   - `Execute as`: `Me`
   - `Who has access`: `Anyone`
8. Deploy và copy `Web app URL`.

## Environment

Tạo `.env.local`:

```bash
NEXT_PUBLIC_RSVP_WEBHOOK_URL="https://script.google.com/macros/s/....../exec"
NEXT_PUBLIC_RSVP_WEBHOOK_MODE="no-cors"
```

Khi deploy lên Vercel, thêm 2 biến trên vào Project Settings -> Environment Variables.

## Payload

Form sẽ gửi:

```json
{
  "source": "current page URL",
  "couple": "Cảnh Quân & Lan Ngọc",
  "name": "Guest name",
  "attendance": "Sẽ tham dự",
  "guestCount": "2",
  "message": "Best wishes",
  "submittedAt": "ISO timestamp",
  "userTimeZone": "Asia/Ho_Chi_Minh"
}
```

`no-cors` là chủ ý: browser không đọc response từ Apps Script, nhưng request vẫn được gửi và sheet vẫn append row.
