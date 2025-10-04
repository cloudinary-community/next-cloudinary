import { useRef, useEffect, useCallback } from 'react';

/**
 * triggerOnIdle
 * @see MDN Polyfill https://github.com/behnammodi/polyfill/blob/master/window.polyfill.js#L7-L24
 */

/**
 * Check if requestIdleCallback is supported in the current environment
 */
function isRequestIdleCallbackSupported(): boolean {
  return typeof window !== 'undefined' && 'requestIdleCallback' in window;
}

/**
 * Cancel an idle callback safely
 */
function cleanupIdleCallback(callbackId: number | NodeJS.Timeout | undefined): void {
  if (callbackId === undefined) return;
  
  if (isRequestIdleCallbackSupported()) {
    cancelIdleCallback(callbackId as number);
  } else {
    clearTimeout(callbackId as NodeJS.Timeout);
  }
}

/**
 * Trigger a callback when the browser is idle
 */
function triggerOnIdle(callback: any) {
  if (isRequestIdleCallbackSupported()) {
    return requestIdleCallback(callback);
  }
  return setTimeout(() => callback(), 1);
}

/**
 * Custom hook for managing a single idle callback with automatic cleanup
 * Returns a function to trigger idle callbacks
 */
export function useTriggerOnIdle() {
  const callbackId = useRef<number | NodeJS.Timeout | undefined>(undefined);

  const triggerOnIdleWithCleanup = useCallback((callback: any) => {
    // Clean up any existing callback first
    if (callbackId.current !== undefined) {
      cleanupIdleCallback(callbackId.current);
    }
    
    // Trigger new callback
    const currentId = triggerOnIdle(() => {
      // Only execute if this callback ID is still current (not cancelled)
      if (callbackId.current === currentId) {
        callbackId.current = undefined; // Clear after execution
        callback();
      }
    });
    
    callbackId.current = currentId;
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (callbackId.current !== undefined) {
        cleanupIdleCallback(callbackId.current);
        callbackId.current = undefined;
      }
    };
  }, []);

  return triggerOnIdleWithCleanup;
}