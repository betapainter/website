import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getGoogleDriveImageUrl(url: string): string {
  // Check if it's a Google Drive URL
  if (url.includes("drive.google.com/file/d/")) {
    // Extract the file ID from the URL
    const match = url.match(/\/d\/([^/]+)/)
    if (match && match[1]) {
      const fileId = match[1]
      // Return the direct image URL format
      return `https://drive.google.com/uc?export=view&id=${fileId}`
    }
  }
  // If it's not a Google Drive URL or couldn't parse it, return as is
  return url
}
