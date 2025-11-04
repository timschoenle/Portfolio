// This file ensures type-safe environment variables

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      // GitHub API Token (optional but recommended)
      readonly GITHUB_TOKEN?: string

      // Enable bundle analyzer
      readonly ANALYZE?: 'true' | 'false'

      // Next.js built-in
      readonly NODE_ENV: 'development' | 'production' | 'test'
    }
  }
}

// Export empty object to make this a module
export {}
