import { ref, reactive } from 'vue'

const currentLang = ref('zh')
const translations = reactive({})

export function useI18n() {
  const setLanguage = (lang) => {
    currentLang.value = lang
    localStorage.setItem('preferred-language', lang)
  }

  const t = (key) => {
    const keys = key.split('.')
    let value = translations[currentLang.value]

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k]
      } else {
        return key // 如果找不到翻译，返回key本身
      }
    }

    return value || key
  }

  const loadTranslations = (translationData) => {
    Object.assign(translations, translationData)
  }

  const initLanguage = () => {
    const savedLang = localStorage.getItem('preferred-language')
    const browserLang = navigator.language.toLowerCase()

    if (savedLang && ['zh', 'en'].includes(savedLang)) {
      currentLang.value = savedLang
    } else if (browserLang.startsWith('zh')) {
      currentLang.value = 'zh'
    } else {
      currentLang.value = 'en'
    }
  }

  return {
    currentLang,
    setLanguage,
    t,
    loadTranslations,
    initLanguage
  }
}
