'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

interface RequestFloorPlanFormProps {
  onSuccess?: () => void;
}

export default function RequestFloorPlanForm({ onSuccess }: RequestFloorPlanFormProps) {
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock submission
    setTimeout(() => {
      setIsSubmitting(false);
      setNotes('');
      toast({
        title: 'Success!',
        description: 'Your floor plan request has been submitted.',
      });
      onSuccess?.();
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-4">
      <div className="grid w-full gap-1.5">
        <Label htmlFor="notes">Notes for the team (optional)</Label>
        <Textarea
          id="notes"
          placeholder="e.g., Please label the small bedroom as 'Office'."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
        />
        <p className="text-sm text-muted-foreground">Our team will use your uploaded 360° photos to generate an accurate floor plan. You will be contacted once it's complete.</p>
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Submit Request
        </Button>
      </div>
    </form>
  );
}
