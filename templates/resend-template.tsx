import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Row,
  Column,
  Img,
  Text,
  Link,
  Button,
  Hr,
  Preview,
} from "@react-email/components";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type JobStep = "created" | "dispatched" | "en_route" | "on_site" | "complete";

interface RfiTransactionalEmailProps {
  subject: string;
  preheaderText?: string;
  statusTitle: string;
  statusDescription: string;
  statusTimestamp: string;
  currentStep: JobStep;
  replyUrl: string;
  portalUrl: string;
  customerPo: string;
  rfiPo: string;
  scheduledTime: string;
  serviceType: string;
  locationName: string;
  locationCityState: string;
  serviceRequestText: string;
  amName: string;
  amEmail: string;
  amPhone: string;
  customerPortalUrl?: string;
  notificationSettingsUrl?: string;
  googlePlayUrl?: string;
  appStoreUrl?: string;
  companyAddress?: string;
}

/* ------------------------------------------------------------------ */
/*  Design tokens                                                      */
/* ------------------------------------------------------------------ */

const brand = {
  blue: "#2640cb",
  blueLight: "#4f6cff",
  blueBg: "#eef0ff",
  blueCard: "#f0f4ff",
  grey: "#595959",
  dark: "#1a1a2e",
  white: "#ffffff",
  pageBg: "#f0f2f5",
  border: "#e5e7eb",
  muted: "#6b7280",
  faint: "#9ca3af",
  cardBody: "#374151",
  trackInactive: "#d0d5dd",
  pendingCircle: "#e5e7eb",
  footerBg: "#fafafa",
};

const font =
  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

/* ------------------------------------------------------------------ */
/*  Progress helpers                                                   */
/* ------------------------------------------------------------------ */

const STEPS: { key: JobStep; label: string }[] = [
  { key: "created", label: "Created" },
  { key: "dispatched", label: "Dispatched" },
  { key: "en_route", label: "En Route" },
  { key: "on_site", label: "On Site" },
  { key: "complete", label: "Complete" },
];

