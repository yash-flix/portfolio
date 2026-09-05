/**
 * Hand-drawn highlighter marks behind or under a word.
 * Relies on the `hd-rough` / `hd-rough-soft` SVG filters defined once in the root layout.
 */
export default function Mark({
  children,
  kind = "underline",
  tail,
  className = "",
}: {
  children: React.ReactNode;
  kind?: "underline" | "marker" | "circle";
  /** Punctuation glued to the mark so it never wraps onto its own line. */
  tail?: string;
  className?: string;
}) {
  return (
    <span className={`inline-block whitespace-nowrap ${className}`}>
      <span className="relative inline-block">
        <span className="relative z-10">{children}</span>
        {kind === "underline" && (
          <svg
            className="pointer-events-none absolute bottom-[-0.22em] left-[-1%] h-[0.45em] w-[102%] text-lime"
            viewBox="0 0 140 10"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M3,6 C40,3 100,3 137,5"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              filter="url(#hd-rough-soft)"
            />
          </svg>
        )}
        {kind === "marker" && (
          <svg
            className="pointer-events-none absolute inset-x-[-4%] bottom-[-0.06em] z-0 h-[1.1em] w-[108%] text-lime/25"
            viewBox="0 0 170 26"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M4,17 C2,11 5,7 12,6 C45,2 95,2 138,4 C152,5 164,7 166,13 C167,18 163,21 155,22 C112,24 60,24 16,22 C8,21.5 4,20 4,17 Z"
              fill="currentColor"
              filter="url(#hd-rough-soft)"
            />
          </svg>
        )}
        {kind === "circle" && (
          <svg
            className="pointer-events-none absolute inset-[-0.55em_-0.5em] h-[calc(100%+1.1em)] w-[calc(100%+1em)] text-lime"
            viewBox="0 0 220 64"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden
          >
            <path
              d="M40,40 C20,23 53,7 102,5 C153,3 207,11 211,29 C215,47 167,60 109,60 C59,60 15,53 19,35 C21,27 27,22 37,20"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              filter="url(#hd-rough)"
            />
          </svg>
        )}
      </span>
      {tail}
    </span>
  );
}

/** Put once in the root layout so the marks' rough filters exist in the document. */
export function MarkDefs() {
  return (
    <svg width="0" height="0" className="absolute" aria-hidden>
      <defs>
        <filter id="hd-rough-soft">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.035"
            numOctaves="2"
            seed="3"
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="1.6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <filter id="hd-rough">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.03"
            numOctaves="2"
            seed="7"
            result="n"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="n"
            scale="3"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
