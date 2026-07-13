"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  CopyIcon,
  PlayCircleIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

import {
  brideProfile,
  confirmationUrl,
  galleryImages,
  giftAccounts,
  groomProfile,
  instagramUrl,
  loveStory,
  menuItems,
  streamingUrl,
  weddingEvents,
  wishes,
} from "./content";
import {
  PanelFrame,
  SectionKicker,
  SignatureName,
  SourceButton,
} from "./InvitationPrimitives";

const saveDateCardImage = "/images/groove-blog-olive-versi-400173.jpg";
const weddingOrnamentImage = "/images/wedding-ornament.svg";
const weddingVideoEmbedUrl = "https://www.youtube.com/embed/a-kLVfwTZnM?autoplay=1&controls=1&loop=1&playlist=a-kLVfwTZnM&modestbranding=1";

function downloadSaveDateImage() {
  const canvas = document.createElement("canvas");
  const width = 1080;
  const height = 1450;
  canvas.width = width;
  canvas.height = height;

  const context = canvas.getContext("2d");
  if (!context) return;

  const background = new window.Image();
  background.crossOrigin = "anonymous";
  background.onload = () => {
    context.fillStyle = "#ebe3da";
    context.fillRect(0, 0, width, height);
    context.globalAlpha = 0.42;
    context.drawImage(background, 0, 0, width, height);
    context.globalAlpha = 1;

    context.fillStyle = "#101010";
    context.textAlign = "center";
    context.font = "44px serif";
    context.fillText("The Wedding of", width / 2, 310);
    context.font = "104px serif";
    context.fillText("Imam Nandira", width / 2, 440);
    context.font = "34px sans-serif";
    context.fillText("Saturday, 9th December 202X", width / 2, 525);
    context.font = "38px sans-serif";
    context.fillText("THANK YOU FOR YOUR ATTENDANCE", width / 2, 1040);
    context.font = "30px sans-serif";
    context.fillText("It is a pleasure and honor for us,", width / 2, 1110);
    context.fillText("if you are willing to attend and give us your blessing.", width / 2, 1160);

    const link = document.createElement("a");
    link.download = "Imam Nandira.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };
  background.src = saveDateCardImage;
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
      backgroundClassName="bg-invitation-00152"
      backgroundLayers={["bg-invitation-00141", "bg-invitation-00195", "bg-invitation-00152"]}
      contentClassName="px-5 text-center"
      overlayClassName="bg-black/42"
    >
      <div className="invitation-hero-title absolute inset-x-5 top-[14%] space-y-[10px] invitation-fade-up" data-visible="true">
        <SectionKicker>THE WEDDING OF</SectionKicker>
        <h1 className="font-candlefish text-[33px] leading-none text-white sm:text-[40px]">
          Imam&nbsp; Nandira
        </h1>
        <p className="font-legan text-[13px] uppercase leading-[17px] tracking-[1.8px]">
          SATURDAY, 9TH DECEMBER 202X
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
          <p className="font-legan text-xl font-medium leading-none">Dear,</p>
          <p className="mx-auto max-w-60 font-legan text-[11px] font-medium leading-[15px] text-white/80">
            We apologize if there is any misspelling of name or title
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
        Two are better than one because they have a good reward for their toil. For if they fall,
        one will lift up his fellow. But woe to him who is alone when he falls
        and has not another to lift him up! Again, if two lie together, they keep warm,
        but how can one keep warm alone? And though a man might prevail against
        one who is alone, two will withstand him
      </p>
      <p className="mt-5 font-candlefish text-[23px] font-medium uppercase leading-[23px] tracking-[0.8px] text-white">
        ECCLESIASTES 4:9-12
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
        <SourceButton className="mt-1 h-[29px] px-[19px] py-0" href={instagramUrl}>
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
    <PanelFrame id="lovestory" backgroundClassName="bg-invitation-00204" contentClassName="justify-center px-[39px]">
      <div className="space-y-5 text-white invitation-fade-up">
        <h2 className="font-candlefish text-[40px] font-normal leading-none">A journey in love</h2>
        {loveStory.map((item) => (
          <div className="space-y-2" key={item.year}>
            <h3 className="font-roxborough text-[16px] font-normal uppercase leading-none">
              {item.year}
            </h3>
            <p className="font-legan text-[13px] leading-[19.5px] text-white/78">{item.body}</p>
          </div>
        ))}
        <p className="pt-2 font-ovo text-[14px] font-medium uppercase leading-none">IMAM NANDIRA</p>
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
            SATURDAY
            <br />
            01 MARCH 202X
          </h2>
        </div>
        {weddingEvents.map((event) => (
          <WeddingEventDetail event={event} key={event.title} />
        ))}
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
      <p className="mx-auto mt-[10px] w-[230px] font-legan text-[13px] font-normal leading-[19.5px] text-white">
        {event.venue}
        <br />
        {event.address}
      </p>
      <a
        className="mt-[14px] inline-flex h-[33px] w-[130px] items-center justify-center bg-[#808080] px-[13px] py-[10px] font-legan text-[13px] uppercase leading-[13px] text-white transition duration-300 hover:bg-[#909090]"
        href={event.mapUrl}
        rel="noopener"
        target="_blank"
      >
        GOOGLE MAPS
      </a>
    </div>
  );
}

