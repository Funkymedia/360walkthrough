import { mockProperties } from '@/lib/data';
import PropertyCard from '@/components/dashboard/property-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PlusCircle } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Your Properties</h1>
          <p className="text-muted-foreground">
            Manage your properties and virtual tours.
          </p>
        </div>
        <Button asChild>
          <Link href="/dashboard/properties/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Property
          </Link>
        </Button>
      </div>

      {mockProperties.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-card p-12 text-center">
          <h3 className="text-xl font-semibold">No Properties Found</h3>
          <p className="mt-2 text-muted-foreground">
            Get started by creating your first property.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/dashboard/properties/new">
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Property
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}
