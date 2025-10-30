import { Button } from "@/components/ui/button"
import { Mail, Github, ArrowDown } from "lucide-react"

export function HeroSection({ dict }: { dict: any }) {
  return (
    <section className="relative flex h-screen min-h-screen items-center justify-center px-4 py-20 snap-start">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />

      <div className="max-w-4xl text-center">
        <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight text-foreground md:text-7xl animate-in fade-in slide-in-from-bottom-4 duration-1000">
          {dict.hero.greeting}{" "}
          <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            {dict.hero.name}
          </span>
        </h1>
        <p className="mb-3 text-pretty text-xl text-muted-foreground md:text-2xl animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-150">
          {dict.hero.title}
        </p>
        <p className="mb-10 text-lg text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-300">
          {dict.hero.location} • {dict.hero.tagline}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-500">
          <Button asChild size="lg" className="group shadow-lg hover:shadow-xl transition-all">
            <a href="https://github.com/Timmi6790" target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              {dict.hero.github}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="group shadow-md hover:shadow-lg transition-all bg-transparent"
          >
            <a href="mailto:contact@timmi6790.de">
              <Mail className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
              {dict.hero.contact}
            </a>
          </Button>
        </div>

        <div className="mt-16 animate-in fade-in duration-1000 delay-700">
          <ArrowDown className="mx-auto h-6 w-6 text-muted-foreground animate-bounce" />
        </div>
      </div>
    </section>
  )
}
