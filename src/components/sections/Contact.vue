<template>
  <section id="contact" class="section contact">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">{{ t('contact.title') }}</h2>
        <p class="section-subtitle">{{ t('contact.subtitle') }}</p>
      </div>

      <div class="contact-content">
        <div class="contact-info">
          <div class="contact-cards">
            <div
              v-for="info in contactInfo"
              :key="info.title"
              class="contact-card"
              :class="{ 'wechat-card': info.title === t('contact.info.wechat') }"
              @click="info.title === t('contact.info.wechat') ? showWechatQR() : null"
            >
              <div class="contact-icon">{{ info.icon }}</div>
              <h3 class="contact-title">{{ info.title }}</h3>
              <p v-if="info.title === '微信' || info.title === 'WeChat'" class="click-hint">{{ t('contact.clickHint') }}</p>
              <a :href="info.content" v-else-if="info.title === '网站' || info.title === 'Website'" class="contact-detail">{{ info.content }}</a>
              <a :href="'mailto:' + info.content" v-else-if="info.title === '邮箱' || info.title === 'Email'" class="contact-detail">{{ info.content }}</a>
              <p v-else class="contact-detail">{{ info.content }}</p>
            </div>
          </div>
        </div>

        <div class="contact-form-wrapper">
          <div
            v-if="submitMessage"
            :class="['form-message', submitStatus]"
          >
            {{ submitMessage }}
            <button
              class="close-btn"
              @click="clearMessage"
              type="button"
            >×</button>
          </div>

          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-group">
              <label for="name">{{ t('contact.form.name') }} *</label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                required
                :class="['form-input', { error: submitStatus === 'error' && !form.name.trim() }]"
                :placeholder="t('contact.form.namePlaceholder')"
                :disabled="isSubmitting"
              >
            </div>

            <div class="form-group">
              <label for="email">{{ t('contact.form.email') }} *</label>
              <input
                type="email"
                id="email"
                v-model="form.email"
                required
                :class="['form-input', { error: submitStatus === 'error' && (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) }]"
                :placeholder="t('contact.form.emailPlaceholder')"
                :disabled="isSubmitting"
              >
            </div>

            <div class="form-group">
              <label for="company">{{ t('contact.form.company') }}</label>
              <input
                type="text"
                id="company"
                v-model="form.company"
                class="form-input"
                :placeholder="t('contact.form.companyPlaceholder')"
                :disabled="isSubmitting"
              >
            </div>

            <div class="form-group">
              <label for="service">{{ t('contact.form.service') }}</label>
              <select
                id="service"
                v-model="form.service"
                class="form-select"
                :disabled="isSubmitting"
              >
                <option value="">{{ t('contact.form.servicePlaceholder') }}</option>
                <option value="website">{{ t('services.items.website.title') }}</option>
                <option value="mobile">{{ t('services.items.mobile.title') }}</option>
                <option value="system">{{ t('services.items.system.title') }}</option>
                <option value="consulting">{{ t('services.items.consulting.title') }}</option>
              </select>
            </div>

            <div class="form-group">
              <label for="message">{{ t('contact.form.message') }} *</label>
              <textarea
                id="message"
                v-model="form.message"
                required
                rows="5"
                :class="['form-textarea', { error: submitStatus === 'error' && (!form.message.trim() || form.message.trim().length < 10) }]"
                :placeholder="t('contact.form.messagePlaceholder')"
                :disabled="isSubmitting"
              ></textarea>
            </div>

            <button
              type="submit"
              :class="['submit-btn', { submitting: isSubmitting }]"
              :disabled="isSubmitting"
            >
              <span v-if="isSubmitting">{{ t('contact.form.submitting') }}</span>
              <span v-else>{{ t('contact.form.submit') }}</span>
            </button>
          </form>
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
import { ref, reactive, computed } from 'vue'
import { useWechatQR } from '@/composables/useWechatQR'
import { useI18n } from '@/composables/useI18n'
import WechatQRModal from '@/components/common/WechatQRModal.vue'

const { showQRModal, qrCodeImage, showWechatQR, hideWechatQR } = useWechatQR()
const { t, currentLang } = useI18n()

const isSubmitting = ref(false)
const submitMessage = ref('')
const submitStatus = ref('')

const form = reactive({
  name: '',
  email: '',
  company: '',
  service: '',
  message: ''
})

// 动态生成联系信息
const contactInfo = computed(() => [
  {
    icon: '📧',
    title: t('contact.info.email'),
    content: 'support@owoblog.com'
  },
  {
    icon: '🌐',
    title: t('contact.info.website'),
    content: 'https://owoblog.com'
  },
  {
    icon: '💬',
    title: t('contact.info.wechat'),
    content: t('contact.clickHint')
  }
])

