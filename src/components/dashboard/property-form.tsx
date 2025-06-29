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
import { useProperties } from '@/contexts/properties-context';
import Image from 'next/image';

const propertySchema = z.object({
  name: z.string().min(3, 'Property name must be at least 3 characters.'),
  address: z.string().min(10, 'Please enter a full address.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  contactName: z.string().min(2, 'Contact name is required.'),
  contactEmail: z.string().email('Please enter a valid email.'),
  contactPhone: z.string().min(10, 'Please enter a valid phone number.'),
  brandingLogo: z.any().optional(),
  heroImage: z.any().optional(),
});

export type PropertyFormValues = z.infer<typeof propertySchema>;

interface PropertyFormProps {
  initialData?: Property;
}

export default function PropertyForm({ initialData }: PropertyFormProps) {
  const router = useRouter();
  const { addProperty, updateProperty } = useProperties();
  const [isLoading, setIsLoading] = useState(false);
  const [logoPreview, setLogoPreview] = useState<string | null>(initialData?.brandingLogoUrl || null);
  const [heroImagePreview, setHeroImagePreview] = useState<string | null>(initialData?.heroImageUrl || null);

  const form = useForm<PropertyFormValues>({
    resolver: zodResolver(propertySchema),
    defaultValues: {
      name: initialData?.name || '',
      address: initialData?.address || '',
      description: initialData?.description || '',
      contactName: initialData?.contact.name || '',
      contactEmail: initialData?.contact.email || '',
      contactPhone: initialData?.contact.phone || '',
      brandingLogo: undefined,
      heroImage: undefined,
    },
  });

  const onSubmit = (data: PropertyFormValues) => {
    setIsLoading(true);
    if (initialData) {
      updateProperty(initialData.id, data);
    } else {
      addProperty(data);
    }

    // Mock API delay
    setTimeout(() => {
      setIsLoading(false);
      // Redirect to the dashboard to see the new property in the list.
      if (initialData) {
        router.push(`/dashboard/properties/${initialData.id}`);
        router.refresh();
      } else {
        router.push('/dashboard/properties');
      }
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
                    <Input placeholder="e.g., Modern Central London Flat" {...field} />
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
                    <Input placeholder="123 High St, London, SW1A 1AA" {...field} />
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
                      placeholder="A beautiful and spacious flat..."
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
            <h3 className="text-lg font-medium">Main Image</h3>
             <p className="text-sm text-muted-foreground">
                Upload a hero image for the property tile.
            </p>
            <FormField
                control={form.control}
                name="heroImage"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Hero Image</FormLabel>
                    <FormControl>
                    <Input
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={(event) => {
                            const files = event.target.files;
                            field.onChange(files);
                            if (files && files.length > 0) {
                                setHeroImagePreview(URL.createObjectURL(files[0]));
                            } else {
                                setHeroImagePreview(initialData?.heroImageUrl || null);
                            }
                        }}
                    />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />
            {heroImagePreview && (
                <div className="mt-4">
                <p className="text-sm font-medium text-muted-foreground">Hero Image Preview:</p>
                <div className="relative mt-2 h-32 w-48 rounded-md border p-2">
                    <Image src={heroImagePreview} alt="Hero image preview" fill className="object-cover rounded-md" />
                </div>
                </div>
            )}
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
                            <Input placeholder="James Agent" {...field} />
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
                            <Input placeholder="james.agent@example.com" {...field} />
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
                        <Input placeholder="07700 900123" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
                />
        </div>

        <div className="space-y-4 rounded-lg border p-4">
          <h3 className="text-lg font-medium">Branding</h3>
          <p className="text-sm text-muted-foreground">
            Upload a company logo to be used as a watermark on tours.
          </p>
          <FormField
            control={form.control}
            name="brandingLogo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Logo</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/png, image/jpeg, image/svg+xml"
                    onChange={(event) => {
                      const files = event.target.files;
                      field.onChange(files);
                      if (files && files.length > 0) {
                        setLogoPreview(URL.createObjectURL(files[0]));
                      } else {
                        setLogoPreview(initialData?.brandingLogoUrl || null);
                      }
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {logoPreview && (
            <div className="mt-4">
              <p className="text-sm font-medium text-muted-foreground">Logo Preview:</p>
              <div className="relative mt-2 flex h-32 w-32 items-center justify-center rounded-md border p-2">
                <Image src={logoPreview} alt="Logo preview" fill className="object-contain" />
              </div>
            </div>
          )}
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
