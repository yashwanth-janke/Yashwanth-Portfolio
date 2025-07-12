'use client';

import { useState } from 'react';
import { Menu, X, Code, FileText, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from './theme-toggle';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';

const navLinks = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#miscellaneous', label: 'Miscellaneous' },
  { href: '#contact', label: 'Contact' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-20 max-w-screen-xl items-center justify-between px-4 mx-auto">
          {/* Left Side: Logo */}
          <div className="flex items-center">
            <a href="#home" className="flex items-center space-x-2 transition-opacity hover:opacity-80">
              <Code className="h-6 w-6" />
              <span className="font-bold">Yashwanth</span>
            </a>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-primary relative after:absolute after:bottom-[-2px] after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition-transform after:duration-300 after:ease-out hover:after:origin-bottom-left hover:after:scale-x-100"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Side: Actions */}
          <div className="flex items-center space-x-3">
              <Button onClick={() => setIsResumeOpen(true)} variant="outline" size="sm" className="hidden md:flex">
                  <FileText className="mr-2 h-4 w-4" />
                  Resume
              </Button>
              
              <ThemeToggle />

              <div className="md:hidden">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleMenu}
                    aria-label="Toggle menu"
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border/40">
            <div className="container flex flex-col items-center space-y-4 py-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="w-full rounded-md p-2 text-center text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                  onClick={toggleMenu}
                >
                  {link.label}
                </a>
              ))}
              <button
                className="w-full rounded-md p-2 text-center text-lg font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                onClick={() => {
                  setIsResumeOpen(true);
                  toggleMenu();
                }}
              >
                Resume
              </button>
            </div>
          </div>
        )}
      </header>

      <Dialog open={isResumeOpen} onOpenChange={setIsResumeOpen}>
        <DialogContent className="max-w-5xl w-full h-[95vh] p-0 flex flex-col shadow-none sm:rounded-md">
          <DialogHeader className="p-2 border-b flex flex-row items-center justify-between">
            <DialogTitle>My Resume</DialogTitle>
          </DialogHeader>
          <div className="flex-1 bg-muted/20">
            <iframe src="/resume.pdf" className="w-full h-full" title="Yashwanth Resume" />
          </div>
          <DialogFooter className="p-2 border-t bg-background flex flex-row justify-between w-full">
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
            <Button asChild>
              <a href="/resume.pdf" download="Yashwanth-Resume.pdf">
                <Download className="mr-2 h-4 w-4" />
                Download
              </a>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
