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
  statusHeadline: string;
  statusTimestamp: string;
  currentStep: JobStep;
  replyUrl: string;
  portalUrl: string;
  customerPo: string;
  rfiPo: string;
  createdDate: string;
  serviceRequest: string;
  locationName: string;
  locationAddress: string;
  locationCityStateZip: string;
  locationPhone: string;
  amName: string;
  amPhone: string;
  amEmail: string;
}

/* ------------------------------------------------------------------ */
/*  Design tokens                                                      */
/* ------------------------------------------------------------------ */

const brand = {
  blue: "#2640cb",
  grey: "#595959",
  lightBg: "#f4f5f7",
  white: "#ffffff",
  cardBg: "#f9fafb",
  border: "#e8e8e8",
  muted: "#777777",
  faint: "#999999",
  trackInactive: "#d0d5dd",
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
    <Section style={{ padding: "8px 32px 32px 32px", backgroundColor: brand.white }}>
      <table
        role="presentation"
        cellSpacing={0}
        cellPadding={0}
        border={0}
        width="100%"
      >
        <tbody>
          <tr>
            {STEPS.map((step, i) => {
              const isCompleted = i < activeIdx;
              const isCurrent = i === activeIdx;
              const isPending = i > activeIdx;

              const leftTrackColor =
                i === 0
                  ? "transparent"
                  : i <= activeIdx
                    ? brand.blue
                    : brand.trackInactive;
              const rightTrackColor =
                i === STEPS.length - 1
                  ? "transparent"
                  : i < activeIdx
                    ? brand.blue
                    : brand.trackInactive;

              const circleBg = isPending ? brand.border : brand.blue;
              const circleFg = isPending ? brand.faint : brand.white;
              const labelColor = isPending ? brand.faint : brand.blue;
              const circleSize = isCurrent ? 32 : 28;

              return (
                <td
                  key={step.key}
                  width="20%"
                  align="center"
                  style={{ verticalAlign: "top" }}
                >
                  {/* Track segment */}
                  <table
                    role="presentation"
                    cellSpacing={0}
                    cellPadding={0}
                    border={0}
                    width="100%"
                  >
                    <tbody>
                      <tr>
                        <td
                          width="50%"
                          style={{
                            borderBottom: `3px solid ${leftTrackColor}`,
                          }}
                        >
                          &nbsp;
                        </td>
                        <td
                          width="50%"
                          style={{
                            borderBottom: `3px solid ${rightTrackColor}`,
                          }}
                        >
                          &nbsp;
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* Circle */}
                  <div
                    style={{
                      width: circleSize,
                      height: circleSize,
                      borderRadius: "50%",
                      backgroundColor: circleBg,
                      color: circleFg,
                      fontSize: isCurrent ? 13 : 12,
                      fontWeight: 700,
                      lineHeight: `${circleSize}px`,
                      textAlign: "center" as const,
                      margin: "6px auto",
                      ...(isCurrent && {
                        boxShadow: "0 0 0 4px rgba(38,64,203,0.18)",
                      }),
                    }}
                  >
                    {isCompleted ? "\u2713" : i + 1}
                  </div>

                  {/* Label */}
                  <Text
                    style={{
                      fontSize: 10,
                      color: labelColor,
                      fontWeight: isCurrent ? 700 : 600,
                      textTransform: "uppercase" as const,
                      letterSpacing: 0.3,
                      margin: 0,
                      textAlign: "center" as const,
                    }}
                  >
                    {step.label}
                  </Text>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </Section>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <Text
      style={{
        margin: "0 0 20px 0",
        fontSize: 16,
        fontWeight: 700,
        color: brand.grey,
        textTransform: "uppercase" as const,
        letterSpacing: 0.5,
        borderLeft: `4px solid ${brand.blue}`,
        paddingLeft: 12,
      }}
    >
      {children}
    </Text>
  );
}

function DetailRow({
  label,
  value,
  highlight,
  isFirst,
}: {
  label: string;
  value: string;
  highlight?: boolean;
  isFirst?: boolean;
}) {
  return (
    <tr>
      <td
        style={{
          padding: isFirst ? "0 0 12px 0" : "12px 0 12px 0",
          ...(!isFirst && {
            borderTop: `1px solid ${brand.border}`,
          }),
        }}
      >
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: brand.faint,
            textTransform: "uppercase" as const,
            letterSpacing: 0.5,
          }}
        >
          {label}
        </span>
        <br />
        <span
          style={{
            fontSize: 15,
            color: highlight ? brand.blue : brand.grey,
            fontWeight: highlight ? 700 : 600,
          }}
        >
          {value}
        </span>
      </td>
    </tr>
  );
}

/* ------------------------------------------------------------------ */
/*  Main template                                                      */
/* ------------------------------------------------------------------ */

