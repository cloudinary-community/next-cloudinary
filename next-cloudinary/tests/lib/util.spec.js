import { vi, describe, it, beforeEach, afterEach, expect } from 'vitest';
import { renderHook } from '@testing-library/react';
import { act } from 'react';
import { useTriggerOnIdle } from '../../src/lib/util';

/**
 * Tests for useTriggerOnIdle hook - Race Condition Prevention
 * 
 * These tests validate that the useTriggerOnIdle hook properly prevents
 * race conditions between requestIdleCallback and component cleanup.
 * 
 * The original issue: widgets could be created after component unmount
 * when requestIdleCallback executed after the cleanup function ran.
 */
describe('useTriggerOnIdle Hook', () => {
  let mockRequestIdleCallback;
  let mockCancelIdleCallback;
  let originalRequestIdleCallback;
  let originalCancelIdleCallback;

  beforeEach(() => {
    // Store originals
    originalRequestIdleCallback = global.requestIdleCallback;
    originalCancelIdleCallback = global.cancelIdleCallback;

    // Setup mocks
    mockRequestIdleCallback = vi.fn();
    mockCancelIdleCallback = vi.fn();

    // Mock the browser APIs
    global.requestIdleCallback = mockRequestIdleCallback;
    global.cancelIdleCallback = mockCancelIdleCallback;
  });

  afterEach(() => {
    vi.clearAllMocks();
    // Restore originals
    global.requestIdleCallback = originalRequestIdleCallback;
    global.cancelIdleCallback = originalCancelIdleCallback;
  });

  it('should cancel pending callback when component unmounts quickly (preventing race condition)', () => {
    const callbackId = 123;
    let callbackExecuted = false;

    // Mock requestIdleCallback to return an ID and store the callback
    let storedCallback = null;
    mockRequestIdleCallback.mockImplementation((callback) => {
      storedCallback = callback;
      return callbackId;
    });

    // Test the hook directly using renderHook
    const { result, unmount } = renderHook(() => useTriggerOnIdle(), {
      // Provide a minimal wrapper that doesn't require document
      wrapper: ({ children }) => children,
    });

    // Trigger an idle callback (like CldUploadWidget does in handleOnLoad)
    act(() => {
      result.current(() => {
        callbackExecuted = true;
      });
    });

    // Verify requestIdleCallback was called
    expect(mockRequestIdleCallback).toHaveBeenCalledTimes(1);
    expect(storedCallback).toBeTruthy();

    // Unmount the hook (simulates component cleanup)
    unmount();

    // Verify cancelIdleCallback was called during cleanup
    expect(mockCancelIdleCallback).toHaveBeenCalledWith(callbackId);

    // Execute the stored callback (simulating browser calling it after cancel)
    // This demonstrates the race condition scenario we're preventing
    if (storedCallback) {
      storedCallback();
    }

    // The callback should not have executed because it was cancelled
    expect(callbackExecuted).toBe(false);
  });

  it('should handle rapid mount/unmount preventing memory leaks', () => {
    const callbackIds = [111, 222];
    let executionCount = 0;

    mockRequestIdleCallback
      .mockReturnValueOnce(callbackIds[0])
      .mockReturnValueOnce(callbackIds[1]);

    // First mount/unmount cycle
    const { result: result1, unmount: unmount1 } = renderHook(() => useTriggerOnIdle(), {
      wrapper: ({ children }) => children,
    });

    act(() => {
      result1.current(() => {
        executionCount++;
      });
    });

    expect(mockRequestIdleCallback).toHaveBeenCalledTimes(1);

    // Quick unmount (like navigating away)
    unmount1();
    expect(mockCancelIdleCallback).toHaveBeenCalledWith(callbackIds[0]);

    // Second mount/unmount cycle
    const { result: result2, unmount: unmount2 } = renderHook(() => useTriggerOnIdle(), {
      wrapper: ({ children }) => children,
    });

    act(() => {
      result2.current(() => {
        executionCount++;
      });
    });

    expect(mockRequestIdleCallback).toHaveBeenCalledTimes(2);

    // Quick unmount again
    unmount2();
    expect(mockCancelIdleCallback).toHaveBeenCalledWith(callbackIds[1]);

    // No callbacks should have executed due to quick unmounts
    expect(executionCount).toBe(0);
    expect(mockCancelIdleCallback).toHaveBeenCalledTimes(2);
  });
}); 