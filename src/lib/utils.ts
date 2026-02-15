import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format timestamp to readable date/time
export function formatTimestamp(timestamp: number): string {
  const date = new Date(timestamp * (timestamp < 10000000000 ? 1000 : 1));
  // Fixed format to match server/client: "MMM DD at HH:MM AM/PM"
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).replace(',', ' at');
}

// Format number as USD currency
export function formatUsd(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

// Format number as percentage
export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}
