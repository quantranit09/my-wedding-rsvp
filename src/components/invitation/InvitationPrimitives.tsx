import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface PanelFrameProps {
  id?: string;
  backgroundClassName?: string;
  backgroundLayers?: string[];
  className?: string;
  contentClassName?: string;
  overlayClassName?: string;
  children: ReactNode;
}

export function PanelFrame({
  id,
  backgroundClassName,
  backgroundLayers,
  className,
  contentClassName,
  overlayClassName,
  children,
}: PanelFrameProps) {
  return (
    <section
      id={id}
      className={cn(
        "invitation-panel-frame relative flex w-full overflow-hidden bg-[#101010] text-white",
        className,
      )}
    >
      {backgroundLayers?.length ? (
        backgroundLayers.map((backgroundLayer, index) => (
          <div
            aria-hidden="true"
            className={cn(
              "absolute inset-0 invitation-panel-bg invitation-hero-slide",
              `invitation-hero-slide-${index + 1}`,
              backgroundLayer,
            )}
            key={`${backgroundLayer}-${index}`}
          />
        ))
      ) : backgroundClassName ? (
        <div
          aria-hidden="true"
          className={cn("absolute inset-0 invitation-panel-bg invitation-slow-zoom", backgroundClassName)}
        />
      ) : (
        null
      )}
      <div className={cn("absolute inset-0 bg-black/35", overlayClassName)} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[48%] bg-gradient-to-t from-[#101010]/85 via-[#101010]/35 to-transparent" />
      <div className={cn("relative z-[1] flex h-full min-h-[inherit] w-full flex-col", contentClassName)} data-invitation-panel>
        {children}
      </div>
    </section>
  );
}

export function SectionKicker({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <p className={cn("font-legan text-[13px] uppercase leading-[17px] tracking-[1.8px]", className)}>
      {children}
    </p>
  );
}

export function SignatureName({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={cn("font-candlefish text-[33px] font-normal leading-none", className)}>
      {children}
    </h2>
  );
}

export function SourceButton({
  children,
  className,
  href,
}: {
  children: ReactNode;
  className?: string;
  href?: string;
}) {
  if (href) {
    return (
      <a
        className={cn(
          "inline-flex h-[37px] items-center justify-center bg-[#404040] px-6 font-legan text-[13px] leading-none text-white transition duration-300 hover:bg-[#575757]",
          className,
        )}
        href={href}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      className={cn(
        "inline-flex h-[37px] items-center justify-center bg-[#404040] px-6 font-legan text-[13px] leading-none text-white transition duration-300 hover:bg-[#575757]",
        className,
      )}
      type="button"
    >
      {children}
    </button>
  );
}

export function DecorativeRule() {
  return <span className="mx-auto block h-px w-16 bg-white/55" />;
}
