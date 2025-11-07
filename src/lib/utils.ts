import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(...inputs))
}

export const panic: (msg: string) => never = (msg: string): never => {
  throw new Error(msg)
}
