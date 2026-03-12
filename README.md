# RFI Customer Transactional Email Template

Professional transactional email template for Retail Fix It (RFI) — job status updates, tech dispatch alerts, and service confirmations. Designed for dynamic platforms like [Resend](https://resend.com) and any HTML email pipeline.

---

## Quick Start

### Option A: Raw HTML (any email platform)

Use `templates/transactional-email.html`. Replace `{{placeholder}}` tokens with your dynamic values before sending.

### Option B: Resend + React Email

Use `templates/resend-template.tsx` as a React Email component.

```tsx
import RfiTransactionalEmail from "./templates/resend-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: "notifications@retailfixit.com",
  to: "customer@example.com",
  subject: "Tech On Site – RetailFixit Job PO: 24744",
  react: RfiTransactionalEmail({
    statusTitle: "Tech On Site",
    statusDescription: "The technician has arrived and is now on-site for your maintenance request.",
    statusTimestamp: "March 10, 2026 at 4:21:18 PM (Eastern Standard Time).",
    currentStep: "on_site",
    customerPo: "(JERRY K HELM)-03102026-4",
    rfiPo: "24744",
    scheduledTime: "March 3, 2026 at 10:00 AM",
    serviceType: "Standard",
    locationName: "2365 Main Street",
    locationCityState: "Chula Vista, California",
    serviceRequestText: "The lighting in the main hall room needs fixing...",
    amName: "Alysha Ramirez",
    amEmail: "aramirez@retailfixit.com",
    amPhone: "(555) 012-3456",
    // ...remaining props
  }),
});
```

### Preview

Open `preview/sample-tech-on-site.html` in any browser to see the fully rendered template with sample data.

---

## File Structure

```
├── templates/
│   ├── transactional-email.html   # Raw HTML template with {{placeholders}}
│   └── resend-template.tsx        # React Email / Resend component (TypeScript)
├── preview/
│   └── sample-tech-on-site.html   # Rendered preview — open in browser
└── README.md
```

---

## Template Layout

The email follows this visual structure from top to bottom:

| Section              | Description |
| -------------------- | ----------- |
| **Header**           | RFI logo (left) + PO number (right), underscored by a blue gradient accent line |
| **Status badge**     | "Status Update" pill badge in light blue |
| **Status title**     | Large bold headline (e.g. "Tech On Site") |
| **Description**      | Human-readable explanation of the update |
| **Check-in time**    | Bold timestamp with timezone |
| **Progress bar**     | 5-step horizontal tracker with connected track lines |
| **Job details**      | 2×2 grid: Job Identifier, PO Number, Scheduled Time, Service Type |
| **Location**         | Pin icon + address on a single line |
| **Service request**  | Blue-tinted card with left accent border containing request description |
| **CTA buttons**      | "Log In to the Job" (filled blue) + "Click To Reply" (outlined grey) |
| **Account contact**  | Bordered card with name, email link, and phone number |
| **Footer**           | Platform tagline, Customer Portal & Notification Settings links, app store badges, copyright + address |

---

## Design Tokens

| Token              | Value             |
| ------------------ | ----------------- |
| Primary Blue       | `#2640cb`         |
| Blue gradient end  | `#4f6cff`         |
| Blue badge BG      | `#eef0ff`         |
| Blue card BG       | `#f0f4ff`         |
| Corporate Grey     | `#595959`         |
| Dark text          | `#1a1a2e`         |
| Page background    | `#f0f2f5`         |
| Border             | `#e5e7eb`         |
| Muted text         | `#6b7280`         |
| Faint labels       | `#9ca3af`         |
| Font stack         | system-ui / Segoe UI / Roboto |
| Max width          | 600 px            |
| Border radius      | 12 px (outer), 8 px (inner cards/buttons) |

---

## Progress Bar

5 ordered job stages. Set `currentStep` in the React component or populate colour tokens in the HTML version.

| Step | Key          | Label       |
| ---- | ------------ | ----------- |
| 1    | `created`    | Created     |
| 2    | `dispatched` | Dispatched  |
| 3    | `en_route`   | En Route    |
| 4    | `on_site`    | On Site     |
| 5    | `complete`   | Complete    |

### Visual states

- **Completed** — Blue circle with white checkmark, blue track, blue label
- **Active (current)** — Larger blue circle with outer ring shadow, step number shown, bold blue label
- **Pending** — Grey circle with grey number, grey dashed track, faint label

---

## HTML Placeholders Reference

| Placeholder                    | Description |
| ------------------------------ | ----------- |
| `{{subject}}`                  | `<title>` / email subject |
| `{{preheader_text}}`           | Hidden preview text |
| `{{rfi_po}}`                   | RFI PO number (shown in header + job details) |
| `{{status_title}}`             | Bold headline (e.g. "Tech On Site") |
| `{{status_description}}`       | Descriptive paragraph |
| `{{status_timestamp}}`         | Check-in time with timezone |
| `{{customer_po}}`              | Customer purchase order / job identifier |
| `{{scheduled_time}}`           | Scheduled service date/time |
| `{{service_type}}`             | Service type (e.g. "Standard") |
| `{{location_name}}`            | Street address / location name |
| `{{location_city_state}}`      | City, State |
| `{{service_request_text}}`     | Full service request description |
| `{{portal_url}}`               | "Log In to the Job" button href |
| `{{reply_url}}`                | "Click To Reply" button href |
| `{{am_name}}`                  | Account manager name |
| `{{am_email}}`                 | Account manager email |
| `{{am_phone}}`                 | Account manager phone |
| `{{customer_portal_url}}`      | Footer "Customer Portal" link |
| `{{notification_settings_url}}`| Footer "Notification Settings" link |
| `{{google_play_url}}`          | Google Play store link |
| `{{app_store_url}}`            | Apple App Store link |
| `{{current_year}}`             | Copyright year |
| `{{company_address}}`          | Company address line |
| `{{step_N_*}}`                 | Progress bar step styling tokens (see HTML comments) |
| `{{progress_color_X_Y}}`       | Track colour between steps X and Y |

---

## React Email Props

See `RfiTransactionalEmailProps` in `resend-template.tsx`. The component handles all progress bar styling automatically from the `currentStep` union type.

---

## Email Client Compatibility

- Table-based layout for Outlook / Windows Mail
- All styles inlined for Gmail / webmail
- MSO VML round-rect button fallbacks for Outlook desktop
- `role="presentation"` on layout tables for accessibility
- `x-apple-disable-message-reformatting` meta for Apple Mail
- Responsive `@media` breakpoint at 620 px (stacks columns + full-width buttons)

---

## License

Internal use — Retail Fix It.
