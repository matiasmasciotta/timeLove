<template>
  <div class="p-4 space-y-6">
    <!-- Week Navigation -->
    <div class="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
      <button 
        @click="previousWeek"
        class="p-2 text-gray-600 hover:text-pink-600 transition-colors"
      >
        <ChevronLeft class="w-6 h-6" />
      </button>
      
      <div class="text-center">
        <h2 class="text-lg font-bold text-gray-800">
          {{ format(weekStats.weekStart, 'dd MMM', { locale: es }) }} - 
          {{ format(weekStats.weekEnd, 'dd MMM yyyy', { locale: es }) }}
        </h2>
        <p class="text-sm text-gray-600">Semana</p>
      </div>
      
      <button 
        @click="nextWeek"
        class="p-2 text-gray-600 hover:text-pink-600 transition-colors"
      >
        <ChevronRight class="w-6 h-6" />
      </button>
    </div>

    <!-- This Week Button -->
    <div class="flex justify-center">
      <button
        @click="goToThisWeek"
        class="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors"
      >
        Esta semana
      </button>
    </div>

    <!-- Weekly Stats -->
    <div class="grid grid-cols-3 gap-3">
      <div class="bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl p-4">
        <div class="flex items-center space-x-2 mb-2">
          <Heart class="w-5 h-5 text-pink-600" />
          <span class="text-sm font-medium text-pink-800">Marisa</span>
        </div>
        <p class="text-2xl font-bold text-pink-700">
          {{ Math.round(weekStats.totalMarisaPercentage) }}%
        </p>
        <p class="text-xs text-pink-600">promedio semanal</p>
        <div class="flex items-center space-x-1 mt-1">
          <Clock class="w-3 h-3 text-pink-500" />
          <p class="text-sm font-medium text-pink-700">
            {{ Math.round(getWeekMarisaTotalHours(weekStats) * 10) / 10 }} horas totales
          </p>
        </div>
        <div class="flex items-center space-x-1 mt-1">
          <Heart class="w-3 h-3 text-pink-500" />
          <p class="text-sm font-medium text-pink-700">
            {{ Math.round(weekStats.totalMarisaHours * 10) / 10 }} horas efectivas
          </p>
        </div>
      </div>
      
      <div class="bg-gradient-to-br from-red-100 to-pink-100 rounded-xl p-4">
        <div class="flex items-center space-x-2 mb-2">
          <Heart class="w-5 h-5 text-red-600" />
          <span class="text-sm font-medium text-red-800">Sara</span>
        </div>
        <p class="text-2xl font-bold text-red-700">
          {{ Math.round(weekStats.totalSaraPercentage) }}%
        </p>
        <p class="text-xs text-red-600">promedio semanal</p>
        <div class="flex items-center space-x-1 mt-1">
          <Clock class="w-3 h-3 text-red-500" />
          <p class="text-sm font-medium text-red-700">
            {{ Math.round(getWeekSaraTotalHours(weekStats) * 10) / 10 }} horas totales
          </p>
        </div>
        <div class="flex items-center space-x-1 mt-1">
          <Heart class="w-3 h-3 text-red-500" />
          <p class="text-sm font-medium text-red-700">
            {{ Math.round(weekStats.totalSaraHours * 10) / 10 }} horas efectivas
          </p>
        </div>
      </div>

      <div class="bg-gradient-to-br from-gray-100 to-slate-100 rounded-xl p-4">
        <div class="flex items-center space-x-2 mb-2">
          <User class="w-5 h-5 text-gray-600" />
          <span class="text-sm font-medium text-gray-800">Solo</span>
        </div>
        <p class="text-2xl font-bold text-gray-700">
          {{ Math.round(weekStats.totalSoloHours * 10) / 10 }}h
        </p>
        <p class="text-xs text-gray-600">tiempo individual</p>
      </div>
    </div>

    <!-- Week Calendar -->
    <div class="bg-white rounded-xl p-4 shadow-sm">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Calendario semanal</h3>
      
      <div class="grid grid-cols-1 gap-3">
        <div 
          v-for="dayStats in weekStats.days" 
          :key="dayStats.date.toISOString()"
          @click="showDayDetail(dayStats)"
          class="border rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
          :class="isToday(dayStats.date) ? 'border-pink-400 bg-pink-50' : 'border-gray-200'"
        >
          <div class="flex items-center justify-between mb-3">
            <div>
              <h4 class="font-medium text-gray-800">
                {{ format(dayStats.date, 'EEEE', { locale: es }) }}
              </h4>
              <p class="text-sm text-gray-600">
                {{ format(dayStats.date, 'dd MMM', { locale: es }) }}
              </p>
            </div>
            <div class="text-right">
              <p class="text-sm text-gray-600">{{ dayStats.events.length }} eventos</p>
            </div>
          </div>
          
          <!-- Daily percentages -->
          <div class="grid grid-cols-2 gap-2 mb-3">
            <div class="text-center">
              <p class="text-xs text-pink-600">Marisa</p>
              <p class="text-lg font-bold text-pink-700">
                {{ Math.round(dayStats.marisaPercentage) }}%
              </p>
              <div class="flex items-center justify-center space-x-1">
                <Heart class="w-2 h-2 text-pink-500" />
                <p class="text-xs text-pink-600">{{ Math.round(dayStats.marisaHours * 10) / 10 }} horas efectivas</p>
              </div>
            </div>
            <div class="text-center">
              <p class="text-xs text-red-600">Sara</p>
              <p class="text-lg font-bold text-red-700">
                {{ Math.round(dayStats.saraPercentage) }}%
              </p>
              <div class="flex items-center justify-center space-x-1">
                <Heart class="w-2 h-2 text-red-500" />
                <p class="text-xs text-red-600">{{ Math.round(dayStats.saraHours * 10) / 10 }} horas efectivas</p>
              </div>
            </div>
          </div>
          
          <!-- Category breakdown -->
          <div class="flex justify-between text-xs text-gray-600">
            <span v-if="dayStats.categoryBreakdown[EventCategory.DORMIR] > 0">
              😴 {{ Math.round(dayStats.categoryBreakdown[EventCategory.DORMIR] * 10) / 10 }}h
            </span>
            <span v-if="dayStats.categoryBreakdown[EventCategory.LABORAL] > 0">
              💼 {{ Math.round(dayStats.categoryBreakdown[EventCategory.LABORAL] * 10) / 10 }}h
            </span>
            <span v-if="dayStats.categoryBreakdown[EventCategory.GYM] > 0">
              💪 {{ Math.round(dayStats.categoryBreakdown[EventCategory.GYM] * 10) / 10 }}h
            </span>
            <span v-if="dayStats.categoryBreakdown[EventCategory.EFICAZ] > 0">
              ❤️ {{ Math.round(dayStats.categoryBreakdown[EventCategory.EFICAZ] * 10) / 10 }}h
            </span>
            <span v-if="dayStats.categoryBreakdown[EventCategory.ACT_ELLAS] > 0">
              💃 {{ Math.round(dayStats.categoryBreakdown[EventCategory.ACT_ELLAS] * 10) / 10 }}h
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Day Detail Modal -->
    <div 
      v-if="selectedDayStats" 
      class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      @click="selectedDayStats = null"
    >
      <div 
        class="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-6 rounded-t-lg">
          <div class="flex items-center justify-between">
            <div>
              <h2 class="text-xl font-bold">
                {{ format(selectedDayStats.date, 'EEEE', { locale: es }) }}
              </h2>
              <p class="text-pink-100">
                {{ format(selectedDayStats.date, 'dd MMMM yyyy', { locale: es }) }}
              </p>
            </div>
            <button @click="selectedDayStats = null" class="text-white hover:text-pink-200 transition-colors duration-200">
              <X class="w-6 h-6" />
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-6 space-y-4">
          <!-- Stats -->
          <div class="grid grid-cols-2 gap-4">
            <div class="text-center p-3 bg-pink-50 rounded-lg">
              <p class="text-sm text-pink-600">Marisa</p>
              <p class="text-xl font-bold text-pink-700">
                {{ Math.round(selectedDayStats.marisaPercentage) }}%
              </p>
            </div>
            <div class="text-center p-3 bg-red-50 rounded-lg">
              <p class="text-sm text-red-600">Sara</p>
              <p class="text-xl font-bold text-red-700">
                {{ Math.round(selectedDayStats.saraPercentage) }}%
              </p>
            </div>
          </div>

          <!-- Events -->
          <div>
            <h3 class="font-semibold text-gray-800 mb-3">Eventos del día</h3>
            <div v-if="selectedDayStats.events.length === 0" class="text-center py-4">
              <p class="text-gray-500">No hay eventos registrados</p>
            </div>
            <div v-else class="space-y-2">
              <div 
                v-for="event in sortedDayEvents" 
                :key="event.id"
                class="border-l-4 pl-3 py-2 rounded-r-lg"
                :class="getEventBorderColor(event)"
              >
                <div class="flex items-start justify-between">
                  <div class="flex-1">
                    <h4 class="font-medium text-gray-800 text-sm">{{ event.title }}</h4>
                    <p class="text-xs text-gray-600">
                      {{ format(event.startDate, 'HH:mm') }} - {{ format(event.endDate, 'HH:mm') }}
                      <span class="ml-2 text-xs font-medium text-gray-500">
                        ({{ getEventDuration(event) }}h)
                      </span>
                    </p>
                    <div class="flex items-center space-x-2 mt-1">
                      <span class="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                        {{ event.category }}
                      </span>
                      <span class="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-700">
                        {{ event.partner }}
                      </span>
                    </div>
                  </div>
                  <div class="flex items-center space-x-1 ml-2">
                    <button 
                      @click="editEvent(event)"
                      class="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                      title="Editar evento"
                    >
                      <Edit class="w-3 h-3" />
                    </button>
                    <button 
                      @click="deleteEvent(event.id)"
                      class="text-gray-400 hover:text-red-500 transition-colors duration-200"
                      title="Eliminar evento"
                    >
                      <Trash2 class="w-3 h-3" />
                    </button>
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
  X,
  Edit,
  Trash2,
  User,
  Clock
} from 'lucide-vue-next'
import { useEventsStore } from '@/stores/events'
import { EventCategory, Partner, type DayStats, type TimeEvent } from '@/types'
import { format, addWeeks, subWeeks, startOfToday, isSameDay, startOfDay, endOfDay } from 'date-fns'
import { es } from 'date-fns/locale'

