'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
  } from "@/components/ui/dropdown-menu"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion";
import { Menu, ChevronDown, Camera, Sparkles, Megaphone, LayoutTemplate, FileCheck, Wand2 } from 'lucide-react';
  
const features = [
    {
      title: "360 Walkthrough Property Photography",
      description: "Automatically enhance your imagery with object removal.",
      icon: Camera,
      href: "#",
    },
    {
      title: "AI Descriptions",
      description: "Generate Property Descriptions with AI.",
      icon: Sparkles,
      href: "#",
    },
    {
      title: "Social Media Campaigns",
      description: "Build compelling campaigns.",
      icon: Megaphone,
      href: "#",
    },
    {
      title: "Floor Plans",
      description: "Create professional diagrams.",
      icon: LayoutTemplate,
      href: "#",
    },
    {
      title: "EPCs",
      description: "Check and order EPCs.",
      icon: FileCheck,
      href: "#",
    },
  ];

export default function PublicHeader() {
  const navItems = [
    { href: '/pricing', label: 'Pricing' },
    { href: '/demo', label: 'Get a Free Demo' },
  ];

  const featuresDesktop = (
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
                Features
                <ChevronDown className="relative top-[1px] ml-1 h-4 w-4 transition duration-200 group-data-[state=open]:rotate-180" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[340px]" align="start">
            <div className="p-3 grid gap-3">
                {features.map((feature) => (
                    <Link
                        key={feature.title}
                        href={feature.href}
                        className="group flex items-start gap-3 rounded-md p-2 -m-1 text-sm transition-colors hover:bg-accent"
                    >
                        <div className="bg-primary/10 text-primary p-2.5 rounded-lg mt-0.5">
                            <feature.icon className="h-5 w-5" />
                        </div>
                        <div className="grid gap-0.5">
                            <p className="font-semibold text-foreground">{feature.title}</p>
                            <p className="text-muted-foreground">{feature.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
            <DropdownMenuSeparator />
            <div className="p-2 grid grid-cols-2 gap-2">
                <Button asChild variant="secondary" className="w-full">
                    <Link href="/demo">Get a Demo</Link>
                </Button>
                <Button asChild className="w-full">
                    <Link href="/signup">Try it Now</Link>
                </Button>
            </div>
        </DropdownMenuContent>
    </DropdownMenu>
  );

  const featuresMobile = (
    <Accordion type="single" collapsible className="w-full -ml-2">
        <AccordionItem value="features" className="border-b-0">
            <AccordionTrigger className="flex items-center gap-4 rounded-xl px-3 py-2 text-foreground hover:no-underline">
                Features
            </AccordionTrigger>
            <AccordionContent className="pb-0">
                <div className="grid gap-1 pl-8 pr-2">
                {features.map((feature) => (
                    <Link
                    key={feature.title}
                    href={feature.href}
                    className="flex items-start gap-3 rounded-md p-2 text-muted-foreground hover:text-foreground hover:bg-muted"
                    >
                        <feature.icon className="h-4 w-4 mt-1 flex-shrink-0" />
                        <div className="flex flex-col">
                            <span className="font-medium text-foreground">{feature.title}</span>
                            <span className="text-sm">{feature.description}</span>
                        </div>
                    </Link>
                ))}
                </div>
            </AccordionContent>
        </AccordionItem>
    </Accordion>
  );

  return (
    <header className="container mx-auto flex h-20 items-center justify-between px-4 sm:px-6 lg:px-8">
      <Logo />
      <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
        {featuresDesktop}
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
                {featuresMobile}
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
