'use client';

import { Github, Linkedin, Mail, Instagram, Phone } from 'lucide-react';
import VisitorCounter from './visitor-counter';

const socialLinks = [
  {
    name: 'GitHub',
    icon: Github,
    url: 'https://github.com/yashwanth-janke',
  },
  {
    name: 'LinkedIn',
    icon: Linkedin,
    url: 'https://www.linkedin.com/in/yashwanth-reddy-j/',
  },
  {
    name: 'Instagram',
    icon: Instagram,
    url: 'https://instagram.com',
  }
];

const contactDetails = [
    {
        name: 'Email',
        icon: Mail,
        value: 'yashwanthjanke@gmail.com',
        href: 'mailto:yashwanthjanke@gmail.com',
    },
    {
        name: 'Phone',
        icon: Phone,
        value: '+91 8555959626',
        href: 'tel:+918555959626',
    }
];

export default function Footer() {
  return (
    <footer id="contact" className="bg-background border-t">
      <div className="container mx-auto max-w-screen-xl px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          
          <div className="col-span-1 flex flex-col items-start text-left">
             <h3 className="font-headline text-lg font-bold">Yashwanth</h3>
             <p className="text-muted-foreground text-sm mt-2 max-w-xs">An AI-focused Engineer building the future, one line of code at a time.</p>
          </div>
          
          <div className="col-span-1 md:justify-self-center">
             <VisitorCounter />
          </div>

          <div className="col-span-1 flex flex-col items-start md:items-end text-left md:text-right">
            <h4 className="font-semibold text-foreground/90 mb-3">Connect with me</h4>
            <div className="flex md:justify-end space-x-4">
              {socialLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label={link.name} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
            <div className="mt-4 space-y-2 text-sm">
              {contactDetails.map((detail) => (
                <a 
                  key={detail.name}
                  href={detail.href}
                  className="flex items-center justify-start md:justify-end gap-2 text-muted-foreground hover:text-primary transition-colors"
                >
                  <detail.icon className="h-4 w-4" />
                  <span>{detail.value}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 pt-8 border-t border-border/50 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Yashwanth. All Rights Reserved. </p>
        </div>
      </div>
    </footer>
  );
}
