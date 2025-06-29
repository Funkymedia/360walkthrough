import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 text-foreground">
      <svg
        className="h-10 w-auto"
        viewBox="0 0 170 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="360 Walkthrough Logo"
      >
        {/* House Outline (Roof and Walls) */}
        <path
          d="M10 50 L85 5 L160 50"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 48 V 95 H 150 V 48"
          stroke="currentColor"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* 360° Text */}
        <text
          x="45"
          y="58"
          fontSize="40"
          fontWeight="800"
          fill="currentColor"
        >
          360
        </text>
        <text
          x="120"
          y="38"
          fontSize="20"
          fontWeight="800"
          fill="currentColor"
        >
          °
        </text>

        {/* Walkthrough Text */}
        <text
          x="85"
          y="88"
          fontSize="20"
          fontWeight="500"
          fill="currentColor"
          textAnchor="middle"
        >
          walkthrough
        </text>

        {/* Arrow Path */}
        <defs>
          <marker
            id="logo-arrowhead"
            viewBox="0 0 10 10"
            refX="8"
            refY="5"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 0 L 10 5 L 0 10 Z" fill="hsl(var(--primary))" />
          </marker>
        </defs>
        <path
          d="M 140 68 A 50 22 0 1 0 45 70"
          stroke="hsl(var(--primary))"
          strokeWidth="7"
          fill="none"
          markerEnd="url(#logo-arrowhead)"
        />
      </svg>
    </Link>
  );
};

export default Logo;
