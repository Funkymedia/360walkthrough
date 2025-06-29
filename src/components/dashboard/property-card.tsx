import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Property } from '@/lib/types';
import { Home, MapPin, Eye } from 'lucide-react';

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const imageUrl = property.heroImageUrl || '/default-property-image.png';
  const imageHint = property.heroImageUrl ? 'property exterior' : '360 camera walkthrough';

  return (
    <Card className="flex flex-col overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105 hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={imageUrl}
            alt={`Image of ${property.name}`}
            fill
            className="object-cover"
            data-ai-hint={imageHint}
          />
        </div>
        <div className="p-6">
            <CardTitle className="text-lg font-bold line-clamp-1">{property.name}</CardTitle>
            <CardDescription className="flex items-center gap-2 pt-2 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4 shrink-0" />
              <span className="line-clamp-1">{property.address}</span>
            </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow px-6">
        <p className="line-clamp-3 text-sm text-muted-foreground">{property.description}</p>
      </CardContent>
      <CardFooter className="bg-muted/40 p-4">
        <Button asChild className="w-full">
          <Link href={`/dashboard/properties/${property.id}`}>
            <Eye className="mr-2 h-4 w-4" /> View Details
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
