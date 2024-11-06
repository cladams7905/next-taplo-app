"use client";

import React, { useEffect, useState } from "react";
import {
  Users,
  UserPlus,
  TrendingUp,
  ArrowRight,
  BadgeCheck,
  LucideBarChart3,
  X,
  Minimize2,
  Maximize2,
} from "lucide-react";
import Image from "next/image";

// Mock data for new subscribers
const subscriberData = [
  {
    name: "Alice Johnson",
    location: "New York, USA",
    product: "Premium Plan",
    timeAgo: "2 hours ago",
  },
  {
    name: "Bob Smith",
    location: "London, UK",
    product: "Basic Plan",
    timeAgo: "5 hours ago",
  },
  {
    name: "Charlie Brown",
    location: "Sydney, Australia",
    product: "Pro Plan",
    timeAgo: "1 day ago",
  },
  {
    name: "Diana Ross",
    location: "Paris, France",
    product: "Premium Plan",
    timeAgo: "2 days ago",
  },
  {
    name: "Ethan Hunt",
    location: "Tokyo, Japan",
    product: "Basic Plan",
    timeAgo: "3 days ago",
  },
];

// Mock data for trending product
const trendingProduct = {
  name: "Ultra-Slim Laptop Pro",
  price: 1299.99,
  sales: 1234,
  image: "/placeholder.svg",
};

export default function SiteStatsWidget() {
  const currentVisitors = 342;
  const newSignups = 28;

  const [isExpanded, setIsExpanded] = useState(true);
  const [isTabStyle, setIsTabStyle] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("#site-stats-widget")) {
        setIsExpanded(false);
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  const containerStyle: React.CSSProperties = {
    transform: isExpanded ? "translate(-50%, 50%)" : "translate(0, 0)",
    transition: `
      bottom .6s cubic-bezier(0.25, 0.8, 0.25, 1),
      left .6s cubic-bezier(0.25, 0.8, 0.25, 1),
      transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1),
      width .6s cubic-bezier(0.25, 0.8, 0.25, 1),
      height .6s cubic-bezier(0.25, 0.8, 0.25, 1),
      opacity 0.3s
    `,
  };

  return (
    <div
      id="site-stats-widget"
      style={containerStyle}
      className={`fixed z-50 ${
        isExpanded
          ? "bg-white/80 bottom-1/2 left-1/2 md:w-[700px] w-full h-[500px] rounded-lg shadow-xl backdrop-blur-lg"
          : isTabStyle
          ? "bg-white bottom-0 left-4 w-fit h-8 rounded-t-lg border border-gray-200"
          : "bottom-6 md:left-10 left-6"
      }`}
    >
      <div className="absolute top-2 right-6 z-10 h-[30px] flex ">
        <button
          className="h-[30px] flex items-center justify-center opacity-50 hover:opacity-70 active:opacity-100"
          onClick={() => setIsExpanded(false)}
        >
          {isExpanded ? (
            <Minimize2 size={16} />
          ) : isTabStyle ? (
            <Maximize2 size={16} />
          ) : (
            ""
          )}
        </button>
      </div>
      {!isExpanded &&
        (isTabStyle ? (
          <button
            className="ml-4 font-sans flex items-center justify-center text-gray-500"
            onClick={() => setIsExpanded(true)}
          >
            Live site data
          </button>
        ) : (
          <button
            className="w-14 h-14 flex items-center justify-center rounded-full btn bg-white/80 backdrop-blur-lg shadow-xl"
            onClick={() => setIsExpanded(true)}
          >
            <LucideBarChart3 size={20} />
          </button>
        ))}
      {isExpanded && (
        <div className="relative w-full h-full p-4 overflow-y-auto space-y-4 pt-10 border border-gray-200 rounded-lg">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="card bg-base-100 rounded-lg border border-gray-200 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-sm font-medium flex justify-between">
                  Current Visitors
                  <Users className="h-4 w-4 text-base-content opacity-60" />
                </h2>
                <p className="text-2xl font-bold">{currentVisitors}</p>
                <p className="text-xs text-base-content opacity-60">
                  users online now
                </p>
              </div>
            </div>
            <div className="card bg-base-100 rounded-lg border border-gray-200 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-sm font-medium flex justify-between">
                  New Signups
                  <UserPlus className="h-4 w-4 text-base-content opacity-60" />
                </h2>
                <p className="text-2xl font-bold">{newSignups}</p>
                <p className="text-xs text-base-content opacity-60">
                  in the last 24 hours
                </p>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 rounded-lg border border-gray-200 shadow-sm">
            <div className="card-body">
              <h2 className="card-title text-sm font-medium flex justify-between">
                Trending Product
                <TrendingUp className="h-4 w-4 text-base-content opacity-60" />
              </h2>
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src={trendingProduct.image}
                    alt={trendingProduct.name}
                    width={64}
                    height={64}
                    className="rounded-lg"
                  />
                </div>
                <div>
                  <p className="font-medium">{trendingProduct.name}</p>
                  <p className="text-xl font-bold">
                    ${trendingProduct.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-base-content opacity-60">
                    {trendingProduct.sales} sales
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 rounded-lg border border-gray-200 shadow-sm">
            <div className="card-body">
              <h2 className="card-title">New Subscriber History</h2>
              <p className="text-base-content opacity-60">
                Recent subscribers and their purchases
              </p>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Location</th>
                      <th>Product</th>
                      <th>Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {subscriberData.map((subscriber, index) => (
                      <tr key={index}>
                        <td>{subscriber.name}</td>
                        <td>{subscriber.location}</td>
                        <td>{subscriber.product}</td>
                        <td>{subscriber.timeAgo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="sticky text-xs flex items-center gap-1">
            This data is verified by Taplo <BadgeCheck width={18} height={18} />
          </div>
          <div className="sticky flex w-full items-end justify-end bottom-0 right-4">
            <div className="btn btn-primary text-white shadow-md">
              Get started <ArrowRight />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
