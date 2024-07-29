import { useCallback, useEffect, useState } from "react";

export default function useScroll(
  threshold: number | undefined,
  parentRef?: React.RefObject<HTMLElement>
) {
  const [scrolled, setScrolled] = useState(false);

  const onScroll = useCallback(() => {
    if (threshold) {
      if (parentRef?.current) {
        setScrolled(parentRef.current.scrollTop > threshold);
      } else {
        setScrolled(window.scrollY > threshold);
      }
    }
  }, [threshold, parentRef]);

  useEffect(() => {
    const parentElement = parentRef?.current;
    if (parentElement) {
      parentElement.addEventListener("scroll", onScroll);
      return () => parentElement.removeEventListener("scroll", onScroll);
    }
  }, [onScroll, parentRef]);

  return scrolled;
}
