import type React from "react"
import { useTranslation } from "react-i18next"

export const PromoLogosSection: React.FC = () => {
  const { t } = useTranslation()
  const titles = ["TechConf", "MusicFest", "CorporateEvents", "UniversityEvents", "CommunityGatherings"]

  return (
    <section className="py-12 border-y border-border/40 bg-muted/50">
      <div className="container mx-auto px-8 2xl:max-w-[1400px]">
        <h2 className="text-center text-lg font-medium text-muted-foreground mb-8">
          {t('promo.logos.title')}
        </h2>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16">
          {titles.map(
            (name, i) => (
              <div key={i} className="flex items-center justify-center">
                <div className="h-8 w-32 rounded bg-muted flex items-center justify-center text-muted-foreground font-medium">
                  {name}
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  )
}
