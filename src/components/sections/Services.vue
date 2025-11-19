<template>
  <section id="services" class="section services">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">{{ t('services.title') }}</h2>
        <p class="section-subtitle">{{ t('services.subtitle') }}</p>
      </div>

      <div class="services-grid">
        <div
          v-for="(service, key) in services"
          :key="key"
          class="service-card"
          :class="{ 'animate': animatedServices.includes(Object.keys(services).indexOf(key)) }"
        >
          <div class="service-icon">{{ service.icon }}</div>
          <h3 class="service-title">{{ t(`services.items.${key}.title`) }}</h3>
          <p class="service-description">{{ t(`services.items.${key}.description`) }}</p>

          <ul class="service-features">
            <li v-for="(feature, index) in t(`services.items.${key}.features`)" :key="index">
              <span class="feature-check">✓</span>
              {{ feature }}
            </li>
          </ul>

          <button class="service-btn" @click="openModal(key)">
            {{ t('services.learnMore') }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useIntersectionObserver } from '@/composables/useAnimation'
import { useI18n } from '@/composables/useI18n'

const { observeElements } = useIntersectionObserver()
const { t } = useI18n()
const animatedServices = ref([])

const services = {
  website: { icon: '💻' },
  mobile: { icon: '📱' },
  system: { icon: '⚙️' },
  consulting: { icon: '🔍' }
}

const emit = defineEmits(['open-modal'])

const openModal = (serviceKey) => {
  const serviceData = {
    title: t(`services.items.${serviceKey}.title`),
    description: t(`services.items.${serviceKey}.description`),
    features: t(`services.items.${serviceKey}.features`)
  }

  emit('open-modal', {
    title: serviceData.title,
    content: `
      <div class="modal-service">
        <h3>${serviceData.title}</h3>
        <p>${serviceData.description}</p>
        <h4>${t('services.items.website.features') === serviceData.features ? t('services.title') : '服务特色'}:</h4>
        <ul>
          ${serviceData.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        <p>如需了解更多详情或获取报价，请联系我们的专业团队。</p>
      </div>
    `
  })
}

onMounted(() => {
  const serviceElements = document.querySelectorAll('.service-card')

  observeElements(serviceElements, (el) => {
    const index = Array.from(serviceElements).indexOf(el)
    if (!animatedServices.value.includes(index)) {
      setTimeout(() => {
        animatedServices.value.push(index)
      }, index * 200)
    }
  })
})
</script>

<style scoped>
.services {
  background: var(--bg-primary);
}

.services-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.service-card {
  background: white;
  border-radius: var(--radius-large);
  padding: 2rem;
  box-shadow: var(--shadow-light);
  transition: all 0.6s ease;
  opacity: 0;
  transform: translateY(30px);
  position: relative;
  overflow: hidden;
}

.service-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--primary-gradient);
}

.service-card.animate {
  opacity: 1;
  transform: translateY(0);
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-medium);
}

.service-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.service-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.service-description {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.service-features {
  list-style: none;
  margin-bottom: 2rem;
  padding: 0;
}

.service-features li {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-secondary);
}

.feature-check {
  color: #34a853;
  font-weight: 700;
  width: 16px;
  flex-shrink: 0;
}

.service-btn {
  width: 100%;
  padding: 0.75rem;
  background: var(--primary-gradient);
  color: white;
  border: none;
  border-radius: var(--radius-medium);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-fast);
}

.service-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(102, 126, 234, 0.3);
}

@media (max-width: 768px) {
  .services-grid {
    grid-template-columns: 1fr;
  }
}

/* Modal 内容样式 */
:deep(.modal-service h3) {
  color: var(--text-primary);
  margin: 0 0 1rem 0;
}

:deep(.modal-service p) {
  margin-bottom: 1rem;
  line-height: 1.6;
}

:deep(.modal-service h4) {
  color: var(--text-primary);
  margin: 1.5rem 0 1rem 0;
}

:deep(.modal-service ul) {
  padding-left: 1.5rem;
  margin-bottom: 1rem;
}

:deep(.modal-service li) {
  margin-bottom: 0.5rem;
  line-height: 1.5;
}
</style>
