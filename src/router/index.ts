import { createRouter, createWebHistory } from 'vue-router'
import DayView from '@/views/DayView.vue'
import WeekView from '@/views/WeekView.vue'
import MonthView from '@/views/MonthView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/day'
    },
    {
      path: '/day',
      name: 'day',
      component: DayView
    },
    {
      path: '/week',
      name: 'week',
      component: WeekView
    },
    {
      path: '/month',
      name: 'month',
      component: MonthView
    }
  ]
})

export default router
