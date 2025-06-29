import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <svg
        className="h-9 w-auto"
        viewBox="0 0 160 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="text-foreground">
          {/* Camera */}
          <rect x="10" y="10" width="28" height="60" rx="6" stroke="currentColor" strokeWidth="3" />
          <circle cx="24" cy="26" r="7" stroke="currentColor" strokeWidth="3" />
          <circle cx="24" cy="45" r="4" stroke="currentColor" strokeWidth="3" />
          <rect x="17" y="58" width="14" height="6" rx="2" stroke="currentColor" strokeWidth="3" />
        </g>
        <g className="text-primary">
          {/* 360 arrow */}
          <path
            d="M60 68 C 40 68, 40 20, 70 12 C 100 4, 130 15, 140 40"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M132 46L140 40L145 30"
            fill="none"
            stroke="currentColor"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="120" cy="10" r="3.5" fill="currentColor" />
        </g>
      </svg>
    </Link>
  );
};

export default Logo;
