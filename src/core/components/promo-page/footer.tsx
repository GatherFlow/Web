import { useTranslation } from "react-i18next"

export const PromoFooter = () => {
  const { t } = useTranslation()

  return (
    <footer className="border-t border-border/40 bg-muted/30 py-12 md:py-16">
      <div className="container mx-auto px-8 2xl:max-w-[1400px]">
        <div className="mt-12 border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} GatherFlow. {t('promo.footer.all-rights-reserved')}.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              {t('promo.footer.privacy-policy')}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              {t('promo.footer.terms-of-service')}
            </a>
            <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
              {t('promo.footer.cookie-policy')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
