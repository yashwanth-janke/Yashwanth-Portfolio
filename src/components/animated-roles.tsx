'use client';

import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedRolesProps {
  roles: string[];
  className?: string;
}

export default function AnimatedRoles({ roles, className }: AnimatedRolesProps) {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const roleChangeInterval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentRoleIndex((prevIndex) => (prevIndex + 1) % roles.length);
        setIsFading(false);
      }, 500); // This should match the transition duration
    }, 3000); // Change role every 3 seconds

    return () => clearInterval(roleChangeInterval);
  }, [roles.length]);

  return (
    <span className={cn(
      "inline-block transition-opacity duration-500",
      isFading ? 'opacity-0' : 'opacity-100',
      className
    )}>
      {roles[currentRoleIndex]}
    </span>
  );
}
