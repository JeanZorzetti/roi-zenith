// ============= VITE PLUGIN: REMOVE CONSOLE =============
// Plugin para remover console.logs em produção

import type { Plugin } from 'vite';

export function removeConsolePlugin(): Plugin {
  return {
    name: 'remove-console',
    enforce: 'post', // Run after other transforms
    apply: 'build', // Only apply in build mode
    transform(code, id) {
      // Only process game-react files to avoid breaking other code
      if (id.includes('game-react') && (id.endsWith('.ts') || id.endsWith('.tsx'))) {
        // More conservative regex - only match complete statements with semicolon
        const newCode = code.replace(/console\.log\([^)]*\);\s*/g, '');
        const finalCode = newCode.replace(/console\.debug\([^)]*\);\s*/g, '');

        return {
          code: finalCode,
          map: null,
        };
      }
      return null;
    },
  };
}
