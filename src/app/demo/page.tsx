import PublicHeader from '@/components/public-header';
import PublicFooter from '@/components/public-footer';

export default function DemoPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <PublicHeader />
      <main className="flex-grow">
        <section className="py-20 md:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tighter">
                            See how 360 Walkthrough could work for you
                        </h1>
                        <p className="text-lg text-muted-foreground">
                           Select a time and date that works for you from the calendar – then join a member of the team for a personalised tour of the platform. Discover why it’s the only property marketing tool you need to grow your estate agency business.
                        </p>
                    </div>
                    <div className="rounded-lg shadow-xl overflow-hidden border">
                        <iframe 
                            src="https://cristinaaxford.setmore.com/services/e07f6798-f771-4d8c-9735-31d5d91d2137" 
                            scrolling="yes" 
                            className="w-full h-[650px] border-none"
                            title="Setmore Booking Calendar"
                        />
                    </div>
                </div>
            </div>
        </section>
      </main>
      <PublicFooter />
    </div>
  );
}
