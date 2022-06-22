import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/pages/HomePage.vue'

const suffix = ' - OwOBlog Service'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  base: '/service/',
  routes: [
    {
      path: '/',
      redirect: '/service'
    },
    {
      path: '/:pathMatch(.*)',
      redirect: '/error'
    },
    {
      path: '/about',
      redirect: '/service/about'
    },
    {
      path: '/privacy',
      redirect: '/service/privacy'
    },
    {
      path: '/support',
      redirect: '/service/support'
    },
    {
      path: '/termsofservice',
      redirect: '/service/termsofservice'
    },
    {
      path: '/service/',
      name: 'home',
      meta: {
        title: 'Home Page'
      },
      component: HomePage
    },
    {
      path: '/service/about',
      name: 'about',
      meta: {
        title: 'About Us'
      },
      component: () => import('@/pages/AboutPage.vue')
    },
    {
      path: '/service/privacy',
      name: 'privacy',
      meta: {
        title: 'Privacy Page'
      },
      component: () => import('@/pages/PrivacyPage.vue')
    },
    {
      path: '/service/support',
      name: 'support',
      meta: {
        title: 'Support Page'
      },
      component: () => import('@/pages/SupportPage.vue')
    },
    {
      path: '/service/termsofservice',
      name: 'Terms of Service',
      meta: {
        title: 'Terms of Service'
      },
      component: () => import('@/pages/TermsPage.vue')
    },
    {
      path: '/error',
      name: '404 Page',
      meta: {
        title: 'Page Not Found'
      },
      component: () => import('@/pages/404.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + suffix
  }
  next()
})

export default router
