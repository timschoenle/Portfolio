import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Github, MapPin, Download, FileText } from "lucide-react"
import Link from "next/link"
import type { Locale } from "@/lib/i18n-config"

export function ContactSection({ dict, locale }: { dict: any; locale: Locale }) {
  const resumePath = locale === "de" ? "/resume-de.pdf" : "/resume-en.pdf"

  return (
    <section id="contact" className="relative bg-muted/30 px-4 py-20">
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />

      <div className="mx-auto max-w-4xl w-full">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-4xl font-bold text-foreground">{dict.contact.title}</h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-primary/60" />
        </div>

        <div className="max-w-2xl mx-auto space-y-6">
          <Card className="border-2 shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-6">{dict.contact.infoTitle}</h3>
              <div className="space-y-6">
                <div className="group flex items-center gap-4 rounded-lg p-3 transition-all hover:bg-muted/50">
                  <div className="rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-3 transition-transform duration-300 group-hover:scale-110">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{dict.contact.email}</p>
                    <a
                      href="mailto:contact@timmi6790.de"
                      className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                    >
                      contact@timmi6790.de
                    </a>
                  </div>
                </div>

                <div className="group flex items-center gap-4 rounded-lg p-3 transition-all hover:bg-muted/50">
                  <div className="rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-3 transition-transform duration-300 group-hover:scale-110">
                    <Github className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{dict.contact.github}</p>
                    <a
                      href="https://github.com/Timmi6790"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lg font-medium text-foreground transition-colors hover:text-primary"
                    >
                      @Timmi6790
                    </a>
                  </div>
                </div>

                <div className="group flex items-center gap-4 rounded-lg p-3 transition-all hover:bg-muted/50">
                  <div className="rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-3 transition-transform duration-300 group-hover:scale-110">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">{dict.contact.location}</p>
                    <p className="text-lg font-medium text-foreground">{dict.contact.locationValue}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-2 shadow-xl overflow-hidden">
            <div className="bg-gradient-to-br from-primary/20 via-primary/10 to-primary/5 p-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="rounded-lg bg-primary/10 p-3">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{dict.contact.downloadResume}</h3>
                    <p className="text-sm text-muted-foreground">PDF • {locale === "de" ? "Deutsch" : "English"}</p>
                  </div>
                </div>
              </div>
              <Button
                asChild
                className="w-full shadow-lg hover:shadow-xl transition-all group bg-primary hover:bg-primary/90"
                size="lg"
              >
                <a href={resumePath} download>
                  <Download className="mr-2 h-5 w-5 transition-transform group-hover:scale-110 group-hover:translate-y-0.5" />
                  {dict.contact.downloadResume}
                </a>
              </Button>
            </div>
          </Card>
        </div>

        <div className="mt-8 text-center">
          <Link
            href={`/${locale}/imprint`}
            className="text-sm text-muted-foreground transition-colors hover:text-primary hover:underline"
          >
            {dict.contact.imprint}
          </Link>
        </div>
      </div>
    </section>
  )
}
