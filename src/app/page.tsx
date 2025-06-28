import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UploadCloud, Sparkles, Building, PanelTop } from 'lucide-react';
import Logo from '@/components/Logo';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Logo />
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </nav>
      </header>

      <main className="flex-grow">
        <section className="py-20 md:py-32">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-primary mb-6">
              Create Stunning 360° Virtual Tours
            </h1>
            <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground mb-10">
              360 Walkthrough helps you build and share immersive property experiences. Upload your 360° photos and floor plans, and let our AI do the heavy lifting.
            </p>
            <Button size="lg" asChild>
              <Link href="/signup">Get Started for Free</Link>
            </Button>
          </div>
        </section>

        <section className="bg-white py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">Powerful Features, Simplified</h2>
              <p className="max-w-2xl mx-auto text-muted-foreground mt-4">
                Everything you need to create professional virtual tours that captivate and convert.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <UploadCloud className="h-8 w-8" />
                  </div>
                  <CardTitle className="mt-4">Easy 360° Uploads</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Quickly upload images from your Ricoh 360 cameras and other sources. Our platform optimizes them for a smooth viewing experience.</p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <Sparkles className="h-8 w-8" />
                  </div>
                  <CardTitle className="mt-4">AI-Powered Tagging</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Our AI automatically generates descriptive tags for your images, saving you time and improving searchability.</p>
                </CardContent>
              </Card>
              <Card className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit">
                    <PanelTop className="h-8 w-8" />
                  </div>
                  <CardTitle className="mt-4">Floor Plan Integration</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Upload floor plans to give a complete spatial context to your virtual tours, linking photos to specific rooms.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary">Ready to Weave Your First Tour?</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground mt-4 mb-8">
              Sign up today and start creating virtual tours that leave a lasting impression.
            </p>
            <Button size="lg" variant="default" asChild>
              <Link href="/signup">Sign Up Now</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-white border-t">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} 360 Walkthrough. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
