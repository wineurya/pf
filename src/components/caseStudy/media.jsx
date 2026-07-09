import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "../../lib/hooks.js";
import iphoneFrame from "../../assets/case/iphone-frame-silver.png";
import iphoneStatusBar from "../../assets/case/iphone-statusbar.png";

export function MediaTile({ kind, cell = false }) {
  return (
    <div className={`cs__tile${cell ? " cs__tile--cell" : ""}`}>
      <span className="cs__tile-label">{kind}</span>
    </div>
  );
}


/* An iPhone 17 Pro Max mock holding a screen recording. The bezel and Dynamic
   Island are a real device frame PNG from the iOS 26 Figma kit, overlaid on top;
   the recording sits behind it, cropped to the screen rect. The recording carries
   its own (unpolished) iOS status bar in its top 62/960 band — the viewport pins
   the video to its BOTTOM edge and clips that band off, and the kit's status bar
   (9:41 + battery) is laid in over the freed top strip. Screen geometry (left
   5.102% / top 2.2% / width 89.796% / height 95.6%) is measured from the frame
   PNG's transparent screen hole. Video plays only while on screen; reduced motion
   falls back to poster + controls. */
/* A muted, looping screen recording that plays only while on screen; reduced
   motion falls back to poster + native controls. Shared by the phone mock and
   the inline feature cards — the caller supplies the class and any chrome. */
export function InViewVideo({ video, title, className }) {
  const reducedMotion = usePrefersReducedMotion();
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || reducedMotion) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.play?.().catch(() => {});
        else el.pause?.();
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reducedMotion]);

  return (
    <video
      ref={ref}
      className={className}
      poster={video.poster}
      muted
      loop
      playsInline
      preload="metadata"
      autoPlay={!reducedMotion}
      controls={reducedMotion}
      aria-label={`Screen recording: ${title}`}
    >
      <source src={video.webm} type="video/webm" />
      <source src={video.mp4} type="video/mp4" />
    </video>
  );
}

export function PhoneVideo({ video, title }) {
  return (
    <div className="cs__phone-stage">
      <div className="cs__phone">
        <div className="cs__phone-screen">
          <div className="cs__phone-statusbar">
            <img
              className="cs__phone-statusbar-img"
              src={iphoneStatusBar}
              alt=""
              aria-hidden="true"
            />
          </div>
          <div className="cs__phone-viewport">
            <InViewVideo
              video={video}
              title={title}
              className="cs__phone-video"
            />
          </div>
        </div>
        <img
          className="cs__phone-frame"
          src={iphoneFrame}
          alt=""
          aria-hidden="true"
          draggable="false"
        />
      </div>
    </div>
  );
}

