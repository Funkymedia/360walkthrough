import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 text-foreground" aria-label="360 Walkthrough Home">
      <svg
        className="h-10 w-auto"
        viewBox="0 0 240 100"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          {/* Camera body with cutouts */}
          <path
            d="M40.1 2.9H19.9C10.7 2.9 3 10.6 3 19.9v60.2C3 89.4 10.7 97.1 19.9 97.1H40.1C49.3 97.1 57 89.4 57 80.1V19.9C57 10.6 49.3 2.9 40.1 2.9ZM30 42.5c-8 0-14.5-6.5-14.5-14.5S22 13.5 30 13.5S44.5 20 44.5 28S38 42.5 30 42.5ZM30 55.5c-4.1 0-7.5-3.4-7.5-7.5s3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5S34.1 55.5 30 55.5ZM42.5 85.5H17.5c-1.4 0-2.5-1.1-2.5-2.5v-7.5c0-1.4 1.1-2.5 2.5-2.5h25c1.4 0 2.5 1.1 2.5 2.5v7.5C45 84.4 43.9 85.5 42.5 85.5Z"
            fillRule="evenodd"
            clipRule="evenodd"
          />
          {/* Arrow */}
          <path
            d="M208.5 59.5c6.2-6.2 4.6-16.6-4-20-31.5-11.7-75.1 3.1-98.8 20"
            stroke="currentColor"
            strokeWidth="12"
            strokeLinecap="round"
            fill="none"
          />
          {/* Arrowhead */}
          <path d="m222 66.5-9.3-10.7-5 3.1 3 5.9 11.3-4.8Z" />
          {/* Degree symbol */}
          <circle cx="212" cy="18" r="8" />
        </g>
      </svg>
    </Link>
  );
};

export default Logo;
