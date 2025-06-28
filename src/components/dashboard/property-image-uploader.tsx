'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { generateImageTags } from '@/ai/flows/generate-image-tags';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { UploadCloud, Loader2, X, Plus } from 'lucide-react';
import Image from 'next/image';
import { PropertyImage } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface PropertyImageUploaderProps {
  initialImages: PropertyImage[];
}

interface UploadedImage extends PropertyImage {
  file?: File;
  dataUrl: string;
}

export default function PropertyImageUploader({ initialImages }: PropertyImageUploaderProps) {
  const [images, setImages] = useState<UploadedImage[]>(
    initialImages.map((img) => ({ ...img, dataUrl: img.url }))
  );
  const [isGenerating, setIsGenerating] = useState<Record<string, boolean>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        const newImage: UploadedImage = {
          id: `new-${Date.now()}-${Math.random()}`,
          url: '',
          tags: [],
          file,
          dataUrl,
        };
        setImages((prev) => [...prev, newImage]);
        handleGenerateTags(newImage.id, dataUrl);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerateTags = async (imageId: string, photoDataUri: string) => {
    setIsGenerating((prev) => ({ ...prev, [imageId]: true }));
    try {
      const result = await generateImageTags({ photoDataUri });
      setImages((prev) =>
        prev.map((img) => (img.id === imageId ? { ...img, tags: result.tags } : img))
      );
    } catch (error) {
      console.error('Error generating tags:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate image tags.',
      });
    } finally {
      setIsGenerating((prev) => ({ ...prev, [imageId]: false }));
    }
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };
  
  const removeTag = (imageId: string, tagToRemove: string) => {
    setImages(prevImages => prevImages.map(image => {
      if (image.id === imageId) {
        return { ...image, tags: image.tags.filter(tag => tag !== tagToRemove) };
      }
      return image;
    }));
  };

  const addTag = (imageId: string, newTag: string) => {
    if (newTag.trim() === '') return;
    setImages(prevImages => prevImages.map(image => {
        if (image.id === imageId && !image.tags.includes(newTag.trim())) {
            return { ...image, tags: [...image.tags, newTag.trim()] };
        }
        return image;
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>360° Images</CardTitle>
        <CardDescription>
          Upload 360° images for this property. Our AI will automatically suggest tags.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden">
              <div className="relative h-48 w-full">
                <Image src={image.dataUrl} alt="360 preview" fill className="object-cover" />
                <Button
                  size="icon"
                  variant="destructive"
                  className="absolute right-2 top-2 h-7 w-7"
                  onClick={() => removeImage(image.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-4">
                <h4 className="font-semibold mb-2">Tags</h4>
                {isGenerating[image.id] && (
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating tags...
                  </div>
                )}
                <div className="flex flex-wrap gap-2">
                  {image.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="pr-1">
                      {tag}
                      <button onClick={() => removeTag(image.id, tag)} className="ml-1 rounded-full p-0.5 hover:bg-destructive/20">
                        <X className="h-3 w-3"/>
                      </button>
                    </Badge>
                  ))}
                   <form onSubmit={(e) => { e.preventDefault(); const input = e.currentTarget.elements.namedItem('newTag') as HTMLInputElement; addTag(image.id, input.value); input.value = ''; }}>
                        <div className="flex items-center">
                            <Input name="newTag" placeholder="Add tag" className="h-7 text-xs flex-grow" />
                        </div>
                    </form>
                </div>
              </div>
            </Card>
          ))}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center transition-colors hover:border-primary hover:bg-primary/5"
          >
            <UploadCloud className="mx-auto h-12 w-12 text-muted-foreground" />
            <h3 className="mt-4 text-lg font-semibold">Upload Images</h3>
            <p className="mt-2 text-sm text-muted-foreground">Click or drag files here</p>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="sr-only"
              accept="image/jpeg, image/png, image/webp"
              onChange={handleFileChange}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
