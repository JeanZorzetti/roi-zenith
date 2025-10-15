// ============= VITE PLUGIN: REMOVE CONSOLE =============
// Plugin para remover console.logs em produção

import type { Plugin } from 'vite';

export function removeConsolePlugin(): Plugin {
  return {
    name: 'remove-console',
    enforce: 'pre',
    apply: 'build', // Only apply in build mode
    transform(code, id) {
      // Only process .ts and .tsx files
      if (id.endsWith('.ts') || id.endsWith('.tsx')) {
        // Remove console.log statements
        const newCode = code.replace(/console\.log\([^)]*\);?/g, '');
        // Remove console.debug statements
        const finalCode = newCode.replace(/console\.debug\([^)]*\);?/g, '');

        return {
          code: finalCode,
          map: null,
        };
      }
      return null;
    },
  };
}
