'use client';

import Link from 'next/link';

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center"
      aria-label="360 Walkthrough Home"
    >
      <svg
        width="140"
        height="40"
        viewBox="0 0 140 40"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary"
      >
        <g fill="currentColor">
          {/* Camera Icon */}
          <path
            d="M26.4,35.1H10.2C7.3,35.1,5,32.7,5,29.9V9.2C5,6.4,7.3,4,10.2,4h16.3c2.8,0,5.2,2.3,5.2,5.2v20.8C31.6,32.7,29.2,35.1,26.4,35.1z M10.2,6.6c-1.4,0-2.6,1.2-2.6,2.6v20.8c0,1.4,1.2,2.6,2.6,2.6h16.3c1.4,0,2.6-1.2,2.6-2.6V9.2c0-1.4-1.2-2.6-2.6-2.6H10.2z"
          />
          <path
            d="M18.3,14.6c-2.7,0-4.9-2.2-4.9-4.9s2.2-4.9,4.9-4.9s4.9,2.2,4.9,4.9S21,14.6,18.3,14.6z M18.3,7.4c-1.4,0-2.5,1.1-2.5,2.5s1.1,2.5,2.5,2.5s2.5-1.1,2.5-2.5S19.7,7.4,18.3,7.4z"
          />
          <path d="M18.3,10.4c-0.4,0-0.8-0.3-0.8-0.8s0.3-0.8,0.8-0.8s0.8,0.3,0.8,0.8S18.7,10.4,18.3,10.4z" />
          <path
            d="M18.3,25.8c-2.1,0-3.8-1.7-3.8-3.8s1.7-3.8,3.8-3.8s3.8,1.7,3.8,3.8S20.4,25.8,18.3,25.8z M18.3,20.6c-0.8,0-1.4,0.6-1.4,1.4s0.6,1.4,1.4,1.4s1.4-0.6,1.4-1.4S19.1,20.6,18.3,20.6z"
          />
          <rect x="13.2" y="29.1" width="10.2" height="3.2" rx="1" />
        </g>
        <g fill="currentColor" transform="translate(40,0)">
          <path
            d="M95,28.5A20 20,0,1,1,65,10"
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
          />
          <path d="M65 10 L 58 13 L 68 17 Z" stroke="none" />
          <circle cx="93" cy="11" r="2" stroke="none" />
          <text x="40" y="32" fontFamily="Inter, sans-serif" fontSize="14" fontWeight="bold">360 Walkthrough</text>
        </g>
      </svg>
    </Link>
  );
};

export default Logo;