export default function RfiTransactionalEmail({
  subject = "Job Status Update",
  preheaderText,
  statusHeadline = "Job status update",
  statusTimestamp = "",
  currentStep = "on_site",
  replyUrl = "#",
  portalUrl = "#",
  customerPo = "",
  rfiPo = "",
  createdDate = "",
  serviceRequest = "",
  locationName = "",
  locationAddress = "",
  locationCityStateZip = "",
  locationPhone = "",
  amName = "",
  amPhone = "",
  amEmail = "",
}: RfiTransactionalEmailProps) {
  const currentYear = new Date().getFullYear();

  return (
    <Html lang="en">
      <Head>
        <title>{subject}</title>
      </Head>
      <Preview>{preheaderText ?? statusHeadline}</Preview>
      <Body
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: brand.lightBg,
          fontFamily: font,
        }}
      >
        <Container
          style={{
            maxWidth: 600,
            margin: "0 auto",
            padding: "24px 16px",
          }}
        >
          {/* ---- HEADER ---- */}
          <Section
            style={{
              backgroundColor: brand.white,
              padding: "24px 32px",
              borderRadius: "8px 8px 0 0",
              borderBottom: `3px solid ${brand.blue}`,
            }}
          >
            <Row>
              <Column style={{ textAlign: "left", verticalAlign: "middle" }}>
                <Img
                  src="https://www.retailfixit.com/wp-content/uploads/2024/11/RFI-Logo-5-3.png"
                  alt="Retail Fix It"
                  width={180}
                  style={{ display: "block", maxWidth: 180, height: "auto" }}
                />
              </Column>
              <Column style={{ textAlign: "right", verticalAlign: "middle" }}>
                <Text
                  style={{
                    fontSize: 12,
                    color: "#888888",
                    fontWeight: 500,
                    textTransform: "uppercase" as const,
                    letterSpacing: 0.5,
                    margin: 0,
                  }}
                >
                  Service Notification
                </Text>
              </Column>
            </Row>
          </Section>

          {/* ---- STATUS HEADLINE ---- */}
          <Section
            style={{
              backgroundColor: brand.white,
              padding: "32px 32px 24px 32px",
            }}
          >
            <Text
              style={{
                margin: "0 0 8px 0",
                fontSize: 22,
                lineHeight: "30px",
                color: brand.grey,
                fontWeight: 700,
              }}
            >
              {statusHeadline}
            </Text>
            <Text
              style={{
                margin: 0,
                fontSize: 14,
                lineHeight: "22px",
                color: brand.muted,
              }}
            >
              {statusTimestamp}
            </Text>
          </Section>

          {/* ---- PROGRESS BAR ---- */}
          <ProgressBar currentStep={currentStep} />

          {/* ---- CTA BUTTONS ---- */}
          <Section
            style={{
              backgroundColor: brand.white,
              padding: "0 32px 32px 32px",
            }}
          >
            <Row>
              <Column align="center">
                <Button
                  href={replyUrl}
                  style={{
                    backgroundColor: brand.blue,
                    color: brand.white,
                    fontSize: 14,
                    fontWeight: 600,
                    padding: "12px 28px",
                    borderRadius: 6,
                    textDecoration: "none",
                    display: "inline-block",
                  }}
                >
                  Click Here to Reply
                </Button>
              </Column>
              <Column align="center">
                <Button
                  href={portalUrl}
                  style={{
                    backgroundColor: brand.white,
                    color: brand.grey,
                    fontSize: 14,
                    fontWeight: 600,
                    padding: "10px 28px",
                    borderRadius: 6,
                    textDecoration: "none",
                    display: "inline-block",
                    border: `2px solid ${brand.grey}`,
                  }}
                >
                  Portal Login
                </Button>
              </Column>
            </Row>
          </Section>

          <Hr style={{ borderTop: `1px solid ${brand.border}`, margin: 0 }} />

          {/* ---- JOB DETAILS ---- */}
          <Section
            style={{
              backgroundColor: brand.white,
              padding: "28px 32px",
            }}
          >
            <SectionHeading>Job Details</SectionHeading>
            <table
              role="presentation"
              cellSpacing={0}
              cellPadding={0}
              border={0}
              width="100%"
              style={{ backgroundColor: brand.cardBg, borderRadius: 6 }}
            >
              <tbody>
                <tr>
                  <td style={{ padding: 20 }}>
                    <table
                      role="presentation"
                      cellSpacing={0}
                      cellPadding={0}
                      border={0}
                      width="100%"
                    >
                      <tbody>
                        <DetailRow label="Customer PO" value={customerPo} isFirst />
                        <DetailRow label="RetailFixit PO" value={rfiPo} highlight />
                        <DetailRow label="Created Date" value={createdDate} />
                        <DetailRow label="Service Request" value={serviceRequest} />
                      </tbody>
                    </table>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Hr style={{ borderTop: `1px solid ${brand.border}`, margin: 0 }} />

          {/* ---- LOCATION ---- */}
          <Section
            style={{
              backgroundColor: brand.white,
              padding: "28px 32px",
            }}
          >
            <SectionHeading>Location</SectionHeading>
            <table
              role="presentation"
              cellSpacing={0}
              cellPadding={0}
              border={0}
              width="100%"
              style={{ backgroundColor: brand.cardBg, borderRadius: 6 }}
            >
              <tbody>
                <tr>
                  <td style={{ padding: 20 }}>
                    <Text
                      style={{
                        margin: "0 0 4px 0",
                        fontSize: 15,
                        fontWeight: 700,
                        color: brand.grey,
                      }}
                    >
                      {locationName}
                    </Text>
                    <Text
                      style={{
                        margin: "0 0 4px 0",
                        fontSize: 14,
                        color: brand.muted,
                        lineHeight: "20px",
                      }}
                    >
                      {locationAddress}
                    </Text>
                    <Text
                      style={{
                        margin: "0 0 4px 0",
                        fontSize: 14,
                        color: brand.muted,
                      }}
                    >
                      {locationCityStateZip}
                    </Text>
                    <Text
                      style={{
                        margin: "8px 0 0 0",
                        fontSize: 14,
                        color: brand.muted,
                      }}
                    >
                      <span style={{ fontWeight: 600, color: brand.grey }}>
                        Phone:
                      </span>{" "}
                      {locationPhone}
                    </Text>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          <Hr style={{ borderTop: `1px solid ${brand.border}`, margin: 0 }} />

          {/* ---- ACCOUNT MANAGER ---- */}
          <Section
            style={{
              backgroundColor: brand.white,
              padding: "28px 32px",
            }}
          >
            <SectionHeading>RFI Account Manager</SectionHeading>
            <table
              role="presentation"
              cellSpacing={0}
              cellPadding={0}
              border={0}
              width="100%"
              style={{ backgroundColor: brand.cardBg, borderRadius: 6 }}
            >
              <tbody>
                <tr>
                  <td style={{ padding: 20 }}>
                    <Text
                      style={{
                        margin: "0 0 6px 0",
                        fontSize: 15,
                        fontWeight: 700,
                        color: brand.grey,
                      }}
                    >
                      {amName}
                    </Text>
                    <Text
                      style={{
                        margin: "0 0 4px 0",
                        fontSize: 14,
                        color: brand.muted,
                      }}
                    >
                      <span style={{ fontWeight: 600, color: brand.grey }}>
                        Direct:
                      </span>{" "}
                      {amPhone}
                    </Text>
                    <Text style={{ margin: 0, fontSize: 14 }}>
                      <Link
                        href={`mailto:${amEmail}`}
                        style={{
                          color: brand.blue,
                          textDecoration: "none",
                          fontWeight: 500,
                        }}
                      >
                        {amEmail}
                      </Link>
                    </Text>
                  </td>
                </tr>
              </tbody>
            </table>
          </Section>

          {/* ---- FOOTER ---- */}
          <Section
            style={{
              backgroundColor: brand.grey,
              padding: "28px 32px",
              borderRadius: "0 0 8px 8px",
            }}
          >
            <Text
              style={{
                margin: "0 0 8px 0",
                fontSize: 11,
                color: brand.white,
                textAlign: "center" as const,
                fontWeight: 600,
                textTransform: "uppercase" as const,
                letterSpacing: 1,
              }}
            >
              This is an automated message. Please do not reply.
            </Text>
            <Text
              style={{
                margin: "0 0 16px 0",
                fontSize: 12,
                color: "#cccccc",
                textAlign: "center" as const,
                lineHeight: "18px",
              }}
            >
              &copy; {currentYear} Retail Fix It. All rights reserved.
            </Text>
            <Text style={{ margin: 0, textAlign: "center" as const }}>
              <Link
                href="https://www.retailfixit.com"
                style={{
                  fontSize: 12,
                  color: "#a0b4ff",
                  textDecoration: "none",
                  fontWeight: 500,
                }}
              >
                retailfixit.com
              </Link>
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
  subject:
    "Tech is on-site for RetailFixit Job (JERRY K HELM)-03102026-4 PO: 24744",
  preheaderText:
    "Tech is on-site for RetailFixit Job (JERRY K HELM)-03102026-4 PO: 24744",
  statusHeadline:
    "Tech is on-site for RetailFixit Job (JERRY K HELM)-03102026-4 PO: 24744",
  statusTimestamp:
    "3/10/2026 4:21:18 PM (Eastern Standard Time) \u2014 service location\u2019s local time",
  currentStep: "on_site" as JobStep,
  replyUrl: "https://portal.retailfixit.com/reply/24744",
  portalUrl: "https://portal.retailfixit.com/login",
  customerPo: "(JERRY K HELM)-03102026-4",
  rfiPo: "24744",
  createdDate: "3/10/2026",
  serviceRequest: "Customer Email",
  locationName: "(JERRY K HELM)",
  locationAddress: "3172 Douglas Dairy Road",
  locationCityStateZip: "Fieldale, Virginia, 24089",
  locationPhone: "(806) 872-6721",
  amName: "Imam Ahmed",
  amPhone: "+8801618435400",
  amEmail: "system.test@retailfixit.com",
} satisfies RfiTransactionalEmailProps;
