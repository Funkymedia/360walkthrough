import { Camera } from 'lucide-react';
import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Camera className="h-7 w-7 text-primary" />
      <span className="text-xl font-bold tracking-tight text-foreground">
        Tour Weaver 360
      </span>
    </Link>
  );
};

export default Logo;
