import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../pages/HomePage.vue'
import { themeState, applyTheme } from '../stores/uiState'

// HomePage is statically imported so the landing route paints without an extra
// network round-trip. Every other page is lazy-loaded: Vite emits a separate
// chunk per route, so the heavy admin panel, detail page, etc. are only fetched
// when the user actually navigates to them.
const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/umkm/:id',
    name: 'UmkmDetail',
    component: () => import('../pages/UmkmDetailPage.vue')
  },
  {
    path: '/search',
    name: 'SearchResult',
    component: () => import('../pages/SearchResultPage.vue')
  },
  {
    path: '/syarat-ketentuan',
    name: 'Terms',
    component: () => import('../pages/TermsPage.vue')
  },
  {
    path: '/kebijakan-privasi',
    name: 'Privacy',
    component: () => import('../pages/PrivacyPage.vue')
  },
  {
    path: '/achievements',
    name: 'Achievements',
    component: () => import('../pages/AchievementsPage.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('../pages/AdminPage.vue'),
    meta: { hideShell: true, requiresAdmin: true }
  },
  {
    path: '/admin/login',
    name: 'AdminLogin',
    component: () => import('../pages/AdminLoginPage.vue'),
    meta: { hideShell: true }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../pages/NotFoundPage.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to) => {
  // Force light mode on admin pages, otherwise restore preferred theme
  if (to.path.startsWith('/admin')) {
    themeState.forceLightMode = true
    themeState.isDark = false
    document.documentElement.classList.remove('dark')
  } else {
    themeState.forceLightMode = false
    const storedTheme = localStorage.getItem('theme') || 'auto'
    applyTheme(themeState.theme || storedTheme)
  }

  if (to.meta.requiresAdmin && sessionStorage.getItem('umkm-admin-auth') !== 'true') {
    return { name: 'AdminLogin', query: { redirect: to.fullPath } }
  }

  if (to.name === 'AdminLogin' && sessionStorage.getItem('umkm-admin-auth') === 'true') {
    return { name: 'Admin' }
  }

  return true
})

export default router
