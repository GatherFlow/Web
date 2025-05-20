import { BarChart, Calendar, Clock, Users } from "lucide-react"
import { motion } from 'motion/react'

export const PromoFeaturesSection = () => {
  const features = [
    {
      icon: <Calendar className="h-10 w-10 text-gold-500" />,
      title: "Event Planning",
      description: "Intuitive tools for scheduling, venue selection, and timeline management",
    },
    {
      icon: <Users className="h-10 w-10 text-gold-600" />,
      title: "Attendee Management",
      description: "Seamless registration, check-in, and attendee communication",
    },
    {
      icon: <BarChart className="h-10 w-10 text-gold-600" />,
      title: "Analytics Dashboard",
      description: "Comprehensive insights on attendance, engagement, and ROI",
    },
    {
      icon: <Clock className="h-10 w-10 text-gold-500" />,
      title: "Real-time Updates",
      description: "Instant notifications and schedule changes for all participants",
    },
  ]

  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container mx-auto px-8 2xl:max-w-[1400px]">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Powerful Features for Seamless Events
          </h2>
          <p className="mt-4 max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            Everything you need to plan, manage, and execute successful events of any size
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {features.map(({ icon, title, description }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-background p-8 hover:shadow-lg transition-shadow"
            >
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gold-100 opacity-0 group-hover:opacity-20 transition-opacity dark:bg-gold-900" />
              <div className="mb-4">{icon}</div>
              <h3 className="mb-2 text-xl font-bold">{title}</h3>
              <p className="text-muted-foreground">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}