export function CountdownSection() {
  const [saveDateOpen, setSaveDateOpen] = useState(false);

  return (
    <PanelFrame backgroundClassName="bg-invitation-00152" contentClassName="items-center justify-end px-[30px] pb-[120px] text-center">
      <div className="space-y-7 invitation-fade-up">
        <h2 className="font-candlefish text-[28px] font-normal uppercase leading-[31px]">
          ALMOST TIME FOR OUR
          <br />
          CELEBRATION
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {["DAYS", "HOURS", "MINUTES", "SECONDS"].map((label) => (
            <div className="space-y-1" key={label}>
              <p className="font-candlefish text-[39px] leading-none">00</p>
              <p className="font-legan text-[10px] uppercase tracking-[0.1em]">{label}</p>
            </div>
          ))}
        </div>
        <button
          className="inline-flex h-[37px] items-center justify-center bg-[#808080] px-[15px] font-legan text-[13px] uppercase leading-none text-white transition duration-300 hover:bg-[#909090]"
          onClick={() => setSaveDateOpen(true)}
          type="button"
        >
          SAVE THE DATE
        </button>
      </div>
      {saveDateOpen ? <SaveDateOverlay onClose={() => setSaveDateOpen(false)} /> : null}
    </PanelFrame>
  );
}

function SaveDateOverlay({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      aria-modal="true"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#101010]/90 p-5 text-[#101010] invitation-overlay-enter"
      onClick={onClose}
      role="dialog"
    >
      <div
        className="relative h-[min(84vh,620px)] w-full max-w-[360px] overflow-hidden bg-[#ebe3da] text-center shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <Image
          alt=""
          className="object-cover opacity-45"
          fill
          sizes="360px"
          src={saveDateCardImage}
        />
        <div className="relative z-[1] flex h-full flex-col items-center px-7 py-10">
          <button
            aria-label="Close save date"
            className="absolute right-4 top-4 font-inter-local text-[20px] leading-none text-[#101010]"
            onClick={onClose}
            type="button"
          >
            x
          </button>
          <p className="mt-12 font-legan text-[13px] uppercase tracking-[0.22em]">The Wedding of</p>
          <h2 className="mt-5 font-candlefish text-[42px] leading-none">Imam Nandira</h2>
          <p className="mt-5 font-legan text-[12px] uppercase tracking-[0.12em]">
            Saturday, 9th December 202X
          </p>
          <div className="mt-auto space-y-3">
            <p className="font-candlefish text-[24px] uppercase leading-[27px]">
              Thank You For Your Attendance
            </p>
            <p className="font-legan text-[12px] leading-[18px]">
              It is a pleasure and honor for us, if you are willing to attend and give us your blessing.
            </p>
            <button
              className="mt-4 h-10 bg-[#101010] px-6 font-legan text-xs uppercase tracking-[0.14em] text-white transition hover:bg-[#303030]"
              onClick={downloadSaveDateImage}
              type="button"
            >
              DOWNLOAD JPG
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type RsvpStep = 1 | 2 | 3 | 4;

const rsvpSteps: RsvpStep[] = [1, 2, 3, 4];

function RsvpStepper({ step }: { step: RsvpStep }) {
  return (
    <div className="mt-5 grid h-10 grid-cols-[30px_1fr_30px_1fr_30px_1fr_30px] items-start">
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
  "flex h-10 w-full items-center justify-center bg-[#313131] font-inter-local text-[13px] uppercase leading-none tracking-[1px] text-white transition duration-300 hover:bg-[#444]";

export function RsvpSection() {
  const [step, setStep] = useState<RsvpStep>(1);
  const [name, setName] = useState("");
  const [attendance, setAttendance] = useState<"EXCITED TO ATTEND" | "UNABLE ATTEND" | "">("");
  const [guestCount, setGuestCount] = useState("1");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function goPrevious() {
    setSubmitted(false);
    setStep((current) => Math.max(1, current - 1) as RsvpStep);
  }

  function goNext() {
    setSubmitted(false);

    if (step === 1 && !name.trim()) return;
    if (step === 2 && !attendance) return;
    if (step === 3 && !guestCount.trim()) return;

    setStep((current) => Math.min(4, current + 1) as RsvpStep);
  }

  function submitRsvp() {
    setSubmitted(true);
    setStep(1);
  }

  return (
    <PanelFrame
      id="rsvp"
      backgroundClassName="bg-invitation-00189-copy"
      contentClassName="px-[50.6875px] pt-[78px] text-left"
    >
      <div className="invitation-fade-up">
        <h2 className="font-candlefish text-[28px] font-normal leading-[28px] tracking-[0.5px]">
          Kindly Confirm Your Presence And Share Your Blessings
        </h2>
        <p className="mt-5 font-legan text-[13px] leading-[19.5px] tracking-[0.65px] text-white">
          Kindly express your best wishes and kindly confirm your attendance by using the form provided below. Thank you.
        </p>
        <RsvpStepper step={step} />

        <form
          className="mt-5"
          onSubmit={(event) => {
            event.preventDefault();
            submitRsvp();
          }}
        >
          {step === 1 ? (
            <div>
              <RsvpLabel>NAME</RsvpLabel>
              <input
                className={rsvpInputClassName}
                onChange={(event) => {
                  setName(event.target.value);
                  setSubmitted(false);
                }}
                value={name}
              />
              <button className={cn(rsvpButtonClassName, "mt-[10px]")} onClick={goNext} type="button">
                NEXT
              </button>
            </div>
          ) : null}

          {step === 2 ? (
            <div>
              <RsvpLabel>ATTENDANCE</RsvpLabel>
              <div className="grid grid-cols-2 gap-[14px]">
                {(["EXCITED TO ATTEND", "UNABLE ATTEND"] as const).map((option) => (
                  <button
                    aria-pressed={attendance === option}
                    className={cn(
                      "flex h-10 items-center justify-center border border-white/55 bg-transparent px-2 font-inter-local text-[11px] uppercase leading-none tracking-[1px] text-white transition duration-300 hover:bg-white/10",
                      attendance === option && "border-[#39b54a] bg-white/10",
                    )}
                    key={option}
                    onClick={() => {
                      setAttendance(option);
                      setSubmitted(false);
                    }}
                    type="button"
                  >
                    {option}
                  </button>
                ))}
              </div>
              <div className="mt-[14px] grid grid-cols-2 gap-[10px]">
                <button className={cn(rsvpButtonClassName, "bg-[#69727d] hover:bg-[#7b8490]")} onClick={goPrevious} type="button">
                  PREVIOUS
                </button>
                <button className={rsvpButtonClassName} onClick={goNext} type="button">
                  NEXT
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
                }}
                type="number"
                value={guestCount}
              />
              <div className="mt-[10px] grid grid-cols-2 gap-[10px]">
                <button className={cn(rsvpButtonClassName, "bg-[#69727d] hover:bg-[#7b8490]")} onClick={goPrevious} type="button">
                  PREVIOUS
                </button>
                <button className={rsvpButtonClassName} onClick={goNext} type="button">
                  NEXT
                </button>
              </div>
            </div>
          ) : null}

          {step === 4 ? (
            <div>
              <RsvpLabel>WISHES</RsvpLabel>
              <textarea
                className={cn(rsvpInputClassName, "h-[118px] resize-none")}
                onChange={(event) => {
                  setMessage(event.target.value);
                  setSubmitted(false);
                }}
                value={message}
              />
              <div className="mt-[10px] grid grid-cols-2 gap-[10px]">
                <button className={cn(rsvpButtonClassName, "bg-[#69727d] hover:bg-[#7b8490]")} onClick={goPrevious} type="button">
                  PREVIOUS
                </button>
                <button className={rsvpButtonClassName} type="submit">
                  SEND
                </button>
              </div>
            </div>
          ) : null}

          {submitted ? (
            <p className="mt-4 flex items-center gap-2 font-legan text-[16px] leading-[24px] text-[#d9ffd9]">
              <CheckIcon aria-hidden="true" size={18} strokeWidth={2.6} />
              Your submission was successful.
            </p>
          ) : null}
        </form>
      </div>
    </PanelFrame>
  );
}

const wishSlotClassNames = [
  "left-0 top-0 max-w-[234px] text-left",
  "right-0 top-[96px] max-w-[234px] text-right",
  "left-0 top-[236px] max-w-[260px] text-left",
  "right-0 top-[374px] max-w-[276px] text-right",
];

export function WishesSection() {
  const itemsPerPage = 4;
  const [page, setPage] = useState(0);
  const pageCount = Math.ceil(wishes.length / itemsPerPage);
  const visibleWishes = wishes.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);

  return (
    <PanelFrame backgroundClassName="bg-invitation-00189" contentClassName="justify-start px-[39px] pt-[58.5px]">
      <div className="invitation-fade-up">
        <div className="flex items-start justify-between">
          <h2 className="font-candlefish text-[25px] font-normal leading-[25px] text-[#d8d8d8]">Wishes</h2>
          <button
            className="inline-flex items-center gap-[8px] pt-[7px] font-inter-local text-[13px] font-medium uppercase leading-[13px] text-[#c8c8c8] transition duration-300 hover:text-white"
            onClick={() => setPage((current) => (current + 1) % pageCount)}
            type="button"
          >
            <span>NEXT</span>
            <ArrowRightIcon aria-hidden="true" size={15} strokeWidth={1.4} />
          </button>
        </div>
        <div className="mt-[8px] h-px bg-white/45" />
        <div className="invitation-wishes-page relative mt-[23px] h-[650px]" key={page}>
          {visibleWishes.map((wish, index) => (
            <article
              className={cn("absolute", wishSlotClassNames[index])}
              key={`${wish.name}-${wish.date}-${wish.message}-${index}`}
            >
              <p className="font-candlefish text-[22px] font-normal leading-[25px] text-[#eeeeee]">{wish.name}</p>
              <p className="font-legan text-[13px] font-light leading-[19.5px] text-white">{wish.message}</p>
              <p className="mt-[19px] font-legan text-[13px] font-light leading-[19.5px] text-white/35">{wish.date}</p>
            </article>
          ))}
        </div>
      </div>
    </PanelFrame>
  );
}

export function DressCodeSection() {
  return (
    <PanelFrame backgroundClassName="bg-invitation-00200" contentClassName="items-center justify-center px-5 text-center">
      <p className="translate-y-[66px] font-signature text-[35px] font-light leading-[17px] text-white invitation-fade-up">
        Imam Nandira
      </p>
    </PanelFrame>
  );
}

export function StreamingSection() {
  return (
    <PanelFrame backgroundClassName="bg-invitation-00139" contentClassName="items-start px-[30px] pt-[70px]">
      <div className="max-w-[260px] space-y-4 invitation-fade-up">
        <h2 className="font-candlefish text-[28px] font-normal uppercase leading-[31px]">
          JOIN OUR EXCLUSIVE LIVE STREAMING EVENT
        </h2>
        <p className="font-legan text-[13px] uppercase leading-[19.5px] text-white/90">
          SATURDAY, 1 MARCH 202X - 11.00 WIB
        </p>
        <p className="font-legan text-[13px] leading-[19.5px] text-white/70">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.
        </p>
        <SourceButton href={streamingUrl}>Join Streaming</SourceButton>
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
            <div className="flex items-center justify-between bg-black/30 px-4 py-3" key={`${gift.bank}-${gift.account}`}>
              <div>
                <p className="font-legan text-[13px] text-white">{gift.name}</p>
                <p className="font-inter-local text-[10px] uppercase text-white/65">
                  {gift.bank} {gift.account}
                </p>
              </div>
              <button
                aria-label={`Copy ${gift.account}`}
                className="flex size-[29px] items-center justify-center text-white transition hover:bg-white/10"
                onClick={() => void copyAccount(gift.account)}
                type="button"
              >
                <CopyIcon size={15} />
              </button>
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
          OUR PRE-WEDDING CELEBRATION
        </h2>
        <p className="font-inter-local text-[10px] uppercase leading-none tracking-[5.4px]">IMAM NANDIRA</p>
        <p className="font-legan text-[15px]">{active + 1} / {galleryImages.length}</p>
        <p className="font-legan text-[15px]">Click image for preview</p>
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

export function VideoStorySection() {
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    if (!videoOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new CustomEvent("invitation-video-open"));

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setVideoOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
      window.dispatchEvent(new CustomEvent("invitation-video-close"));
    };
  }, [videoOpen]);

  return (
    <PanelFrame backgroundClassName="bg-invitation-00189-copy" contentClassName="items-start justify-center px-[30px]">
      <div className="max-w-[300px] space-y-5 invitation-fade-up">
        <h2 className="font-candlefish text-[21px] font-normal uppercase leading-none tracking-[0.5px]">
          UNVEILING OUR PREWEDDING STORY
        </h2>
        <button
          className="flex items-center gap-3 font-legan text-[13px] transition hover:text-white/75"
          onClick={() => setVideoOpen(true)}
          type="button"
        >
          <PlayCircleIcon size={64} strokeWidth={1.1} />
          <span>Play Video</span>
        </button>
        <p className="font-legan text-[13px] leading-[19.5px] text-white/75">
          Every love story is beautiful, but ours is my favorite. Through the highs and lows, our love grows stronger and deeper with each passing day.
        </p>
      </div>
      {videoOpen ? (
        <div
          aria-modal="true"
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/90 p-5 invitation-overlay-enter"
          onClick={() => setVideoOpen(false)}
          role="dialog"
        >
          <div
            className="relative aspect-video w-full max-w-[760px] bg-black shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="h-full w-full"
              src={weddingVideoEmbedUrl}
              title="Prewedding story video"
            />
            <button
              aria-label="Close video"
              className="absolute -right-1 -top-12 font-legan text-[30px] leading-none text-white"
              onClick={() => setVideoOpen(false)}
              type="button"
            >
              x
            </button>
          </div>
        </div>
      ) : null}
    </PanelFrame>
  );
}

