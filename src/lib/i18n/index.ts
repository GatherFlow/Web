import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources } from './resources'

const prepareLocale = () => {
  return navigator.language.split('-')[0]
}

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('locale') ?? prepareLocale(),
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
