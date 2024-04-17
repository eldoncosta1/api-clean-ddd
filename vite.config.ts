import tsconfigPaths from 'vite-tsconfig-paths'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environmentMatchGlobs: [
      ['./src/http/controllers/**', './vitest-environments/prisma.ts'],
    ],
    // teardownTimeout: 5000,
  },
})
