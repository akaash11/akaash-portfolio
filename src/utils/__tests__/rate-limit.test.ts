/**
 * Rate Limiter Tests
 * 
 * Run with: npm test (after installing Jest)
 */

import { checkRateLimit, resetRateLimit, getRateLimitStatus } from '../rate-limit';

describe('Rate Limiter', () => {
  beforeEach(() => {
    // Reset for each test
    resetRateLimit('test-ip');
  });

  it('should allow requests within limit', () => {
    const result1 = checkRateLimit('test-ip', { maxRequests: 3, windowSeconds: 60 });
    expect(result1.success).toBe(true);
    expect(result1.remaining).toBe(2);

    const result2 = checkRateLimit('test-ip', { maxRequests: 3, windowSeconds: 60 });
    expect(result2.success).toBe(true);
    expect(result2.remaining).toBe(1);
  });

  it('should block requests after limit exceeded', () => {
    const config = { maxRequests: 2, windowSeconds: 60 };
    
    checkRateLimit('test-ip', config);
    checkRateLimit('test-ip', config);
    
    const result = checkRateLimit('test-ip', config);
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it('should track different IPs separately', () => {
    const config = { maxRequests: 1, windowSeconds: 60 };
    
    const result1 = checkRateLimit('ip-1', config);
    const result2 = checkRateLimit('ip-2', config);
    
    expect(result1.success).toBe(true);
    expect(result2.success).toBe(true);
  });

  it('should reset rate limit', () => {
    const config = { maxRequests: 1, windowSeconds: 60 };
    
    checkRateLimit('test-ip', config);
    const blocked = checkRateLimit('test-ip', config);
    expect(blocked.success).toBe(false);
    
    resetRateLimit('test-ip');
    
    const allowed = checkRateLimit('test-ip', config);
    expect(allowed.success).toBe(true);
  });

  it('should return status without incrementing', () => {
    const config = { maxRequests: 3, windowSeconds: 60 };
    
    const status1 = getRateLimitStatus('test-ip', config);
    expect(status1.remaining).toBe(3);
    
    const status2 = getRateLimitStatus('test-ip', config);
    expect(status2.remaining).toBe(3); // Still 3, not decremented
  });

  it('should include correct headers info', () => {
    const config = { maxRequests: 5, windowSeconds: 3600 };
    
    const result = checkRateLimit('test-ip', config);
    
    expect(result.limit).toBe(5);
    expect(result.remaining).toBe(4);
    expect(result.resetInSeconds).toBeGreaterThan(0);
    expect(result.resetInSeconds).toBeLessThanOrEqual(3600);
  });
});
