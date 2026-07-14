"use client";

import {
  Fragment,
  type FocusEvent as ReactFocusEvent,
  type FormEvent,
  type KeyboardEvent as ReactKeyboardEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import Image from "next/image";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarPlusIcon,
  CheckIcon,
  CopyIcon,
  GiftIcon,
  MessageSquareTextIcon,
  MicVocalIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

import {
  brideProfile,
  confirmationUrl,
  dressCode,
  galleryImages,
  giftAccounts,
  groomProfile,
  invitationInfo,
  loveStory,
  menuItems,
  streamingUrl,
  verse,
  weddingEvents,
  weddingVenue,
  wishes,
} from "./content";
import {
  PanelFrame,
  SectionKicker,
  SignatureName,
  SourceButton,
} from "./InvitationPrimitives";

const weddingOrnamentImage = "/images/wedding-ornament.svg";
const receptionEvent = weddingEvents.find((event) => event.title === "Wedding Reception") ?? weddingEvents[1];

function eventDateLines() {
  return invitationInfo.eventDateDisplay.split("\n");
}

function calculateCountdown() {
  const target = new Date(invitationInfo.countdownDate).getTime();
  const distance = Math.max(0, target - Date.now());

  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
    seconds: Math.floor((distance / 1_000) % 60),
  };
}

function dressCodeSwatchClass(value: string) {
  switch (value) {
    case "#111111":
      return "bg-[#111111]";
    case "#6B4A35":
      return "bg-[#6B4A35]";
    case "#D8C7A5":
      return "bg-[#D8C7A5]";
    case "#68724B":
      return "bg-[#68724B]";
    case "#A8B57A":
      return "bg-[#A8B57A]";
    default:
      return "bg-white";
  }
}

function toIcsLocalDateTime(value: string) {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/);

  if (!match) {
    return value.replace(/[-:]/g, "").replace(/[+.].*$/, "");
  }

  const [, year, month, day, hour, minute, second = "00"] = match;
  return `${year}${month}${day}T${hour}${minute}${second}`;
}

function escapeIcsText(value: string) {
  return value
    .replace(/\\/g, "\\\\")
    .replace(/\r?\n/g, "\\n")
    .replace(/,/g, "\\,")
    .replace(/;/g, "\\;");
}

function encodeBase64Utf8(value: string) {
  const bytes = new TextEncoder().encode(value);
  const binary = Array.from(bytes, (byte) => String.fromCharCode(byte)).join("");

  return window.btoa(binary);
}

