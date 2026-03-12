# RFI Customer Transactional Email Template

Professional email template for Retail Fix It (RFI) customer transactional notifications — job status updates, tech dispatch alerts, and service confirmations.

---

## Quick Start

### Option A: Raw HTML (any email platform)

Use `templates/transactional-email.html` directly. Replace `{{placeholder}}` tokens with your values before sending.

### Option B: Resend + React Email

Use `templates/resend-template.tsx` as a React Email component with [Resend](https://resend.com).

```tsx
import RfiTransactionalEmail from "./templates/resend-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "notifications@retailfixit.com",
  to: "customer@example.com",
  subject: "Tech is on-site for RetailFixit Job ...",
  react: RfiTransactionalEmail({
    statusHeadline: "Tech is on-site for RetailFixit Job ...",
    currentStep: "on_site",
    customerPo: "(JERRY K HELM)-03102026-4",
    rfiPo: "24744",
    // ... remaining props
  }),
});
```

---

## File Structure

```
├── templates/
│   ├── transactional-email.html   # Raw HTML template with {{placeholders}}
│   └── resend-template.tsx        # React Email / Resend component
├── preview/
│   └── sample-tech-on-site.html   # Rendered preview (open in a browser)
└── README.md
```

---

## Design Specification

| Token          | Value                          |
| -------------- | ------------------------------ |
| Primary Grey   | `#595959`                      |
| Primary Blue   | `#2640cb`                      |
| Background     | `#f4f5f7` (light)              |
| Card BG        | `#f9fafb`                      |
| White          | `#ffffff`                       |
| Border         | `#e8e8e8`                      |
| Font stack     | system-ui / Segoe UI / Roboto  |
| Max width      | 600 px                         |

### Layout

- **Header** — RFI logo (left) + "Service Notification" label (right), underscored by a 3 px blue accent line.
- **Status banner** — Dynamic headline and timestamp.
- **Progress bar** — 5-step horizontal tracker: Created → Dispatched → En Route → On Site → Complete. Completed steps show a checkmark; the active step is highlighted with a ring; future steps are greyed out.
- **CTA buttons** — Primary "Click Here to Reply" (blue fill) + secondary "Portal Login" (outlined grey).
- **Job Details** — Customer PO, RFI PO (highlighted blue), created date, and service request type.
- **Location** — Name, street address, city/state/zip, and phone number.
- **Account Manager** — Name, direct phone, and clickable email link.
- **Footer** — Dark grey (#595959) bar with automated-message disclaimer, copyright, and website link.

---

## Progress Bar Steps

The progress bar supports 5 ordered job stages. Set `currentStep` (in the React component) or populate the matching colour tokens (in the HTML template) to reflect the current status.

| Step | Key          | Label       |
| ---- | ------------ | ----------- |
| 1    | `created`    | Created     |
| 2    | `dispatched` | Dispatched  |
| 3    | `en_route`   | En Route    |
| 4    | `on_site`    | On Site     |
| 5    | `complete`   | Complete    |

### Colour logic

- **Completed steps:** circle = `#2640cb`, text = checkmark, label = `#2640cb`, track segment = `#2640cb`
- **Active step:** circle = `#2640cb` with `box-shadow` ring, number shown, label bold `#2640cb`
- **Pending steps:** circle = `#e8e8e8`, number = `#999999`, label = `#999999`, track segment = `#d0d5dd`

---

## HTML Template Placeholders

| Placeholder                  | Description                                    |
| ---------------------------- | ---------------------------------------------- |
| `{{subject}}`                | Email subject / `<title>`                      |
| `{{preheader_text}}`         | Hidden preview text                            |
| `{{status_headline}}`        | Main headline                                  |
| `{{status_timestamp}}`       | Date/time string with timezone                 |
| `{{reply_url}}`              | Href for the Reply button                      |
| `{{portal_url}}`             | Href for the Portal Login button               |
| `{{customer_po}}`            | Customer purchase order number                 |
| `{{rfi_po}}`                 | RetailFixit purchase order number              |
| `{{created_date}}`           | Job creation date                              |
| `{{service_request}}`        | Service request type                           |
| `{{location_name}}`          | Location / store name                          |
| `{{location_address}}`       | Street address                                 |
| `{{location_city_state_zip}}`| City, State, ZIP                               |
| `{{location_phone}}`         | Location phone number                          |
| `{{am_name}}`                | Account manager name                           |
| `{{am_phone}}`               | Account manager direct phone                   |
| `{{am_email}}`               | Account manager email                          |
| `{{current_year}}`           | Copyright year                                 |
| `{{step_N_bg}}`              | Step N circle background colour                |
| `{{step_N_fg}}`              | Step N circle text colour                      |
| `{{step_N_label_color}}`     | Step N label colour                            |
| `{{progress_color_X_Y}}`     | Track colour between steps X and Y             |

---

## React Email Props

See the `RfiTransactionalEmailProps` interface in `resend-template.tsx` for the full typed contract. The component accepts `currentStep` as a simple union type (`"created" | "dispatched" | "en_route" | "on_site" | "complete"`) and renders all progress bar colours automatically.

---

## Email Client Compatibility

The template uses:

- **Table-based layout** for Outlook / Windows Mail
- **Inline styles** for Gmail / webmail
- **MSO VML round-rect buttons** for Outlook desktop
- **`role="presentation"`** on all layout tables for accessibility
- **`<meta name="x-apple-disable-message-reformatting">`** for Apple Mail
- Responsive `@media` breakpoint at 620 px

---

## Previewing

Open `preview/sample-tech-on-site.html` in any browser to see the rendered template with sample "Tech on Site" data pre-filled.

---

## License

Internal use — Retail Fix It.
