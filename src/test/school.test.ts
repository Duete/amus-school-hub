import { describe, it, expect } from 'vitest';
import { campuses } from '@/lib/school';
describe('School campus structure', () => {
  it('features exactly two distinct campuses', () => {
    expect(campuses).toHaveLength(2);
    expect(new Set(campuses.map(campus => campus.slug)).size).toBe(2);
  });
});