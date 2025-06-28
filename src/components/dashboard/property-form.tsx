'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Property } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { useState } from 'react';

const propertySchema = z.object({
  name: z.string().min(3, 'Property name must be at least 3 characters.'),
  address: z.string().min(10, 'Please enter a full address.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  contactName: z.string().min(2, 'Contact name is required.'),
  contactEmail: z.string().email('Please enter a valid email.'),
  contactPhone: z.string().min(10, 'Please enter a valid phone number.'),
});

type PropertyFormValues = z.infer<typeof propertySchema>;

interface PropertyFormProps {
  initialData?: Property;
}

export default function PropertyForm({ initialData }: PropertyFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: initialData?.name || '',
      address: initialData?.address || '',
      description: initialData?.description || '',
      contactName: initialData?.contact.name || '',
      contactEmail: initialData?.contact.email || '',
      contactPhone: initialData?.contact.phone || '',
    },
  });

  const onSubmit = (data: PropertyFormValues) => {
    setIsLoading(true);
    console.log('Form submitted:', data);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to the new property's page (or property list)
      router.push('/dashboard/properties/prop-1'); // Mock redirect
      router.refresh();
    }, 1500);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Modern Downtown Loft" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, Anytown, USA" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="A beautiful and spacious loft..."
                      className="resize-none"
                      rows={4}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
        </div>
        
        <div className="space-y-4 rounded-lg border p-4">
            <h3 className="text-lg font-medium">Contact Information</h3>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                 <FormField
                    control={form.control}
                    name="contactName"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Contact Name</FormLabel>
                        <FormControl>
                            <Input placeholder="Jane Realtor" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="contactEmail"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Contact Email</FormLabel>
                        <FormControl>
                            <Input placeholder="jane.realtor@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
            </div>
            <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Contact Phone</FormLabel>
                    <FormControl>
                        <Input placeholder="555-123-4567" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
        </div>

        <div className="flex justify-end gap-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
             {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {initialData ? 'Save Changes' : 'Create Property'}
          </Button>
        </div>
      </form>
    </Form>
  );
}
