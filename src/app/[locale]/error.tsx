'use client'

import { AlertTriangle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to error reporting service
    console.error('Error boundary caught:', error)
  }, [error])

  const t = useTranslations('error')

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="text-destructive h-6 w-6" />
            <CardTitle>{t('title')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground text-sm">{t('description')}</p>
          {error.digest && (
            <p className="text-muted-foreground text-xs">
              Error ID: {error.digest}
            </p>
          )}
          <div className="flex gap-2">
            <Button className="w-full" onClick={reset}>
              {t('tryAgain')}
            </Button>
            <Button
              className="w-full"
              variant="outline"
              onClick={() => (window.location.href = '/')}
            >
              {t('goHome')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