// 表单验证（支持多语言错误信息）
const validateForm = () => {
  const errors = []

  if (!form.name.trim()) {
    errors.push(t('contact.form.nameRequired'))
  }

  if (!form.email.trim()) {
    errors.push(t('contact.form.emailRequired'))
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.push(t('contact.form.emailInvalid'))
  }

  if (!form.message.trim()) {
    errors.push(t('contact.form.messageRequired'))
  } else if (form.message.trim().length < 10) {
    errors.push(t('contact.form.messageMinLength'))
  }

  return errors
}

// 提交表单
const submitForm = async () => {
  submitMessage.value = ''
  submitStatus.value = ''

  const errors = validateForm()
  if (errors.length > 0) {
    submitMessage.value = errors.join('、')
    submitStatus.value = 'error'
    return
  }

  isSubmitting.value = true

  try {
    const submitData = {
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim() || null,
      service: form.service || null,
      message: form.message.trim(),
      source: 'website',
      language: currentLang.value,
      timestamp: new Date().toISOString()
    }

    console.log('准备提交数据:', submitData)

    const response = await fetch('https://api.owoblog.com/v1/service/ContactForm', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(submitData)
    })

    if (!response.ok) {
      let errorMessage = t('contact.form.errorMessage')
      try {
        const errorData = await response.json()
        errorMessage = errorData.message || errorData.error || errorMessage
      } catch (e) {
        console.error('解析错误响应失败:', e)
      }

      throw new Error(`HTTP ${response.status}: ${errorMessage}`)
    }

    const result = await response.json()
    console.log('提交成功:', result)

    submitMessage.value = t('contact.form.successMessage')
    submitStatus.value = 'success'

    // 重置表单
    Object.keys(form).forEach(key => {
      form[key] = ''
    })

    setTimeout(() => {
      submitMessage.value = ''
      submitStatus.value = ''
    }, 5000)

  } catch (error) {
    console.error('表单提交错误:', error)

    let errorMessage = t('contact.form.errorMessage')

    if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
      errorMessage = t('contact.form.networkError')
    } else if (error.message.includes('HTTP 400')) {
      errorMessage = t('contact.form.validationError')
    } else if (error.message.includes('HTTP 429')) {
      errorMessage = t('contact.form.rateLimitError')
    } else if (error.message.includes('HTTP 500')) {
      errorMessage = t('contact.form.serverError')
    }

    submitMessage.value = errorMessage
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}

// 清除消息
const clearMessage = () => {
  submitMessage.value = ''
  submitStatus.value = ''
}
</script>

<style scoped>
.contact {
  background: var(--bg-primary);
}

.contact-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.contact-cards {
  display: grid;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.contact-card {
  background: white;
  padding: 1.5rem;
  border-radius: var(--radius-medium);
  box-shadow: var(--shadow-light);
  text-align: center;
  transition: var(--transition-fast);
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-medium);
}

.wechat-card {
  cursor: pointer;
  border: 2px solid transparent;
}

.wechat-card:hover {
  border-color: var(--primary-color);
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%);
}

.contact-icon {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.contact-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-primary);
}

.contact-detail {
  color: var(--text-secondary);
  margin-bottom: 0.5rem;
}

.click-hint {
  font-size: 0.9rem;
  color: var(--primary-color);
  font-weight: 500;
}

.contact-form-wrapper {
  background: white;
  padding: 2rem;
  border-radius: var(--radius-large);
  box-shadow: var(--shadow-light);
}

.form-message {
  padding: 1rem;
  border-radius: var(--radius-medium);
  margin-bottom: 1rem;
  position: relative;
  animation: slideIn 0.3s ease-out;
}

.form-message.success {
  background: #f0f9f0;
  border: 1px solid #4caf50;
  color: #2e7d32;
}

.form-message.error {
  background: #fff3f3;
  border: 1px solid #f44336;
  color: #c62828;
}

.form-message .close-btn {
  position: absolute;
  top: 0.5rem;
  right: 0.75rem;
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease;
}

.form-message .close-btn:hover {
  opacity: 1;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group label {
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--text-primary);
}

.form-input,
.form-select,
.form-textarea {
  padding: 0.75rem;
  border: 2px solid #e1e5e9;
  border-radius: var(--radius-small);
  font-size: 1rem;
  transition: var(--transition-fast);
  font-family: inherit;
}

.form-input:focus,
.form-select:focus,
.form-textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
}

.form-input.error,
.form-select.error,
.form-textarea.error {
  border-color: #f44336;
  box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
}

.form-textarea {
  resize: vertical;
  min-height: 120px;
}

.submit-btn {
  padding: 1rem 2rem;
  background: var(--primary-gradient);
  color: white;
  border: none;
  border-radius: var(--radius-medium);
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition-fast);
  position: relative;
}

.submit-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none !important;
}

.submit-btn.submitting::after {
  content: '';
  position: absolute;
  width: 16px;
  height: 16px;
  margin: auto;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s linear infinite;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@media (max-width: 768px) {
  .contact-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .quick-actions {
    flex-direction: column;
  }

  .quick-btn {
    flex: none;
  }
}
</style>
