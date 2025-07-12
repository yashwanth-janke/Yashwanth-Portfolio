
'use client';

import * as React from 'react';
import Image from 'next/image';
import { GraduationCap, Briefcase, Zap, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const aboutContent = [
    {
        icon: GraduationCap,
        title: 'So, Who Even Am I?',
        imageUrl: '/images/1.png',
        imageHint: 'student university',
        items: [
          {
            question: 'Where am I right now?',
            answer: 'Living the student life at Amrita Vishwa Vidyapeetham, 3rd year, Batch of 2026. Yep, still surviving.',
          },
          {
            question: 'What’s the scoreboard say?',
            answer: 'CGPA? 9.64—surprised me too. 😄',
          },
          {
            question: 'What am I studying?',
            answer: 'B.Tech in Computer Science, specialized in Artificial Intelligence & Machine Learning. Basically, I’m teaching machines to think… while trying to think straight myself.',
          },
          {
            question: 'Coursework I’ve enjoyed (and endured):',
            answer: 'ML, DL, Pythonic chaos, Data structures, and all that brainy buffet. Some made me cry, others made me curious.',
          },
          {
            question: 'What keeps me going?',
            answer: 'Learning cool things. Building cooler stuff. And somehow passing with flying colors.',
          },
        ],
    },
    {
        icon: Briefcase,
        title: 'Internship? Yep, Did That.',
        imageUrl: '/images/3.jpeg',
        imageHint: 'corporate office',
        items: [
          { question: 'Where?', answer: 'GE Healthcare. Fancy name? Yes. Fancy work? Oh yeah.' },
          {
            question: 'What did I do there?',
            answer: 'No, I didn’t fetch coffee. I worked on real things—the kind that affect real people’s lives. AI, healthcare, decision systems—you name it.',
          },
          {
            question: 'Was it all smooth sailing?',
            answer: 'Not even close. Debugging code at 2 AM, battling with models that refused to converge, learning from brilliant minds… it was intense.',
          },
          {
            question: 'What did I learn?',
            answer: 'That AI isn’t just “cool tech”—it’s powerful. It can save time, money, and even lives. And also… Jira is everywhere.',
          },
          { question: 'Would I do it again?', answer: 'In a heartbeat. Internships like these teach you things no classroom ever will.' },
        ],
    },
    {
        icon: Zap,
        title: 'My ReLU Era ⚡',
        imageUrl: '/images/1.png',
        imageHint: 'public speaking conference',
        items: [
          {
            question: 'What’s ReLU?',
            answer: 'It’s not just an activation function. It’s the AI club where all the real action happens. And I’m currently running the show as President.',
          },
          {
            question: 'What do I even do there?',
            answer: 'Mentor students, lead AI projects, host workshops, create chaos—and then fix it. 😎',
          },
          {
            question: 'Workshops? Like what?',
            answer: 'Loads. From “Intro to AI” to “Let’s Build This Together” kind of sessions. I teach, but I learn twice as much.',
          },
          {
            question: 'Why do I love it?',
            answer: 'Because it’s people. It’s passion. It’s seeing someone go from “what’s a neural network?” to building their first model.',
          },
          {
            question: 'What makes it special?',
            answer: 'I’m not just leading—I’m growing with a tribe that loves tech and fun as much as I do.',
          },
        ],
    },
];

const TimelineCard = ({ item, index, className }: { item: { question: string, answer: string }, index: number, className?: string }) => (
  <div 
    className={cn(
      "p-5 rounded-xl bg-card/50 border border-border/50 backdrop-blur-md shadow-xl transition-all duration-300 hover:border-primary/20 hover:shadow-primary/20 w-full animate-fade-in-up",
      className
    )}
    style={{ animationDelay: `${index * 150}ms` }}
  >
    <h4 className="font-semibold text-base md:text-lg text-foreground/90 mb-2">{item.question}</h4>
    <p className="text-muted-foreground text-sm md:text-base leading-relaxed">{item.answer}</p>
  </div>
);


export default function AboutSection() {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % aboutContent.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + aboutContent.length) % aboutContent.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const CarouselDots = () => (
    <div className="flex justify-center items-center gap-4">
      {aboutContent.map((_, index) => (
        <button
          key={index}
          onClick={() => goToSlide(index)}
          className={cn(
            "w-2.5 h-2.5 rounded-full transition-all duration-300",
            currentSlide === index ? "p-1.5 bg-primary scale-125" : "bg-muted hover:bg-muted/80 border border-foreground/20"
          )}
          aria-label={`Go to section ${index + 1}`}
        ></button>
      ))}
    </div>
  );

  const slide = aboutContent[currentSlide];

  return (
    <section id="about" className="w-full py-16 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto max-w-screen-xl px-4">
        
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">About Me</h2>
          <div className="mt-6">
            <CarouselDots />
          </div>
        </div>

        <div className="relative">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start py-8">
            
            {/* Image Column */}
            <div className={cn("w-full h-full flex items-center justify-center", currentSlide % 2 !== 0 && "md:order-2")}>
              <div className="relative w-full max-w-sm h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-2xl mx-auto">
                <Image
                  src={slide.imageUrl}
                  alt={slide.title}
                  fill={true}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{objectFit: 'cover'}}
                  data-ai-hint={slide.imageHint}
                  className="transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>
            </div>
            
            {/* Timeline Column */}
            <div className={cn("flex flex-col space-y-8", currentSlide % 2 !== 0 && "md:order-1")}>
               <div className="flex items-center gap-4 self-start">
                  <div className="p-3 bg-secondary border border-primary/30 rounded-full text-primary">
                      <slide.icon className="w-6 h-6"/>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground font-headline">{slide.title}</h3>
              </div>

              <div className="relative w-full py-4">
                {/* Desktop Timeline */}
                <div className="hidden md:block absolute top-3 left-1/2 -translate-x-1/2 w-1 h-full bg-secondary after:absolute after:inset-0 after:bg-gradient-to-b after:from-primary after:via-[hsl(var(--cyan-accent))] after:to-transparent after:rounded-full after:shadow-primary-glow"></div>
                <div className="hidden md:block space-y-12">
                    {slide.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="relative flex items-start">
                        <div className="z-10 absolute left-1/2 top-1 -translate-x-1/2 w-7 h-7 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_2px_hsl(var(--primary)/0.7)]"></div>
                        </div>
                        <div className={cn(
                          "w-[calc(50%-2rem)]", 
                          itemIndex % 2 === 0 ? 'mr-[calc(50%+2rem)]' : 'ml-[calc(50%+2rem)]'
                        )}>
                          <TimelineCard item={item} index={itemIndex} className={itemIndex % 2 === 0 ? 'text-right' : 'text-left'} />
                        </div>
                    </div>
                    ))}
                </div>

                {/* Mobile Timeline */}
                <div className="md:hidden relative w-full">
                  <div className="absolute top-3 left-[14px] -translate-x-1/2 w-1 h-full bg-secondary after:absolute after:inset-0 after:bg-gradient-to-b after:from-primary after:via-[hsl(var(--cyan-accent))] after:to-transparent after:rounded-full after:shadow-primary-glow"></div>
                    <div className="space-y-12">
                        {slide.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="relative flex items-start">
                              <div className="z-10 absolute left-[14px] top-1 -translate-x-1/2 w-7 h-7 rounded-full bg-background border-2 border-primary flex items-center justify-center">
                                  <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_2px_hsl(var(--primary)/0.7)]"></div>
                              </div>
                              <div className="w-full pl-12">
                                <TimelineCard item={item} index={itemIndex} className="text-left" />
                              </div>
                          </div>
                        ))}
                    </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-secondary/50 border border-border/50 text-foreground hover:bg-accent hover:text-accent-foreground hidden md:flex items-center justify-center"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 h-8 w-8 rounded-full bg-secondary/50 border border-border/50 text-foreground hover:bg-accent hover:text-accent-foreground hidden md:flex items-center justify-center"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-8">
            <CarouselDots />
        </div>

      </div>
    </section>
  );
}
