import { ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

export const PromoHeroSection = () => {
  const avatarUrls = [
    'https://mighty.tools/mockmind-api/content/human/128.jpg',
    'https://mighty.tools/mockmind-api/content/human/92.jpg',
    'https://mighty.tools/mockmind-api/content/human/127.jpg',
    'https://mighty.tools/mockmind-api/content/human/94.jpg'
  ]

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      <div className="absolute inset-0 bg-gradient-to-r from-gold-50 to-gold-100 dark:from-gold-950/20 dark:to-gold-900/10" />
      <div className="absolute inset-0">
        <div className="h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>
      <div className="container mx-auto px-8 2xl:max-w-[1400px] relative">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-gold-200 bg-white px-3 py-1 text-sm dark:border-gold-800 dark:bg-gold-950/40">
                <span className="mr-1 rounded-full bg-gold-500 px-1.5 py-0.5 text-xs text-black font-medium">
                  New
                </span>
                <span className="text-xs">Launching our mobile app soon!</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                <span className="block">Organize Events</span>
                <span className="block bg-gradient-to-r from-gold-500 to-gold-700 bg-clip-text text-transparent">
                  With Ease
                </span>
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                GatherFlow simplifies event planning, attendee management, and engagement. Create memorable
                experiences without the stress.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex -space-x-2">
                {avatarUrls.map((url, i) => (
                  <div
                    key={i}
                    className="inline-block h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden"
                  >
                    <img
                      src={url}
                      alt={`User ${i}`}
                      width={32}
                      height={32}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                Event organizers trust GatherFlow
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-gold-400 to-gold-600 opacity-30 blur-xl" />
            <div className="relative rounded-xl border border-border/50 bg-background/95 p-1 shadow-xl backdrop-blur">
              <img
                src="https://kzmoey6ooana4gd7euyp.lite.vusercontent.net/placeholder.svg?height=600&width=800"
                alt="GatherFlow Dashboard"
                width={800}
                height={600}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}