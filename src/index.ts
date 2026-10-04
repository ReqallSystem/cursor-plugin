/**
 * @reqall/cursor-plugin
 *
 * Cursor adapter for Reqall knowledgebase.
 * Expand as Cursor's plugin API matures.
 */
import { resolveProjectBinding } from './project-policy.js';

// Keep the existing configuration API, but do not inherit the older dependency's
// cwd-basename detector. This vendored policy is checked against @reqall/core.
export { loadConfig } from '@reqall/core';

export function detectProject(cwd?: string, prompt?: string): string {
  return resolveProjectBinding(cwd, process.env, prompt).name;
}
