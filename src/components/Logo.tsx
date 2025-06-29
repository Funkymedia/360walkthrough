import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <svg
        className="h-9 w-auto"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g className="text-primary">
          <path
            d="M35 20C35 28.2843 28.2843 35 20 35C11.7157 35 5 28.2843 5 20C5 11.7157 11.7157 5 20 5"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M20 5L25 10M20 5L15 10"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>
        <g className="text-foreground">
          <path
            d="M20 14L28 30L12 30L20 14Z"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      </svg>
    </Link>
  );
};

export default Logo;
