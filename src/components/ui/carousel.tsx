import * as React from "react";
import { cn } from "@/lib/utils";

type CarouselApi = {
  selectedScrollSnap: () => number;
  scrollTo: (index: number) => void;
  on: (event: string, callback: () => void) => void;
};

type CarouselOptions = {
  loop?: boolean;
};

type CarouselProps = React.HTMLAttributes<HTMLDivElement> & {
  setApi?: (api: CarouselApi) => void;
  opts?: CarouselOptions;
};

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  ({ className, setApi, opts, children, ...props }, ref) => {
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [totalSlides, setTotalSlides] = React.useState(0);
    const carouselRef = React.useRef<HTMLDivElement>(null);

    const api: CarouselApi = React.useMemo(
      () => ({
        selectedScrollSnap: () => currentIndex,
        scrollTo: (index: number) => {
          if (opts?.loop && totalSlides > 0) {
            const newIndex = ((index % totalSlides) + totalSlides) % totalSlides;
            setCurrentIndex(newIndex);
          } else {
            const clampedIndex = Math.max(0, Math.min(index, totalSlides - 1));
            setCurrentIndex(clampedIndex);
          }
        },
        on: (event: string, callback: () => void) => {
          // Simple implementation - just call callback when index changes
          if (event === "select") {
            // This would be called when currentIndex changes
          }
        },
      }),
      [currentIndex, totalSlides, opts?.loop]
    );

    React.useEffect(() => {
      if (setApi) {
        setApi(api);
      }
    }, [api, setApi]);

    // Count total slides
    React.useEffect(() => {
      const carouselContent = carouselRef.current?.querySelector('[data-carousel-content]');
      if (carouselContent) {
        const slides = carouselContent.querySelectorAll('[data-carousel-item]');
        setTotalSlides(slides.length);
      }
    }, [children]);

    return (
      <div
        ref={ref}
        className={cn("relative overflow-hidden", className)}
        {...props}
      >
        <div ref={carouselRef} data-current-index={currentIndex}>
          {children}
        </div>
      </div>
    );
  }
);
Carousel.displayName = "Carousel";

const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  
  // Get current index from parent
  React.useEffect(() => {
    const parent = ref && 'current' in ref ? ref.current?.closest('[data-current-index]') : null;
    if (parent) {
      const index = parseInt(parent.getAttribute('data-current-index') || '0');
      setCurrentIndex(index);
    }
  });

  return (
    <div
      ref={ref}
      data-carousel-content
      className={cn("flex transition-transform duration-300 ease-in-out", className)}
      style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      {...props}
    >
      {children}
    </div>
  );
});
CarouselContent.displayName = "CarouselContent";

const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    data-carousel-item
    className={cn("min-w-0 shrink-0 grow-0 basis-full", className)}
    {...props}
  />
));
CarouselItem.displayName = "CarouselItem";

const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const carousel = e.currentTarget.closest('[data-current-index]');
    if (carousel) {
      const currentIndex = parseInt(carousel.getAttribute('data-current-index') || '0');
      const carouselContent = carousel.querySelector('[data-carousel-content]');
      const totalSlides = carouselContent?.querySelectorAll('[data-carousel-item]').length || 0;
      
      // Find the setApi function and call scrollTo
      // This is a simplified approach - in a real implementation you'd pass the api
      const newIndex = currentIndex > 0 ? currentIndex - 1 : totalSlides - 1;
      
      // Trigger a custom event that the Carousel component can listen to
      carousel.dispatchEvent(new CustomEvent('carousel-prev', { detail: { index: newIndex } }));
    }
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      className={cn(
        "absolute left-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-input bg-background flex items-center justify-center text-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="m15 18-6-6 6-6" />
      </svg>
    </button>
  );
});
CarouselPrevious.displayName = "CarouselPrevious";

const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, onClick, ...props }, ref) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const carousel = e.currentTarget.closest('[data-current-index]');
    if (carousel) {
      const currentIndex = parseInt(carousel.getAttribute('data-current-index') || '0');
      const carouselContent = carousel.querySelector('[data-carousel-content]');
      const totalSlides = carouselContent?.querySelectorAll('[data-carousel-item]').length || 0;
      
      const newIndex = currentIndex < totalSlides - 1 ? currentIndex + 1 : 0;
      
      carousel.dispatchEvent(new CustomEvent('carousel-next', { detail: { index: newIndex } }));
    }
    onClick?.(e);
  };

  return (
    <button
      ref={ref}
      className={cn(
        "absolute right-4 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full border border-input bg-background flex items-center justify-center text-sm hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      onClick={handleClick}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="m9 18 6-6-6-6" />
      </svg>
    </button>
  );
});
CarouselNext.displayName = "CarouselNext";

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
};
