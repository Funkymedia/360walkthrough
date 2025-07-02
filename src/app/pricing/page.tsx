import PublicHeader from '@/components/public-header';
import PublicFooter from '@/components/public-footer';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

const proFeatures = [
  'Unlimited active tours',
  'AI Image Enhancement',
  'AI Image Retouching & Object Removal',
  'AI Video Maker',
  'EPC Search & Download',
  'Custom branding',
  'RICOH360 Watermark Display Setting',
  'Real time visitor analytics',
  'Manual 2D still image cropping',
  'Auto 2D still image cropping (AI)',
  'Team management',
  'Create password-protected tour',
];

const businessFeatures = [
  'Everything in Pro',
  'Advanced team permissions',
  'API access for integrations',
  'Priority support',
  'White-labeling options',
  'Dedicated account manager',
];

export default function PricingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PublicHeader />
      <main className="flex-grow">
        <section className="py-20 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4">
                        Find the perfect plan
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                        Choose the plan that's right for your business and start creating stunning virtual tours today.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                <Card className="flex flex-col rounded-lg shadow-lg">
                    <CardHeader>
                    <CardTitle>Pro</CardTitle>
                    <CardDescription>For individuals who want to start a virtual tour.</CardDescription>
                    <div className="flex items-baseline pt-4">
                        <span className="text-4xl font-bold">£25</span>
                        <span className="ml-2 text-muted-foreground">/ month</span>
                    </div>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                    <ul className="space-y-3">
                        {proFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-primary" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                        ))}
                    </ul>
                    <div className="rounded-lg border bg-accent/50 p-4 text-sm">
                        <p className="font-semibold">Optional Add-on:</p>
                        <p className="text-muted-foreground">Floor Plan Creation: <span className="font-bold text-foreground">£20 / floor</span></p>
                    </div>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" size="lg" asChild>
                            <Link href="/signup">Get Started with Pro</Link>
                        </Button>
                    </CardFooter>
                </Card>

                <Card className="flex flex-col border-2 border-primary shadow-2xl rounded-lg">
                    <CardHeader>
                    <div className="flex justify-between items-center">
                        <CardTitle>Business</CardTitle>
                        <Badge variant="default">Most Popular</Badge>
                    </div>
                    <CardDescription>For agencies and teams requiring advanced tools.</CardDescription>
                    <div className="flex items-baseline pt-4">
                        <span className="text-4xl font-bold">£75</span>
                        <span className="ml-2 text-muted-foreground">/ month</span>
                    </div>
                    </CardHeader>
                    <CardContent className="flex-grow space-y-4">
                    <ul className="space-y-3">
                        {businessFeatures.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                            <Check className="h-5 w-5 text-primary" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                        </li>
                        ))}
                    </ul>
                    </CardContent>
                    <CardFooter>
                        <Button className="w-full" size="lg" asChild>
                            <Link href="/signup">Get Started with Business</Link>
                        </Button>
                    </CardFooter>
                </Card>
                </div>
            </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
