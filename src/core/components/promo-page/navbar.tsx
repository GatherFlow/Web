import { Link } from "@tanstack/react-router"
import { buttonVariants } from "../ui/button"
import React from "react"
import Logo from '@/assets/logo.svg?react'
import { useTranslation } from "react-i18next"
import { LanguageDropdown } from "./language-dropdown"
import { ModeToggle } from "../mode-toggle"

export const PromoNavbar: React.FC = () => {
  const { t } = useTranslation()

  const links = [
    {
      name:t('promo.sections.features'),
      href: '#features'
    },
    {
      name: t('promo.sections.pricing'),
      href: '#pricing'
    },
    {
      name: t('promo.sections.newsletter'),
      href: '#newsletter'
    }
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-8 2xl:max-w-[1400px] grid grid-cols-3 h-16 items-center">
        <a href="/#hero" className="flex items-center justify-start gap-2">
          <Logo className="size-8" />
          <span className="text-xl font-bold max-lg:hidden">GatherFlow</span>
        </a>
        <nav className="hidden md:flex items-center justify-center gap-6">
          {links.map(({ name, href }, index) => (
            <a key={index} href={href} className="text-sm font-medium hover:text-primary">
              {name}
            </a>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-4">
          <LanguageDropdown />
          <ModeToggle />
          <Link className={buttonVariants({ variant: 'outline', size: 'sm'})} to="/login">
            {t('auth.login.submit')}
          </Link>
          <Link className={buttonVariants({ size: 'sm' })} to="/signup">
            {t('auth.signup.submit')}
          </Link>
        </div>
      </div>
    </header>
  )
}