function createCalendarInvite() {
  const calendarLines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "BEGIN:VEVENT",
    `UID:${invitationInfo.slug}-20260809`,
    `SUMMARY:${escapeIcsText(`The Wedding of ${invitationInfo.coupleNames}`)}`,
    `DTSTART;TZID=${invitationInfo.calendarTimeZone}:${toIcsLocalDateTime(invitationInfo.calendarStartDate)}`,
    `DTEND;TZID=${invitationInfo.calendarTimeZone}:${toIcsLocalDateTime(invitationInfo.calendarEndDate)}`,
    `DESCRIPTION:${escapeIcsText(invitationInfo.calendarDescription)}`,
    `LOCATION:${escapeIcsText(weddingVenue.mapUrl)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ];

  return `${calendarLines.join("\r\n")}\r\n`;
}

function downloadCalendarInvite() {
  const link = document.createElement("a");

  link.download = `${invitationInfo.slug}.ics`;
  link.href = `data:text/calendar;charset=utf8;base64,${encodeBase64Utf8(createCalendarInvite())}`;
  link.rel = "nofollow";
  link.target = "_blank";
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function OpeningHero({
  leaving,
  locked,
  openingRecipientVisible,
  onOpen,
}: {
  leaving?: boolean;
  locked?: boolean;
  openingRecipientVisible?: boolean;
  onOpen?: () => void;
}) {
  const showRecipient = Boolean(locked || openingRecipientVisible);

  return (
    <PanelFrame
      id="home"
      backgroundClassName="bg-invitation-00148"
      backgroundLayers={["bg-invitation-00148", "bg-invitation-00141", "bg-invitation-00148"]}
      contentClassName="px-5 text-center"
      overlayClassName="bg-black/42"
    >
      <div className="invitation-hero-title absolute inset-x-5 top-[14%] space-y-[10px] invitation-fade-up" data-visible="true">
        <SectionKicker>THE WEDDING OF</SectionKicker>
        <h1 className="mx-auto max-w-[310px] font-candlefish text-[30px] leading-[0.95] text-white sm:max-w-none sm:text-[38px]">
          <span className="block sm:inline">{invitationInfo.groomName}</span>
          <span className="block sm:inline sm:pl-2">&amp; {invitationInfo.brideName}</span>
        </h1>
        <p className="font-legan text-[13px] uppercase leading-[17px] tracking-[1.8px]">
          {invitationInfo.weddingDate}
        </p>
      </div>
      {showRecipient ? (
        <div
          className={cn(
            "absolute inset-x-8 bottom-[31%] z-[2] space-y-4 overflow-hidden text-center",
            locked && "invitation-fade-up",
            leaving && "invitation-cover-recipient-leaving",
          )}
          data-visible="true"
        >
          <p className="font-legan text-xl font-medium leading-none">{invitationInfo.guestGreeting}</p>
          <p className="mx-auto max-w-60 font-legan text-[11px] font-medium leading-[15px] text-white/80">
            {invitationInfo.nameNotice}
          </p>
          <button
            className="mt-2 h-[34px] bg-[#d5d5d5] px-5 font-inter-local text-xs uppercase leading-none text-[#252525] transition duration-300 hover:bg-white"
            disabled={leaving}
            onClick={onOpen}
            type="button"
          >
            LET&apos;S OPEN
          </button>
        </div>
      ) : null}
      {!locked ? (
        <a
          aria-label="Scroll to quote"
          className={cn(
            "invitation-open-scroll-cue absolute bottom-[26%] left-1/2 flex size-[50px] items-center justify-center text-white transition duration-300 hover:scale-105",
            openingRecipientVisible && "invitation-open-scroll-cue-enter",
          )}
          href="#quote"
        >
          <OpeningScrollCueIcon />
        </a>
      ) : null}
    </PanelFrame>
  );
}

function OpeningScrollCueIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-[50px] overflow-visible"
      fill="none"
      focusable="false"
      viewBox="0 0 80 80"
    >
      <circle
        className="invitation-open-scroll-ring"
        cx="40"
        cy="40"
        r="29.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        className="invitation-open-scroll-arrow"
        d="M40 30.8v18.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      <path
        className="invitation-open-scroll-arrow"
        d="M32.2 41.4 40 49.2 47.8 41.4"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
      />
    </svg>
  );
}

export function ScriptureQuoteSection() {
  return (
    <PanelFrame id="quote" backgroundClassName="bg-invitation-00195" contentClassName="justify-end px-[30px] pb-[90px]">
      <p className="max-w-[330px] font-legan text-[14px] font-medium leading-[21px] text-white">
        {verse.text}
      </p>
      <p className="mt-5 font-candlefish text-[23px] font-medium uppercase leading-[23px] tracking-[0.8px] text-white">
        {verse.reference}
      </p>
    </PanelFrame>
  );
}

function ProfileSection({
  id,
  backgroundClassName,
  profile,
}: {
  id?: string;
  backgroundClassName: string;
  profile: typeof groomProfile;
}) {
  return (
    <PanelFrame
      id={id}
      backgroundClassName={backgroundClassName}
      contentClassName="justify-end px-5 pb-[100px]"
      overlayClassName="bg-black/38"
    >
      <div className="max-w-[270px] space-y-3 invitation-fade-up">
        <SectionKicker className="font-times text-xs leading-[17px] tracking-[1.8px]">{profile.role}</SectionKicker>
        <SignatureName className="text-[36px] font-medium">{profile.name}</SignatureName>
        <p className="font-signature text-[35px] font-light leading-[17px] text-white/90">{profile.relation}</p>
        <p className="font-legan text-[13px] leading-[19.5px] text-white/80">{profile.description}</p>
        <SourceButton className="mt-1 h-[29px] px-[19px] py-0" href={profile.instagramUrl}>
          {profile.buttonLabel}
        </SourceButton>
      </div>
    </PanelFrame>
  );
}

export function GroomProfileSection() {
  return <ProfileSection id="profile" backgroundClassName="bg-invitation-00188" profile={groomProfile} />;
}

export function BrideProfileSection() {
  return <ProfileSection backgroundClassName="bg-invitation-00137" profile={brideProfile} />;
}

export function LoveStorySection() {
  return (
    <PanelFrame id="lovestory" backgroundClassName="bg-invitation-00204" contentClassName="justify-center px-[39px]" overlayClassName="bg-black/48">
      <div className="space-y-5 text-white invitation-fade-up">
        <h2 className="font-candlefish text-[40px] font-normal leading-none">A journey in love</h2>
        {loveStory.map((item) => (
          <div className="space-y-2" key={item.year}>
            <h3 className="font-roxborough text-[16px] font-normal uppercase leading-none">
              {item.year}
            </h3>
            <p className="font-legan text-[13px] leading-[19.5px] text-white/88">{item.body}</p>
          </div>
        ))}
        <p className="pt-2 font-ovo text-[14px] font-medium uppercase leading-none">{invitationInfo.sideName}</p>
      </div>
    </PanelFrame>
  );
}

export function WeddingDateSection() {
  return (
    <PanelFrame
      id="weddingevent"
      backgroundClassName="bg-invitation-00187"
      contentClassName="items-center justify-center px-0 text-center"
      overlayClassName="bg-black/55"
    >
      <div className="flex w-full flex-col items-center gap-5">
        <div className="w-full invitation-fade-up">
          <Image
            alt=""
            aria-hidden="true"
            className="mx-auto block h-[50px] w-[50px]"
            height={50}
            src={weddingOrnamentImage}
            unoptimized
            width={50}
          />
          <SectionKicker className="mt-4 text-[10px] leading-[10px]">
            SAVE OUR DATE
          </SectionKicker>
          <h2 className="mt-[10px] font-candlefish text-[24px] font-medium leading-[31px]">
            {eventDateLines().map((line, index) => (
              <Fragment key={line}>
                {line}
                {index < eventDateLines().length - 1 ? <br /> : null}
              </Fragment>
            ))}
          </h2>
        </div>
        {weddingEvents.map((event) => (
          <WeddingEventDetail event={event} key={event.title} />
        ))}
        <WeddingVenueDetail />
      </div>
    </PanelFrame>
  );
}

function WeddingEventDetail({ event }: { event: (typeof weddingEvents)[number] }) {
  return (
    <div className="w-full invitation-fade-up">
      <h3 className="font-candlefish text-[24px] font-medium leading-[28px]">
        {event.title}
        <br />
        {event.time}
      </h3>
    </div>
  );
}

function WeddingVenueDetail() {
  return (
    <div className="w-full invitation-fade-up">
      <SectionKicker className="text-[10px] leading-[10px]">Venue</SectionKicker>
      <p className="mx-auto mt-[10px] w-[260px] font-legan text-[13px] font-normal leading-[19.5px] text-white">
        {weddingVenue.name}
        <br />
        {weddingVenue.address}
      </p>
      <a
        className="mt-[14px] inline-flex h-[33px] w-[130px] items-center justify-center bg-[#808080] px-[13px] py-[10px] font-legan text-[13px] uppercase leading-[13px] text-white transition duration-300 hover:bg-[#909090]"
        href={weddingVenue.mapUrl}
        rel="noopener"
        target="_blank"
      >
        GOOGLE MAPS
      </a>
    </div>
  );
}

export function CountdownSection() {
  const [countdown, setCountdown] = useState(calculateCountdown);

  useEffect(() => {
    const timer = window.setInterval(() => setCountdown(calculateCountdown()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  const countdownItems = [
    { label: "DAYS", value: countdown.days },
    { label: "HOURS", value: countdown.hours },
    { label: "MINUTES", value: countdown.minutes },
    { label: "SECONDS", value: countdown.seconds },
  ];

  return (
    <PanelFrame backgroundClassName="bg-invitation-00152" contentClassName="items-center justify-end px-[30px] pb-[120px] text-center">
      <div className="space-y-7 invitation-fade-up">
        <h2 className="font-candlefish text-[28px] font-normal uppercase leading-[31px]">
          ALMOST TIME FOR OUR
          <br />
          CELEBRATION
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {countdownItems.map((item) => (
            <div className="space-y-1" key={item.label}>
              <p className="font-candlefish text-[39px] leading-none">
                {String(item.value).padStart(2, "0")}
              </p>
              <p className="font-legan text-[10px] uppercase tracking-[0.1em]">{item.label}</p>
            </div>
          ))}
        </div>
        <button
          aria-label="Save the wedding date to your calendar"
          className="invitation-save-date-cta group inline-flex h-[40px] items-center justify-center gap-[9px] bg-[#8b8b8b] px-[17px] font-legan text-[13px] uppercase leading-none text-white transition duration-300 hover:bg-[#9a9a9a]"
          onClick={downloadCalendarInvite}
          type="button"
        >
          <span>SAVE THE DATE</span>
          <CalendarPlusIcon
            aria-hidden="true"
            className="invitation-save-date-icon size-[15px] shrink-0 transition-transform duration-300 group-hover:translate-x-[2px]"
            strokeWidth={1.8}
          />
        </button>
      </div>
    </PanelFrame>
  );
}

type RsvpStep = 1 | 2 | 3 | 4 | 5;
type RsvpExtraRequest = "gift" | "speech";

const rsvpSteps: RsvpStep[] = [1, 2, 3, 4, 5];
const rsvpExtraOptions: {
  description: string;
  icon: typeof MessageSquareTextIcon;
  label: string;
  value: RsvpExtraRequest;
}[] = [
  {
    description: "Mình sẽ xem thông tin quà mừng ở phần Wedding Gift.",
    icon: GiftIcon,
    label: "Muốn gửi quà mừng",
    value: "gift",
  },
  {
    description: "Mình muốn phát biểu hoặc gửi lời chúc trực tiếp tại tiệc.",
    icon: MicVocalIcon,
    label: "Muốn phát biểu",
    value: "speech",
  },
];

function RsvpStepper({ className, step }: { className?: string; step: RsvpStep }) {
  return (
    <div className={cn("mt-5 grid h-10 grid-cols-[30px_1fr_30px_1fr_30px_1fr_30px_1fr_30px] items-start", className)}>
      {rsvpSteps.map((value, index) => {
        const state = value < step ? "complete" : value === step ? "active" : "inactive";

        return (
          <Fragment key={value}>
            <button
              aria-label={`RSVP step ${value}`}
              aria-current={value === step ? "step" : undefined}
              className={cn(
                "flex size-[30px] items-center justify-center rounded-full border-2 bg-[#f8fbfd] font-inter-local text-[13px] font-semibold leading-none transition duration-300",
                state === "complete" && "border-[#39b54a] bg-[#39b54a] text-white",
                state === "active" && "border-[#39b54a] text-[#39b54a]",
                state === "inactive" && "border-[#b7c0c8] text-[#c2cbd2]",
              )}
              type="button"
            >
              {value}
            </button>
            {index < rsvpSteps.length - 1 ? (
              <span className="mt-[14px] h-px w-full bg-white/70" />
            ) : null}
          </Fragment>
        );
      })}
    </div>
  );
}

function RsvpLabel({ children }: { children: string }) {
  return (
    <label className="block font-inter-local text-[11px] uppercase leading-[18.7px] tracking-[1px] text-white">
      {children}
    </label>
  );
}

const rsvpInputClassName =
  "block h-10 w-full border border-white/55 bg-[#414141]/45 px-4 py-2 font-inter-local text-[13px] leading-[18.2px] text-[#c2c2c2] outline-none transition duration-300 placeholder:text-[#c2c2c2] focus:border-white focus:bg-[#414141]/60";

const rsvpButtonClassName =
  "flex h-10 w-full items-center justify-center bg-[#313131] font-inter-local text-[13px] uppercase leading-none tracking-[1px] text-white transition duration-300 hover:bg-[#444] disabled:cursor-wait disabled:opacity-70";

const rsvpWebhookUrl = process.env.NEXT_PUBLIC_RSVP_WEBHOOK_URL?.trim() || 'https://script.google.com/macros/s/AKfycbzqXkXpHsUrcGYciN_QUvkeyT2EIjOJbXd3gn975LmkfjGGFYsJppQW7mv9eeaxNcKa/exec';
const rsvpWebhookMode: RequestMode =
  process.env.NEXT_PUBLIC_RSVP_WEBHOOK_MODE === "cors" ? "cors" : "no-cors";
const defaultAttendance = invitationInfo.rsvpOptions[0];

interface RsvpSubmissionPayload {
  source: string;
  couple: string;
  name: string;
  attendance: string;
  extras: RsvpExtraRequest[];
  guestCount: string;
  message: string;
  submittedAt: string;
  partyNote: string;
  userTimeZone: string;
}

async function submitRsvpToWebhook(payload: RsvpSubmissionPayload) {
  if (!rsvpWebhookUrl) {
    throw new Error("RSVP_WEBHOOK_MISSING");
  }

  const response = await fetch(rsvpWebhookUrl, {
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": rsvpWebhookMode === "cors" ? "application/json" : "text/plain;charset=utf-8",
    },
    keepalive: true,
    method: "POST",
    mode: rsvpWebhookMode,
  });

  if (rsvpWebhookMode === "cors" && !response.ok) {
    throw new Error(`RSVP_WEBHOOK_${response.status}`);
  }
}

export function RsvpSection() {
  const [step, setStep] = useState<RsvpStep>(1);
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState(defaultAttendance);
  const [guestCount, setGuestCount] = useState("1");
  const [extraRequests, setExtraRequests] = useState<RsvpExtraRequest[]>([]);
  const [partyNote, setPartyNote] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const lastAttendanceTapRef = useRef<{ option: string; time: number } | null>(null);

  useEffect(() => {
    return () => {
      document.documentElement.classList.remove("invitation-root-form-focused");
    };
  }, []);

  function goPrevious() {
    setSubmitted(false);
    setSubmitError("");
    setStep((current) => Math.max(1, current - 1) as RsvpStep);
  }

  function goNext() {
    setSubmitted(false);
    setSubmitError("");

    if (step === 1 && !name.trim()) return;
    if (step === 2 && !attendance) return;
    if (step === 3 && !guestCount.trim()) return;

    setStep((current) => Math.min(5, current + 1) as RsvpStep);
  }

  async function submitRsvp() {
    if (submitting) return;

    setSubmitted(false);
    setSubmitError("");

    if (!name.trim()) {
      setStep(1);
      return;
    }
    if (!attendance) {
      setStep(2);
      return;
    }
    if (!guestCount.trim()) {
      setStep(3);
      return;
    }

    const payload: RsvpSubmissionPayload = {
      attendance,
      couple: invitationInfo.coupleNames,
      extras: extraRequests,
      guestCount,
      message: message.trim(),
      name: name.trim(),
      partyNote: partyNote.trim(),
      source: window.location.href,
      submittedAt: new Date().toISOString(),
      userTimeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };

    setSubmitting(true);

    try {
      await submitRsvpToWebhook(payload);
      document.documentElement.classList.remove("invitation-root-form-focused");
      setSubmitted(true);
      setStep(1);
      setName("");
      setAttendance(defaultAttendance);
      setGuestCount("1");
      setExtraRequests([]);
      setPartyNote("");
      setMessage("");
      lastAttendanceTapRef.current = null;
    } catch (error) {
      setSubmitError(
        error instanceof Error && error.message === "RSVP_WEBHOOK_MISSING"
          ? "Chưa cấu hình nơi lưu RSVP. Vui lòng thêm webhook trước khi gửi."
          : "Chưa gửi được xác nhận. Vui lòng thử lại sau ít phút.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  function chooseAttendance(option: string) {
    const now = window.performance.now();
    const previousTap = lastAttendanceTapRef.current;
    const repeatedTap =
      Boolean(previousTap && previousTap.option === option && now - previousTap.time < 650);

    setAttendance(option);
    setSubmitted(false);
    setSubmitError("");
    lastAttendanceTapRef.current = { option, time: now };

    if (repeatedTap) {
      setStep(3);
    }
  }

  function toggleExtraRequest(option: RsvpExtraRequest) {
    setExtraRequests((current) => {
      const next = current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option];

      if (next.length === 0) {
        setPartyNote("");
      }

      return next;
    });
    setSubmitted(false);
    setSubmitError("");
  }

  function handleInputKeyDown(event: ReactKeyboardEvent<HTMLInputElement>) {
    if (event.key !== "Enter" || event.nativeEvent.isComposing) return;

    event.preventDefault();
    goNext();
  }

  function handleFormFocus(event: ReactFocusEvent<HTMLFormElement>) {
    const target = event.target;

    if (!(target instanceof HTMLInputElement || target instanceof HTMLTextAreaElement)) return;

    document.documentElement.classList.add("invitation-root-form-focused");

    const scrollFocusedField = () => {
      target.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest",
      });
    };

    window.setTimeout(scrollFocusedField, 80);
    window.setTimeout(scrollFocusedField, 360);
  }

  function handleFormBlur(event: ReactFocusEvent<HTMLFormElement>) {
    const form = event.currentTarget;
    const nextTarget = event.relatedTarget;

    if (nextTarget instanceof Node && form.contains(nextTarget)) return;

    window.setTimeout(() => {
      if (!form.contains(document.activeElement)) {
        document.documentElement.classList.remove("invitation-root-form-focused");
      }
    }, 80);
  }

  function handleFormSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (step < 5) {
      goNext();
      return;
    }

    void submitRsvp();
  }

  return (
    <PanelFrame
      id="rsvp"
      backgroundClassName="bg-invitation-00189-copy"
      className="invitation-rsvp-section"
      contentClassName="invitation-rsvp-content px-[50.6875px] pt-[78px] text-left"
    >
      <div className="invitation-fade-up" data-visible="true">
        <h2 className="invitation-rsvp-title font-candlefish text-[28px] font-normal leading-[28px] tracking-[0.5px]">
          Kindly Confirm Your Presence And Share Your Blessings
        </h2>
        <p className="invitation-rsvp-intro mt-5 font-legan text-[13px] leading-[19.5px] tracking-[0.65px] text-white">
          {invitationInfo.rsvpIntro}
        </p>
        <RsvpStepper className="invitation-rsvp-stepper" step={step} />

        <form
          className="invitation-rsvp-form mt-5"
          onBlurCapture={handleFormBlur}
          onFocusCapture={handleFormFocus}
          onSubmit={handleFormSubmit}
        >
          {step === 1 ? (
            <div>
              <RsvpLabel>NAME</RsvpLabel>
              <input
                className={rsvpInputClassName}
                onChange={(event) => {
                  setName(event.target.value);
                  setSubmitted(false);
                  setSubmitError("");
                }}
                onKeyDown={handleInputKeyDown}
                value={name}
              />
              <button className={cn(rsvpButtonClassName, "mt-[10px]")} onClick={goNext} type="button">
                TIẾP TỤC
              </button>
            </div>
          ) : null}

          {step === 2 ? (
            <div>
              <RsvpLabel>ATTENDANCE</RsvpLabel>
              <div className="grid grid-cols-2 gap-[14px]">
                {invitationInfo.rsvpOptions.map((option) => (
                  <button
                    aria-pressed={attendance === option}
                    className={cn(
                      "flex h-10 items-center justify-center border border-white/55 bg-transparent px-2 font-inter-local text-[11px] uppercase leading-none tracking-[1px] text-white transition duration-300 hover:bg-white/10",
                      attendance === option &&
                        "border-[#39d567] bg-[#2fbd50] text-white shadow-[0_0_22px_rgba(47,189,80,0.46)] hover:bg-[#36cf5b]",
                    )}
                    key={option}
                    onClick={() => chooseAttendance(option)}
                    type="button"
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="mt-[14px] grid grid-cols-2 gap-[10px]">
                <button className={cn(rsvpButtonClassName, "bg-[#69727d] hover:bg-[#7b8490]")} onClick={goPrevious} type="button">
                  QUAY LẠI
                </button>
                <button className={rsvpButtonClassName} onClick={goNext} type="button">
                  TIẾP TỤC
                </button>
              </div>
            </div>
          ) : null}

          {step === 3 ? (
            <div>
              <RsvpLabel>NO OF GUEST</RsvpLabel>
              <input
                className={rsvpInputClassName}
                max={2}
                min={1}
                onChange={(event) => {
                  setGuestCount(event.target.value);
                  setSubmitted(false);
                  setSubmitError("");
                }}
                onKeyDown={handleInputKeyDown}
                type="number"
                value={guestCount}
              />
              <div className="mt-[10px] grid grid-cols-2 gap-[10px]">
                <button className={cn(rsvpButtonClassName, "bg-[#69727d] hover:bg-[#7b8490]")} onClick={goPrevious} type="button">
                  QUAY LẠI
                </button>
                <button className={rsvpButtonClassName} onClick={goNext} type="button">
                  TIẾP TỤC
                </button>
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div>
              <RsvpLabel>GHI CHÚ</RsvpLabel>
              <p className="mb-[10px] font-legan text-[12px] leading-[18px] tracking-[0.04em] text-white/78">
                Bạn có điều gì muốn nhắn trước cho buổi tiệc không?
              </p>
              <div className="space-y-[8px]">
                <button
                  aria-pressed={extraRequests.length === 0}
                  className={cn(
                    "flex min-h-[48px] w-full items-center gap-3 border border-white/45 bg-[#414141]/35 px-3 py-2 text-left font-inter-local text-white transition duration-300 hover:bg-white/10",
                    extraRequests.length === 0 &&
                      "border-[#39d567] bg-[#2fbd50]/35 shadow-[0_0_20px_rgba(47,189,80,0.34)]",
                  )}
                  onClick={() => {
                    setExtraRequests([]);
                    setPartyNote("");
                    setSubmitted(false);
                    setSubmitError("");
                  }}
                  type="button"
                >
                  <MessageSquareTextIcon aria-hidden="true" className="shrink-0" size={17} strokeWidth={1.8} />
                  <span className="flex flex-col gap-1">
                    <span className="text-[11px] uppercase leading-none tracking-[1px]">
                      Không có ghi chú thêm
                    </span>
                    <span className="font-legan text-[11px] leading-[15px] tracking-[0.03em] text-white/68">
                      Mặc định, bạn có thể tiếp tục tới lời chúc.
                    </span>
                  </span>
                </button>
                {rsvpExtraOptions.map((option) => {
                  const active = extraRequests.includes(option.value);
                  const Icon = option.icon;

                  return (
                    <button
                      aria-pressed={active}
                      className={cn(
                        "flex min-h-[48px] w-full items-center gap-3 border border-white/45 bg-[#414141]/35 px-3 py-2 text-left font-inter-local text-white transition duration-300 hover:bg-white/10",
                        active &&
                          "border-[#39d567] bg-[#2fbd50]/35 shadow-[0_0_20px_rgba(47,189,80,0.34)]",
                      )}
                      key={option.value}
                      onClick={() => toggleExtraRequest(option.value)}
                      type="button"
                    >
                      <Icon aria-hidden="true" className="shrink-0" size={17} strokeWidth={1.8} />
                      <span className="flex flex-col gap-1">
                        <span className="text-[11px] uppercase leading-none tracking-[1px]">
                          {option.label}
                        </span>
                        <span className="font-legan text-[11px] leading-[15px] tracking-[0.03em] text-white/68">
                          {option.description}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>

              {extraRequests.length > 0 ? (
                <div className="mt-[10px]">
                  <textarea
                    className={cn(rsvpInputClassName, "h-[82px] resize-none")}
                    onChange={(event) => {
                      setPartyNote(event.target.value);
                      setSubmitted(false);
                      setSubmitError("");
                    }}
                    placeholder="Ví dụ: muốn phát biểu ngắn, gửi video chúc mừng, hoặc nhờ chuẩn bị micro..."
                    value={partyNote}
                  />
                </div>
              ) : null}

              <div className="mt-[10px] grid grid-cols-2 gap-[10px]">
                <button className={cn(rsvpButtonClassName, "bg-[#69727d] hover:bg-[#7b8490]")} onClick={goPrevious} type="button">
                  QUAY LẠI
                </button>
                <button className={rsvpButtonClassName} onClick={goNext} type="button">
                  TIẾP TỤC
                </button>
              </div>
            </div>
          ) : null}

          {step === 5 ? (
            <div>
              <RsvpLabel>LỜI CHÚC</RsvpLabel>
              <textarea
                className={cn(rsvpInputClassName, "h-[118px] resize-none")}
                onChange={(event) => {
                  setMessage(event.target.value);
                  setSubmitted(false);
                  setSubmitError("");
                }}
                placeholder="Gửi một lời chúc nhỏ tới Cảnh Quân & Lan Ngọc..."
                value={message}
              />
              <div className="mt-[10px] grid grid-cols-2 gap-[10px]">
                <button className={cn(rsvpButtonClassName, "bg-[#69727d] hover:bg-[#7b8490]")} onClick={goPrevious} type="button">
                  QUAY LẠI
                </button>
                <button className={rsvpButtonClassName} disabled={submitting} type="submit">
                  {submitting ? "ĐANG GỬI..." : invitationInfo.rsvpButton}
                </button>
              </div>
            </div>
          ) : null}

          {submitted ? (
            <p className="mt-4 flex items-center gap-2 font-legan text-[16px] leading-[24px] text-[#d9ffd9]">
              <CheckIcon aria-hidden="true" size={18} strokeWidth={2.6} />
              Xác nhận của bạn đã được gửi thành công.
            </p>
          ) : null}

          {submitError ? (
            <p className="mt-4 font-legan text-[16px] leading-[24px] text-[#ffd7d7]">
              {submitError}
            </p>
          ) : null}
        </form>
      </div>
    </PanelFrame>
  );
}

export function WishesSection() {
  const featuredWish = wishes[0] ?? {
    date: invitationInfo.weddingDate,
    message:
      "Sự hiện diện và lời chúc của bạn là món quà rất quý với Cảnh Quân & Lan Ngọc.",
    name: "Lời chúc",
  };

  return (
    <PanelFrame
      backgroundClassName="bg-invitation-00189"
      contentClassName="justify-between px-[39px] py-[58.5px] text-left"
      overlayClassName="bg-black/50"
    >
      <div className="invitation-fade-up" data-visible="true">
        <div className="flex items-start justify-between">
          <h2 className="font-candlefish text-[25px] font-normal leading-[25px] text-[#eeeeee]">Lời chúc</h2>
          <a
            className="inline-flex items-center gap-[8px] pt-[7px] font-inter-local text-[12px] font-medium uppercase leading-[13px] tracking-[0.08em] text-[#d8d8d8] transition duration-300 hover:text-white"
            href={confirmationUrl}
          >
            <span>Gửi lời chúc</span>
            <ArrowRightIcon aria-hidden="true" size={15} strokeWidth={1.4} />
          </a>
        </div>
        <div className="mt-[8px] h-px bg-white/45" />

        <div className="mt-[82px] max-w-[330px]">
          <SectionKicker className="text-left text-[10px] leading-[10px]">
            GỬI TỚI CHÚNG TÔI
          </SectionKicker>
          <h3 className="mt-4 font-candlefish text-[38px] font-normal leading-[42px] text-white">
            Một lời nhắn nhỏ,
            <br />
            một kỷ niệm lớn
          </h3>
          <p className="mt-5 font-legan text-[14px] font-light leading-[23px] tracking-[0.04em] text-white/88">
            Nếu có một điều bạn muốn gửi gắm cho ngày chúng tôi bắt đầu hành trình mới,
            hãy để lại trong phần xác nhận tham dự.
          </p>
        </div>
      </div>

      <div className="max-w-[310px] invitation-fade-up" data-visible="true">
        <p className="font-candlefish text-[24px] font-normal leading-[28px] text-white">
          {featuredWish.name}
        </p>
        <p className="mt-3 font-legan text-[13px] font-light leading-[21px] tracking-[0.04em] text-white/78">
          {featuredWish.message}
        </p>
        <div className="mt-6">
          <SourceButton className="h-[40px] bg-white/18 px-7 uppercase tracking-[0.08em] hover:bg-white/28" href={confirmationUrl}>
            Gửi lời chúc
          </SourceButton>
        </div>
      </div>
    </PanelFrame>
  );
}

export function DressCodeSection() {
  return (
    <PanelFrame backgroundClassName="bg-invitation-00200" contentClassName="items-center justify-center px-8 text-center">
      <div className="max-w-[300px] space-y-5 invitation-fade-up">
        <SectionKicker>Dress Code</SectionKicker>
        <h2 className="font-candlefish text-[34px] font-normal leading-none text-white">
          {dressCode.title}
        </h2>
        <p className="font-legan text-[13px] leading-[19.5px] text-white/80">
          {dressCode.description}
        </p>
        <div className="grid grid-cols-5 gap-3 pt-2">
          {dressCode.colors.map((color) => (
            <div className="space-y-2" key={color.name}>
              <span
                aria-label={color.name}
                className={cn("mx-auto block size-9 rounded-full border border-white/45", dressCodeSwatchClass(color.value))}
              />
              <span className="block font-legan text-[9px] uppercase leading-none tracking-[0.08em] text-white/75">
                {color.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </PanelFrame>
  );
}

export function StreamingSection() {
  return (
    <PanelFrame backgroundClassName="bg-invitation-00139" contentClassName="items-start px-[30px] pt-[70px]" overlayClassName="bg-black/58">
      <div className="max-w-[260px] space-y-4 invitation-fade-up">
        <h2 className="font-candlefish text-[28px] font-normal uppercase leading-[31px]">
          JOIN OUR CELEBRATION IN DA NANG
        </h2>
        <p className="font-legan text-[13px] uppercase leading-[19.5px] text-white/90">
          {invitationInfo.weddingDate} - {receptionEvent?.time}
        </p>
        <p className="font-legan text-[13px] leading-[19.5px] text-white/70">
          {weddingVenue.name}
          <br />
          {weddingVenue.address}
        </p>
        <SourceButton href={streamingUrl}>Open Maps</SourceButton>
      </div>
    </PanelFrame>
  );
}

export function GiftSection() {
  const [copied, setCopied] = useState<string | null>(null);

  async function copyAccount(account: string) {
    await navigator.clipboard?.writeText(account);
    setCopied(account);
    window.setTimeout(() => setCopied(null), 1300);
  }

  return (
    <PanelFrame id="weddinggift" backgroundClassName="bg-invitation-00171" contentClassName="justify-end px-[35px] pb-[70px]">
      <div className="space-y-4 invitation-fade-up">
        <h2 className="font-candlefish text-[28px] font-normal leading-[31px]">Wedding Gift</h2>
        <p className="font-legan text-[13px] leading-[19.5px] text-white/76">
          For those of you who want to give a token of love to the bride and groom, you can use the account number below:
        </p>
        <div className="space-y-2">
          {giftAccounts.map((gift) => (
            <div className="flex items-center justify-between gap-3 bg-black/30 px-4 py-3" key={`${gift.bank}-${gift.account}`}>
              <div>
                <p className="font-legan text-[13px] text-white">{gift.name}</p>
                <p className="font-inter-local text-[10px] uppercase text-white/65">
                  {gift.bank} {gift.account}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {gift.qrImage ? (
                  <Image
                    alt={gift.qrAlt ?? `QR ${gift.bank} ${gift.account}`}
                    className="size-[58px] bg-white object-contain p-1"
                    height={58}
                    src={gift.qrImage}
                    unoptimized
                    width={58}
                  />
                ) : null}
                <button
                  aria-label={`Copy ${gift.account}`}
                  className="flex size-[29px] items-center justify-center text-white transition hover:bg-white/10"
                  onClick={() => void copyAccount(gift.account)}
                  type="button"
                >
                  <CopyIcon size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
        <a
          className="block h-[52px] rounded-md bg-[#454545]/85 py-5 text-center font-legan text-xs uppercase leading-none text-[#ddd] transition hover:bg-[#555]"
          href={confirmationUrl}
        >
          {copied ? "COPIED" : "CONFIRM"}
        </a>
      </div>
    </PanelFrame>
  );
}

export function GallerySection() {
  const [active, setActive] = useState(0);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (!autoplayEnabled || previewOpen) return;

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % galleryImages.length);
    }, 1500);
    return () => window.clearInterval(timer);
  }, [autoplayEnabled, previewOpen]);

  useEffect(() => {
    if (!previewOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setPreviewOpen(false);
      }
      if (event.key === "ArrowLeft") {
        setActive((current) => (current - 1 + galleryImages.length) % galleryImages.length);
      }
      if (event.key === "ArrowRight") {
        setActive((current) => (current + 1) % galleryImages.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [previewOpen]);

  const image = galleryImages[active];

  function previousImage() {
    setAutoplayEnabled(false);
    setActive((current) => (current - 1 + galleryImages.length) % galleryImages.length);
  }

  function nextImage() {
    setAutoplayEnabled(false);
    setActive((current) => (current + 1) % galleryImages.length);
  }

  function openPreview() {
    setAutoplayEnabled(false);
    setPreviewOpen(true);
  }

  function handleTouchEnd(clientX: number) {
    if (touchStartX.current === null) return;

    const delta = clientX - touchStartX.current;
    if (delta > 50) {
      previousImage();
    }
    if (delta < -50) {
      nextImage();
    }
    touchStartX.current = null;
  }

  return (
    <PanelFrame id="gallery" contentClassName="items-center justify-center text-center" overlayClassName="bg-black/10">
      <Image
        alt={image.label}
        className="object-cover grayscale"
        fill
        sizes="(max-width: 1024px) 100vw, 460px"
        src={image.src}
      />
      <button
        aria-label={`Preview ${image.label}`}
        className="absolute inset-0 z-[1] cursor-zoom-in"
        onClick={openPreview}
        type="button"
      />
      <div className="absolute inset-0 bg-black/10" />
      <div className="relative z-[2] mb-auto mt-16 space-y-4">
        <h2 className="font-candlefish text-[28px] font-normal uppercase leading-[31px]">
          OUR WEDDING MOMENTS
        </h2>
        <p className="font-inter-local text-[10px] uppercase leading-none tracking-[5.4px]">{invitationInfo.sideName}</p>
        <p className="font-legan text-[15px]">{active + 1} / {galleryImages.length}</p>
        <p className="font-legan text-[15px]">Tap image for preview</p>
      </div>
      <button
        aria-label="Previous image"
        className="absolute left-5 top-1/2 z-[3] text-white"
        onClick={previousImage}
        type="button"
      >
        <ArrowLeftIcon size={72} strokeWidth={1} />
      </button>
      <button
        aria-label="Next image"
        className="absolute right-5 top-1/2 z-[3] text-white"
        onClick={nextImage}
        type="button"
      >
        <ArrowRightIcon size={72} strokeWidth={1} />
      </button>
      {previewOpen ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-[80] bg-black/90 opacity-100 transition-opacity duration-300"
          onClick={() => setPreviewOpen(false)}
          onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0]?.screenX ?? 0)}
          onTouchStart={(event) => {
            touchStartX.current = event.changedTouches[0]?.screenX ?? null;
          }}
          role="dialog"
        >
          <div
            className="absolute left-1/2 top-1/2 h-[90vh] w-[95vw] -translate-x-1/2 -translate-y-1/2"
            onClick={(event) => event.stopPropagation()}
          >
            <Image
              alt={image.label}
              className="object-contain"
              fetchPriority="high"
              fill
              loading="eager"
              sizes="95vw"
              src={image.src}
              unoptimized
            />
          </div>
          <button
            aria-label="Previous preview image"
            className="absolute left-3 top-1/2 z-[2] -translate-y-1/2 px-4 py-5 font-legan text-[30px] text-white"
            onClick={(event) => {
              event.stopPropagation();
              previousImage();
            }}
            type="button"
          >
            &lt;
          </button>
          <button
            aria-label="Next preview image"
            className="absolute right-3 top-1/2 z-[2] -translate-y-1/2 px-4 py-5 font-legan text-[30px] text-white"
            onClick={(event) => {
              event.stopPropagation();
              nextImage();
            }}
            type="button"
          >
            &gt;
          </button>
          <button
            aria-label="Close preview"
            className="absolute right-5 top-5 z-[2] font-legan text-[30px] leading-none text-white"
            onClick={(event) => {
              event.stopPropagation();
              setPreviewOpen(false);
            }}
            type="button"
          >
            x
          </button>
          <p className="absolute inset-x-0 bottom-5 z-[2] text-center font-legan text-[13px] text-white">
            {active + 1} / {galleryImages.length}
          </p>
        </div>
      ) : null}
    </PanelFrame>
  );
}

export function ClosingSection() {
  return (
    <PanelFrame backgroundClassName="bg-invitation-closing" contentClassName="items-center justify-end px-5 pb-[70px] text-center" overlayClassName="bg-black/12">
      <div className="space-y-5 invitation-fade-up">
        <h2 className="font-candlefish text-[28px] font-normal uppercase leading-none tracking-[0.5px]">
          THANK YOU FOR YOUR ATTENDANCE
        </h2>
        <p className="mx-auto max-w-[310px] font-legan text-[13px] leading-[19.5px] text-white/75">
          {invitationInfo.closingLine}
        </p>
        <p className="font-ovo text-[16px] font-medium uppercase leading-none">{invitationInfo.sideName}</p>
        <p className="block font-legan text-[9px] uppercase text-white">
          CREATED BY {invitationInfo.createdBy}
        </p>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 font-legan text-[12px] uppercase text-white">
          <a href={weddingVenue.mapUrl}>TEMPLE BEACH RESTAURANT</a>
          <a href={brideProfile.instagramUrl}>{invitationInfo.brideName}</a>
          <a href={groomProfile.instagramUrl}>{invitationInfo.groomName}</a>
        </div>
        <p className="font-legan text-[12px] text-white/80">09.08.2026</p>
      </div>
    </PanelFrame>
  );
}

export function DesktopFixedPanel() {
  return (
    <aside className="invitation-panel-bg fixed inset-y-0 left-0 z-[1] hidden w-[calc(100vw-min(32vw,460px))] overflow-hidden bg-[#101010] bg-invitation-00162 lg:block">
      <div className="absolute inset-0 bg-black/58" />
      <div className="relative z-[1] flex h-full flex-col items-center justify-end gap-5 p-[50px] text-center">
        <h2 className="font-legan text-[13px] uppercase tracking-[0.32em] text-white/85">{invitationInfo.sideName}</h2>
      </div>
    </aside>
  );
}

function PreloaderAnimatedWord({
  className,
  direction,
  text,
}: {
  className?: string;
  direction: "from-left" | "from-right";
  text: string;
}) {
  let letterIndex = 0;
  const words = text.split(" ");

  return (
    <p
      aria-label={text}
      className={cn("invitation-loader-word", `invitation-loader-word-${direction}`, className)}
    >
      <span aria-hidden="true" className="invitation-loader-word-inner">
        {words.map((word, wordIndex) => (
          <Fragment key={`${word}-${wordIndex}`}>
            <span className="invitation-loader-word-group">
              {[...word].map((letter) => {
                const currentIndex = letterIndex;
                letterIndex += 1;
                return (
                  <span
                    className={cn("invitation-loader-char", `invitation-loader-char-${currentIndex}`)}
                    key={`${letter}-${currentIndex}`}
                  >
                    {letter}
                  </span>
                );
              })}
            </span>
            {wordIndex < words.length - 1 ? " " : null}
          </Fragment>
        ))}
      </span>
    </p>
  );
}

export function Preloader({ hiding, percent }: { hiding?: boolean; percent: number }) {
  return (
    <div
      className="invitation-preloader fixed inset-0 z-[9999999] bg-[#101010] text-center text-white"
      data-hiding={hiding ? "true" : "false"}
      id="preloader"
    >
      <div className="absolute inset-x-0 top-[35.3svh] flex flex-col items-center lg:top-[41.9svh]">
        <PreloaderAnimatedWord direction="from-right" text="The Wedding of" />
        <div className="invitation-preloader-thumb mt-[19px]" />
        <PreloaderAnimatedWord className="mt-5" direction="from-left" text={invitationInfo.sideName} />
      </div>
      <p className="absolute inset-x-0 top-[76.9svh] font-lausanne text-xs uppercase leading-[18px] tracking-[1px] text-[#c2c2c2] lg:inset-x-auto lg:bottom-[36px] lg:left-[43px] lg:top-auto lg:text-left lg:text-sm lg:leading-[21px]">
        LOADING...{" "}
        <span
          className="invitation-loading-percent"
          data-percent={percent}
          data-invitation-loading-percent
          suppressHydrationWarning
        >
          {percent}
        </span>
        %
      </p>
    </div>
  );
}

export function SideMenu({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <>
      <button
        aria-label="Close menu overlay"
        className={cn("fixed inset-0 z-[45] cursor-default", open ? "block" : "hidden")}
        onClick={onClose}
        type="button"
      />
      <div
        className={cn(
          "fixed right-[10px] top-[10px] z-50 w-[calc(100%-20px)] max-w-[370px] rounded-[23px] bg-[#101010]/92 p-[35px] text-white shadow-2xl backdrop-blur transition duration-500 ease-[cubic-bezier(.76,0,.24,1)]",
          open ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-4 opacity-0",
        )}
      >
        <div className="mb-6 flex items-center justify-between">
          <span className="font-inter-local text-[11px] uppercase tracking-[0.28em]">CLOSE</span>
          <button aria-label="Close menu" className="font-inter-local text-[11px] uppercase tracking-[0.28em]" onClick={onClose} type="button">
            CLOSE
          </button>
        </div>
        <nav className="space-y-5">
          {menuItems.map((item) => (
            <a
              className="invitation-menu-link block border-b border-white/12 pb-3 font-legan text-[18px] uppercase tracking-[0.18em] text-white/85 transition hover:text-white"
              href={`#${item.target}`}
              key={item.target}
              onClick={onClose}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <p className="mt-8 font-legan text-[13px] leading-[19.5px] text-white/55">
          Please click one of the menu options above to navigate directly to your desired page.
        </p>
      </div>
    </>
  );
}
