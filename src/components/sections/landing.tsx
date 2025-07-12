
'use client';

import { useState, useEffect, useRef } from 'react';
import AnimatedText from '@/components/animated-text';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { Skeleton } from '@/components/ui/skeleton';
import { Github, Linkedin } from 'lucide-react';
import Image from 'next/image';

const profileLinks = [
    { name: 'GitHub', icon: Github, url: 'https://github.com/yashwanth-janke', bgClass: 'bg-white', iconClass: 'text-black' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/yashwanth-reddy-j/', bgClass: 'bg-[#0077B5]', iconClass: 'text-white' },
    { name: 'LeetCode', imageUrl: '/images/leetcode.png', url: 'https://leetcode.com/u/yashwanth__reddy/', bgClass: 'bg-black' },
    { name: 'CodeChef', imageUrl: '/images/codechef.png', url: 'https://www.codechef.com/users/yashwanthjanke', bgClass: 'bg-white' },
];


// Desktop Content
const command = './launch_yashwanth.sh';

const bootMessages = [
  'Booting up...',
];

const finalMessage = {
  title: '> incoming_message',
  part1: `Hey, I’m `,
  name: `Yashwanth`,
  part2: `. A final year student with a 9.64 CGPA (not flexing... okay, maybe a little).
My modules include: AI Engineering, Software Development, Mentorship, and a healthy dose of Memes.
I code, I teach, I build, I break (intentionally... sometimes).`,
};

// Mobile Content
const mobileConversation = [
    { speaker: 'Terminal', text: 'User identity?' },
    { speaker: 'Me', text: 'Yashwanth. Final year student.' },
    { speaker: 'Terminal', text: 'Credentials?' },
    { speaker: 'Me', text: '9.64 CGPA... not flexing... okay, maybe a little.' },
    { speaker: 'Terminal', text: 'Active modules?' },
    { speaker: 'Me', text: '- AI Engineering\n- Software Development\n- Mentorship\n- Memes (critical)' },
    { speaker: 'Terminal', text: 'Primary directive?' },
    { speaker: 'Me', text: 'I code, I teach, I build, I break (for science).' },
];

export default function LandingSection() {
  const isMobile = useIsMobile();

  // Desktop State
  const [commandFinished, setCommandFinished] = useState(false);
  const [displayedBootLines, setDisplayedBootLines] = useState(0);
  const [bootSequenceFinished, setBootSequenceFinished] = useState(false);
  const [showProfileLinks, setShowProfileLinks] = useState(false);
  const commandDuration = (command.length + 1) * 100 + 300;
  
  // Mobile State
  const [conversationLines, setConversationLines] = useState<(typeof mobileConversation)>([]);
  const conversationIndexRef = useRef(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Desktop Effects
  useEffect(() => {
    if (isMobile === false) {
      const timer = setTimeout(() => {
        setCommandFinished(true);
      }, commandDuration);
      return () => clearTimeout(timer);
    }
  }, [commandDuration, isMobile]);

  useEffect(() => {
    if (commandFinished && isMobile === false) {
      const interval = setInterval(() => {
        setDisplayedBootLines((prev) => {
          if (prev < bootMessages.length) {
            return prev + 1;
          }
          clearInterval(interval);
          setTimeout(() => setBootSequenceFinished(true), 200);
          return prev;
        });
      }, 400);
      return () => clearInterval(interval);
    }
  }, [commandFinished, isMobile]);
  
  useEffect(() => {
    if (bootSequenceFinished && isMobile === false) {
      const timer = setTimeout(() => {
        setShowProfileLinks(true);
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [bootSequenceFinished, isMobile]);


  // Mobile Effect
  useEffect(() => {
    const clearConversationTimeout = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };

    if (isMobile) {
      setConversationLines([]);
      setShowProfileLinks(false);
      conversationIndexRef.current = 0;
      clearConversationTimeout();

      const addLine = () => {
        if (conversationIndexRef.current < mobileConversation.length) {
          const currentLineData = mobileConversation[conversationIndexRef.current];
          setConversationLines(prev => [...prev, currentLineData]);
          
          conversationIndexRef.current++;

          if (conversationIndexRef.current < mobileConversation.length) {
            const nextLineData = mobileConversation[conversationIndexRef.current];
            const currentSpeaker = currentLineData.speaker;
            const currentLineText = currentLineData.text;

            let delay;
            if(currentSpeaker === 'Terminal') {
              delay = (currentLineText.length * 50) + 800;
            } else {
              delay = 800;
            }
            timeoutRef.current = setTimeout(addLine, delay);
          } else {
             // Conversation is over, show icons
             timeoutRef.current = setTimeout(() => {
                 setShowProfileLinks(true);
             }, 800);
          }
        }
      };
      timeoutRef.current = setTimeout(addLine, 500);
    } else {
      setConversationLines([]);
      setShowProfileLinks(false);
      conversationIndexRef.current = 0;
      clearConversationTimeout();
    }
    return () => {
      clearConversationTimeout();
    };
  }, [isMobile]);


  // Hydration Guard
  if (isMobile === undefined) {
    return (
        <section id="home" className="relative min-h-[calc(100vh-5rem)] w-full flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-grid-pattern bg-repeat -z-10 opacity-60"></div>
            <Card className="w-full max-w-5xl bg-background/80 backdrop-blur-sm shadow-2xl border border-border/20 glass-card">
                <div className="flex items-center justify-start gap-2 p-3 border-b border-border/20">
                    <div className="flex gap-1.5">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                        <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <p className="ml-4 text-xs text-muted-foreground font-code">/home/yashwanth</p>
                </div>
                <div className="p-6 md:p-8">
                    <Skeleton className="h-6 w-1/2" />
                    <Skeleton className="h-4 w-3/4 mt-4" />
                    <Skeleton className="h-4 w-full mt-2" />
                    <Skeleton className="h-4 w-2/3 mt-2" />
                </div>
            </Card>
        </section>
    );
  }
  
  const ProfileLinks = () => (
    <div className="mt-4 flex items-center gap-4 animate-fade-in">
        <p className="text-primary font-code text-sm">profiles:</p>
        {profileLinks.map((link, index) => (
            <a 
                href={link.url}
                key={link.name}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                    "p-1.5 rounded-md transition-all duration-300 hover:-translate-y-1 hover:scale-110 flex items-center justify-center w-8 h-8 animate-fade-in", 
                    link.bgClass
                )}
                style={{ animationDelay: `${index * 200}ms` }}
                aria-label={link.name}
            >
                {'icon' in link && <link.icon className={cn("h-5 w-5", link.iconClass)} />}
                {'imageUrl' in link && <Image src={link.imageUrl} alt={link.name} width={20} height={20} />}
            </a>
        ))}
    </div>
  );

  const renderDesktop = () => (
    <>
      <div className="flex items-center">
        <span className="text-primary text-lg mr-1">~$&nbsp;</span>
        <AnimatedText text={command} />
      </div>
      {commandFinished && (
        <div className="mt-4 space-y-1">
          {bootMessages.slice(0, displayedBootLines).map((line, index) => (
            <p key={index} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <span className={cn(line.startsWith('[✓]') && 'text-primary')}>
                {line.startsWith('[✓]') ? '[✓] ' : ''}
              </span>
              {line.replace('[✓] ', '')}
            </p>
          ))}
        </div>
      )}
      {bootSequenceFinished && (
        <div className="mt-6 animate-fade-in">
          <p className="text-primary">{finalMessage.title}</p>
          <p className="mt-2 text-muted-foreground whitespace-pre-wrap">
            {finalMessage.part1}
            <strong className="font-bold text-foreground/90">{finalMessage.name}</strong>
            {finalMessage.part2}
          </p>
        </div>
      )}
      {showProfileLinks && <ProfileLinks />}
    </>
  );

  const renderMobile = () => (
    <>
      {conversationLines.map((line, index) => {
        const isLastLine = index === conversationLines.length - 1 && conversationIndexRef.current > mobileConversation.length -1;
        const isTerminal = line.speaker === 'Terminal';
        
        return (
          <div key={index} className="mt-4 animate-fade-in whitespace-pre-wrap">
            {isTerminal ? (
              <div>
                <span className="text-primary font-bold">Terminal: </span>
                {isLastLine ? <AnimatedText text={line.text} className="text-muted-foreground" /> : <span className="text-muted-foreground">{line.text}</span>}
              </div>
            ) : (
              <div>
                <span className="font-bold text-foreground/90">Me: </span>
                <span className="text-muted-foreground">{line.text}</span>
              </div>
            )}
          </div>
        );
      })}
       {showProfileLinks && <ProfileLinks />}
    </>
  );

  return (
    <section 
      id="home" 
      className="relative min-h-[calc(100vh-5rem)] w-full flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-grid-pattern bg-repeat -z-10 opacity-60"></div>
      
      <Card className={cn(
        "bg-background/80 backdrop-blur-sm shadow-2xl animate-fade-in-up border border-border/20 glass-card",
        isMobile ? "w-full max-w-md" : "w-full max-w-5xl"
      )}>
        <div className="flex items-center justify-start gap-2 p-3 border-b border-border/20">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <p className="ml-4 text-xs text-muted-foreground font-code">/home/yashwanth</p>
        </div>
        <div className="p-6 text-left font-code text-sm leading-relaxed">
          {isMobile ? renderMobile() : renderDesktop()}
        </div>
      </Card>
    </section>
  );
}
