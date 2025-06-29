import Link from 'next/link';

const Logo = () => {
  return (
    <Link href="/" className="flex items-center gap-2 text-foreground" aria-label="360 Walkthrough Home">
      {/*
        ============================================================
        === PASTE YOUR SVG CODE HERE                             ===
        ============================================================
        Replace the <div> below with your own SVG code.
        To ensure it sizes correctly, give it a className like so:
        <svg className="h-10 w-auto" ... >

        Example:
        <svg
          className="h-10 w-auto"
          viewBox="0 0 170 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
         ... your path data ...
        </svg>
        ============================================================
      */}
      <div className="h-10 w-auto border-2 border-dashed rounded-md px-4 flex items-center justify-center">
        <span className="font-semibold text-muted-foreground">Logo</span>
      </div>
    </Link>
  );
};

export default Logo;
