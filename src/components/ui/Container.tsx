import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'default' | 'narrow' | 'wide';
}

const sizes = {
  default: 'max-w-7xl',
  narrow: 'max-w-3xl',
  wide: 'max-w-[90rem]',
} as const;

export function Container({ className, size = 'default', ...props }: ContainerProps) {
  return <div className={cn('mx-auto w-full px-6 sm:px-8', sizes[size], className)} {...props} />;
}
