
'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink } from "lucide-react";
import { cn } from '@/lib/utils';

type Project = {
  title: string;
  description: string;
  techStack: string[];
  features: string[];
  links: {
    github?: string;
    demo?: string;
  };
};

type ProjectCategory = {
  name: string;
  projects: Project[];
};

const projectCategories: ProjectCategory[] = [
  {
    name: "Gen AI/LLM",
    projects: [
      {
        title: "Ouroboros",
        description: "Generates exam papers for AKTU sessionals and PUT using AI.",
        techStack: ["Next.js", "TypeScript", "ShadcnUI", "Genkit", "Gemini"],
        features: [
          "Give the assignments PDF to generate the paper from.",
          "Can use provided web page links to generate the paper.",
          "Paper format can be changed.",
        ],
        links: {
          github: "https://github.com",
          demo: "https://github.com",
        },
      },
      {
        title: "AI Story Generator",
        description: "A web app that generates short stories based on user prompts using a fine-tuned LLM.",
        techStack: ["React", "Node.js", "Hugging Face", "Firebase"],
        features: [
          "Choose from different genres.",
          "Control story length and style.",
          "Save and share generated stories.",
        ],
        links: {
          github: "https://github.com",
        },
      },
    ],
  },
  {
    name: "ML & Data Science",
    projects: [
      {
        title: "Neural Style Transfer",
        description: "An implementation of NST to blend content and style images using deep neural networks.",
        techStack: ["Python", "TensorFlow", "OpenCV", "Matplotlib"],
        features: [
          "Transfers artistic style from one image to another.",
          "Uses VGG19 for feature extraction.",
          "Optimizes content and style loss functions.",
        ],
        links: {
          github: "https://github.com",
        },
      },
      {
        title: "Sentiment Analysis Engine",
        description: "A robust NLP model to classify text sentiment with high accuracy using transformer architecture.",
        techStack: ["Python", "PyTorch", "Hugging Face Transformers", "Scikit-learn"],
        features: [
          "Achieves over 95% accuracy on benchmark datasets.",
          "Handles nuances like sarcasm and irony.",
          "REST API for easy integration.",
        ],
        links: {
          github: "https://github.com",
        },
      },
    ],
  },
  {
    name: "Software Development",
    projects: [
      {
        title: "E-commerce Platform API",
        description: "A full-featured backend for an e-commerce website with user auth, product management, and order processing.",
        techStack: ["Node.js", "Express", "MongoDB", "JWT", "Stripe API"],
        features: [
          "Secure user authentication and authorization.",
          "Complete CRUD operations for products.",
          "Integration with Stripe for payments.",
        ],
        links: {
          github: "https://github.com",
        },
      },
      {
        title: "Real-time Chat Application",
        description: "A full-stack chat application enabling users to communicate in real-time private or group channels.",
        techStack: ["React", "Socket.IO", "Node.js", "Express", "Redis"],
        features: [
          "Real-time messaging with WebSockets.",
          "User authentication and presence indicators.",
          "Scalable channel architecture with Redis pub/sub."
        ],
        links: {
          github: "https://github.com"
        }
      }
    ],
  },
  {
    name: "Cloud",
    projects: [
      {
        title: "Serverless Data Processing Pipeline",
        description: "An AWS-based pipeline that processes uploaded images, extracts metadata, and stores it in a database.",
        techStack: ["AWS Lambda", "S3", "API Gateway", "DynamoDB", "Python"],
        features: [
          "Event-driven architecture using S3 triggers.",
          "Scales automatically with demand.",
          "Cost-effective pay-per-use model.",
        ],
        links: {
          github: "https://github.com",
        },
      },
       {
        title: "CI/CD Pipeline for Containerized App",
        description: "A fully automated CI/CD pipeline to build, test, and deploy a containerized web application to a Kubernetes cluster.",
        techStack: ["Docker", "Kubernetes", "Jenkins", "GitHub Actions", "GKE"],
        features: [
          "Automated builds and containerization with Docker.",
          "Blue/green deployments on Google Kubernetes Engine (GKE).",
          "Automated testing stages for quality assurance."
        ],
        links: {
          github: "https://github.com"
        }
      }
    ],
  },
];

const ProjectCard = ({ project }: { project: Project }) => (
  <div className="border border-border/50 rounded-lg p-6 w-full text-left space-y-4 transition-all duration-300 hover:border-primary hover:-translate-y-1 bg-card/50 backdrop-blur-md shadow-lg">
    <h3 className="text-xl font-bold font-headline">{project.title}</h3>
    <p className="text-muted-foreground">{project.description}</p>
    
    <div>
      <h4 className="font-semibold mb-2">Tech Stack:</h4>
      <div className="flex flex-wrap gap-2">
        {project.techStack.map((tech) => (
          <Badge key={tech} variant="outline" className="font-mono border-primary">{tech}</Badge>
        ))}
      </div>
    </div>

    <div>
      <h4 className="font-semibold mb-2">Features:</h4>
      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
        {project.features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
    </div>
    
    <div className="border-t border-border pt-4 flex items-center gap-4">
      {project.links.github && (
        <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-sm text-primary hover:text-primary/80 transition-colors">
          <Github size={16} /> GitHub
        </a>
      )}
      {project.links.demo && (
         <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 font-semibold text-sm text-primary hover:text-primary/80 transition-colors">
          <ExternalLink size={16} /> Demo
        </a>
      )}
    </div>
  </div>
);


export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState(projectCategories[0].name);

  const getCategoryTechStack = (projects: Project[]) => {
    const techSet = new Set<string>();
    projects.forEach((project) => {
      project.techStack.forEach((tech) => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  };

  return (
    <section id="projects" className="py-16 md:py-24 bg-background border-t">
      <div className="container mx-auto max-w-screen-xl px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl font-headline">My Projects</h2>
          <p className="mt-4 text-lg text-muted-foreground">A selection of my work across different domains.</p>
        </div>

        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          {/* Mobile Dropdown */}
          <div className="md:hidden mb-6">
            <Select onValueChange={setActiveCategory} defaultValue={activeCategory}>
              <SelectTrigger className="w-full text-base py-6 border-2 border-border focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:border-primary">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {projectCategories.map((category) => (
                  <SelectItem key={category.name} value={category.name} className="text-base py-2">
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          {/* Desktop Tabs */}
          <TabsList className="hidden md:grid w-full max-w-3xl mx-auto grid-cols-2 md:grid-cols-4 mb-8 h-auto bg-transparent p-0 gap-4">
            {projectCategories.map((category) => (
              <TabsTrigger
                key={category.name}
                value={category.name}
                className="py-2.5 px-4 text-sm font-semibold border-2 border-border rounded-lg data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary transition-all duration-300 hover:bg-accent/50 hover:border-primary/50 hover:-translate-y-0.5 hover:shadow-lg"
              >
                {category.name}
              </TabsTrigger>
            ))}
          </TabsList>
          
          {projectCategories.map((category) => (
            <TabsContent key={category.name} value={category.name} className="space-y-8 mt-4 md:mt-0">
              <div className="p-4 border border-border/50 rounded-lg bg-card/50 backdrop-blur-md transition-all duration-300 hover:border-primary">
                <h3 className="text-lg font-semibold mb-3">Technologies Used in This Category</h3>
                <div className="flex flex-wrap gap-2">
                  {getCategoryTechStack(category.projects).map((tech) => (
                    <Badge key={tech} variant="outline" className="text-sm font-mono border-primary">{tech}</Badge>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {category.projects.map((project, index) => (
                   <ProjectCard key={index} project={project} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
