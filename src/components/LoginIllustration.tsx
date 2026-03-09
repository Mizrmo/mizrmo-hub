import React from "react";

export const LoginIllustration = ({ className = "" }: { className?: string }) => {
  return (
    <svg
      viewBox="0 0 600 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Background Frame */}
      <rect x="50" y="50" width="500" height="350" stroke="#3b82f6" strokeWidth="2" fill="transparent" />

      {/* Buildings Left */}
      <path
        d="M 120 350 L 120 140 C 120 135 125 130 130 130 L 140 130 L 140 120 C 140 115 145 110 150 110 L 170 110 C 175 110 180 115 180 120 L 180 130 L 190 130 C 195 130 200 135 200 140 L 200 350 Z"
        fill="#e2e8f0"
      />
      
      {/* Windows Left Building */}
      {[...Array(5)].map((_, r) =>
        [...Array(2)].map((_, c) => (
          <rect key={`w1-${r}-${c}`} x={140 + c * 25} y={160 + r * 30} width="12" height="15" fill="#cbd5e1" rx="2" />
        ))
      )}

      {/* Building Right */}
      <path
        d="M 360 350 L 360 220 C 360 215 365 210 370 210 L 375 210 L 375 195 C 375 190 380 185 385 185 L 400 185 C 405 185 410 190 410 195 L 410 210 L 460 210 C 465 210 470 215 470 220 L 470 350 Z"
        fill="#e2e8f0"
      />
      {/* Windows Right Building */}
      {[...Array(2)].map((_, r) =>
        [...Array(3)].map((_, c) => (
          <rect key={`w2-${r}-${c}`} x={380 + c * 25} y={240 + r * 30} width="15" height="15" fill="#cbd5e1" rx="2" />
        ))
      )}

      {/* Swirly Line and Circle */}
      <circle cx="430" cy="120" r="18" fill="#e2e8f0" />
      <path d="M 60 170 Q 150 50 250 180 T 480 110" stroke="#f1f5f9" strokeWidth="1.5" fill="transparent" />

      {/* Big Plant Right */}
      <path d="M 450 350 C 450 350 490 200 550 200 C 580 200 570 280 500 350 Z" fill="#22c55e" />
      <path d="M 480 350 C 480 350 490 270 540 240 C 550 240 560 260 500 350 Z" fill="#16a34a" />

      {/* Small Plant Left */}
      <circle cx="75" cy="275" r="4" fill="#22c55e" />
      <circle cx="85" cy="285" r="5" fill="#22c55e" />
      <circle cx="70" cy="300" r="5" fill="#22c55e" />
      <circle cx="85" cy="315" r="6" fill="#22c55e" />
      <path d="M 80 340 L 80 280" stroke="#16a34a" strokeWidth="2" />
      <ellipse cx="80" cy="345" rx="15" ry="3" fill="#ffffff" />
      <ellipse cx="430" cy="350" rx="8" ry="2" fill="#4ade80" />
      <ellipse cx="480" cy="355" rx="6" ry="2" fill="#22c55e" />

      {/* Silhouette Car */}
      <path d="M 210 330 C 210 330 250 280 300 280 C 350 280 400 320 420 330 L 420 380 L 210 380 Z" fill="#1e293b" />
      {/* Car Wheels */}
      <circle cx="260" cy="380" r="22" fill="#0f172a" />
      <circle cx="260" cy="380" r="8" fill="#e2e8f0" />
      <circle cx="390" cy="380" r="22" fill="#0f172a" />
      <circle cx="390" cy="380" r="8" fill="#e2e8f0" />
      {/* Car Window Slice */}
      <path d="M 250 330 C 250 330 280 290 310 290 L 330 290 L 360 330 Z" fill="#0f172a" />
      <path d="M 255 330 L 285 295 L 305 295 L 305 330 Z" fill="#f8fafc" />
      {/* Small highlights */}
      <rect x="300" y="340" width="10" height="3" fill="#f8fafc" rx="1" />
      <rect x="360" y="340" width="10" height="3" fill="#f8fafc" rx="1" />

      {/* Two People Shaking Hands */}
      {/* Person 1 (Left) */}
      <path d="M 270 380 L 270 320 L 285 300 L 295 315 L 285 380 Z" fill="#0284c7" /> {/* Legs */}
      <path d="M 270 320 C 270 290 290 280 300 290 C 310 300 310 320 310 320 Z" fill="#fef08a" /> {/* Torso */}
      <circle cx="285" cy="275" r="8" fill="#fcd34d" /> {/* Head */}
      <path d="M 283 268 Q 290 265 293 275" stroke="#1e293b" strokeWidth="3" fill="none" /> {/* Hair */}
      <path d="M 295 295 L 320 310 L 315 315 L 290 300 Z" fill="#fcd34d" /> {/* Arm 1 */}

      {/* Person 2 (Right) */}
      <path d="M 335 380 L 330 320 L 315 300 L 305 315 L 315 380 Z" fill="#0369a1" /> {/* Legs */}
      <path d="M 335 320 C 335 290 310 280 300 290 C 290 300 290 320 290 320 Z" fill="#fffbeb" /> {/* Torso */}
      <circle cx="315" cy="275" r="8" fill="#fcd34d" /> {/* Head */}
      <path d="M 315 268 Q 308 265 305 275" stroke="#1e293b" strokeWidth="3" fill="none" /> {/* Hair & Beard */}
      <path d="M 305 295 L 280 310 L 285 315 L 310 300 Z" fill="#fcd34d" /> {/* Arm 2 */}
      
      {/* Hands Clasping */}
      <circle cx="300" cy="312" r="4" fill="#fbbf24" />
      <circle cx="315" cy="285" r="2" fill="#fbbf24" /> {/* Phone/Item in hand */}

      {/* Floating Map Pin UI */}
      <g transform="translate(250, 45)">
        <circle cx="50" cy="50" r="45" fill="#f1f5f9" />
        <rect x="25" y="25" width="50" height="50" fill="none" stroke="#2563eb" strokeWidth="2" />
        <path d="M 50 35 C 41 35 34 42 34 50 C 34 60 50 72 50 72 C 50 72 66 60 66 50 C 66 42 59 35 50 35 Z" fill="#eab308" />
        <circle cx="50" cy="48" r="8" fill="#ffffff" />
        <path d="M 50 145 L 50 250" stroke="#f1f5f9" strokeWidth="3" />
        
        {/* Blue tag */}
        <rect x="15" y="100" width="70" height="26" fill="#0ea5e9" rx="4" />
        <text x="21" y="118" fill="white" fontSize="14" fontWeight="bold" fontFamily="sans-serif">43</text>
        <path d="M 44 105 L 56 105 M 44 110 L 56 110 M 44 115 L 56 115 M 44 120 L 56 120" stroke="white" strokeWidth="2" strokeLinecap="round" />
        <text x="61" y="118" fill="white" fontSize="14" fontWeight="bold" fontFamily="sans-serif">53</text>
      </g>

    </svg>
  );
};
