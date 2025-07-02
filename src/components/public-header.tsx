'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

export default function PublicHeader() {
  const navItems = [
    { href: '/pricing', label: 'Pricing' },
    { href: '/demo', label: 'Get a Free Demo' },
  ];

  return (
    <header className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
      <Logo />
      <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="flex items-center gap-4">
        <div className="hidden items-center gap-4 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="flex h-20 items-center border-b px-4">
                <Logo />
              </div>
              <div className="mt-4 grid gap-2 py-6">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="-ml-2 flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:text-foreground hover:bg-muted"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="absolute bottom-6 left-4 right-4 flex flex-col gap-2">
                 <Button variant="ghost" asChild>
                    <Link href="/login">Log In</Link>
                  </Button>
                  <Button asChild>
                    <Link href="/signup">Sign Up</Link>
                  </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
