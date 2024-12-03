"use client";

import { Tables } from "@/lib/supabase/types";
import Sidebar from "./Sidebar";
import { useCallback, useEffect, useRef, useState } from "react";
import { useColor } from "react-color-palette";
import ViewContainer from "./popupView/ViewContainer";
import { sortByTimeCreated } from "@/lib/actions";
import { User } from "@supabase/supabase-js";
import { ProjectContext } from "@/app/dashboard/_components/ProjectContext";
import Link from "next/link";
import NewUserModal from "./NewUserModal";

export default function ProjectBoard({
  user,
  fetchedActiveProject,
  fetchedIntegrations,
  fetchedEvents,
  fetchedProducts,
}: {
  user: User;
  fetchedActiveProject: Tables<"Projects">;
  fetchedIntegrations: Tables<"Integrations">[] | null;
  fetchedEvents: Tables<"Events">[] | null;
  fetchedProducts: Tables<"Products">[] | null;
}) {
  /**
   * Active Project: the project which is currently being displayed from
   * the project dropdown menu.
   */
  const [activeProject, setActiveProject] = useState<Tables<"Projects">>(
    fetchedActiveProject || {}
  );

  /**
   * Events: the state value that stores all the events associated with a project.
   */
  const [events, setEvents] = useState<Tables<"Events">[]>(
    sortByTimeCreated(fetchedEvents || [])
  );

  /**
   * Active event: the current event that is displayed in the popup view window.
   */
  const [activeEvent, setActiveEvent] = useState<Tables<"Events"> | undefined>(
    events[0] || undefined
  );

  /**
   * Integrations: the state value that stores all integrations associated with
   * a project.
   */
  const [integrations, setIntegrations] = useState<Tables<"Integrations">[]>(
    fetchedIntegrations || []
  );

  /**
   * Products: all products associated with a project.
   */
  const [products, setProducts] = useState<Tables<"Products">[]>(
    fetchedProducts || []
  );

  /**
   * Active product: the current product that is displayed in the popup view window.
   */
  const [activeProduct, setActiveProduct] = useState<
    Tables<"Products"> | undefined
  >(products[0] || undefined);

  /**
   * Display time: the time allotted for each popup to display to a user.
   */
  const [displayTime, setDisplayTime] = useState<number>(
    fetchedActiveProject.display_time ? fetchedActiveProject.display_time : 5000
  );

  /**
   * isPreviewMode: handles toggling the state between the popup preview window.
   */
  const [isPreviewMode, setPreviewMode] = useState(false);

  /**
   * Popup styling state variables
   */
  const [backgroundColor, setBackgroundColor] = useColor(
    activeProject?.bg_color ? activeProject.bg_color : "#FFFFFF"
  );
  const [textColor, setTextColor] = useColor(
    activeProject?.text_color ? activeProject.text_color : "#172554"
  );
  const [accentColor, setAccentColor] = useColor(
    activeProject?.accent_color ? activeProject.accent_color : "#7A81EB"
  );
  const [borderColor, setBorderColor] = useColor(
    activeProject?.border_color ? activeProject.border_color : "#FFFFFF"
  );

  /**
   * When the active event changes, this callback/useEffect makes sure that
   * anything changed in the active event is set within the corresponding event in
   * the events array.
   */
  const updateEvents = useCallback(
    (newEvent: Tables<"Events">) => {
      setEvents((prevEvents) =>
        prevEvents.map((prev) =>
          prev.id === newEvent.id ? { ...prev, ...newEvent } : prev
        )
      );
    },
    [setEvents]
  );

  /**
   * When the active product changes, this callback/useEffect makes sure that
   * anything changed in the active product is set within the corresponding product in
   * the products array.
   */
  const updateProducts = useCallback(
    (newProduct: Tables<"Products">) => {
      setProducts((prevProducts) =>
        prevProducts.map((prev) =>
          prev.id === newProduct.id ? { ...prev, ...newProduct } : prev
        )
      );
    },
    [setProducts]
  );

  useEffect(() => {
    if (activeEvent) {
      updateEvents(activeEvent);
    }
  }, [activeEvent, updateEvents]);

  useEffect(() => {
    if (activeProduct) {
      updateProducts(activeProduct);
    }
  }, [activeProduct, updateProducts]);

  const contextValue = {
    activeProject,
    setActiveProject,
    activeEvent,
    setActiveEvent,
    events,
    setEvents,
    integrations,
    setIntegrations,
    products,
    setProducts,
    activeProduct,
    setActiveProduct,
    displayTime,
    setDisplayTime,
    backgroundColor,
    setBackgroundColor,
    textColor,
    setTextColor,
    accentColor,
    setAccentColor,
    borderColor,
    setBorderColor,
  };

  const newUserGuideRef = useRef<HTMLDialogElement>(null);
  const hasViewedNewUserGuide = user.user_metadata?.hasViewedNewUserGuide;

  useEffect(() => {
    if (user && !hasViewedNewUserGuide) {
      newUserGuideRef.current?.showModal();
    }
  }, [user, hasViewedNewUserGuide]);

  if (!fetchedActiveProject || !fetchedEvents || !fetchedProducts) {
    return (
      <div>
        Error fetching data. Please get in touch about this error (
        <Link
          href={`mailto:help@taplo.io?subject=Error%20fetching%20data`}
          target="_blank"
          className="link link-primary"
        >
          help@taplo.io
        </Link>
        ).
      </div>
    );
  }

  return (
    <ProjectContext.Provider value={contextValue}>
      <main>
        <div className="flex md:flex-row flex-col w-full h-screen-minus-navbar">
          <div className="lg:w-[60%] w-full">
            <ViewContainer
              isPreviewMode={isPreviewMode}
              setPreviewMode={setPreviewMode}
            />
          </div>
          <div className="relative lg:w-[40%] w-full">
            <Sidebar isPreviewMode={isPreviewMode} />
          </div>
        </div>
        <NewUserModal
          user={user}
          userGuideRef={newUserGuideRef}
          hasViewedNewUserGuide={hasViewedNewUserGuide}
        />
      </main>
    </ProjectContext.Provider>
  );
}
