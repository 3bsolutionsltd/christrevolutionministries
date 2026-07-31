'use client';

import { useEffect } from 'react';

interface ErrorData {
  message: string;
  stack?: string;
  filename?: string;
  lineno?: number;
  colno?: number;
  timestamp: string;
  url: string;
  userAgent: string;
  environment: string;
  type: 'javascript' | 'promise' | 'resource';
}

const useErrorLogger = () => {
  useEffect(() => {
    const logError = async (errorData: ErrorData) => {
      // For static export, just log to console in production
      console.error('[Error Logger]', errorData);
      
      // You could also send to an external logging service here
      // For example: LogRocket, Sentry, etc.
    };

    // Handle JavaScript errors
    const handleError = (event: ErrorEvent) => {
      const errorData: ErrorData = {
        message: event.message,
        stack: event.error?.stack,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'development',
        type: 'javascript'
      };

      logError(errorData);
    };

    // Handle unhandled Promise rejections
    const handlePromiseRejection = (event: PromiseRejectionEvent) => {
      const errorData: ErrorData = {
        message: event.reason?.message || String(event.reason),
        stack: event.reason?.stack,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'development',
        type: 'promise'
      };

      logError(errorData);
    };

    // Handle resource loading errors
    const handleResourceError = (event: Event) => {
      const target = event.target as HTMLElement;
      const errorData: ErrorData = {
        message: `Failed to load resource: ${target?.getAttribute?.('src') || target?.getAttribute?.('href') || 'unknown'}`,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: navigator.userAgent,
        environment: process.env.NEXT_PUBLIC_ENVIRONMENT || 'development',
        type: 'resource'
      };

      logError(errorData);
    };

    // Add event listeners
    window.addEventListener('error', handleError);
    window.addEventListener('unhandledrejection', handlePromiseRejection);
    window.addEventListener('error', handleResourceError, true); // Capture phase for resource errors

    // Cleanup
    return () => {
      window.removeEventListener('error', handleError);
      window.removeEventListener('unhandledrejection', handlePromiseRejection);
      window.removeEventListener('error', handleResourceError, true);
    };
  }, []);
};

export default useErrorLogger;
