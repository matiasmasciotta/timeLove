<template>
  <div class="p-4 space-y-6">
    <!-- Date Navigation -->
    <div class="flex items-center justify-between bg-white rounded-xl p-4 shadow-sm">
      <button 
        @click="previousDay"
        class="p-2 text-gray-600 hover:text-pink-600 transition-colors duration-200"
      >
        <ChevronLeft class="w-6 h-6" />
      </button>
      
      <div class="text-center">
        <h2 class="text-lg font-bold text-gray-800">
          {{ format(selectedDate, 'EEEE', { locale: es }) }}
        </h2>
        <p class="text-sm text-gray-600">
          {{ format(selectedDate, 'dd MMMM yyyy', { locale: es }) }}
        </p>
      </div>
      
      <button 
        @click="nextDay"
        class="p-2 text-gray-600 hover:text-pink-600 transition-colors duration-200"
      >
        <ChevronRight class="w-6 h-6" />
      </button>
    </div>

    <!-- Today Button -->
    <div class="flex justify-center">
      <button
        @click="goToToday"
        class="px-4 py-2 bg-pink-100 text-pink-700 rounded-lg hover:bg-pink-200 transition-colors duration-200"
      >
        Hoy
      </button>
    </div>

    <!-- Stats Cards -->
    <div class="grid grid-cols-2 gap-4">
      <div class="bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl p-4">
        <div class="flex items-center space-x-2 mb-2">
          <Heart class="w-5 h-5 text-pink-600 animate-pulse" />
          <span class="text-sm font-medium text-pink-800">Marisa</span>
        </div>
        <p class="text-2xl font-bold text-pink-700">
          {{ Math.round(dayStats.marisaPercentage) }}%
        </p>
        <p class="text-xs text-pink-600">del tiempo total</p>
      </div>
      
      <div class="bg-gradient-to-br from-red-100 to-pink-100 rounded-xl p-4">
        <div class="flex items-center space-x-2 mb-2">
          <Heart class="w-5 h-5 text-red-600 animate-pulse" />
          <span class="text-sm font-medium text-red-800">Sara</span>
        </div>
        <p class="text-2xl font-bold text-red-700">
          {{ Math.round(dayStats.saraPercentage) }}%
        </p>
        <p class="text-xs text-red-600">del tiempo total</p>
      </div>
    </div>

    <!-- Category Breakdown -->
    <div class="bg-white rounded-xl p-4 shadow-sm">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Resumen por categorías</h3>
      <div class="space-y-3">
        <div 
          v-for="(hours, category) in dayStats.categoryBreakdown" 
          :key="category"
          class="flex items-center justify-between hover:bg-gray-50 rounded-lg p-2 transition-colors duration-200"
        >
          <div class="flex items-center space-x-3">
            <div :class="getCategoryColor(category)" class="w-3 h-3 rounded-full"></div>
            <span class="text-sm text-gray-700">{{ category }}</span>
          </div>
          <span class="text-sm font-medium text-gray-800">{{ hours }}h</span>
        </div>
      </div>
    </div>

    <!-- Events Timeline -->
    <div class="bg-white rounded-xl p-4 shadow-sm">
      <h3 class="text-lg font-semibold text-gray-800 mb-4">Eventos del día</h3>
      
      <div v-if="dayStats.events.length === 0" class="text-center py-8">
        <Calendar class="w-12 h-12 text-gray-300 mx-auto mb-3 animate-pulse" />
        <p class="text-gray-500">No hay eventos registrados para este día</p>
      </div>
      
      <div v-else class="space-y-3">
        <TransitionGroup
          enter-active-class="transition-opacity duration-200 ease-out"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          appear
          tag="div"
          class="space-y-3"
        >
          <div 
            v-for="(event, index) in sortedEvents" 
            :key="event.id"
            class="border-l-4 pl-4 py-3 rounded-r-lg transition-colors duration-200"
            :class="getEventBorderColor(event)"
            :style="{ animationDelay: `${index * 100}ms` }"
          >
            <div class="flex items-start justify-between">
              <div class="flex-1">
                <h4 class="font-medium text-gray-800">{{ event.title }}</h4>
                <p class="text-sm text-gray-600 mt-1">
                  {{ format(event.startDate, 'HH:mm') }} - {{ format(event.endDate, 'HH:mm') }}
                </p>
                <div class="flex items-center space-x-2 mt-2">
                  <span class="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700 transition-all duration-200 hover:bg-gray-200">
                    {{ event.category }}
                  </span>
                  <span class="text-xs px-2 py-1 rounded-full bg-pink-100 text-pink-700 transition-all duration-200 hover:bg-pink-200">
                    {{ event.partner }}
                  </span>
                </div>
                <p v-if="event.notes" class="text-sm text-gray-600 mt-2">
                  {{ event.notes }}
                </p>
              </div>
              <button 
                @click="deleteEvent(event.id)"
                class="text-gray-400 hover:text-red-500 transition-colors duration-200 ml-2"
              >
                <Trash2 class="w-4 h-4" />
              </button>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Calendar,
  Trash2
} from 'lucide-vue-next'
import { useEventsStore } from '@/stores/events'
import { EventCategory, Partner } from '@/types'
import { format, addDays, subDays, startOfToday } from 'date-fns'
import { es } from 'date-fns/locale'

const eventsStore = useEventsStore()
const selectedDate = ref(startOfToday())

const dayStats = computed(() => eventsStore.getDayStats(selectedDate.value))

const sortedEvents = computed(() => 
  [...dayStats.value.events].sort((a, b) => a.startDate.getTime() - b.startDate.getTime())
)

const previousDay = () => {
  selectedDate.value = subDays(selectedDate.value, 1)
}

const nextDay = () => {
  selectedDate.value = addDays(selectedDate.value, 1)
}

const goToToday = () => {
  selectedDate.value = startOfToday()
}

const deleteEvent = (id: string) => {
  console.log('Intentando eliminar evento con ID:', id)
  console.log('Eventos antes de eliminar:', eventsStore.events.length)
  
  if (confirm('¿Estás seguro de que quieres eliminar este evento?')) {
    eventsStore.deleteEvent(id)
    console.log('Eventos después de eliminar:', eventsStore.events.length)
  }
}

const getCategoryColor = (category: EventCategory) => {
  const colors = {
    [EventCategory.DORMIR]: 'bg-blue-500',
    [EventCategory.LABORAL]: 'bg-green-500',
    [EventCategory.GYM]: 'bg-orange-500',
    [EventCategory.EFICAZ]: 'bg-purple-500'
  }
  return colors[category] || 'bg-gray-500'
}

const getEventBorderColor = (event: any) => {
  if (event.partner === Partner.MARISA) {
    return 'border-pink-400 bg-pink-50'
  } else if (event.partner === Partner.SARA) {
    return 'border-red-400 bg-red-50'
  } else {
    return 'border-purple-400 bg-purple-50'
  }
}
</script> 