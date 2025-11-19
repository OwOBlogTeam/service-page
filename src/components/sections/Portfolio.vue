<template>
  <section id="portfolio" class="section portfolio">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">{{ t('portfolio.title') }}</h2>
        <p class="section-subtitle">{{ t('portfolio.subtitle') }}</p>
      </div>

      <div class="portfolio-filter">
        <button
          v-for="(category, key) in categories"
          :key="key"
          :class="['filter-btn', { active: activeFilter === t(`portfolio.filter.${key}`) }]"
          @click="setFilter(t(`portfolio.filter.${key}`))"
        >
          {{ t(`portfolio.filter.${key}`) }}
        </button>
      </div>

      <div class="portfolio-grid">
        <div
          v-for="(item, key) in filteredItems"
          :key="key"
          class="portfolio-item"
          @click="openModal(key)"
        >
          <div class="portfolio-image">
            <img :src="item.image" :alt="t(`portfolio.items.${key}.title`)" />
            <div class="portfolio-overlay">
              <div class="portfolio-content">
                <h3 class="portfolio-title">{{ t(`portfolio.items.${key}.title`) }}</h3>
                <p class="portfolio-category">{{ t(`portfolio.items.${key}.category`) }}</p>
                <button class="portfolio-btn">{{ t('portfolio.viewDetails') }}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()
const activeFilter = ref('')

const categories = {
  all: true,
  website: true,
  mobile: true,
  system: true
}

const portfolioItems = {
  enterprise: {
    category: 'website',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNDI4NWY0Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RW50ZXJwcmlzZSBXZWJzaXRlPC90ZXh0Pjwvc3ZnPg=='
  },
  ecommerce: {
    category: 'website',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjMzRhODUzIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+RS1jb21tZXJjZSBQbGF0Zm9ybTwvdGV4dD48L3N2Zz4='
  },
  management: {
    category: 'system',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZmY5ODAwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+TWFuYWdlbWVudCBTeXN0ZW08L3RleHQ+PC9zdmc+'
  },
  reactnative: {
    category: 'mobile',
    image: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjNjE0NmZmIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtc2l6ZT0iMTgiIGZpbGw9IndoaXRlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkeT0iLjNlbSI+UmVhY3QgTmF0aXZlIEFwcDwvdGV4dD48L3N2Zz4='
  }
}

const filteredItems = computed(() => {
  if (!activeFilter.value || activeFilter.value === t('portfolio.filter.all')) {
    return portfolioItems
  }

  const filtered = {}
  Object.entries(portfolioItems).forEach(([key, item]) => {
    if (t(`portfolio.items.${key}.category`) === activeFilter.value) {
      filtered[key] = item
    }
  })
  return filtered
})

const setFilter = (category) => {
  activeFilter.value = category
}

// 初始化过滤器
activeFilter.value = t('portfolio.filter.all')

const emit = defineEmits(['open-modal'])

const openModal = (itemKey) => {
  emit('open-modal', {
    title: t(`portfolio.items.${itemKey}.title`),
    content: `
      <div class="modal-portfolio">
        <img src="${portfolioItems[itemKey].image}" alt="${t(`portfolio.items.${itemKey}.title`)}" style="width: 100%; border-radius: 10px; margin-bottom: 1rem;">
        <h3>${t(`portfolio.items.${itemKey}.title`)}</h3>
        <p class="category"><strong>${t('portfolio.filter.all')}:</strong> ${t(`portfolio.items.${itemKey}.category`)}</p>
        <p><strong>${t('contact.form.message')}:</strong></p>
        <p>${t(`portfolio.items.${itemKey}.description`)}</p>
        <p>${t('about.subtitle')}</p>
      </div>
    `
  })
}
</script>

<style scoped>
.portfolio {
  background: var(--bg-secondary);
}

.portfolio-filter {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--primary-color);
  background: transparent;
  color: var(--primary-color);
  border-radius: var(--radius-round);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-fast);
}

.filter-btn:hover,
.filter-btn.active {
  background: var(--primary-color);
  color: white;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.portfolio-item {
  cursor: pointer;
  transition: var(--transition-fast);
}

.portfolio-item:hover {
  transform: translateY(-5px);
}

.portfolio-image {
  position: relative;
  border-radius: var(--radius-large);
  overflow: hidden;
  aspect-ratio: 4/3;
}

.portfolio-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: var(--transition-fast);
}

.portfolio-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(102, 126, 234, 0.9);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: var(--transition-fast);
}

.portfolio-item:hover .portfolio-overlay {
  opacity: 1;
}

.portfolio-item:hover .portfolio-image img {
  transform: scale(1.1);
}

.portfolio-content {
  text-align: center;
  color: white;
  padding: 2rem;
}

.portfolio-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
}

.portfolio-category {
  margin-bottom: 1rem;
  opacity: 0.9;
}

.portfolio-btn {
  padding: 0.75rem 1.5rem;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: var(--radius-round);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-fast);
}

.portfolio-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
  }

  .portfolio-filter {
    gap: 0.5rem;
  }

  .filter-btn {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
}

:deep(.modal-portfolio .category) {
  color: var(--primary-color);
  margin-bottom: 1rem;
}
</style>
