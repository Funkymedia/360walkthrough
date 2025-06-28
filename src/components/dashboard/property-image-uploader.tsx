'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { generateImageTags } from '@/ai/flows/generate-image-tags';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UploadCloud, Loader2, X, Pin, Waypoints, ArrowRight, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { PropertyImage, ImagePath } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface PropertyImageUploaderProps {
  initialImages: PropertyImage[];
  allImages: PropertyImage[];
}

interface UploadedImage extends PropertyImage {
  file?: File;
  dataUrl: string;
}

export default function PropertyImageUploader({ initialImages, allImages }: PropertyImageUploaderProps) {
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
          paths: [],
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

  const handleRemovePath = (imageId: string, pathId: string) => {
    setImages(prev => prev.map(img => {
      if (img.id === imageId) {
        return {
          ...img,
          paths: img.paths?.filter(p => p.id !== pathId)
        };
      }
      return img;
    }));
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle>360° Images</CardTitle>
        <CardDescription>
          Manage the 360° images for this property. Configure starting views and link images together with hotspots.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          {images.map((image) => (
            <Card key={image.id} className="overflow-hidden flex flex-col">
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
              <div className="p-4 flex-grow flex flex-col gap-4">
                <div>
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

                <div className="space-y-4 pt-4 border-t mt-auto">
                    <h4 className="font-semibold">Configuration</h4>
                    
                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-sm"><Pin className="h-4 w-4 text-muted-foreground"/> Starting View</Label>
                        <div className="flex gap-2">
                            <Input type="number" placeholder="Pitch" defaultValue={image.startingView?.pitch} className="text-xs h-8" />
                            <Input type="number" placeholder="Yaw" defaultValue={image.startingView?.yaw} className="text-xs h-8" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="flex items-center gap-2 text-sm"><Waypoints className="h-4 w-4 text-muted-foreground"/> Hotspots (Paths)</Label>
                        <div className="space-y-1">
                            {image.paths?.map(path => (
                                <div key={path.id} className="flex items-center justify-between text-xs bg-muted/50 p-1.5 rounded-md">
                                    <div className="flex items-center gap-2">
                                    <ArrowRight className="h-3 w-3" />
                                    <span>{path.name}</span>
                                    </div>
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemovePath(image.id, path.id)}>
                                        <Trash2 className="h-3 w-3 text-destructive" />
                                    </Button>
                                </div>
                            ))}
                             {(!image.paths || image.paths.length === 0) && (
                                <p className="text-xs text-muted-foreground p-1.5">No hotspots added.</p>
                             )}
                        </div>
                        <form className="flex gap-2 pt-2 items-center">
                            <Input placeholder="Hotspot Name" className="h-8 text-xs flex-grow" />
                            <Select>
                                <SelectTrigger className="h-8 text-xs w-[120px] shrink-0">
                                    <SelectValue placeholder="Link to..." />
                                </SelectTrigger>
                                <SelectContent>
                                    {allImages.filter(i => i.id !== image.id).map(targetImage => (
                                        <SelectItem key={targetImage.id} value={targetImage.id}>
                                            Image {targetImage.id.substring(4, 10)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <Button size="sm" type="submit" variant="outline" className="h-8">Add</Button>
                        </form>
                    </div>
                </div>
              </div>
            </Card>
          ))}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed p-12 text-center transition-colors hover:border-primary hover:bg-primary/5 min-h-[400px]"
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
