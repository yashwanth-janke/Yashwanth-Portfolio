'use client';

import { useState, useEffect, type CSSProperties } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTextProps {
  text: string;
  className?: string;
  cursorClassName?: string;
}

export default function AnimatedText({ text, className, cursorClassName }: AnimatedTextProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText('');
    setIsComplete(false);
    let i = 0;
    const intervalId = setInterval(() => {
      if (i <= text.length) {
        setDisplayedText(text.substring(0, i));
        i++;
      } else {
        clearInterval(intervalId);
        setIsComplete(true);
      }
    }, 100);

    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <span className={cn(className)}>
      {displayedText}
      <span
        className={cn(
          "inline-block w-0.5 h-[1em] ml-1 bg-foreground animate-blink-cursor",
          isComplete && 'hidden', // You can also use 'animate-none' if you want it to stay
          cursorClassName
        )}
        style={{ verticalAlign: 'text-bottom' }}
      ></span>
    </span>
  );
}
