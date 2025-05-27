<template>
  <div class="p-4 space-y-6">
    <!-- Month Navigation -->
    <div class="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
      <button 
        @click="previousMonth"
        class="p-2 text-gray-600 hover:text-pink-600 transition-colors"
      >
        <ChevronLeft class="w-6 h-6" />
      </button>
      
      <div class="text-center">
        <h2 class="text-lg font-bold text-gray-800">
          {{ format(selectedMonth, 'MMMM yyyy', { locale: es }) }}
        </h2>
        <p class="text-sm text-gray-600">Vista mensual</p>
      </div>
      
      <button 
        @click="nextMonth"
        class="p-2 text-gray-600 hover:text-pink-600 transition-colors"
      >
        <ChevronRight class="w-6 h-6" />
      </button>
    </div>

    <!-- This Month Button -->
    <div class="flex justify-center">
      <button
        @click="goToThisMonth"
        class="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors"
      >
        Este mes
      </button>
    </div>

    <!-- Monthly Stats -->
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl p-4">
        <div class="flex items-center space-x-2 mb-2">
          <Heart class="w-5 h-5 text-pink-600" />
          <span class="text-sm font-medium text-pink-800">Marisa</span>
        </div>
        <p class="text-2xl font-bold text-pink-700">
          {{ monthStats.totalMarisaHours }}h
        </p>
        <p class="text-xs text-pink-600">total del mes</p>
      </div>
      
      <div class="bg-gradient-to-br from-red-100 to-pink-100 rounded-xl p-4">
        <div class="flex items-center space-x-2 mb-2">
          <Heart class="w-5 h-5 text-red-600" />
          <span class="text-sm font-medium text-red-800">Sara</span>
        </div>
        <p class="text-2xl font-bold text-red-700">
          {{ monthStats.totalSaraHours }}h
        </p>
        <p class="text-xs text-red-600">total del mes</p>
      </div>
    </div>

    <!-- Monthly Percentage -->
    <div class="bg-white rounded-xl p-4 shadow-sm">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Distribución mensual</h3>
      <div class="grid grid-cols-2 gap-4">
        <div class="text-center">
          <div class="w-20 h-20 mx-auto mb-2 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
            <span class="text-white font-bold text-lg">
              {{ Math.round(monthlyMarisaPercentage) }}%
            </span>
          </div>
          <p class="text-sm font-medium text-pink-700">Marisa</p>
        </div>
        <div class="text-center">
          <div class="w-20 h-20 mx-auto mb-2 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center">
            <span class="text-white font-bold text-lg">
              {{ Math.round(monthlySaraPercentage) }}%
            </span>
          </div>
          <p class="text-sm font-medium text-red-700">Sara</p>
        </div>
      </div>
    </div>

    <!-- Weekly Breakdown -->
    <div class="bg-white rounded-xl p-4 shadow-sm">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Desglose semanal</h3>
      
      <div class="space-y-4">
        <div 
          v-for="(week, index) in monthStats.weeks" 
          :key="index"
          @click="showWeekDetail(week)"
          class="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-center justify-between mb-3">
            <div>
              <h4 class="font-medium text-gray-800">
                Semana {{ index + 1 }}
              </h4>
              <p class="text-sm text-gray-600">
                {{ format(week.weekStart, 'dd MMM', { locale: es }) }} - 
                {{ format(week.weekEnd, 'dd MMM', { locale: es }) }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-600">
                {{ getTotalWeekEvents(week) }} eventos
              </p>
            </div>
          </div>
          
          <!-- Weekly percentages -->
          <div class="grid grid-cols-2 gap-2">
            <div class="text-center p-2 bg-pink-50 rounded">
              <p class="text-xs text-pink-600">Marisa</p>
              <p class="text-lg font-bold text-pink-700">
                {{ Math.round(week.totalMarisaPercentage) }}%
              </p>
            </div>
            <div class="text-center p-2 bg-red-50 rounded">
              <p class="text-xs text-red-600">Sara</p>
              <p class="text-lg font-bold text-red-700">
                {{ Math.round(week.totalSaraPercentage) }}%
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Week Detail Modal -->
    <div 
      v-if="selectedWeekStats" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click="selectedWeekStats = null"
    >
      <div 
        class="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-6 rounded-t-2xl">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-bold">Detalle semanal</h2>
              <p class="text-pink-100">
                {{ format(selectedWeekStats.weekStart, 'dd MMM', { locale: es }) }} - 
                {{ format(selectedWeekStats.weekEnd, 'dd MMM yyyy', { locale: es }) }}
              </p>
            </div>
            <button @click="selectedWeekStats = null" class="text-white hover:text-pink-200">
              <X class="w-6 h-6" />
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-6 space-y-4">
          <!-- Week Stats -->
          <div class="grid grid-cols-2 gap-4">
            <div class="text-center p-3 bg-pink-50 rounded-lg">
              <p class="text-sm text-pink-600">Marisa</p>
              <p class="text-xl font-bold text-pink-700">
                {{ Math.round(selectedWeekStats.totalMarisaPercentage) }}%
              </p>
            </div>
            <div class="text-center p-3 bg-red-50 rounded-lg">
              <p class="text-sm text-red-600">Sara</p>
              <p class="text-xl font-bold text-red-700">
                {{ Math.round(selectedWeekStats.totalSaraPercentage) }}%
              </p>
            </div>
          </div>

          <!-- Daily breakdown -->
          <div>
            <h3 class="font-semibold text-gray-800 mb-3">Días de la semana</h3>
            <div class="space-y-2">
              <div 
                v-for="dayStats in selectedWeekStats.days" 
                :key="dayStats.date.toISOString()"
                class="flex items-center justify-between p-3 border rounded-lg"
                :class="isToday(dayStats.date) ? 'border-pink-400 bg-pink-50' : 'border-gray-200'"
              >
                <div>
                  <h4 class="font-medium text-gray-800 text-sm">
                    {{ format(dayStats.date, 'EEEE dd', { locale: es }) }}
                  </h4>
                  <p class="text-xs text-gray-600">{{ dayStats.events.length }} eventos</p>
                </div>
                <div class="flex space-x-2">
                  <div class="text-center">
                    <p class="text-xs text-pink-600">M</p>
                    <p class="text-sm font-bold text-pink-700">
                      {{ Math.round(dayStats.marisaPercentage) }}%
                    </p>
                  </div>
                  <div class="text-center">
                    <p class="text-xs text-red-600">S</p>
                    <p class="text-sm font-bold text-red-700">
                      {{ Math.round(dayStats.saraPercentage) }}%
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart,
  X
} from 'lucide-vue-next'
import { useEventsStore } from '@/stores/events'
import { WeekStats } from '@/types'
import { format, addMonths, subMonths, startOfToday, isSameDay } from 'date-fns'
import { es } from 'date-fns/locale'

