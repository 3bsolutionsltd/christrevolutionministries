'use client';

import useErrorLogger from '../hooks/useErrorLogger';

export default function ErrorLogger() {
  // This component just initializes the error logging hook
  useErrorLogger();
  
  // Return null since this component doesn't render anything
  return null;
}
