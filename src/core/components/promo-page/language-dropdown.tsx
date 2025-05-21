import { Globe } from "lucide-react"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "../ui/dropdown-menu"
import { useTranslation } from "react-i18next"

export const LanguageDropdown = () => {
  const { t, i18n } = useTranslation()

  const locales = ["en", "uk"]

  const handleLanguageChange = (lang: string): void => {
    i18n.changeLanguage(lang)
  }
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuLabel>{t('change-locale.label')}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={i18n.languages[0]} onValueChange={handleLanguageChange}>
          {locales.map((locale, i) => (
            <DropdownMenuRadioItem key={i} value={locale}>{t(`change-locale.locales.${i}`)}</DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}