const eventsStore = useEventsStore()
const selectedMonth = ref(startOfToday())
const selectedWeekStats = ref<WeekStats | null>(null)

const monthStats = computed(() => eventsStore.getMonthStats(selectedMonth.value))

const monthlyMarisaPercentage = computed(() => {
  const total = monthStats.value.totalMarisaHours + monthStats.value.totalSaraHours
  return total > 0 ? (monthStats.value.totalMarisaHours / total) * 100 : 0
})

const monthlySaraPercentage = computed(() => {
  const total = monthStats.value.totalMarisaHours + monthStats.value.totalSaraHours
  return total > 0 ? (monthStats.value.totalSaraHours / total) * 100 : 0
})

const previousMonth = () => {
  selectedMonth.value = subMonths(selectedMonth.value, 1)
}

const nextMonth = () => {
  selectedMonth.value = addMonths(selectedMonth.value, 1)
}

const goToThisMonth = () => {
  selectedMonth.value = startOfToday()
}

const isToday = (date: Date) => {
  return isSameDay(date, startOfToday())
}

const showWeekDetail = (week: WeekStats) => {
  selectedWeekStats.value = week
}

const getTotalWeekEvents = (week: WeekStats) => {
  return week.days.reduce((total, day) => total + day.events.length, 0)
}
</script> 