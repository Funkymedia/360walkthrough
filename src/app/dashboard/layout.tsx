'use client';

import Link from 'next/link';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Building2,
  Gift,
  LayoutDashboard,
  LogOut,
  PlusCircle,
  Settings,
  FileCheck,
  CreditCard,
} from 'lucide-react';
import { mockUser } from '@/lib/data';
import Logo from '@/components/Logo';
import { usePathname } from 'next/navigation';
import DashboardHeader from '@/components/dashboard/header';
import { PropertiesProvider } from '@/contexts/properties-context';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/dashboard/properties', label: 'Properties', icon: Building2 },
    { href: '/dashboard/epcs', label: 'EPCs', icon: FileCheck },
    { href: '/dashboard/billing', label: 'Billing', icon: CreditCard },
    { href: '/dashboard/referrals', label: 'Referrals', icon: Gift },
  ];

  return (
    <PropertiesProvider>
      <div className="flex min-h-screen w-full">
        <aside className="hidden w-64 flex-col border-r bg-card md:flex">
          <div className="flex h-20 items-center border-b px-6">
            <Logo />
          </div>
          <nav className="flex-1 space-y-2 p-4">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <Button
                  variant={pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard') ? 'default' : 'ghost'}
                  className="w-full justify-start"
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            ))}
            <Link href="/dashboard/properties/new">
              <Button variant="secondary" className="w-full justify-start">
                <PlusCircle className="mr-2 h-4 w-4" />
                New Property
              </Button>
            </Link>
          </nav>
          <div className="mt-auto p-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex h-12 w-full items-center justify-start gap-3">
                  <Avatar>
                    <AvatarImage src={mockUser.avatarUrl} alt={mockUser.name} />
                    <AvatarFallback>{mockUser.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="font-medium">{mockUser.name}</p>
                    <p className="text-xs text-muted-foreground">{mockUser.email}</p>
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <Link href="/">
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </Link>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </aside>
        <div className="flex flex-1 flex-col">
          <DashboardHeader />
          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
      </div>
    </PropertiesProvider>
  );
}
