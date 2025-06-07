"use client";

import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import React, { useEffect, useRef, useState } from "react";

interface ResponsiveHoverCardProps {
  triggerContent: React.ReactNode;
  contentText: string;
  contentClassName?: string;
  triggerClassName?: string;
}

const ResponsiveHoverCard: React.FC<ResponsiveHoverCardProps> = ({
  triggerContent,
  contentText,
  contentClassName = "",
  triggerClassName = "cursor-pointer",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  // Handle clicks outside to close the card on mobile
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        isMobile
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobile]);

  const handleClick = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div ref={ref}>
      {isMobile ? (
        <div className="relative">
          <div className={triggerClassName} onClick={handleClick}>
            {triggerContent}
          </div>
          {isOpen && (
            <div
              className={`absolute z-50 bg-popover text-popover-foreground rounded-md border p-4 shadow-md w-64 ${contentClassName}`}
            >
              {contentText}
            </div>
          )}
        </div>
      ) : (
        <HoverCard open={isMobile ? isOpen : undefined}>
          <HoverCardTrigger className={triggerClassName}>
            {triggerContent}
          </HoverCardTrigger>
          <HoverCardContent align="start" className={contentClassName}>
            {contentText}
          </HoverCardContent>
        </HoverCard>
      )}
    </div>
  );
};

export default ResponsiveHoverCard;
