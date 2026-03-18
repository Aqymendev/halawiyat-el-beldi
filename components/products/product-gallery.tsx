"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type ProductGalleryLabels = {
  thumbnails: string;
  enlarge: string;
  previous: string;
  next: string;
  close: string;
  hoverToZoom: string;
};

export function ProductGallery({
  images,
  productName,
  labels
}: {
  images: string[];
  productName: string;
  labels: ProductGalleryLabels;
}) {
  const galleryImages = useMemo(() => (images.length ? images : []), [images]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);
  const [zoomActive, setZoomActive] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  const selectedImage = galleryImages[selectedIndex] ?? galleryImages[0];

  function goToPrevious() {
    setSelectedIndex((current) => (current === 0 ? galleryImages.length - 1 : current - 1));
  }

  function goToNext() {
    setSelectedIndex((current) => (current === galleryImages.length - 1 ? 0 : current + 1));
  }

  function handleMove(event: React.MouseEvent<HTMLDivElement>) {
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width) * 100;
    const y = ((event.clientY - bounds.top) / bounds.height) * 100;
    setZoomPosition({ x, y });
  }

  if (!selectedImage) {
    return null;
  }

  return (
    <>
      <div className="grid gap-4 lg:grid-cols-[120px_1fr]">
        <div className="order-2 lg:order-1">
          <p className="mb-3 text-xs uppercase tracking-[0.22em] text-brand-gold/70">{labels.thumbnails}</p>
          <div className="grid grid-cols-4 gap-3 lg:grid-cols-1">
            {galleryImages.map((image, index) => (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={cn(
                  "panel premium-border relative aspect-square overflow-hidden rounded-[1.5rem] border-2 transition",
                  selectedIndex === index ? "border-brand-gold/70" : "border-transparent hover:border-brand-gold/35"
                )}
                aria-label={`${productName} thumbnail ${index + 1}`}
              >
                <Image
                  src={image}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="160px"
                />
              </button>
            ))}
          </div>
        </div>

        <div className="order-1 lg:order-2 space-y-4">
          <div
            className="panel premium-border group relative aspect-[4/4.5] overflow-hidden"
            onMouseMove={handleMove}
            onMouseEnter={() => setZoomActive(true)}
            onMouseLeave={() => setZoomActive(false)}
          >
            <Image
              key={selectedImage}
              src={selectedImage}
              alt={productName}
              fill
              className={cn("object-cover transition duration-300", zoomActive && "scale-[1.02]")}
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />

            <div
              className={cn(
                "pointer-events-none absolute inset-0 hidden transition-opacity duration-200 lg:block",
                zoomActive ? "opacity-100" : "opacity-0"
              )}
              style={{
                backgroundImage: `url(${selectedImage})`,
                backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "220%"
              }}
            />

            <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3">
              <div className="rounded-full border border-brand-gold/20 bg-brand-black/65 px-4 py-2 text-xs uppercase tracking-[0.22em] text-brand-cream/80 backdrop-blur">
                {labels.hoverToZoom}
              </div>
              <button
                type="button"
                onClick={() => setZoomOpen(true)}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-brand-gold/25 bg-brand-black/65 px-4 text-sm font-medium text-brand-cream transition hover:border-brand-gold/55 hover:bg-brand-black"
              >
                <ZoomIn className="h-4 w-4" />
                {labels.enlarge}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {zoomOpen ? (
          <motion.div
            className="fixed inset-0 z-[70] bg-brand-black/92 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="mx-auto flex h-full max-w-7xl flex-col">
              <div className="flex items-center justify-between py-3">
                <p className="text-sm uppercase tracking-[0.22em] text-brand-gold/75">{productName}</p>
                <button
                  type="button"
                  onClick={() => setZoomOpen(false)}
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-brand-gold/25 px-4 text-sm text-brand-cream hover:border-brand-gold/55"
                >
                  <X className="h-4 w-4" />
                  {labels.close}
                </button>
              </div>

              <div className="grid min-h-0 flex-1 gap-4 lg:grid-cols-[120px_1fr]">
                <div className="hidden overflow-y-auto lg:block">
                  <div className="grid gap-3">
                    {galleryImages.map((image, index) => (
                      <button
                        key={`modal-${image}-${index}`}
                        type="button"
                        onClick={() => setSelectedIndex(index)}
                        className={cn(
                          "relative aspect-square overflow-hidden rounded-[1.25rem] border-2",
                          selectedIndex === index ? "border-brand-gold" : "border-brand-gold/15"
                        )}
                      >
                        <Image src={image} alt={`${productName} - صورة ${index + 1}`} fill className="object-cover" sizes="140px" />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="relative min-h-[60vh] overflow-hidden rounded-[2rem] border border-brand-gold/20 bg-brand-black">
                  <Image
                    key={`zoom-${selectedImage}`}
                    src={selectedImage}
                    alt={productName}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />

                  {galleryImages.length > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={goToPrevious}
                        className="absolute left-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-brand-gold/25 bg-brand-black/70 text-brand-cream hover:border-brand-gold/55"
                        aria-label={labels.previous}
                      >
                        <ChevronLeft className="h-5 w-5" />
                      </button>
                      <button
                        type="button"
                        onClick={goToNext}
                        className="absolute right-4 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-brand-gold/25 bg-brand-black/70 text-brand-cream hover:border-brand-gold/55"
                        aria-label={labels.next}
                      >
                        <ChevronRight className="h-5 w-5" />
                      </button>
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
