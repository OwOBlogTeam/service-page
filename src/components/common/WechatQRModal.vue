<template>
  <Teleport to="body">
    <Transition name="qr-modal" appear>
      <div v-if="show" class="qr-modal-overlay" @click="closeModal">
        <div class="qr-modal-container" @click.stop>
          <div class="qr-modal-header">
            <h3>{{ t('wechat.title') }}</h3>
            <button class="qr-modal-close" @click="closeModal">×</button>
          </div>
          <div class="qr-modal-body">
            <div class="qr-code-container">
              <img
                :src="qrCodeImage"
                :alt="t('wechat.placeholder.title')"
                class="qr-code-image"
                @error="handleImageError"
              />
              <div v-if="imageError" class="qr-placeholder">
                <div class="qr-icon">💬</div>
                <p>{{ t('wechat.placeholder.title') }}</p>
                <p class="qr-text">{{ t('wechat.placeholder.text') }}</p>
              </div>
            </div>
            <div class="qr-info">
              <p class="qr-title">{{ t('wechat.scanTitle') }}</p>
              <p class="qr-subtitle">{{ t('wechat.subtitle') }}</p>
              <div class="qr-tips">
                <div class="tip-item">
                  <span class="tip-icon">⚡</span>
                  <span>{{ t('wechat.tips.fast') }}</span>
                </div>
                <div class="tip-item">
                  <span class="tip-icon">💡</span>
                  <span>{{ t('wechat.tips.professional') }}</span>
                </div>
                <div class="tip-item">
                  <span class="tip-icon">🎯</span>
                  <span>{{ t('wechat.tips.custom') }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { useI18n } from '@/composables/useI18n'

const { t } = useI18n()

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  qrCodeImage: {
    type: String,
    default: '/wechat-qr-code.png'
  }
})

const emit = defineEmits(['close'])

const imageError = ref(false)

const closeModal = () => {
  emit('close')
}

const handleImageError = () => {
  imageError.value = true
}

watch(() => props.show, (newVal) => {
  if (newVal) {
    document.body.style.overflow = 'hidden'
    imageError.value = false
  } else {
    document.body.style.overflow = 'auto'
  }
})

onUnmounted(() => {
  document.body.style.overflow = 'auto'
})
</script>

<style scoped>
.qr-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 3000;
  padding: 1rem;
}

.qr-modal-container {
  background: white;
  border-radius: var(--radius-large);
  max-width: 420px;
  width: 100%;
  overflow: hidden;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
  animation: modalSlideIn 0.3s ease-out;
}

.qr-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem 2rem;
  background: var(--primary-gradient);
  color: white;
}

.qr-modal-header h3 {
  margin: 0;
  font-size: 1.3rem;
  font-weight: 600;
}

.qr-modal-close {
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: white;
  transition: var(--transition-fast);
  line-height: 1;
  opacity: 0.8;
}

.qr-modal-close:hover {
  opacity: 1;
  transform: scale(1.1);
}

.qr-modal-body {
  padding: 2rem;
  text-align: center;
}

.qr-code-container {
  position: relative;
  margin-bottom: 1.5rem;
}

.qr-code-image {
  /* width: 500px; */
  height: 500px;
  border-radius: var(--radius-medium);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.qr-placeholder {
  /* width: 500px; */
  height: 500px;
  background: var(--bg-secondary);
  border: 2px dashed #ddd;
  border-radius: var(--radius-medium);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  color: var(--text-secondary);
}

.qr-icon {
  font-size: 3rem;
  margin-bottom: 0.5rem;
}

.qr-text {
  font-size: 0.9rem;
  margin: 0.5rem 0 0 0;
}

.qr-info {
  text-align: center;
}

.qr-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
}

.qr-subtitle {
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  line-height: 1.5;
}

.qr-tips {
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.tip-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.9rem;
  color: var(--text-secondary);
}

.tip-icon {
  font-size: 1.5rem;
}

.qr-modal-enter-active,
.qr-modal-leave-active {
  transition: all 0.3s ease;
}

.qr-modal-enter-from,
.qr-modal-leave-to {
  opacity: 0;
}

.qr-modal-enter-from .qr-modal-container,
.qr-modal-leave-to .qr-modal-container {
  transform: scale(0.9) translateY(-50px);
}

@keyframes modalSlideIn {
  from {
    transform: scale(0.9) translateY(-50px);
    opacity: 0;
  }
  to {
    transform: scale(1) translateY(0);
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .qr-modal-container {
    margin: 1rem;
    max-width: calc(100% - 2rem);
  }

  .qr-modal-body {
    padding: 1.5rem;
  }

  /* .qr-code-image,
  .qr-placeholder {
    width: 160px;
    height: 160px;
  } */

  .qr-tips {
    gap: 1rem;
  }
}
</style>
