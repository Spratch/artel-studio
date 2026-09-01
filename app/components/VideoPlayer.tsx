"use client";

import MuxVideo from "@mux/mux-video-react";
import { Pause, Play, SoundHigh, SoundOff } from "iconoir-react";
import { useRef, useState } from "react";

declare global {
  interface HTMLVideoElement {
    mozRequestFullScreen?: () => Promise<void>;
    webkitRequestFullscreen?: () => Promise<void>;
    msRequestFullscreen?: () => Promise<void>;
    webkitEnterFullscreen?: () => void;
  }

  interface Document {
    mozCancelFullScreen?: () => Promise<void>;
    webkitExitFullscreen?: () => Promise<void>;
    msExitFullscreen?: () => Promise<void>;
  }
}

export default function VideoPlayer({
  video,
  isBg
}: {
  video: string;
  isBg?: boolean;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePlayPause = () => {
    if (isPlaying) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current?.requestFullscreen) {
      videoRef.current?.requestFullscreen();
    } else if (videoRef.current?.mozRequestFullScreen) {
      videoRef.current?.mozRequestFullScreen();
    } else if (videoRef.current?.webkitRequestFullscreen) {
      videoRef.current?.webkitRequestFullscreen();
    } else if (videoRef.current?.msRequestFullscreen) {
      videoRef.current?.msRequestFullscreen();
    } else if (videoRef.current?.webkitEnterFullscreen) {
      videoRef.current?.webkitEnterFullscreen();
    }
    setIsFullscreen(true);
  };

  const handleExitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
    setIsFullscreen(false);
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleVideoEnd = () => {
    if (videoRef.current) {
      setIsPlaying(false);
      videoRef.current.currentTime = 0;
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const progressBar = e.currentTarget as HTMLDivElement;
    const clickPosition = e.clientX - progressBar.getBoundingClientRect().left;
    const progressBarWidth = progressBar.offsetWidth;
    const seekTime = (clickPosition / progressBarWidth) * duration;

    if (videoRef.current) {
      videoRef.current.currentTime = seekTime;
    }
  };

  if (isBg) {
    return (
      <div className="size-full">
        <MuxVideo
          playbackId={video}
          className="size-full object-cover"
          ref={videoRef}
          onClick={handlePlayPause}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnd}
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={() => setIsLoaded(true)}
          minResolution="540p"
          autoPlay
          muted
          playsInline
          disableTracking
          loop
        />
      </div>
    );
  }

  return (
    <div className="flex h-full max-h-full w-full max-w-full flex-col items-center justify-center **:[path]:stroke-creme">
      <div className="group pointer-events-auto relative max-h-full w-auto max-w-full">
        {/* Play button */}
        {!isPlaying && (
          <div className="pointer-events-none absolute top-0 flex h-full w-full items-center justify-center">
            <Play
              className="transition-[scale,opacity] group-hover:scale-90 group-hover:opacity-75"
              width="32"
              height="32"
            />
          </div>
        )}

        {/* Loader */}
        {!isLoaded && (
          <div className="absolute h-full max-h-full w-full max-w-full animate-pulse bg-black/15"></div>
        )}

        {/* Video */}
        <MuxVideo
          playbackId={video}
          className="size-full"
          ref={videoRef}
          onClick={handlePlayPause}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleVideoEnd}
          onLoadedMetadata={handleLoadedMetadata}
          onCanPlay={() => setIsLoaded(true)}
          minResolution="540p"
          autoPlay
          muted
          playsInline
          disableTracking
          loop
        />

        {/* Controls */}
        <div
          className={`absolute bottom-0 grid w-full grid-cols-10 gap-6 bg-linear-to-t from-gray-950/35 via-gray-950/25 transition-opacity delay-[1.5s] duration-500 group-hover:opacity-100 group-hover:delay-0 group-hover:duration-150 ${isPlaying ? "md:opacity-0" : "opacity-100"}`}
        >
          <div className="col-span-10 col-start-1 my-3 flex items-center gap-3 px-4 text-xs text-creme xl:col-span-6 xl:col-start-3 xl:px-0">
            {/* Play/Pause & Mute/Unmute buttons */}
            <button
              onClick={handlePlayPause}
              className="outline-0 transition-opacity hover:opacity-65 focus-visible:opacity-65"
            >
              {isPlaying ? <Pause /> : <Play />}
            </button>
            <button
              onClick={handleMute}
              className="outline-0 transition-opacity hover:opacity-65 focus-visible:opacity-65"
            >
              {isMuted ? <SoundHigh /> : <SoundOff />}
            </button>

            {/* Display time in mm:ss */}
            {/*<span className="font-normal text-nowrap">
              {Math.floor(currentTime / 60).toString()}:
              {Math.floor(currentTime % 60)
                .toString()
                .padStart(2, "0")}{" "}
              / {Math.floor(duration / 60).toString()}:
              {Math.floor(duration % 60)
                .toString()
                .padStart(2, "0")}
            </span>*/}

            {/* Progress bar */}
            <div
              onClick={handleProgressBarClick}
              className="group/progress relative flex h-1.5 w-full cursor-pointer items-center"
            >
              <div
                className="absolute right-0 left-0 h-1 rounded-full bg-neutral-500/80 transition-[height] group-hover/progress:h-full"
                style={{
                  transitionProperty: "height",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  transitionDuration: "150ms"
                }}
              ></div>
              <div
                className="absolute left-0 h-1 rounded-full bg-creme transition-[height] group-hover/progress:h-full"
                style={{
                  width: `${(currentTime / duration) * 100}%`,
                  transitionProperty: "height",
                  transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
                  transitionDuration: "150ms"
                }}
              ></div>
            </div>

            {/* Fullscreen button */}
            <button
              className="group/fullscreen outline-0"
              onClick={isFullscreen ? handleExitFullscreen : handleFullscreen}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                className="stroke-creme transition-transform group-hover/fullscreen:scale-110 group-focus-visible/fullscreen:scale-110 **:[path]:fill-none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M6.5 2.5H0.5V6.5" />
                <path d="M9.5 13.5L15.5 13.5L15.5 9.5" />
                <path d="M6.5 13.5L0.5 13.5L0.5 9.5" />
                <path d="M9.5 2.5L15.5 2.5L15.5 6.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
