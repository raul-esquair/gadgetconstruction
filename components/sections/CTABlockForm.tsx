"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const MultiStepForm = dynamic(() => import("@/components/ui/MultiStepForm"), {
  ssr: false,
  loading: () => <div className="h-[440px]" aria-hidden="true" />,
});

export default function CTABlockForm() {
  const ref = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "400px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref}>
      {shouldLoad ? <MultiStepForm variant="light" /> : <div className="h-[440px]" aria-hidden="true" />}
    </div>
  );
}
