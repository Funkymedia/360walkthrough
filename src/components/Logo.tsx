'use client';

import Link from 'next/link';
import Image from 'next/image';

const Logo = () => {
  return (
    <Link
      href="/"
      className="flex items-center gap-2"
      aria-label="360 Walkthrough Home"
    >
      <Image src="https://placehold.co/40x40.png" alt="360 Walkthrough Logo" width={40} height={40} data-ai-hint="logo" />
      <span className="text-xl font-bold text-foreground">360 Walkthrough</span>
    </Link>
  );
};

export default Logo;
