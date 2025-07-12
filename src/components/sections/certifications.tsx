
'use client';

import { Award, Cloud, BrainCircuit, ShieldCheck, ExternalLink, CloudCog, Bot } from 'lucide-react';

const certifications = [
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    icon: Cloud,
    url: '#',
  },
  {
    name: 'Salesforce Certified Administrator',
    issuer: 'Salesforce',
    icon: ShieldCheck,
    url: '#',
  },
  {
    name: 'Deep Learning Specialization',
    issuer: 'DeepLearning.AI',
    icon: BrainCircuit,
    url: '#',
  },
   {
    name: 'TensorFlow Developer Certificate',
    issuer: 'Google',
    icon: Award,
    url: '#',
  },
  {
    name: 'Google Professional Cloud Architect',
    issuer: 'Google Cloud',
    icon: CloudCog,
    url: '#',
  },
  {
    name: 'Microsoft Certified: Azure AI Fundamentals',
    issuer: 'Microsoft',
    icon: Bot,
    url: '#',
  },
];

const CertificationCard = ({ name, issuer, icon: Icon, url }: { name: string; issuer: string; icon: React.ElementType; url: string }) => (
  <div className="border border-border rounded-lg p-4 w-full text-left space-y-3 transition-all duration-300 hover:shadow-xl hover:border-primary/50 hover:-translate-y-1 bg-card">
    <div className="flex items-center gap-4">
      <Icon className="h-7 w-7 text-primary flex-shrink-0" />
      <div>
        <h3 className="text-base font-bold font-headline leading-tight">{name}</h3>
        <p className="text-sm text-muted-foreground">Issued by {issuer}</p>
      </div>
    </div>
    <div className="pt-3 border-t border-border/50">
        <a 
            href={url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
            Show Credential <ExternalLink size={16} />
        </a>
    </div>
  </div>
);


export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-16 md:py-24 bg-background border-t">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">My Certifications</h2>
          <p className="mt-4 text-lg text-muted-foreground">A testament to my dedication and expertise.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, index) => (
                <CertificationCard key={index} name={cert.name} issuer={cert.issuer} icon={cert.icon} url={cert.url} />
            ))}
        </div>
      </div>
    </section>
  );
}
