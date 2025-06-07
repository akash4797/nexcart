"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";

interface ImagePreviewerProps {
  imageUrl: string;
  alt?: string;
  children?: React.ReactNode;
  className?: string;
}

const ImagePreviewer: React.FC<ImagePreviewerProps> = ({
  imageUrl,
  alt = "Preview Image",
  children,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      if (isOpen) {
        document.body.style.overflow = "auto";
      }
    };
  }, [isOpen]);

  const openPreview = () => {
    setIsOpen(true);
  };

  const closePreview = () => {
    setIsOpen(false);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      closePreview();
    }
  };

  if (!isMounted) return null;

  return (
    <>
      {/* Clickable element */}
      <div
        onClick={openPreview}
        className={className || "cursor-pointer"}
        role="button"
        aria-label={`View larger image: ${alt}`}
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            openPreview();
          }
        }}
      >
        {children || (
          <Image
            src={imageUrl}
            width={40}
            height={40}
            alt={alt}
            className="rounded-lg object-cover object-center h-10 w-10"
          />
        )}
      </div>

      {/* Preview modal */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={handleBackdropClick}
        >
          <div className="relative max-h-[90vh] max-w-[90vw]">
            <button
              onClick={closePreview}
              className="absolute -right-4 -top-4 z-10 rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
              aria-label="Close image preview"
            >
              <X className="h-5 w-5" color="black" />
            </button>
            <div className="overflow-hidden rounded-lg bg-white shadow-xl">
              <div className="relative flex items-center justify-center min-h-[300px] min-w-[300px] h-auto max-h-[80vh] max-w-[80vw]">
                <img
                  src={imageUrl}
                  alt={alt}
                  className="max-h-[80vh] max-w-[80vw] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImagePreviewer;
