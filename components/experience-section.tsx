import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Calendar } from "lucide-react"
import Image from "next/image"

interface Experience {
  company: string
  logo: string
  title: string
  dateRange: string
  description: string
}

export function ExperienceSection({ dict }: { dict: any }) {
  const experiences: Experience[] = dict.experience.items

  return (
    <section className="px-4 py-20">
      <div className="mx-auto max-w-4xl w-full">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-4xl font-bold text-foreground">{dict.experience.title}</h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-primary/60" />
        </div>

        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="group border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1"
            >
              <CardContent className="p-6">
                <div className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="relative h-16 w-16 overflow-hidden rounded-xl border-2 border-border bg-muted shadow-md transition-transform duration-300 group-hover:scale-105 group-hover:shadow-lg">
                      {exp.logo ? (
                        <Image
                          src={exp.logo || "/placeholder.svg"}
                          alt={`${exp.company} logo`}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary/10 to-primary/5">
                          <Briefcase className="h-8 w-8 text-primary" />
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                      {exp.title}
                    </h3>
                    <p className="text-base font-medium text-foreground/80 mb-2">{exp.company}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4" />
                      <p>{exp.dateRange}</p>
                    </div>

                    <div className="max-h-28 overflow-y-auto rounded-lg border-2 bg-muted/50 p-4 shadow-inner transition-colors hover:bg-muted/70 scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
                      <p className="text-sm text-foreground/90 leading-relaxed whitespace-pre-line">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
