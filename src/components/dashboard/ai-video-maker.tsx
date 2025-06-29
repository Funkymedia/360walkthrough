'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Property } from '@/lib/types';
import Image from 'next/image';
import { Film, Sparkles, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface AiVideoMakerProps {
  property: Property;
}

export default function AiVideoMaker({ property }: AiVideoMakerProps) {
  const [selectedImageIds, setSelectedImageIds] = useState<string[]>([]);
  const { toast } = useToast();
  const images = property.standardImages || [];

  const handleSelectImage = (id: string) => {
    setSelectedImageIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((imageId) => imageId !== id);
      }
      if (prev.length >= 15) {
        toast({
          variant: 'destructive',
          title: 'Selection Limit Reached',
          description: 'You can select a maximum of 15 photos.',
        });
        return prev;
      }
      return [...prev, id];
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Marketing Video Maker</CardTitle>
        <CardDescription>
          Create a professional marketing video from your property photos using AI. Select up to 15 photos to begin.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <h3 className="mb-4 text-lg font-medium">Select Photos ({selectedImageIds.length}/15)</h3>
          {images.length > 0 ? (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {images.map((image) => (
                <div key={image.id} className="relative">
                  <Label
                    htmlFor={`video-img-${image.id}`}
                    className="group block cursor-pointer rounded-lg border-2 border-transparent has-[:checked]:border-primary"
                  >
                    <div className="relative aspect-video w-full overflow-hidden rounded-md">
                      <Image
                        src={image.url}
                        alt={image.name}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        data-ai-hint="property room"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 transition-opacity group-has-[:checked]:opacity-100" />
                    </div>
                    <Checkbox
                      id={`video-img-${image.id}`}
                      checked={selectedImageIds.includes(image.id)}
                      onCheckedChange={() => handleSelectImage(image.id)}
                      className="absolute right-2 top-2 z-10 h-5 w-5 bg-background/50 data-[state=checked]:bg-primary"
                    />
                  </Label>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-card p-12 text-center">
              <Film className="h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-xl font-semibold">No 2D Images Found</h3>
              <p className="mt-2 text-muted-foreground">
                Please upload some 2D images in the "Image Retouching" tab to create a video.
              </p>
            </div>
          )}
        </div>

        {images.length > 0 && (
          <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border-t pt-6">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                         <div tabIndex={0}>
                            <Button size="lg" disabled={selectedImageIds.length === 0}>
                                <Sparkles className="mr-2 h-5 w-5" />
                                Generate Video with AI
                            </Button>
                         </div>
                    </TooltipTrigger>
                    <TooltipContent className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        <p>Video generation feature is coming soon!</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
             {selectedImageIds.length === 0 && (
                <p className="text-sm text-muted-foreground">Select at least one photo to generate a video.</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
