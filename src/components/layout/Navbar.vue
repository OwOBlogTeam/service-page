<template>
  <nav class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="nav-container">
      <div class="nav-logo">
        <h2>{{ siteConfig.name }}</h2>
      </div>
      <div class="nav-menu" :class="{ 'nav-menu-active': isMobileMenuOpen }">
        <a
          v-for="item in navItems"
          :key="item.id"
          :href="`#${item.id}`"
          @click="handleNavClick(item.id)"
          class="nav-link"
        >
          {{ t(`nav.${item.key}`) }}
        </a>
      </div>
      <div class="nav-actions">
        <LanguageSwitcher />
        <div class="nav-toggle" @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useScroll } from '@/composables/useScroll'
import { useI18n } from '@/composables/useI18n'
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
import { siteConfig } from '@/data/siteData'

const { isScrolled, scrollToSection } = useScroll()
const { t } = useI18n()
const isMobileMenuOpen = ref(false)

const navItems = [
  { id: 'home', key: 'home' },
  { id: 'about', key: 'about' },
  { id: 'services', key: 'services' },
  { id: 'portfolio', key: 'portfolio' },
  { id: 'contact', key: 'contact' }
]

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const handleNavClick = (sectionId) => {
  scrollToSection(sectionId)
  isMobileMenuOpen.value = false
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 1000;
  transition: all 0.3s ease;
}

.navbar-scrolled {
  background: rgba(255, 255, 255, 0.98);
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.nav-logo h2 {
  background: var(--primary-gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: 700;
  font-size: 1.5rem;
}

.nav-menu {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-link {
  text-decoration: none;
  color: var(--text-primary);
  font-weight: 500;
  transition: color 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: var(--primary-color);
}

.nav-link::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -5px;
  left: 50%;
  background: var(--primary-gradient);
  transition: all 0.3s ease;
  transform: translateX(-50%);
}

.nav-link:hover::after {
  width: 100%;
}

.nav-toggle {
  display: none;
  flex-direction: column;
  cursor: pointer;
  gap: 4px;
}

.nav-toggle span {
  width: 25px;
  height: 3px;
  background: var(--text-primary);
  transition: all 0.3s ease;
}

@media (max-width: 768px) {
  .nav-menu {
    position: fixed;
    top: 80px;
    right: -100%;
    width: 100%;
    height: calc(100vh - 80px);
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(20px);
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    padding-top: 50px;
    transition: right 0.3s ease;
  }

  .nav-menu-active {
    right: 0;
  }

  .nav-toggle {
    display: flex;
  }
  .nav-actions {
    gap: 0.5rem;
  }
}
</style>
