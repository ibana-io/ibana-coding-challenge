import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

import GifDisplay from './pages/Gif.vue';
import SearchInput from './pages/Overview.vue';

const scrollBehavior = (to, from, savedPosition) => {
  if (to.hash)
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ el: to.hash });
      }, 500);
    });

  if (savedPosition) return savedPosition;
  else if (to.meta.noScroll && from.meta.noScroll) return {};
  else return { top: 0 };
};

declare module 'vue-router' {
  interface RouteMeta {
    title?: string;
    isPublic?: boolean;
    isManagement?: boolean;
  }
}

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'SearchInput',
    component: SearchInput, 
  },
  {
    path: '/gifs',
    name: 'GifDisplay',
    component: GifDisplay, 
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_PATH),
  scrollBehavior,
  routes: [...routes],
});

export async function redirectToHome() {
  await router.push({ path: '/' });
}

export async function redirectToSSO() {
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const basePath = import.meta.env.VITE_BASE_PATH;

  const encodedBaseUrl = encodeURIComponent(baseUrl + basePath);

  // redirect to sso portal login with return target appended
  window.location.href = import.meta.env.VITE_SSO_REDIRECT_URL + encodedBaseUrl;
}

router.afterEach((to) => {
  const parent = to.matched.find((record) => record.meta.title);
  const parentTitle = parent ? parent.meta.title : null;

  document.title = to.meta.title || parentTitle || 'Gif Website';
});

export default router;
