/**
 * Simple in-memory rate limiter
 * 
 * Tracks requests by IP address and enforces limits.
 * Resets on each serverless function cold start (by design).
 * 
 * For production with persistent rate limiting across instances,
 * consider upgrading to Upstash Redis or Vercel KV.
 */

interface RateLimitEntry {
  count: number;
  resetTime: number;
}

// In-memory store (resets on cold start)
const rateLimitStore = new Map<string, RateLimitEntry>();

// Cleanup expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of rateLimitStore.entries()) {
    if (now > entry.resetTime) {
      rateLimitStore.delete(key);
    }
  }
}, 5 * 60 * 1000);

export interface RateLimitConfig {
  /**
   * Maximum number of requests allowed in the time window
   */
  maxRequests: number;
  
  /**
   * Time window in seconds
   */
  windowSeconds: number;
}

export interface RateLimitResult {
  /**
   * Whether the request is allowed
   */
  success: boolean;
  
  /**
   * Number of requests remaining in the current window
   */
  remaining: number;
  
  /**
   * Time in seconds until the rate limit resets
   */
  resetInSeconds: number;
  
  /**
   * Total request limit
   */
  limit: number;
}

/**
 * Check if a request should be rate limited
 * 
 * @param identifier - Unique identifier (e.g., IP address, user ID)
 * @param config - Rate limit configuration
 * @returns Result indicating if request is allowed
 */
export function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 5, windowSeconds: 3600 }
): RateLimitResult {
  const now = Date.now();
  const windowMs = config.windowSeconds * 1000;
  
  // Get or create entry
  let entry = rateLimitStore.get(identifier);
  
  // Create new entry if doesn't exist or expired
  if (!entry || now > entry.resetTime) {
    entry = {
      count: 0,
      resetTime: now + windowMs,
    };
    rateLimitStore.set(identifier, entry);
  }
  
  // Check if limit exceeded
  if (entry.count >= config.maxRequests) {
    const resetInSeconds = Math.ceil((entry.resetTime - now) / 1000);
    return {
      success: false,
      remaining: 0,
      resetInSeconds,
      limit: config.maxRequests,
    };
  }
  
  // Increment counter
  entry.count++;
  rateLimitStore.set(identifier, entry);
  
  const resetInSeconds = Math.ceil((entry.resetTime - now) / 1000);
  
  return {
    success: true,
    remaining: config.maxRequests - entry.count,
    resetInSeconds,
    limit: config.maxRequests,
  };
}

/**
 * Reset rate limit for a specific identifier
 * Useful for testing or manual overrides
 */
export function resetRateLimit(identifier: string): void {
  rateLimitStore.delete(identifier);
}

/**
 * Get current rate limit status without incrementing counter
 */
export function getRateLimitStatus(
  identifier: string,
  config: RateLimitConfig = { maxRequests: 5, windowSeconds: 3600 }
): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);
  
  if (!entry || now > entry.resetTime) {
    return {
      success: true,
      remaining: config.maxRequests,
      resetInSeconds: config.windowSeconds,
      limit: config.maxRequests,
    };
  }
  
  const resetInSeconds = Math.ceil((entry.resetTime - now) / 1000);
  const remaining = Math.max(0, config.maxRequests - entry.count);
  
  return {
    success: remaining > 0,
    remaining,
    resetInSeconds,
    limit: config.maxRequests,
  };
}
