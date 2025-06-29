import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const proFeatures = [
  'Unlimited active tours',
  'AI Image Enhancement',
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

export default function BillingPage() {
  const currentPlan = 'Pro'; // Mock current plan

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Billing & Subscriptions</h1>
        <p className="text-muted-foreground">
          Manage your subscription plan and billing details.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Current Plan</CardTitle>
          <CardDescription>You are currently on the <Badge variant="secondary">{currentPlan}</Badge> plan.</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        <Card className="flex flex-col">
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
            <Button className="w-full" disabled={currentPlan === 'Pro'}>
              {currentPlan === 'Pro' ? 'Current Plan' : 'Select Pro'}
            </Button>
          </CardFooter>
        </Card>

        <Card className="flex flex-col border-2 border-primary shadow-lg">
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
            <Button className="w-full">
              {currentPlan === 'Business' ? 'Current Plan' : 'Upgrade to Business'}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
