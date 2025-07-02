'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { useProperties } from '@/contexts/properties-context';
import { Property } from '@/lib/types';
import { generateSocialPost } from '@/ai/flows/generate-social-post';
import { useToast } from '@/hooks/use-toast';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Calendar } from '@/components/ui/calendar';
import { Carousel, CarouselContent, CarouselItem, CarouselPrevious, CarouselNext } from '@/components/ui/carousel';
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

import { Sparkles, Loader2, Copy, Check, Megaphone, Calendar as CalendarIcon, Settings, Link as LinkIcon, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function SocialPilotPage() {
  const { properties } = useProperties();
  const { toast } = useToast();
  
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');
  const [generatedPost, setGeneratedPost] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [addWatermark, setAddWatermark] = useState(true);
  const [copied, setCopied] = useState(false);
  const [date, setDate] = useState<Date | undefined>(new Date());

  const selectedProperty = useMemo(() => {
    return properties.find(p => p.id === selectedPropertyId) || null;
  }, [properties, selectedPropertyId]);

  const handleGenerate = async () => {
    if (!selectedProperty) return;

    setIsGenerating(true);
    setGeneratedPost('');
    try {
      const result = await generateSocialPost({
        name: selectedProperty.name,
        address: selectedProperty.address,
        description: selectedProperty.description,
        contactName: selectedProperty.contact.name,
      });
      setGeneratedPost(result.postContent);
      toast({
        title: 'Post Generated!',
        description: 'The social media post has been created by AI.',
      });
    } catch (error) {
      console.error('Failed to generate post:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Could not generate the social media post. Please try again.',
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    if (!generatedPost) return;
    navigator.clipboard.writeText(generatedPost).then(() => {
      setCopied(true);
      toast({ title: 'Copied to clipboard!' });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Megaphone className="h-8 w-8" />
          360 Social Pilot
        </h1>
        <p className="text-muted-foreground">
          Create and schedule social media posts for your properties using AI.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Create a New Post</CardTitle>
              <CardDescription>Select a property to start generating a social media post.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col sm:flex-row gap-4">
              <div className="flex-grow">
                <Label>Select Property</Label>
                <Select value={selectedPropertyId} onValueChange={setSelectedPropertyId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a property..." />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map(p => (
                      <SelectItem key={p.id} value={p.id}>{p.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <Button onClick={handleGenerate} disabled={!selectedPropertyId || isGenerating} className="sm:self-end">
                {isGenerating ? <Loader2 className="animate-spin" /> : <Sparkles />}
                <span className="ml-2">Generate Post</span>
              </Button>
            </CardContent>
          </Card>
          
          {(isGenerating || generatedPost) && (
            <Card>
              <CardHeader>
                  <CardTitle>Post Preview</CardTitle>
                  <CardDescription>This is how your post might look on a social media platform.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {isGenerating && !generatedPost ? (
                  <div className="flex flex-col items-center justify-center h-96 bg-muted rounded-lg">
                    <Loader2 className="h-12 w-12 animate-spin text-primary" />
                    <p className="mt-4 text-muted-foreground">AI is crafting your post...</p>
                  </div>
                ) : (
                  <>
                    <Carousel className="w-full">
                        <CarouselContent>
                        {(selectedProperty?.standardImages?.length || 0) > 0 ? selectedProperty?.standardImages?.map((image, index) => (
                            <CarouselItem key={index}>
                                <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                                <Image src={image.url} alt={image.name} fill className="object-cover" />
                                {addWatermark && selectedProperty?.brandingLogoUrl && (
                                    <div className="absolute bottom-2 right-2 bg-black/50 p-2 rounded-md">
                                        <Image src={selectedProperty.brandingLogoUrl} alt="Watermark" width={80} height={20} className="object-contain" />
                                    </div>
                                )}
                                </div>
                            </CarouselItem>
                        )) : (
                            <CarouselItem>
                                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted flex items-center justify-center">
                                    <p className="text-muted-foreground">No images available for this property</p>
                                </div>
                            </CarouselItem>
                        )}
                        </CarouselContent>
                        {(selectedProperty?.standardImages?.length || 0) > 1 && <>
                            <CarouselPrevious className="left-4" />
                            <CarouselNext className="right-4" />
                        </>}
                    </Carousel>

                    <div className="space-y-2">
                        <Label htmlFor="post-content">Generated Post Content</Label>
                        <Textarea id="post-content" value={generatedPost} readOnly rows={8} className="bg-muted" />
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="justify-end">
                <Button variant="outline" onClick={handleCopy}>
                    {copied ? <Check /> : <Copy />}
                    <span className="ml-2">Copy Text</span>
                </Button>
              </CardFooter>
            </Card>
          )}

        </div>

        {/* Right Column */}
        <div className="lg:col-span-1 space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5" /> Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-3">
                        <Label htmlFor="watermark-switch" className="flex flex-col gap-1">
                            <span>Add Watermark</span>
                            <span className="text-xs font-normal text-muted-foreground">Uses the property's branding logo.</span>
                        </Label>
                        <Switch id="watermark-switch" checked={addWatermark} onCheckedChange={setAddWatermark} disabled={!selectedProperty?.brandingLogoUrl} />
                    </div>
                     {selectedPropertyId && !selectedProperty?.brandingLogoUrl && (
                        <p className="text-xs text-destructive text-center">No branding logo found for this property.</p>
                     )}
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><LinkIcon className="h-5 w-5" /> Connect Accounts</CardTitle>
                    <CardDescription>Link your social media accounts to post directly.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-2">
                    <TooltipProvider>
                        <Tooltip><TooltipTrigger asChild>
                            <Button variant="outline" disabled><Facebook className="h-5 w-5" /></Button>
                        </TooltipTrigger><TooltipContent><p>Coming Soon!</p></TooltipContent></Tooltip>
                        <Tooltip><TooltipTrigger asChild>
                            <Button variant="outline" disabled><Instagram className="h-5 w-5" /></Button>
                        </TooltipTrigger><TooltipContent><p>Coming Soon!</p></TooltipContent></Tooltip>
                        <Tooltip><TooltipTrigger asChild>
                             <Button variant="outline" disabled><Linkedin className="h-5 w-5" /></Button>
                        </TooltipTrigger><TooltipContent><p>Coming Soon!</p></TooltipContent></Tooltip>
                        <Tooltip><TooltipTrigger asChild>
                             <Button variant="outline" disabled><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 16 16"><path fill="currentColor" d="M9.82 6.294L14.053 1h-1.2l-3.63 4.494L5.87 1H1.05l4.456 6.38-4.456 6.62h1.2l3.858-4.786L9.93 15h4.82zM7.56 8.35L7.1 7.76l-3.9-5.56h1.76l3.14 4.507l.459.658l4.13 5.91h-1.76z"/></svg></Button>
                        </TooltipTrigger><TooltipContent><p>Coming Soon!</p></TooltipContent></Tooltip>
                    </TooltipProvider>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><CalendarIcon className="h-5 w-5" /> Schedule Post</CardTitle>
                    <CardDescription>Pick a date and time to publish this post.</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                    <Calendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
                    <Separator className="my-4" />
                     <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div className="w-full">
                                    <Button className="w-full" disabled>Schedule Post</Button>
                                </div>
                            </TooltipTrigger>
                            <TooltipContent><p>Scheduling is coming soon!</p></TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
