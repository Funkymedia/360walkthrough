'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function RequestChangesForm() {
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Message cannot be empty.',
      });
      return;
    }
    setIsSubmitting(true);
    // Mock submission
    setTimeout(() => {
      setIsSubmitting(false);
      setMessage('');
      toast({
        title: 'Success!',
        description: 'Your question has been submitted to the admin team.',
      });
    }, 1000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Request Changes</CardTitle>
        <CardDescription>
          Have a question or need a change? Send a message to our admin team.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="grid w-full gap-1.5">
            <Label htmlFor="message">Your Message</Label>
            <Textarea
              id="message"
              placeholder="Type your message here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" className="ml-auto" disabled={isSubmitting}>
            {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Question
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
