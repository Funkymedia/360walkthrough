'use client';

import Link from 'next/link';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  Menu,
  LayoutDashboard,
  Building2,
  PlusCircle,
  Gift,
  FileCheck,
  CreditCard,
} from 'lucide-react';
import Logo from '../Logo';
import { usePathname } from 'next/navigation';

export default function DashboardHeader() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/properties', label: 'Properties', icon: Building2 },
    { href: '/dashboard/epcs', label: 'EPCs', icon: FileCheck },
    { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
    { href: '/dashboard/referrals', label: 'Referrals', icon: Gift },
  ];

  return (
    <header className="flex h-20 items-center gap-4 border-b bg-card px-4 md:px-6">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col">
          <nav className="grid gap-2 text-lg font-medium">
            <div className="flex h-20 items-center border-b px-2">
                <Logo />
            </div>
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
            <Link
                href="/dashboard/properties/new"
                className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
            >
                <PlusCircle className="h-5 w-5" />
                New Property
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
       <div className="flex-1">
          <h1 className="text-lg font-semibold md:text-2xl capitalize">{pathSegments[pathSegments.length - 1]}</h1>
       </div>
    </header>
  );
}
