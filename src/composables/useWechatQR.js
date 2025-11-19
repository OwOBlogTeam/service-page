import { ref } from 'vue'

export function useWechatQR() {
  const showQRModal = ref(false)
  const qrCodeImage = ref(`${import.meta.env.BASE_URL}wechat-qr-code.jpg`)

  const showWechatQR = () => {
    showQRModal.value = true
  }

  const hideWechatQR = () => {
    showQRModal.value = false
  }

  return {
    showQRModal,
    qrCodeImage,
    showWechatQR,
    hideWechatQR
  }
}
