// Embeddable Widget Component
import React, { useEffect, useState } from "react";
import "animate.css";
import Image from "next/image";
import { BadgeCheck, Boxes } from "lucide-react";
import { Tables } from "@/supabase/types";
import { IColor } from "react-color-palette";
import { hexToRgba } from "@/lib/actions";
import { EventData } from "@/lib/types";

interface WidgetConfig {
  siteUrl: string;
  projectId: string;
}

/**
 * Embed workflow:
 *
 * 1. Fetch project
 * 2. Fetch events and products associated with a project
 * 3. Fetch integrations associated with events (do so within a backend api call.)
 * 4. Fetch data from integrations
 * 5. Create a queue of events to be shown based on integration data.
 * 6. Display events
 */
const WidgetComponent = ({ siteUrl, projectId }: WidgetConfig) => {
  const [projectData, setProjectData] = useState<Tables<"Projects">>();
  const [eventData, setEventData] = useState<EventData>();
  const [productData, setProductData] = useState<Tables<"Products">[]>([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(
          `${siteUrl}/api/v1/projects?project_id=${projectId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error getting Taplo project: ${response.status}`);
        }

        const result: Tables<"Projects"> = (await response.json())?.data;
        setProjectData(result);
      } catch (error: any) {
        throw new Error("Error getting Taplo project: " + error.message);
      }
    };

    fetchProject();
  }, [projectId, siteUrl]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${siteUrl}/api/v1/events?project_id=${projectId}${
            projectData?.event_interval
              ? `&event_interval=${projectData.event_interval}`
              : ""
          }`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error getting Taplo events: ${response.status}`);
        }

        const result: EventData = await response.json();
        setEventData({
          events: result?.events,
          displayData: result?.displayData,
        });
      } catch (error: any) {
        throw new Error("Error getting Taplo events: " + error.message);
      }
    };

    fetchEvents();
  }, [projectData, projectId, siteUrl]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${siteUrl}/api/v1/products?project_id=${projectId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error getting Taplo products: ${response.status}`);
        }

        const result: Tables<"Products">[] = (await response.json())?.data;
        setProductData(result);
      } catch (error: any) {
        throw new Error("Error getting Taplo products: " + error.message);
      }
    };

    fetchProducts();
  }, [projectId, siteUrl]);

  if (!projectData) return null;

  // previewEvent: Tables<"Events"> | undefined;
  // animation?: string;
  // contentBody: string;
  // shouldDisplayImage: () => boolean;
  // activeProduct: Tables<"Products">;
  // backgroundColor: IColor;
  // textColor: IColor;
  // accentColor: IColor;
  // borderColor: IColor;
  // ${siteUrl}/api/v1/widget?project_id=${projectId}

  return (
    <section className="fixed bottom-4 left-4">
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderColor: "#FFFFFF",
        }}
        className={`relative flex flex-row w-fit h-fit min-h-[100px] max-w-[380px] min-w-[330px] md:min-w-[380px] rounded-lg border shadow-lg`}
      >
        <div className="flex items-center justify-center h-full w-full max-w-[110px]">
          <div
            className="flex h-full w-full items-center justify-center aspect-square rounded-l-lg outline-1 outline"
            style={{
              backgroundColor: hexToRgba("#7A81EB", 0.2),
              outlineColor: hexToRgba("#7A81EB", 0.2),
            }}
          >
            <Boxes color={hexToRgba("#7A81EB", 0.85)} height={28} width={28} />
          </div>
        </div>
        <div className="flex w-full items-center pr-3 pl-5">
          <div className="flex flex-col w-full lg:gap-[6px]">
            <div
              style={{
                color: "#172554",
              }}
              className="text-[14.5px] leading-5"
              dangerouslySetInnerHTML={{
                __html: "Test",
              }}
            ></div>
            <div
              className="text-[13px] flex items-center gap-4"
              style={{
                color: hexToRgba("#172554", 0.65),
              }}
            >
              12 min ago
              <div
                className="absolute bottom-[2px] right-1 flex items-center gap-[3px] text-[10.5px]"
                style={{
                  color: hexToRgba("#172554", 0.65),
                }}
              >
                Verified by Taplo
                <BadgeCheck
                  width={18}
                  height={18}
                  fill={"#7A81EB"}
                  color={"#FFFFFF"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WidgetComponent;
