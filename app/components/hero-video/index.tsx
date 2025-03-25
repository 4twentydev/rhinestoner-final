"use client";

import React from "react";

export default function HeroVideo() {
  return (
    <>
      <div className="absolute inset-0 bg-muted/20 dark:bg-muted/20">
        {/* Video placeholder that will be replaced when video loads */}
        <div className="h-full w-full animate-pulse bg-muted/50" />
      </div>
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-0 transition-opacity duration-500"
        onLoadedData={(e) => {
          e.currentTarget.classList.remove("opacity-0");
          e.currentTarget.classList.add("opacity-100");
        }}
      >
        <source src="/videos/hero-background.mp4" type="video/mp4" />
      </video>
    </>
  );
}
