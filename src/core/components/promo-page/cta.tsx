import { useTranslation } from "react-i18next";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Link } from "@tanstack/react-router";

export const PromoCTASection = () => {
  const { t } = useTranslation()

  return (
    <section id="newsletter" className="py-20 md:py-32">
      <div className="container mx-auto px-8 2xl:max-w-[1400px]">
        <div className="relative overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-600 dark:from-gold-700 dark:to-gold-900" />
          <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:24px_24px]" />
          <div className="relative p-8 md:p-16">
            <div className="grid gap-8 md:grid-cols-2 items-center">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
                  {t('promo.cta.title')}
                </h2>
                <p className="text-lg text-white/80">{t('promo.cta.description')}</p>
                <div className="flex flex-col sm:flex-row gap-4">

                  <Button size="lg" className="bg-white text-gold-600 dark:text-gold-950 hover:bg-white/90" asChild>
                    <Link to="/login">
                      {t('promo.cta.action')}
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="space-y-4">
                <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm">
                  <h3 className="mb-4 text-xl font-medium text-white ">{t('promo.cta.subtitle')}</h3>
                  <div className="flex gap-2">
                    <Input
                      type="email"
                      placeholder={t('auth.email-placeholder')}
                      className="bg-white/20 border-white/20 text-white placeholder:text-white/60"
                    />
                    <Button className="bg-white text-gold-600 dark:text-gold-950 hover:bg-white/90">{t('promo.cta.subscribe')}</Button>
                  </div>
                </div>
                <p className="text-sm text-white/60">
                  {t('promo.cta.small')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}