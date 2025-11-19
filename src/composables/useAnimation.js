import { ref, onMounted } from 'vue'

export function useTypewriter(text, speed = 150) {
  const typedText = ref('')

  const startTyping = () => {
    let i = 0
    const timer = setInterval(() => {
      if (i < text.length) {
        typedText.value += text.charAt(i)
        i++
      } else {
        clearInterval(timer)
      }
    }, speed)
  }

  return {
    typedText,
    startTyping,
  }
}

export function useStatsAnimation(stats) {
  const animatedStats = ref(stats.map(() => 0))

  const animateStats = () => {
    stats.forEach((stat, index) => {
      let current = 0
      const increment = stat.number / 100
      const timer = setInterval(() => {
        current += increment
        if (current >= stat.number) {
          animatedStats.value[index] = stat.number
          clearInterval(timer)
        } else {
          animatedStats.value[index] = Math.floor(current)
        }
      }, 20)
    })
  }

  return {
    animatedStats,
    animateStats,
  }
}

export function useIntersectionObserver() {
  const observeElements = (elements, callback) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            callback(entry.target)
          }
        })
      },
      { threshold: 0.1 },
    )

    elements.forEach((el) => observer.observe(el))

    return observer
  }

  return {
    observeElements,
  }
}
