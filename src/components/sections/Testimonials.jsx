import { useEffect, useRef, useState } from 'react';
import { ExternalLink, FileCheck2, X } from 'lucide-react';
import { TESTIMONIAL_ASSETS } from '../../data/testimonials';
import AnimatedText from '../animations/AnimatedText';
import { Reveal } from '../animations/Reveal';
import EdgeHoneycombCluster from '../decorations/EdgeHoneycombCluster';
import OrganicSectionDecoration from '../decorations/OrganicSectionDecoration';

function TestimonialCard({ asset, index, onPreview }) {
  const documentUrl = encodeURI(asset.src);
  const previewAspect = asset.orientation === 'landscape' ? 'aspect-[4/3]' : 'aspect-[3/4]';

  return (
    <Reveal direction="up" distance={30} duration={500} delay={index * 60} as="article">
      <div className="group relative h-full overflow-hidden rounded-2xl border border-[#1F4732]/10 bg-white/80 p-2 shadow-[0_8px_24px_rgba(31,71,50,0.07)] backdrop-blur-md transition-all duration-500 hover:-translate-y-1.5 hover:border-[#6BA539]/40 hover:shadow-[0_18px_40px_rgba(31,71,50,0.13)]">
        <div className="absolute left-0 top-0 h-[3px] w-0 bg-gradient-to-r from-[#1F4732] via-[#3D7A4A] to-[#6BA539] transition-all duration-500 group-hover:w-full" />

        <button
          type="button"
          onClick={(event) => onPreview(asset, event.currentTarget)}
          aria-label={`Preview ${asset.title} document`}
          className="group/preview relative block w-full overflow-hidden rounded-xl bg-white text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DD8F2A] focus-visible:ring-offset-2"
        >
          <div className={`relative overflow-hidden bg-white ${previewAspect}`}>
            <object
              data={`${documentUrl}#view=FitH`}
              type="application/pdf"
              aria-label={`${asset.title} document preview`}
              className="pointer-events-none block h-full w-full object-contain"
            >
              <span className="flex h-full items-center justify-center p-6 text-center font-['Barlow',sans-serif] text-sm text-[#1F4732]">
                Open {asset.title}
              </span>
            </object>

            <span className="pointer-events-none absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-2 bg-[#1F4732]/90 px-3 py-2 font-['Barlow',sans-serif] text-[0.62rem] font-semibold uppercase tracking-[0.12em] text-white transition-transform duration-300 group-hover/preview:translate-y-0">
              View full document
              <ExternalLink size={13} strokeWidth={2} aria-hidden="true" />
            </span>
          </div>
        </button>

        <div className="flex items-start justify-between gap-3 px-2 pb-2 pt-3 sm:px-3 sm:pb-3 sm:pt-4">
          <div className="min-w-0">
            <h3 className="font-['Lora',serif] text-[1rem] font-semibold leading-snug text-[#1F4732] sm:text-[1.08rem]">
              {asset.title}
            </h3>
            <p className="mt-1 break-words font-['Barlow',sans-serif] text-[0.68rem] leading-relaxed text-[#666666]">
              {asset.src.split('/').pop()}
            </p>
            <a
              href={documentUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 font-['Barlow',sans-serif] text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-[#6BA539] transition-colors duration-300 hover:text-[#1F4732] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DD8F2A] focus-visible:ring-offset-2"
            >
              Open original
              <ExternalLink size={12} strokeWidth={2} aria-hidden="true" />
            </a>
          </div>
          <FileCheck2 className="mt-0.5 shrink-0 text-[#6BA539]" size={19} strokeWidth={1.7} aria-hidden="true" />
        </div>
      </div>
    </Reveal>
  );
}

function TestimonialLightbox({ asset, closeButtonRef, onClose }) {
  const documentUrl = encodeURI(asset.src);

  const handleDialogKeyDown = (event) => {
    if (event.key !== 'Tab') return;

    const focusableElements = event.currentTarget.querySelectorAll('button:not([disabled]), a[href]');
    if (!focusableElements.length) return;

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      firstElement.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[300] flex items-center justify-center bg-[#07140c]/90 p-3 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="testimonial-preview-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={handleDialogKeyDown}
    >
      <div className="relative flex max-h-[calc(100vh-1.5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-[#DD8F2A]/25 bg-[#102d20] shadow-[0_25px_90px_rgba(0,0,0,0.45)] sm:max-h-[calc(100vh-3rem)]">
        <div className="flex shrink-0 items-center justify-between gap-4 border-b border-white/10 bg-[#173d29] px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <p className="font-['Barlow',sans-serif] text-[0.58rem] font-semibold uppercase tracking-[0.18em] text-[#a8d68f]">
              Testimonial document
            </p>
            <h2 id="testimonial-preview-title" className="mt-1 truncate font-['Lora',serif] text-[1rem] font-semibold text-white sm:text-[1.2rem]">
              {asset.title}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close testimonial preview"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/20 text-white transition-colors duration-300 hover:border-[#DD8F2A] hover:bg-[#DD8F2A] hover:text-[#12301F] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DD8F2A]"
          >
            <X size={18} strokeWidth={2} aria-hidden="true" />
          </button>
        </div>

        <div data-lenis-prevent className="min-h-0 flex-1 overflow-auto bg-[#f5f5f0] p-2 sm:p-4">
          <object
            data={`${documentUrl}#view=FitH`}
            type="application/pdf"
            aria-label={`${asset.title} document preview`}
            className="mx-auto block h-[68vh] min-h-[240px] w-full max-w-5xl object-contain"
          >
            <span className="flex h-full items-center justify-center p-6 text-center font-['Barlow',sans-serif] text-sm text-[#1F4732]">
              This document could not be previewed here. Use the original document link below.
            </span>
          </object>
        </div>

        <div className="flex shrink-0 flex-col gap-2 border-t border-white/10 bg-[#173d29] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p className="break-words font-['Barlow',sans-serif] text-[0.68rem] leading-relaxed text-white/60">
            {asset.src.split('/').pop()}
          </p>
          <a
            href={documentUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-[2px] bg-[#DD8F2A] px-3 py-2 font-['Barlow',sans-serif] text-[0.62rem] font-semibold uppercase tracking-[0.1em] text-[#12301F] transition-colors duration-300 hover:bg-[#f0a746] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DD8F2A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#173d29]"
          >
            Open original
            <ExternalLink size={13} strokeWidth={2} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const [selectedAsset, setSelectedAsset] = useState(null);
  const closeButtonRef = useRef(null);
  const previewTriggerRef = useRef(null);

  useEffect(() => {
    if (!selectedAsset) return undefined;

    const originalBodyOverflow = document.body.style.overflow;
    const originalDocumentOverflow = document.documentElement.style.overflow;
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setSelectedAsset(null);
        window.requestAnimationFrame(() => previewTriggerRef.current?.focus());
      }
    };

    document.addEventListener('keydown', handleEscape);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalDocumentOverflow;
      document.removeEventListener('keydown', handleEscape);
    };
  }, [selectedAsset]);

  const openPreview = (asset, trigger) => {
    previewTriggerRef.current = trigger;
    setSelectedAsset(asset);
  };

  const closePreview = () => {
    setSelectedAsset(null);
    window.requestAnimationFrame(() => previewTriggerRef.current?.focus());
  };

  return (
    <>
      <section
        id="testimonials"
        aria-labelledby="testimonials-title"
        className="relative w-full overflow-hidden bg-[linear-gradient(135deg,#f8fcf4_0%,#edf6e7_28%,#dfedd6_58%,#cfe3c4_100%)] py-[60px] sm:py-[80px] lg:py-[100px]"
      >
        <EdgeHoneycombCluster side="left" position="top" color="#A9711F" fillColor="#E8B33D" opacity={0.48} />
        <OrganicSectionDecoration />

        <div className="relative z-10 w-full px-4 sm:px-6 md:px-8 lg:px-10">
          <div className="mx-auto max-w-7xl">
            <div className="mb-10 text-center sm:mb-12 lg:mb-14">
              <div className="mb-2.5 flex items-center justify-center gap-3">
                <span className="h-px w-7 bg-[#DD8F2A]/60 sm:w-10" />
                <span className="font-['Barlow',sans-serif] text-[0.63rem] font-semibold uppercase tracking-[0.18em] text-[#A9711F] sm:text-[0.7rem]">
                  Testimonials
                </span>
                <span className="h-px w-7 bg-[#DD8F2A]/60 sm:w-10" />
              </div>

              <h1
                id="testimonials-title"
                className="font-['Lora',serif] text-[2rem] font-bold text-[#1F4732] sm:text-[2.5rem] lg:text-[3rem]"
              >
                <AnimatedText text="Credentials behind every partnership." />
              </h1>
              <p className="mx-auto mt-4 max-w-2xl font-['Barlow',sans-serif] text-[0.9rem] leading-relaxed text-[#666666] sm:text-[1rem]">
                Explore the certificates and memberships that support Polygon Resource&apos;s work across global agricultural trade.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
              {TESTIMONIAL_ASSETS.map((asset, index) => (
                <TestimonialCard
                  key={asset.src}
                  asset={asset}
                  index={index}
                  onPreview={openPreview}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {selectedAsset && (
        <TestimonialLightbox
          asset={selectedAsset}
          closeButtonRef={closeButtonRef}
          onClose={closePreview}
        />
      )}
    </>
  );
}
