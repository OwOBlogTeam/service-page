<template>
  <div class="language-switcher">
    <button
      v-for="lang in languages"
      :key="lang.code"
      :class="['lang-btn', { active: currentLang === lang.code }]"
      @click="switchLanguage(lang.code)"
    >
      {{ lang.name }}
    </button>
  </div>
</template>

<script setup>
import { useI18n } from '@/composables/useI18n'

const { currentLang, setLanguage } = useI18n()

const languages = [
  { code: 'zh', name: '中文' },
  { code: 'en', name: 'EN' }
]

const switchLanguage = (langCode) => {
  setLanguage(langCode)
}
</script>

<style scoped>
.language-switcher {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-round);
  backdrop-filter: blur(10px);
}

.lang-btn {
  padding: 0.5rem 1rem;
  border: none;
  background: transparent;
  color: inherit;
  border-radius: var(--radius-round);
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: var(--transition-fast);
  min-width: 50px;
}

.lang-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.lang-btn.active {
  background: rgba(255, 255, 255, 0.9);
  color: var(--text-primary);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 深色主题下的样式 */
.footer .language-switcher {
  background: rgba(0, 0, 0, 0.2);
}

.footer .lang-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.footer .lang-btn.active {
  background: rgba(255, 255, 255, 0.9);
  color: var(--text-primary);
}
</style>
