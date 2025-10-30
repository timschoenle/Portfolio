import { Card, CardContent } from "@/components/ui/card"
import { BookOpen, Code2 } from "lucide-react"

export function AboutSection({ dict }: { dict: any }) {
  return (
    <section id="about" className="px-4 py-20">
      <div className="mx-auto max-w-6xl w-full">
        <div className="mb-12 text-center">
          <h2 className="mb-3 text-4xl font-bold text-foreground">{dict.about.title}</h2>
          <div className="mx-auto h-1 w-20 rounded-full bg-gradient-to-r from-primary to-primary/60" />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="group border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
            <CardContent className="flex items-start gap-4 p-6">
              <div className="rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-3 transition-transform duration-300 group-hover:scale-110">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{dict.about.learning.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {dict.about.learning.description
                    .replace("{rust}", dict.about.learning.rust)
                    .replace("{nextjs}", dict.about.learning.nextjs)
                    .split(dict.about.learning.rust)
                    .map((part: string, i: number) => (
                      <span key={i}>
                        {part}
                        {i === 0 && <span className="font-medium text-foreground">{dict.about.learning.rust}</span>}
                      </span>
                    ))}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="group border-2 transition-all duration-300 hover:border-primary/50 hover:shadow-xl">
            <CardContent className="flex items-start gap-4 p-6">
              <div className="rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 p-3 transition-transform duration-300 group-hover:scale-110">
                <Code2 className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">{dict.about.expertise.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {dict.about.expertise.description.split("{java}").map((part: string, i: number) => (
                    <span key={i}>
                      {part}
                      {i === 0 && <span className="font-medium text-foreground">{dict.about.expertise.java}</span>}
                    </span>
                  ))}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
