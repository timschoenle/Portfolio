import { z, type ZodSafeParseResult } from 'zod'

// eslint-disable-next-line @typescript-eslint/typedef
const environmentSchema = z.object({
  GITHUB_TOKEN: z.string().optional(),
  HOSTNAME: z.string().optional(),
  NEXT_PUBLIC_REVISION: z.string().default('unknown'),
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.string().optional(),
})

export type Environment = z.infer<typeof environmentSchema>

function validateEnvironment(): Environment {
  const parsed: ZodSafeParseResult<Environment> = environmentSchema.safeParse({
    GITHUB_TOKEN: process.env['GITHUB_TOKEN'],
    HOSTNAME: process.env['HOSTNAME'],
    NEXT_PUBLIC_REVISION: process.env['NEXT_PUBLIC_REVISION'],
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env['PORT'],
  })

  if (!parsed.success) {
    // eslint-disable-next-line no-console
    console.error(
      '❌ Invalid environment variables:',
      z.treeifyError(parsed.error)
    )
    throw new Error('Invalid environment variables')
  }

  return parsed.data
}

export const environment: Environment = validateEnvironment()
