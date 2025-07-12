'use client';

import { FileText, Crown, Lightbulb, Trophy, Target } from 'lucide-react';

const miscItems = [
  {
    icon: FileText,
    title: 'Authored a Machine Learning Research Paper',
    description: 'DOI: 10987490',
    year: '2025',
  },
  {
    icon: Crown,
    title: 'President at ReLU',
    description: 'Leading the official AIML Tech Club of the college.',
    year: 'Nov 2024 - Present',
  },
  {
    icon: Lightbulb,
    title: 'Mentor at Reliance Foundation',
    description: 'Guiding students in AI/ML, focusing on project development and academic growth.',
    year: 'Aug 2024 - Present',
  },
  {
    icon: Trophy,
    title: 'Hackathon Finalist',
    description: 'Finalist in HackTank-The BizTech Hackathon (conducted by IIT Kharagpur.)',
    year: '2025',
  },
  {
    icon: Target,
    title: 'Amazon ML Challenge',
    description: 'Secured a rank of 250 (Out of 19,000+ teams) in Amazon ML Challenge 2024',
    year: '2024',
  },
];

const MiscCard = ({ icon: Icon, title, description, year }: { icon: React.ElementType, title: string, description: string, year: string }) => (
  <div className="border border-border/50 rounded-lg p-4 w-full text-left transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 bg-card/50 backdrop-blur-md shadow-lg hover:shadow-primary/20 glass-card">
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Icon className="h-7 w-7 text-primary flex-shrink-0" />
        <div>
          <h3 className="font-bold font-headline text-base md:text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground mt-0.5">{description}</p>
        </div>
      </div>
      <span className="hidden md:block text-xs font-semibold text-muted-foreground whitespace-nowrap ml-4">{year}</span>
    </div>
  </div>
);


export default function MiscellaneousSection() {
  return (
    <section id="miscellaneous" className="py-16 md:py-24 bg-background border-t">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">Miscellaneous</h2>
          <p className="mt-4 text-lg text-muted-foreground">Other achievements and involvements.</p>
        </div>
        <div className="grid grid-cols-1 gap-6">
            {miscItems.map((item, index) => (
                <MiscCard key={index} icon={item.icon} title={item.title} description={item.description} year={item.year} />
            ))}
        </div>
      </div>
    </section>
  );
}
