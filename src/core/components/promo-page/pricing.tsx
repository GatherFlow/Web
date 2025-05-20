import { CheckCircle } from "lucide-react"
import { Button } from "../ui/button"
import { motion } from "motion/react"

export const PromoPricingSection = () => {
  const plans = [
    {
      name: "Free",
      price: "$0",
      description: "Perfect for small events and meetups",
      features: [
        "Up to 100 attendees",
        "Announce 2 events per month",
        "Standard support",
      ],
      popular: false,
    },
    {
      name: "Advanced",
      price: "$2.99",
      description: "Ideal for medium-sized events",
      features: [
        "Up to 500 attendees",
        "Announce 5 events per month",
        "Priority support",
      ],
      popular: true,
    },
    {
      name: "Creator",
      price: "$9.99",
      description: "For large conferences and events",
      features: [
        "Unlimited attendees",
        "Unlimited events per month",
        "Dedicated account manager",
      ],
      popular: false,
    },
  ]
  
  return (
    <section id="pricing" className="py-20 md:py-32 bg-muted/30">
      <div className=" mx-auto px-8 2xl:max-w-[1400px]">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Simple, Transparent Pricing</h2>
          <p className="mt-4 max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            Choose the plan that fits your event needs
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          {plans.map(({ popular, name, price, description, features }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`relative overflow-hidden rounded-xl border ${
                popular ? "border-gold-200 dark:border-gold-800" : "border-border/50"
              } bg-background p-8 ${popular ? "shadow-lg" : "shadow-sm"}`}
            >
              {popular && (
                <div className="absolute right-0 top-0">
                  <div className="h-20 w-20 translate-x-1/2 -translate-y-1/2 rotate-45 bg-gradient-to-r from-gold-400 to-gold-600" />
                  <div className="absolute inset-0 flex items-center justify-center rotate-45 text-xs font-medium text-black">
                    Popular
                  </div>
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-bold">{name}</h3>
                <div className="mt-2 flex items-baseline">
                  <span className="text-4xl font-bold">{price}</span>
                  <span className="ml-1 text-muted-foreground">/month</span>
                </div>
                <p className="mt-2 text-muted-foreground">{description}</p>
              </div>
              <ul className="mb-8 space-y-3">
                {features.map((feature, j) => (
                  <li key={j} className="flex items-center">
                    <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button variant={popular ? "default" : "outline"} className="w-full">
                Get Started
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}