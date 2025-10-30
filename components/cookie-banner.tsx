"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { X } from "lucide-react"

interface CookieBannerProps {
  translations: {
    title: string
    description: string
    acceptAll: string
    rejectAll: string
    customize: string
    essential: string
    essentialDesc: string
    analytics: string
    analyticsDesc: string
    save: string
  }
}

export function CookieBanner({ translations }: CookieBannerProps) {
  const [showBanner, setShowBanner] = useState(false)
  const [showCustomize, setShowCustomize] = useState(false)
  const [analytics, setAnalytics] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowBanner(true)
    }
  }, [])

  const handleAcceptAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ essential: true, analytics: true }))
    setShowBanner(false)
  }

  const handleRejectAll = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ essential: true, analytics: false }))
    setShowBanner(false)
  }

  const handleSavePreferences = () => {
    localStorage.setItem("cookie-consent", JSON.stringify({ essential: true, analytics }))
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 pointer-events-none">
      <Card className="w-full max-w-2xl p-6 pointer-events-auto shadow-2xl border-2 bg-background/95 backdrop-blur-sm">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-xl font-semibold">{translations.title}</h3>
          <Button variant="ghost" size="icon" onClick={handleRejectAll} className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        {!showCustomize ? (
          <>
            <p className="text-sm text-muted-foreground mb-6">{translations.description}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleAcceptAll} className="flex-1">
                {translations.acceptAll}
              </Button>
              <Button onClick={handleRejectAll} variant="outline" className="flex-1 bg-transparent">
                {translations.rejectAll}
              </Button>
              <Button onClick={() => setShowCustomize(true)} variant="secondary" className="flex-1">
                {translations.customize}
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              <div className="flex items-start justify-between p-4 border rounded-lg bg-muted/50">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{translations.essential}</h4>
                  <p className="text-sm text-muted-foreground">{translations.essentialDesc}</p>
                </div>
                <div className="ml-4 text-sm font-medium text-muted-foreground">Required</div>
              </div>

              <div className="flex items-start justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium mb-1">{translations.analytics}</h4>
                  <p className="text-sm text-muted-foreground">{translations.analyticsDesc}</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-4">
                  <input
                    type="checkbox"
                    checked={analytics}
                    onChange={(e) => setAnalytics(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button onClick={handleSavePreferences} className="flex-1">
                {translations.save}
              </Button>
              <Button onClick={() => setShowCustomize(false)} variant="outline" className="flex-1">
                Back
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  )
}
