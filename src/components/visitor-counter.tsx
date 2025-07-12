'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

export default function VisitorCounter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Initialize with a random-ish number to simulate existing traffic
    // This runs only on the client to avoid hydration mismatch
    const initialCount = Math.floor(Date.now() / 10000) % 1000 + 1500;
    setCount(initialCount);
  }, []);

  return (
    <div className="flex flex-col items-start md:items-center text-left md:text-center">
        <h4 className="font-semibold text-foreground/90 mb-3 flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Visitor Count
        </h4>
        <div className="font-code text-2xl font-bold text-primary bg-secondary/50 px-4 py-2 rounded-md border border-border/50">
            {count > 0 ? count.toLocaleString() : '...'}
            <span className="inline-block w-0.5 h-[1em] ml-1 bg-foreground animate-blink-cursor" style={{ verticalAlign: 'text-bottom' }}></span>
        </div>
        <p className="text-xs text-muted-foreground mt-2">Thanks for stopping by!</p>
    </div>
  );
}
