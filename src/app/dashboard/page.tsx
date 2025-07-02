'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, Orbit, FileCheck, Megaphone, ArrowRight } from 'lucide-react';

const quickLinks = [
  {
    title: 'Properties',
    description: 'Manage your property listings, add new ones, and import from Alto.',
    href: '/dashboard/properties',
    icon: Building2,
  },
  {
    title: '360° Walkthroughs',
    description: 'Upload 360° images and generate immersive virtual tours.',
    href: '/dashboard/properties',
    icon: Orbit,
  },
  {
    title: 'EPC Lookup',
    description: 'Search for and download Energy Performance Certificates for any UK property.',
    href: '/dashboard/epcs',
    icon: FileCheck,
  },
  {
    title: '360 Social Pilot',
    description: 'Generate and schedule AI-powered social media posts for your listings.',
    href: '/dashboard/social-pilot',
    icon: Megaphone,
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          An overview of your workspace and quick links to key features.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {quickLinks.map((link) => (
          <Card key={link.href + link.title} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
                <div className="flex items-center gap-4">
                    <div className="bg-primary/10 text-primary p-3 rounded-lg flex items-center justify-center">
                        <link.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-lg">{link.title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-sm text-muted-foreground">{link.description}</p>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={link.href}>
                  <span>Go to Section</span>
                  <ArrowRight className="ml-auto" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
