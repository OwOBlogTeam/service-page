<template>
  <section id="home" class="hero">
    <div class="hero-background">
      <div class="hero-particles">
        <div
          v-for="i in 20"
          :key="i"
          class="particle"
          :style="getParticleStyle(i)"
        ></div>
      </div>
    </div>

    <div class="hero-content">
      <div class="hero-text">
        <h1 class="hero-title">
          {{ t('hero.title') }}
        </h1>
        <p class="hero-subtitle">{{ typedText }}<span class="cursor">|</span></p>

        <div class="hero-cards">
          <div
            v-for="(card, key) in techCards"
            :key="key"
            class="tech-card"
          >
            <span class="tech-icon">{{ card.icon }}</span>
            <span class="tech-text">{{ t(`hero.techCards.${key}`) }}</span>
          </div>
        </div>

        <div class="hero-actions">
          <button @click="scrollToSection('services')" class="btn btn-primary">
            {{ t('hero.learnMore') }}
          </button>
          <button @click="scrollToSection('contact')" class="btn btn-secondary">
            {{ t('hero.contactUs') }}
          </button>
        </div>
      </div>

      <div class="hero-visual">
        <div class="hero-image">
          <div class="floating-elements">
            <div class="floating-element" :style="{ animationDelay: '0s' }">💻</div>
            <div class="floating-element" :style="{ animationDelay: '1s' }">🚀</div>
            <div class="floating-element" :style="{ animationDelay: '2s' }">⚡</div>
            <div class="floating-element" :style="{ animationDelay: '3s' }">🎯</div>
          </div>
        </div>
      </div>
    </div>

    <div class="scroll-indicator" @click="scrollToSection('about')">
      <div class="scroll-arrow">↓</div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { useScroll } from '@/composables/useScroll'
import { useI18n } from '@/composables/useI18n'

const { scrollToSection } = useScroll()
const { t, currentLang } = useI18n()

// 重构tech cards数据
const techCards = {
  performance: { icon: '🚀' },
  innovation: { icon: '💡' },
  professional: { icon: '🔧' },
  responsive: { icon: '📱' }
}

// 打字机效果
const typedText = ref('')
let typingTimer = null

const startTyping = () => {
  const text = t('hero.subtitle')
  typedText.value = ''
  let i = 0

  if (typingTimer) {
    clearInterval(typingTimer)
  }

  typingTimer = setInterval(() => {
    if (i < text.length) {
      typedText.value += text.charAt(i)
      i++
    } else {
      clearInterval(typingTimer)
      typingTimer = null
    }
  }, 100)
}

// 粒子样式生成
const getParticleStyle = (index) => {
  return {
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDelay: `${Math.random() * 3}s`,
    animationDuration: `${3 + Math.random() * 4}s`
  }
}

// 监听语言变化重新开始打字效果
watch(currentLang, () => {
  setTimeout(() => startTyping(), 500)
}, { immediate: false })

onMounted(() => {
  setTimeout(() => startTyping(), 1000)
})

// 清理定时器
import { onUnmounted } from 'vue'
onUnmounted(() => {
  if (typingTimer) {
    clearInterval(typingTimer)
  }
})
</script>

<style scoped>
.hero {
  position: relative;
  height: 100vh;
  background: var(--primary-gradient);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: white;
}

.hero-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.1;
}

.hero-particles {
  position: relative;
  width: 100%;
  height: 100%;
}

.particle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 50%;
  animation: float 6s ease-in-out infinite;
}

.hero-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
  z-index: 1;
}

.hero-title {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.hero-subtitle {
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
  min-height: 2rem;
}

.cursor {
  animation: blink 1s infinite;
}

.hero-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  margin-bottom: 3rem;
}

.tech-card {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-medium);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: var(--transition-fast);
}

.tech-card:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.tech-icon {
  font-size: 1.5rem;
}

.tech-text {
  font-weight: 500;
}

.hero-actions {
  display: flex;
  gap: 1rem;
}

.hero-visual {
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-image {
  position: relative;
  width: 400px;
  height: 400px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  backdrop-filter: blur(20px);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.floating-elements {
  position: relative;
  width: 100%;
  height: 100%;
}

.floating-element {
  position: absolute;
  font-size: 3rem;
  animation: float 4s ease-in-out infinite;
}

.floating-element:nth-child(1) { top: 20%; left: 20%; }
.floating-element:nth-child(2) { top: 20%; right: 20%; }
.floating-element:nth-child(3) { bottom: 30%; left: 15%; }
.floating-element:nth-child(4) { bottom: 20%; right: 25%; }

.scroll-indicator {
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.scroll-indicator:hover {
  opacity: 1;
}

.scroll-arrow {
  font-size: 2rem;
  animation: bounce 2s infinite;
}

.btn {
  padding: 12px 32px;
  border: none;
  border-radius: var(--radius-round);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-fast);
  text-decoration: none;
  display: inline-block;
  font-size: 1rem;
}

.btn-primary {
  background: rgba(255,255,255,0.2);
  color: white;
  border: 2px solid rgba(255,255,255,0.3);
}

.btn-primary:hover {
  background: rgba(255,255,255,0.3);
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0,0,0,0.2);
}

.btn-secondary {
  background: transparent;
  color: white;
  border: 2px solid rgba(255,255,255,0.5);
}

.btn-secondary:hover {
  background: rgba(255,255,255,0.1);
  border-color: rgba(255,255,255,0.8);
  transform: translateY(-2px);
}

/* 动画定义 */
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  25% { transform: translateY(-10px) rotate(1deg); }
  50% { transform: translateY(-5px) rotate(-1deg); }
  75% { transform: translateY(-15px) rotate(0.5deg); }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% { transform: translateX(-50%) translateY(0); }
  40% { transform: translateX(-50%) translateY(-10px); }
  60% { transform: translateX(-50%) translateY(-5px); }
}

@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}

@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    text-align: center;
    gap: 2rem;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.2rem;
  }

  .hero-cards {
    grid-template-columns: 1fr;
  }

  .hero-actions {
    justify-content: center;
    flex-wrap: wrap;
  }

  .hero-image {
    width: 300px;
    height: 300px;
  }
}
</style>
