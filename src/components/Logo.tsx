import Link from 'next/link';

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center text-xl font-bold text-foreground"
      aria-label="360 Walkthrough Home"
    >
      360 Walkthrough
    </Link>
  );
};

export default Logo;
