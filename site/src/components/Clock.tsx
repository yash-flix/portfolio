"use client";

import { useEffect, useState } from "react";

const fmt = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export default function Clock({ className }: { className?: string }) {
  const [t, setT] = useState("--:--:--");
  useEffect(() => {
    const tick = () => setT(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className={`font-mono tabular-nums ${className ?? ""}`} suppressHydrationWarning>
      {t} <span className="text-mute">IST</span>
    </span>
  );
}
