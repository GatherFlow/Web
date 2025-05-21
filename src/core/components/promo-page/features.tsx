import { BarChart, Calendar, Clock, Users } from "lucide-react"
import { motion } from 'motion/react'
import { useTranslation } from "react-i18next"

export const PromoFeaturesSection = () => {
  const { t } = useTranslation()

  const features = [
    <Calendar className="h-10 w-10 text-gold-500" />,
    <Users className="h-10 w-10 text-gold-600" />,
    <BarChart className="h-10 w-10 text-gold-600" />,
    <Clock className="h-10 w-10 text-gold-500" />
  ]

  return (
    <section id="features" className="py-20 md:py-32">
      <div className="container mx-auto px-8 2xl:max-w-[1400px]">
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            {t('promo.features.title')}
          </h2>
          <p className="mt-4 max-w-[700px] mx-auto text-muted-foreground md:text-xl">
            {t('promo.features.description')}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {features.map((value, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-xl border border-border/50 bg-background p-8 hover:shadow-lg transition-shadow"
            >
              <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-gold-100 opacity-0 group-hover:opacity-20 transition-opacity dark:bg-gold-900" />
              <div className="mb-4">{value}</div>
              <h3 className="mb-2 text-xl font-bold">{t(`promo.features.list.${i}.title`)}</h3>
              <p className="text-muted-foreground">{t(`promo.features.list.${i}.description`)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}