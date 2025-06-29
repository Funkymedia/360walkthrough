import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <svg
        className="h-9 w-auto text-primary"
        viewBox="0 0 90 51"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Camera */}
        <g stroke="currentColor" strokeWidth="2">
          {/* Body */}
          <path
            d="M23.5 2.5C24.3284 2.5 25 3.17157 25 4V47C25 47.8284 24.3284 48.5 23.5 48.5H5.5C4.67157 48.5 4 47.8284 4 47V4C4 3.17157 4.67157 2.5 5.5 2.5H23.5Z"
            fill="hsl(var(--card))"
            strokeWidth="3"
          />
          {/* Lens Housing */}
          <path
            d="M22 8.5C22.2761 8.5 22.5 8.72386 22.5 9V21C22.5 21.2761 22.2761 21.5 22 21.5H7C6.72386 21.5 6.5 21.2761 6.5 21V9C6.5 8.72386 6.72386 8.5 7 8.5H22Z"
            fill="hsl(var(--card))"
          />
          {/* Lens */}
          <circle cx="14.5" cy="15" r="4.5" strokeWidth="1.5" />
          <circle cx="14.5" cy="15" r="2" fill="currentColor" stroke="none"/>
          <circle cx="14.5" cy="15" r="0.75" fill="hsl(var(--card))" stroke="none"/>
          {/* Button */}
          <circle cx="14.5" cy="28" r="2.5" fill="hsl(var(--card))" />
          {/* Port */}
          <path d="M18 38H11C10.4477 38 10 38.4477 10 39V42C10 42.5523 10.4477 43 11 43H18C18.5523 43 19 42.5523 19 42V39C19 38.4477 18.5523 38 18 38Z" fill="hsl(var(--card))" />
        </g>

        {/* 360 Arrow */}
        <g fill="currentColor">
          <path
            d="M80 39 A 22 22 0 1 0 54 5"
            stroke="currentColor"
            strokeWidth="5"
            fill="none"
            strokeLinecap="round"
          />
          <path d="M87 39L79 46L79 32L87 39Z" />
          <circle cx="68" cy="11" r="3" />
        </g>
      </svg>
    </Link>
  );
};

export default Logo;