const eventsStore = useEventsStore()
const selectedWeek = ref(startOfToday())
const selectedDayStats = ref<DayStats | null>(null)

const weekStats = computed(() => eventsStore.getWeekStats(selectedWeek.value))

const sortedDayEvents = computed(() => {
  if (!selectedDayStats.value) return []
  return [...selectedDayStats.value.events].sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
})

const previousWeek = () => {
  selectedWeek.value = subWeeks(selectedWeek.value, 1)
}

const nextWeek = () => {
  selectedWeek.value = addWeeks(selectedWeek.value, 1)
}

const goToThisWeek = () => {
  selectedWeek.value = startOfToday()
}

const isToday = (date: Date) => {
  return isSameDay(date, startOfToday())
}

const showDayDetail = (dayStats: DayStats) => {
  selectedDayStats.value = dayStats
}

const getEventBorderColor = (event: TimeEvent) => {
  if (event.partner === Partner.MARISA) {
    return 'border-pink-400 bg-pink-50'
  } else if (event.partner === Partner.SARA) {
    return 'border-red-400 bg-red-50'
  } else if (event.partner === Partner.SOLO) {
    return 'border-gray-400 bg-gray-50'
  } else {
    return 'border-purple-400 bg-purple-50'
  }
}

const getEventDuration = (event: TimeEvent) => {
  const duration = (event.endDate.getTime() - event.startDate.getTime()) / (1000 * 60 * 60)
  return Math.round(duration * 10) / 10
}

