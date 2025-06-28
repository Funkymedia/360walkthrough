import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <svg
        className="h-10 w-auto"
        viewBox="0 0 154 95"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          .text-360 {
            font-family: sans-serif;
            font-size: 28px;
            font-weight: bold;
            fill: black;
            text-anchor: middle;
          }
          .text-walkthrough {
            font-family: sans-serif;
            font-size: 18px;
            fill: black;
            text-anchor: middle;
          }
        `}</style>
        {/* House Outline */}
        <path
          d="M2 45L77 10L152 45V90H2V45Z"
          stroke="black"
          strokeWidth="4"
        />
        {/* 360° Text */}
        <text
          x="77"
          y="48"
          className="text-360"
        >
          360°
        </text>
        
        {/* Arrow */}
        <path
          d="M45 68 A 45 12 0 1 1 125 68"
          stroke="#C49C68"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        <path
            d="M115 64 L125 68 L120 78"
            stroke="#C49C68"
            fill="none"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />

        {/* Walkthrough Text */}
        <text
          x="77"
          y="85"
          className="text-walkthrough"
        >
          walkthrough
        </text>
      </svg>
    </Link>
  );
};

export default Logo;