export function ClosingSection() {
  return (
    <PanelFrame backgroundClassName="bg-invitation-00141" contentClassName="items-center justify-end px-5 pb-[70px] text-center" overlayClassName="bg-black/12">
      <div className="space-y-5 invitation-fade-up">
        <h2 className="font-candlefish text-[28px] font-normal uppercase leading-none tracking-[0.5px]">
          THANK YOU FOR YOUR ATTENDANCE
        </h2>
        <p className="mx-auto max-w-[310px] font-legan text-[13px] leading-[19.5px] text-white/75">
          It is a pleasure and honor for us, if you are willing to attend and give us your blessing.
        </p>
        <p className="font-ovo text-[16px] font-medium uppercase leading-none">IMAM NANDIRA</p>
        <a className="block font-legan text-[9px] uppercase text-white" href="https://groovepublic.com/">
          CREATED BY GROOVE PUBLIC
        </a>
        <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 font-legan text-[12px] uppercase text-white">
          <a href="https://wa.link/amk9ua">+62 813-2757-7133</a>
          <a href="https://www.instagram.com/groovepublic.id/">GROOVEPUBLIC.ID</a>
          <a href="https://groovepublic.com/">GROOVEPUBLIC.COM</a>
        </div>
        <p className="font-legan text-[12px] text-white/80">© All rights reserved by groovepublic</p>
      </div>
    </PanelFrame>
  );
}

export function DesktopFixedPanel() {
  return (
    <aside className="fixed inset-y-0 left-0 z-[1] hidden w-[calc(100vw-min(32vw,460px))] overflow-hidden bg-[#101010] bg-invitation-00162 bg-cover bg-center lg:block">
      <div className="absolute inset-0 bg-black/58" />
      <div className="relative z-[1] flex h-full flex-col items-center justify-end gap-5 p-[50px] text-center">
        <h2 className="font-legan text-[13px] uppercase tracking-[0.32em] text-white/85">IMAM NANDIRA</h2>
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
        <PreloaderAnimatedWord className="mt-5" direction="from-left" text="Imam Nandira" />
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
