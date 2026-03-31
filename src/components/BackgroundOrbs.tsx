"use client";

export default function BackgroundOrbs() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <div
        className="orb orb-purple"
        style={{
          width: 600,
          height: 600,
          top: "-200px",
          left: "-100px",
          opacity: 0.5,
        }}
      />
      <div
        className="orb orb-pink"
        style={{
          width: 500,
          height: 500,
          top: "30%",
          right: "-150px",
          opacity: 0.4,
          animationDelay: "1.5s",
        }}
      />
      <div
        className="orb orb-cyan"
        style={{
          width: 400,
          height: 400,
          bottom: "-100px",
          left: "30%",
          opacity: 0.3,
          animationDelay: "3s",
        }}
      />
      {/* Grid overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(139, 92, 246, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />
    </div>
  );
}
