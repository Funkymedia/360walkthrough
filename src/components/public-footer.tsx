export default function PublicFooter() {
  return (
    <footer className="bg-card border-t">
      <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} 360 Walkthrough. All rights reserved.</p>
        <p className="mt-2 text-sm">Made with ❤️ by Funky Media Agency</p>
      </div>
    </footer>
  );
}
