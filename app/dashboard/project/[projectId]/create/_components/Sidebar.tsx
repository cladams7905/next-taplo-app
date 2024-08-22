"use client";

import { useEffect, useRef, useState } from "react";
import EventSettings from "./eventSettings/EventSettings";
import { StyleSettings } from "./styleSettings/StyleSettings";
import AdditionalSettings from "./additionalSettings/AdditionalSettings";
import ProductSettings from "./productSettings/ProductSettings";

export default function Sidebar({ isPreviewMode }: { isPreviewMode: boolean }) {
  const scrollParentRef = useRef<HTMLDivElement>(null);
  const eventHeaderRef = useRef<HTMLDivElement>(null);
  const productsHeaderRef = useRef<HTMLDivElement>(null);
  const styleHeaderRef = useRef<HTMLDivElement>(null);
  const [eventHeaderHeight, setEventHeaderHeight] = useState<
    number | undefined
  >(undefined);
  const [productsHeaderHeight, setProductsHeaderHeight] = useState<
    number | undefined
  >(undefined);
  const [styleHeaderHeight, setStyleHeaderHeight] = useState<
    number | undefined
  >(undefined);

  /* Detect changes in sticky subheadings in sidebar */
  useEffect(() => {
    const handleResize = (entries: ResizeObserverEntry[]) => {
      for (let entry of entries) {
        if (entry.target === eventHeaderRef.current) {
          setEventHeaderHeight(entry.contentRect.height);
        }
        if (entry.target === productsHeaderRef.current) {
          if (eventHeaderHeight) {
            setProductsHeaderHeight(
              entry.contentRect.height + eventHeaderHeight
            );
          }
        }
        if (entry.target === styleHeaderRef.current) {
          if (eventHeaderHeight && productsHeaderHeight) {
            setStyleHeaderHeight(
              entry.contentRect.height +
                eventHeaderHeight +
                productsHeaderHeight
            );
          }
        }
      }
    };
    const eventHeader = eventHeaderRef.current;
    const productsHeader = productsHeaderRef.current;
    const styleHeader = styleHeaderRef.current;

    const resizeObserver = new ResizeObserver(handleResize);
    if (eventHeader) {
      resizeObserver.observe(eventHeader);
    }
    if (productsHeader) {
      resizeObserver.observe(productsHeader);
    }
    if (styleHeader) {
      resizeObserver.observe(styleHeader);
    }
    return () => {
      if (eventHeader) {
        resizeObserver.unobserve(eventHeader);
      }
      if (productsHeader) {
        resizeObserver.unobserve(productsHeader);
      }
      if (styleHeader) {
        resizeObserver.unobserve(styleHeader);
      }
    };
  }, [eventHeaderHeight, productsHeaderHeight]);

  return (
    <div
      ref={scrollParentRef}
      className="rounded-none relative w-full h-full border-l border-gray-300 bg-white overflow-y-scroll overflow-x-hidden shadow-xl"
    >
      <EventSettings
        scrollRef={scrollParentRef}
        eventHeaderRef={eventHeaderRef}
        isPreviewMode={isPreviewMode}
      />
      <ProductSettings
        scrollRef={scrollParentRef}
        productsHeaderRef={productsHeaderRef}
        eventHeaderHeight={eventHeaderHeight}
        isPreviewMode={isPreviewMode}
      />
      <StyleSettings
        scrollRef={scrollParentRef}
        styleHeaderRef={styleHeaderRef}
        productsHeaderHeight={productsHeaderHeight}
        isPreviewMode={isPreviewMode}
      />
      <AdditionalSettings
        scrollRef={scrollParentRef}
        styleHeaderHeight={styleHeaderHeight}
        isPreviewMode={isPreviewMode}
      />
    </div>
  );
}
