import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

export default function ImageRetouchingDemo() {
    return (
        <Card className="bg-muted/30">
            <CardHeader>
                <CardTitle>Retouching Example</CardTitle>
                <CardDescription>See how our AI can transform your property photos by removing unwanted objects.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                    <div className="space-y-2">
                         <p className="text-sm font-semibold text-center">Before</p>
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
                            <Image src="https://placehold.co/600x400.png" alt="Before retouching" fill className="object-cover" data-ai-hint="messy kitchen" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-sm font-semibold text-center text-primary">After</p>
                        <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-primary">
                            <Image src="https://placehold.co/600x400.png" alt="After retouching" fill className="object-cover" data-ai-hint="clean kitchen" />
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
