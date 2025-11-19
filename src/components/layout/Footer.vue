<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-section">
            <h3 class="footer-title">{{ siteConfig.name }}</h3>
            <p class="footer-description">{{ t('footer.description') }}</p>
            <div class="footer-actions">
              <div class="social-links">
                <a href="#" class="social-link" title="WeChat" @click.prevent="showWechatQR">💬</a>
                <a href="#" class="social-link" title="Email">📧</a>
                <a href="#" class="social-link" title="GitHub">⚡</a>
              </div>
              <LanguageSwitcher />
            </div>
          </div>

          <div class="footer-section">
            <h4 class="footer-subtitle">{{ t('footer.services') }}</h4>
            <ul class="footer-links">
              <li><a href="#services">{{ t('services.items.website.title') }}</a></li>
              <li><a href="#services">{{ t('services.items.mobile.title') }}</a></li>
              <li><a href="#services">{{ t('services.items.system.title') }}</a></li>
              <li><a href="#services">{{ t('services.items.consulting.title') }}</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4 class="footer-subtitle">{{ t('footer.about') }}</h4>
            <ul class="footer-links">
              <li><a href="#about">{{ t('footer.company') }}</a></li>
              <li><a href="#portfolio">{{ t('footer.cases') }}</a></li>
              <li><a href="#contact">{{ t('footer.contactInfo') }}</a></li>
              <li><a href="#">{{ t('footer.privacy') }}</a></li>
            </ul>
          </div>

          <div class="footer-section">
            <h4 class="footer-subtitle">{{ t('footer.contactTitle') }}</h4>
            <div class="contact-item">
              <span class="contact-icon">📧</span>
              <span>support@owoblog.com</span>
            </div>
            <div class="contact-item">
              <span class="contact-icon">🌐</span>
              <span>owoblog.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <div class="footer-bottom-content">
          <p>&copy; 2024 {{ siteConfig.name }}. {{ t('footer.copyright') }}</p>
          <p class="footer-tech">{{ t('footer.poweredBy') }}</p>
        </div>
      </div>
    </div>

    <WechatQRModal
      :show="showQRModal"
      :qr-code-image="qrCodeImage"
      @close="hideWechatQR"
    />
  </footer>
</template>

<script setup>
import { useWechatQR } from '@/composables/useWechatQR'
import { useI18n } from '@/composables/useI18n'
import WechatQRModal from '@/components/common/WechatQRModal.vue'
import LanguageSwitcher from '@/components/common/LanguageSwitcher.vue'
import { siteConfig } from '@/data/siteData'

const { showQRModal, qrCodeImage, showWechatQR, hideWechatQR } = useWechatQR()
const { t } = useI18n()
</script>

<style scoped>
.footer {
  background: var(--bg-dark);
  color: white;
}

.footer-content {
  padding: 3rem 0 2rem;
}

.footer-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
}

.footer-section {
  display: flex;
  flex-direction: column;
}

.footer-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: var(--primary-gradient);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.footer-subtitle {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
}

.footer-description {
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.social-links {
  display: flex;
  gap: 1rem;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  text-decoration: none;
  font-size: 1.2rem;
  transition: var(--transition-fast);
  cursor: pointer;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.footer-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.7);
  text-decoration: none;
  transition: var(--transition-fast);
}

.footer-links a:hover {
  color: white;
  transform: translateX(5px);
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
  color: rgba(255, 255, 255, 0.7);
}

.contact-icon {
  font-size: 1.1rem;
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  padding: 1.5rem 0;
}

.footer-bottom-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.9rem;
}

.footer-tech {
  margin: 0;
}

.footer-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .footer-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-bottom-content {
    flex-direction: column;
    gap: 0.5rem;
    text-align: center;
  }

  .footer-actions {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
