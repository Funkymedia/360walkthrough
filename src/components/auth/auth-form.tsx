'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';
import Logo from '../Logo';

interface AuthFormProps {
  type: 'login' | 'signup';
}

export default function AuthForm({ type }: AuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    // Mock authentication
    setTimeout(() => {
      router.push('/dashboard');
    }, 1000);
  };

  const title = type === 'login' ? 'Welcome Back' : 'Create an Account';
  const description =
    type === 'login'
      ? 'Enter your credentials to access your account.'
      : 'Fill in the details below to get started.';
  const buttonText = type === 'login' ? 'Log In' : 'Sign Up';
  const footerText =
    type === 'login' ? "Don't have an account?" : 'Already have an account?';
  const footerLink = type === 'login' ? '/signup' : '/login';
  const footerLinkText = type === 'login' ? 'Sign up' : 'Log in';

  return (
    <Card className="w-full max-w-sm shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto mb-4">
          <Logo />
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-4">
          {type === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input id="name" type="text" placeholder="John Doe" required />
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {buttonText}
          </Button>
          <p className="text-sm text-muted-foreground">
            {footerText}{' '}
            <Link href={footerLink} className="font-medium text-primary hover:underline">
              {footerLinkText}
            </Link>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
