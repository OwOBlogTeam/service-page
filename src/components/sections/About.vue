<template>
  <section id="about" class="section about">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">{{ t('about.title') }}</h2>
        <p class="section-subtitle">{{ t('about.subtitle') }}</p>
      </div>

      <div class="about-content">
        <div class="about-grid">
          <div
            v-for="(item, index) in aboutItemsList"
            :key="item.key"
            class="about-item"
            :class="{ 'animate': animatedItems.includes(index) }"
          >
            <div class="about-icon">{{ item.icon }}</div>
            <h3 class="about-title">{{ t(`about.items.${item.key}.title`) }}</h3>
            <p class="about-description">{{ t(`about.items.${item.key}.description`) }}</p>
          </div>
        </div>

        <div class="stats-section">
          <div class="stats-grid">
            <div
              v-for="(stat, index) in statsList"
              :key="stat.key"
              class="stat-item"
            >
              <div class="stat-number">{{ animatedStats[index] }}{{ stat.key === 'satisfaction' ? '%' : '+' }}</div>
              <div class="stat-label">{{ t(`about.stats.${stat.key}`) }}</div>
            </div>
          </div>
        </div>

        <div class="contact-cta">
          <div class="contact-cta-content">
            <h3>{{ t('about.cta.title') }}</h3>
            <p>{{ t('about.cta.subtitle') }}</p>
            <div class="contact-actions">
              <button @click="showWechatQR" class="wechat-btn">
                <span class="btn-icon">💬</span>
                <span>{{ t('about.cta.wechat') }}</span>
              </button>
              <button @click="scrollToContact" class="contact-btn">
                <span class="btn-icon">📞</span>
                <span>{{ t('about.cta.contact') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <WechatQRModal
      :show="showQRModal"
      :qr-code-image="qrCodeImage"
      @close="hideWechatQR"
    />
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useScroll } from '@/composables/useScroll'
import { useWechatQR } from '@/composables/useWechatQR'
import { useI18n } from '@/composables/useI18n'
import WechatQRModal from '@/components/common/WechatQRModal.vue'

const { scrollToSection } = useScroll()
const { showQRModal, qrCodeImage, showWechatQR, hideWechatQR } = useWechatQR()
const { t } = useI18n()

const animatedItems = ref([])
const animatedStats = ref([0, 0, 0, 0])

// 数据定义
const aboutItemsList = [
  { key: 'professional', icon: '🎯' },
  { key: 'fast', icon: '⚡' },
  { key: 'innovative', icon: '🌟' }
]

const statsList = [
  { key: 'projects', value: 30 },
  { key: 'clients', value: 30 },
  { key: 'years', value: 5 },
  { key: 'satisfaction', value: 100 }
]

const scrollToContact = () => {
  scrollToSection('contact')
}

// 交叉观察者简单实现
const observeElements = (elements, callback) => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry.target)
        observer.unobserve(entry.target)
      }
    })
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  })

  elements.forEach(el => {
    if (el) observer.observe(el)
  })

  return observer
}

// 统计数字动画
const animateStatsNumbers = () => {
  statsList.forEach((stat, index) => {
    let current = 0
    const increment = stat.value / 100
    const timer = setInterval(() => {
      current += increment
      if (current >= stat.value) {
        animatedStats.value[index] = stat.value
        clearInterval(timer)
      } else {
        animatedStats.value[index] = Math.floor(current)
      }
    }, 20)
  })
}

onMounted(() => {
  // 等待DOM渲染完成
  setTimeout(() => {
    const aboutItemElements = document.querySelectorAll('.about-item')
    const statsSection = document.querySelector('.stats-section')

    // 观察about items
    if (aboutItemElements.length > 0) {
      observeElements(Array.from(aboutItemElements), (el) => {
        const index = Array.from(aboutItemElements).indexOf(el)
        if (!animatedItems.value.includes(index)) {
          animatedItems.value.push(index)
        }
      })
    }

    // 观察stats section
    if (statsSection) {
      observeElements([statsSection], () => {
        animateStatsNumbers()
      })
    }
  }, 100)
})

onUnmounted(() => {
  // 清理定时器和观察者
})
</script>

<style scoped>
.about {
  background: var(--bg-secondary);
}

.about-content {
  display: flex;
  flex-direction: column;
  gap: 5rem;
}

.about-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.about-item {
  text-align: center;
  padding: 2rem;
  background: white;
  border-radius: var(--radius-large);
  box-shadow: var(--shadow-light);
  transition: all 0.6s ease;
  opacity: 0;
  transform: translateY(30px);
}

.about-item.animate {
  opacity: 1;
  transform: translateY(0);
}

.about-item:hover {
  transform: translateY(-10px);
  box-shadow: var(--shadow-medium);
}

.about-icon {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.about-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: var(--text-primary);
}

.about-description {
  color: var(--text-secondary);
  line-height: 1.6;
}

.stats-section {
  background: white;
  padding: 3rem 2rem;
  border-radius: var(--radius-large);
  box-shadow: var(--shadow-light);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 3rem;
  font-weight: 700;
  background: var(--primary-gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 0.5rem;
}

.stat-label {
  font-size: 1.1rem;
  color: var(--text-secondary);
  font-weight: 500;
}

.contact-cta {
  background: var(--primary-gradient);
  padding: 3rem 2rem;
  border-radius: var(--radius-large);
  text-align: center;
  color: white;
  box-shadow: var(--shadow-medium);
}

.contact-cta-content h3 {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.contact-cta-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
  opacity: 0.9;
}

.contact-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.wechat-btn,
.contact-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem 2rem;
  border: none;
  border-radius: var(--radius-round);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-fast);
  font-size: 1rem;
  text-decoration: none;
}

.wechat-btn {
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.wechat-btn:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
}

.contact-btn {
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.contact-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.8);
  transform: translateY(-2px);
}

.btn-icon {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .stat-number {
    font-size: 2rem;
  }

  .contact-cta {
    padding: 2rem 1.5rem;
  }

  .contact-cta-content h3 {
    font-size: 1.5rem;
  }

  .contact-cta-content p {
    font-size: 1rem;
  }

  .contact-actions {
    flex-direction: column;
    align-items: center;
  }

  .wechat-btn,
  .contact-btn {
    width: 100%;
    max-width: 200px;
  }
}
</style>
