import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <svg
        className="h-10 w-auto"
        viewBox="0 0 174 121"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <style>{`
          .logo-360-text {
            font-family: sans-serif;
            font-size: 52px;
            font-weight: bold;
            fill: black;
            text-anchor: middle;
          }
          .logo-walkthrough-text {
            font-family: sans-serif;
            font-size: 24px;
            fill: black;
            text-anchor: middle;
          }
        `}</style>
        <path
          d="M7 114V60L87 7L167 60V114"
          stroke="black"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="87" y="80" className="logo-360-text">
          360
          <tspan fontSize="32" dy="-20">°</tspan>
        </text>
        <path
          d="M40 92C40 82, 134 82, 134 92"
          stroke="#C49C68"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M124 88L134 92L128 102"
          stroke="#C49C68"
          strokeWidth="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <text x="87" y="110" className="logo-walkthrough-text">
          walkthrough
        </text>
      </svg>
    </Link>
  );
};

export default Logo;