function stepIndex(step: JobStep): number {
  return STEPS.findIndex((s) => s.key === step);
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function ProgressBar({ currentStep }: { currentStep: JobStep }) {
  const activeIdx = stepIndex(currentStep);

  return (
    <Section style={{ backgroundColor: brand.white, padding: "28px 36px 8px 36px" }}>
      <table role="presentation" cellSpacing={0} cellPadding={0} border={0} width="100%">
        <tbody>
          <tr>
            {STEPS.map((step, i) => {
              const isCompleted = i < activeIdx;
              const isCurrent = i === activeIdx;
              const isPending = i > activeIdx;

              const leftTrack =
                i === 0 ? "transparent" : i <= activeIdx ? brand.blue : brand.trackInactive;
              const rightTrack =
                i === STEPS.length - 1
                  ? "transparent"
                  : i < activeIdx
                    ? brand.blue
                    : brand.trackInactive;

              const circleBg = isPending ? brand.pendingCircle : brand.blue;
              const circleFg = isPending ? brand.faint : brand.white;
              const labelColor = isPending ? brand.faint : brand.blue;
              const size = isCurrent ? 32 : 26;

              return (
                <td key={step.key} width="20%" align="center" style={{ verticalAlign: "top" }}>
                  <table role="presentation" cellSpacing={0} cellPadding={0} border={0} width="100%">
                    <tbody>
                      <tr>
                        <td align="center" style={{ paddingBottom: 4 }}>
                          <table role="presentation" cellSpacing={0} cellPadding={0} border={0} width="100%">
                            <tbody>
                              <tr>
                                <td width="50%" style={{ borderBottom: `3px solid ${leftTrack}` }}>&nbsp;</td>
                                <td width="50%" style={{ borderBottom: `3px solid ${rightTrack}` }}>&nbsp;</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td align="center" style={{ padding: "4px 0" }}>
                          <div
                            style={{
                              width: size,
                              height: size,
                              borderRadius: "50%",
                              backgroundColor: circleBg,
                              color: circleFg,
                              fontSize: isCurrent ? 12 : 11,
                              fontWeight: 700,
                              lineHeight: `${size}px`,
                              textAlign: "center" as const,
                              margin: "0 auto",
                              ...(isCurrent && { boxShadow: "0 0 0 4px rgba(38,64,203,0.15)" }),
                            }}
                          >
                            {isCompleted ? "\u2713" : i + 1}
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td align="center">
                          <span
                            style={{
                              fontSize: 9,
                              color: labelColor,
                              fontWeight: 700,
                              textTransform: "uppercase" as const,
                              letterSpacing: 0.4,
                            }}
                          >
                            {step.label}
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </Section>
  );
}

function Divider() {
  return (
    <Section style={{ backgroundColor: brand.white, padding: "0 36px" }}>
      <table role="presentation" cellSpacing={0} cellPadding={0} border={0} width="100%">
        <tbody>
          <tr>
            <td style={{ borderTop: `1px solid ${brand.border}`, fontSize: 0, lineHeight: 0, height: 1 }}>
              &nbsp;
            </td>
          </tr>
        </tbody>
      </table>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/*  Main template                                                      */
/* ------------------------------------------------------------------ */

export default function RfiTransactionalEmail({
  subject = "Job Status Update",
  preheaderText,
  statusTitle = "Tech On Site",
  statusDescription = "",
  statusTimestamp = "",
  currentStep = "on_site",
  replyUrl = "#",
  portalUrl = "#",
  customerPo = "",
  rfiPo = "",
  scheduledTime = "",
  serviceType = "",
  locationName = "",
  locationCityState = "",
  serviceRequestText = "",
  amName = "",
  amEmail = "",
  amPhone = "",
  customerPortalUrl = "#",
  notificationSettingsUrl = "#",
  googlePlayUrl = "#",
  appStoreUrl = "#",
  companyAddress = "",
}: RfiTransactionalEmailProps) {
  const currentYear = new Date().getFullYear();

  return (
    <Html lang="en">
      <Head>
        <title>{subject}</title>
      </Head>
      <Preview>{preheaderText ?? statusTitle}</Preview>
      <Body style={{ margin: 0, padding: 0, backgroundColor: brand.pageBg, fontFamily: font }}>
        <Container style={{ maxWidth: 600, margin: "0 auto", padding: "28px 16px" }}>

          {/* ---- HEADER ---- */}
          <Section
            style={{
              backgroundColor: brand.white,
              padding: "28px 36px 24px 36px",
              borderRadius: "12px 12px 0 0",
            }}
          >
            <Row>
              <Column style={{ verticalAlign: "middle" }}>
                <Img
                  src="https://www.retailfixit.com/wp-content/uploads/2024/11/RFI-Logo-5-3.png"
                  alt="Retail Fix It"
                  width={160}
                  style={{ display: "block", maxWidth: 160, height: "auto" }}
                />
              </Column>
              <Column style={{ textAlign: "right", verticalAlign: "middle" }}>
                <Text style={{ margin: 0, fontSize: 13, color: brand.grey, fontWeight: 700, letterSpacing: 0.3 }}>
                  PO {rfiPo}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* accent gradient line */}
          <Section style={{ backgroundColor: brand.white, padding: 0, fontSize: 0, lineHeight: 0 }}>
            <div style={{ height: 3, background: `linear-gradient(90deg, ${brand.blue} 0%, ${brand.blueLight} 100%)` }} />
          </Section>

          {/* ---- STATUS BADGE + TITLE ---- */}
          <Section style={{ backgroundColor: brand.white, padding: "32px 36px 0 36px" }}>
            <table role="presentation" cellSpacing={0} cellPadding={0} border={0}>
              <tbody>
                <tr>
                  <td style={{ backgroundColor: brand.blueBg, borderRadius: 4, padding: "5px 12px" }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: brand.blue, textTransform: "uppercase" as const, letterSpacing: 1 }}>
                      &#9776;&nbsp; Status Update
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            <Text style={{ margin: "14px 0 10px 0", fontSize: 26, lineHeight: "34px", color: brand.dark, fontWeight: 800, letterSpacing: -0.3 }}>
              {statusTitle}
            </Text>

            <Text style={{ margin: "0 0 14px 0", fontSize: 15, lineHeight: "24px", color: brand.grey }}>
              {statusDescription}
            </Text>

            <Text style={{ margin: 0, fontSize: 14, lineHeight: "22px", color: brand.grey }}>
              <strong style={{ color: brand.dark }}>Check-in time:</strong> {statusTimestamp}
            </Text>
          </Section>

          {/* ---- PROGRESS BAR ---- */}
          <ProgressBar currentStep={currentStep} />

          {/* ---- DIVIDER ---- */}
          <Section style={{ backgroundColor: brand.white, padding: "20px 36px 0 36px" }}>
            <table role="presentation" cellSpacing={0} cellPadding={0} border={0} width="100%">
              <tbody>
                <tr>
                  <td style={{ borderTop: `1px solid ${brand.border}`, fontSize: 0, lineHeight: 0, height: 1 }}>
                    &nbsp;
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* ---- JOB DETAILS (2-col grid) ---- */}
          <Section style={{ backgroundColor: brand.white, padding: "24px 36px 0 36px" }}>
            <Row>
              <Column style={{ verticalAlign: "top", paddingRight: 16, paddingBottom: 20, width: "50%" }}>
                <Text style={{ margin: 0, fontSize: 10, fontWeight: 700, color: brand.faint, textTransform: "uppercase" as const, letterSpacing: 0.8 }}>
                  Job Identifier
                </Text>
                <Text style={{ margin: "4px 0 0 0", fontSize: 15, color: brand.dark, fontWeight: 600, lineHeight: "22px" }}>
                  {customerPo}
                </Text>
              </Column>
              <Column style={{ verticalAlign: "top", paddingBottom: 20, width: "50%" }}>
                <Text style={{ margin: 0, fontSize: 10, fontWeight: 700, color: brand.faint, textTransform: "uppercase" as const, letterSpacing: 0.8 }}>
                  PO Number
                </Text>
                <Text style={{ margin: "4px 0 0 0", fontSize: 15, color: brand.blue, fontWeight: 700, lineHeight: "22px" }}>
                  #{rfiPo}
                </Text>
              </Column>
            </Row>
            <Row>
              <Column style={{ verticalAlign: "top", paddingRight: 16, paddingBottom: 20, width: "50%" }}>
                <Text style={{ margin: 0, fontSize: 10, fontWeight: 700, color: brand.faint, textTransform: "uppercase" as const, letterSpacing: 0.8 }}>
                  Scheduled Time
                </Text>
                <Text style={{ margin: "4px 0 0 0", fontSize: 15, color: brand.dark, fontWeight: 600, lineHeight: "22px" }}>
                  {scheduledTime}
                </Text>
              </Column>
              <Column style={{ verticalAlign: "top", paddingBottom: 20, width: "50%" }}>
                <Text style={{ margin: 0, fontSize: 10, fontWeight: 700, color: brand.faint, textTransform: "uppercase" as const, letterSpacing: 0.8 }}>
                  Service Type
                </Text>
                <Text style={{ margin: "4px 0 0 0", fontSize: 15, color: brand.dark, fontWeight: 600, lineHeight: "22px" }}>
                  {serviceType}
                </Text>
              </Column>
            </Row>
          </Section>

          <Divider />

          {/* ---- LOCATION ---- */}
          <Section style={{ backgroundColor: brand.white, padding: "24px 36px 0 36px" }}>
            <Row>
              <Column style={{ width: 40, verticalAlign: "top", paddingRight: 10, paddingTop: 2 }}>
                <div
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: "50%",
                    backgroundColor: brand.blueBg,
                    textAlign: "center" as const,
                    lineHeight: "30px",
                    fontSize: 14,
                    color: brand.blue,
                  }}
                >
                  &#9906;
                </div>
              </Column>
              <Column style={{ verticalAlign: "top" }}>
                <Text style={{ margin: 0, fontSize: 10, fontWeight: 700, color: brand.faint, textTransform: "uppercase" as const, letterSpacing: 0.8 }}>
                  Location Details
                </Text>
                <Text style={{ margin: "4px 0 0 0", fontSize: 15, color: brand.dark, fontWeight: 600, lineHeight: "24px" }}>
                  {locationName}, {locationCityState}
                </Text>
              </Column>
            </Row>
          </Section>

          {/* ---- SERVICE REQUEST ---- */}
          <Section style={{ backgroundColor: brand.white, padding: "24px 36px 0 36px" }}>
            <Text style={{ margin: "0 0 10px 0", fontSize: 10, fontWeight: 700, color: brand.faint, textTransform: "uppercase" as const, letterSpacing: 0.8 }}>
              Service Request
            </Text>
            <table role="presentation" cellSpacing={0} cellPadding={0} border={0} width="100%">
              <tbody>
                <tr>
                  <td
                    style={{
                      backgroundColor: brand.blueCard,
                      borderLeft: `4px solid ${brand.blue}`,
                      borderRadius: "0 8px 8px 0",
                      padding: "16px 20px",
                    }}
                  >
                    <Text style={{ margin: 0, fontSize: 14, lineHeight: "22px", color: brand.cardBody }}>
                      {serviceRequestText}
                    </Text>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* ---- BUTTONS ---- */}
          <Section style={{ backgroundColor: brand.white, padding: "32px 36px 0 36px" }}>
            <Row>
              <Column align="center" style={{ width: "50%", paddingRight: 8 }}>
                <Button
                  href={portalUrl}
                  style={{
                    display: "block",
                    backgroundColor: brand.blue,
                    color: brand.white,
                    fontSize: 15,
                    fontWeight: 700,
                    padding: "14px 8px",
                    borderRadius: 8,
                    textDecoration: "none",
                    textAlign: "center" as const,
                    width: "100%",
                  }}
                >
                  Log In to the Job
                </Button>
              </Column>
              <Column align="center" style={{ width: "50%", paddingLeft: 8 }}>
                <Button
                  href={replyUrl}
                  style={{
                    display: "block",
                    backgroundColor: brand.white,
                    color: brand.grey,
                    fontSize: 15,
                    fontWeight: 700,
                    padding: "12px 8px",
                    borderRadius: 8,
                    textDecoration: "none",
                    textAlign: "center" as const,
                    border: "2px solid #d1d5db",
                    width: "100%",
                  }}
                >
                  Click To Reply
                </Button>
              </Column>
            </Row>
          </Section>

          {/* ---- DIVIDER ---- */}
          <Section style={{ backgroundColor: brand.white, padding: "28px 36px 0 36px" }}>
            <table role="presentation" cellSpacing={0} cellPadding={0} border={0} width="100%">
              <tbody>
                <tr>
                  <td style={{ borderTop: `1px solid ${brand.border}`, fontSize: 0, lineHeight: 0, height: 1 }}>
                    &nbsp;
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* ---- ACCOUNT CONTACT ---- */}
          <Section style={{ backgroundColor: brand.white, padding: "24px 36px 32px 36px" }}>
            <table
              role="presentation"
              cellSpacing={0}
              cellPadding={0}
              border={0}
              width="100%"
              style={{ border: `1px solid ${brand.border}`, borderRadius: 8 }}
            >
              <tbody>
                <tr>
                  <td style={{ padding: "20px 24px" }}>
                    <Text style={{ margin: 0, fontSize: 10, fontWeight: 700, color: brand.faint, textTransform: "uppercase" as const, letterSpacing: 0.8 }}>
                      Account Contact
                    </Text>
                    <Text style={{ margin: "8px 0 4px 0", fontSize: 16, fontWeight: 700, color: brand.dark }}>
                      {amName}
                    </Text>
                    <Text style={{ margin: 0, fontSize: 13, color: brand.grey, lineHeight: "22px" }}>
                      <Link href={`mailto:${amEmail}`} style={{ color: brand.blue, textDecoration: "none" }}>
                        {amEmail}
                      </Link>
                      {" \u2022 "}
                      {amPhone}
                    </Text>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* ---- FOOTER ---- */}
          <Section
            style={{
              backgroundColor: brand.footerBg,
              padding: "28px 36px",
              borderTop: `1px solid ${brand.border}`,
              borderRadius: "0 0 12px 12px",
            }}
          >
            <Text style={{ margin: "0 0 16px 0", fontSize: 13, color: brand.muted, textAlign: "center" as const, lineHeight: "20px" }}>
              Retail Fix It is the centralized job management platform for national, multi-site commercial facilities.
            </Text>

            <Row>
              <Column align="center">
                <Link href={customerPortalUrl} style={{ fontSize: 13, color: brand.blue, textDecoration: "underline", fontWeight: 600 }}>
                  Customer Portal
                </Link>
              </Column>
              <Column align="center">
                <Link href={notificationSettingsUrl} style={{ fontSize: 13, color: brand.blue, textDecoration: "underline", fontWeight: 600 }}>
                  Notification Settings
                </Link>
              </Column>
            </Row>

            <Text style={{ margin: "20px 0 10px 0", fontSize: 10, fontWeight: 700, color: brand.faint, textAlign: "center" as const, textTransform: "uppercase" as const, letterSpacing: 1 }}>
              Download Mobile App
            </Text>

            <Row>
              <Column align="right" style={{ paddingRight: 4 }}>
                <Link href={googlePlayUrl}>
                  <Img
                    src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                    alt="Get it on Google Play"
                    width={120}
                    style={{ display: "block", height: "auto" }}
                  />
                </Link>
              </Column>
              <Column align="left" style={{ paddingLeft: 4 }}>
                <Link href={appStoreUrl}>
                  <Img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    width={120}
                    style={{ display: "block", height: "auto" }}
                  />
                </Link>
              </Column>
            </Row>

            <Text style={{ margin: "20px 0 0 0", fontSize: 11, color: brand.faint, textAlign: "center" as const, lineHeight: "18px" }}>
              &copy; {currentYear} Retail Fix It (RFI). All rights reserved.
              <br />
              {companyAddress}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

/* ------------------------------------------------------------------ */
/*  Default props for Resend preview / dev server                      */
/* ------------------------------------------------------------------ */

RfiTransactionalEmail.PreviewProps = {
  subject: "Tech On Site \u2013 RetailFixit Job PO: 24744",
  preheaderText: "Tech is on-site for RetailFixit Job (JERRY K HELM)-03102026-4 PO: 24744",
  statusTitle: "Tech On Site",
  statusDescription:
    "The technician has arrived and is now on-site for your maintenance request.",
  statusTimestamp: "March 10, 2026 at 4:21:18 PM (Eastern Standard Time).",
  currentStep: "on_site" as JobStep,
  replyUrl: "https://portal.retailfixit.com/reply/24744",
  portalUrl: "https://portal.retailfixit.com/login",
  customerPo: "(JERRY K HELM)-03102026-4",
  rfiPo: "24744",
  scheduledTime: "March 3, 2026 at 10:00 AM",
  serviceType: "Standard",
  locationName: "2365 Main Street",
  locationCityState: "Chula Vista, California",
  serviceRequestText:
    "The lighting in the main hall room needs fixing; several fixtures are flickering and two are completely out, requiring immediate attention for safety.",
  amName: "Alysha Ramirez",
  amEmail: "aramirez@retailfixit.com",
  amPhone: "(555) 012-3456",
  customerPortalUrl: "https://portal.retailfixit.com",
  notificationSettingsUrl: "https://portal.retailfixit.com/settings/notifications",
  googlePlayUrl: "https://play.google.com/store",
  appStoreUrl: "https://apps.apple.com",
  companyAddress: "123 Enterprise Way, Suite 400, San Diego, CA 92101",
} satisfies RfiTransactionalEmailProps;