const editEvent = (event: TimeEvent) => {
  // Por ahora, mostrar un alert indicando que se debe ir a la vista diaria para editar
  alert('Para editar eventos, ve a la vista diaria del día correspondiente')
}

const deleteEvent = (eventId: string) => {
  if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
    eventsStore.deleteEvent(eventId)
  }
}

const getWeekMarisaTotalHours = (weekStats: any) => {
  // Calcular todas las horas de Marisa en la semana (todas las categorías)
  let totalHours = 0
  weekStats.days.forEach((day: any) => {
    const dayStart = startOfDay(day.date)
    const dayEnd = endOfDay(day.date)
    
    day.events.forEach((event: any) => {
      // Calcular solo las horas que ocurren dentro del día específico
      const eventStart = event.startDate > dayStart ? event.startDate : dayStart
      const eventEnd = event.endDate < dayEnd ? event.endDate : dayEnd
      const hours = (eventEnd.getTime() - eventStart.getTime()) / (1000 * 60 * 60)
      
      if (event.timeType === 'TIEMPO COMPARTIDO' && event.partner === 'Ambas') {
        totalHours += hours
      } else if (event.partner === 'Marisa') {
        totalHours += hours
      }
    })
  })
  return totalHours
}

const getWeekSaraTotalHours = (weekStats: any) => {
  // Calcular todas las horas de Sara en la semana (todas las categorías)
  let totalHours = 0
  weekStats.days.forEach((day: any) => {
    const dayStart = startOfDay(day.date)
    const dayEnd = endOfDay(day.date)
    
    day.events.forEach((event: any) => {
      // Calcular solo las horas que ocurren dentro del día específico
      const eventStart = event.startDate > dayStart ? event.startDate : dayStart
      const eventEnd = event.endDate < dayEnd ? event.endDate : dayEnd
      const hours = (eventEnd.getTime() - eventStart.getTime()) / (1000 * 60 * 60)
      
      if (event.timeType === 'TIEMPO COMPARTIDO' && event.partner === 'Ambas') {
        totalHours += hours
      } else if (event.partner === 'Sara') {
        totalHours += hours
      }
    })
  })
  return totalHours
}
</script> 