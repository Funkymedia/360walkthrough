'use client';

import { useState } from 'react';
import { mockUser } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Copy, Check, Gift, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

export default function ReferralCard() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const referralLink = `https://360walkthrough.com/signup?ref=${mockUser.id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink).then(() => {
      setCopied(true);
      toast({
        title: 'Copied to clipboard!',
        description: 'You can now share your referral link.',
      });
      setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
    }).catch(err => {
      console.error('Failed to copy text: ', err);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Could not copy the link to your clipboard.',
      });
    });
  };

  const shareText = "Join 360 Walkthrough and create stunning virtual tours! Use my link to sign up.";
  const encodedReferralLink = encodeURIComponent(referralLink);
  const encodedShareText = encodeURIComponent(shareText);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Referral Link</CardTitle>
        <CardDescription>
          Share this link with your network. You'll receive £100 for each person who signs up and becomes a paying customer.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-2">
          <Input value={referralLink} readOnly />
          <Button onClick={handleCopy} size="icon">
            {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            <span className="sr-only">Copy Referral Link</span>
          </Button>
        </div>

        <div className="space-y-2 text-center">
          <p className="text-sm text-muted-foreground">Or share on social media</p>
          <div className="flex items-center justify-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="outline" size="icon">
                    <a
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodedReferralLink}&quote=${encodedShareText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on Facebook"
                    >
                      <Facebook className="h-5 w-5" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share on Facebook</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button asChild variant="outline" size="icon">
                    <a
                      href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodedReferralLink}&title=${encodedShareText}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Share on LinkedIn"
                    >
                      <Linkedin className="h-5 w-5" />
                    </a>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Share on LinkedIn</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" disabled>
                    <Instagram className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Direct sharing to Instagram is not supported. Please copy the link.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="flex items-center justify-center rounded-lg border border-dashed bg-accent/50 p-6 text-center">
            <div className="flex flex-col items-center gap-4">
                <Gift className="h-12 w-12 text-primary" />
                <div>
                    <p className="text-2xl font-bold">Earn £100</p>
                    <p className="text-muted-foreground">per successful referral</p>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
