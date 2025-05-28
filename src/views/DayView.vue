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
        <div class="flex items-center space-x-1 mt-2">
          <Heart class="w-3 h-3 text-pink-500" />
          <p class="text-sm font-medium text-pink-700">
            {{ Math.round(dayStats.marisaHours * 10) / 10 }} horas efectivas
          </p>
        </div>
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
        <div class="flex items-center space-x-1 mt-2">
          <Heart class="w-3 h-3 text-red-500" />
          <p class="text-sm font-medium text-red-700">
            {{ Math.round(dayStats.saraHours * 10) / 10 }} horas efectivas
          </p>
        </div>
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
          <span class="text-sm font-medium text-gray-800">{{ Math.round(hours * 10) / 10 }}h</span>
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
                  <span class="ml-2 text-xs font-medium text-gray-500">
                    ({{ getEventDuration(event) }}h)
                  </span>
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
              <div class="flex items-center space-x-2 ml-2">
                <button 
                  @click="editEvent(event)"
                  class="text-gray-400 hover:text-blue-500 transition-colors duration-200"
                  title="Editar evento"
                >
                  <Edit class="w-4 h-4" />
                </button>
                <button 
                  @click="deleteEvent(event.id)"
                  class="text-gray-400 hover:text-red-500 transition-colors duration-200"
                  title="Eliminar evento"
                >
                  <Trash2 class="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </TransitionGroup>
      </div>
    </div>

    <!-- Edit Event Modal -->
    <div 
      v-if="showEditModal" 
      class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm"
      @click="cancelEdit"
    >
      <div 
        class="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
        @click.stop
      >
        <!-- Modal Header -->
        <div class="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-6 rounded-t-lg">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold">✏️ Editar Evento</h2>
            <button @click="cancelEdit" class="text-white hover:text-blue-200 transition-colors duration-200">
              <X class="w-6 h-6" />
            </button>
          </div>
        </div>

        <!-- Modal Content -->
        <div class="p-6 space-y-4">
          <!-- Título -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              v-model="editForm.title"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              placeholder="Título del evento"
              required
            />
          </div>

          <!-- Fecha y hora de inicio -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Fecha inicio *
              </label>
              <input
                v-model="editForm.startDate"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Hora inicio *
              </label>
              <input
                v-model="editForm.startTime"
                type="time"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                required
              />
            </div>
          </div>

          <!-- Fecha y hora de fin -->
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Fecha fin *
              </label>
              <input
                v-model="editForm.endDate"
                type="date"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                required
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Hora fin *
              </label>
              <input
                v-model="editForm.endTime"
                type="time"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                required
              />
            </div>
          </div>

          <!-- Categoría -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Categoría *
            </label>
            <select
              v-model="editForm.category"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              required
            >
              <option :value="EventCategory.DORMIR">{{ EventCategory.DORMIR }}</option>
              <option :value="EventCategory.LABORAL">{{ EventCategory.LABORAL }}</option>
              <option :value="EventCategory.GYM">{{ EventCategory.GYM }}</option>
              <option :value="EventCategory.EFICAZ">{{ EventCategory.EFICAZ }}</option>
              <option :value="EventCategory.ACT_ELLAS">{{ EventCategory.ACT_ELLAS }}</option>
            </select>
          </div>

          <!-- Tipo de tiempo -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Tipo de tiempo *
            </label>
            <select
              v-model="editForm.timeType"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              required
            >
              <option :value="TimeType.INDIVIDUAL">{{ TimeType.INDIVIDUAL }}</option>
              <option :value="TimeType.COMPARTIDO">{{ TimeType.COMPARTIDO }}</option>
            </select>
          </div>

          <!-- Pareja -->
          <div v-if="editForm.timeType === TimeType.INDIVIDUAL">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Pareja *
            </label>
            <select
              v-model="editForm.partner"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
              required
            >
              <option :value="Partner.MARISA">{{ Partner.MARISA }}</option>
              <option :value="Partner.SARA">{{ Partner.SARA }}</option>
            </select>
          </div>

          <div v-else>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Tiempo compartido con
            </label>
            <div class="px-3 py-2 bg-purple-50 border border-purple-200 rounded-lg text-purple-700">
              {{ Partner.AMBAS }}
            </div>
          </div>

          <!-- Notas -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Notas
            </label>
            <textarea
              v-model="editForm.notes"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 resize-none"
              placeholder="Notas adicionales (opcional)"
            ></textarea>
          </div>
        </div>

        <!-- Modal Footer -->
        <div class="bg-gray-50 px-6 py-4 rounded-b-lg flex justify-end space-x-3">
          <button
            @click="cancelEdit"
            class="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            Cancelar
          </button>
          <button
            @click="saveEditedEvent"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Calendar,
  Trash2,
  Edit,
  X
} from 'lucide-vue-next'
import { useEventsStore } from '@/stores/events'
import { EventCategory, Partner, TimeType, type TimeEvent } from '@/types'
import { format, addDays, subDays, startOfToday } from 'date-fns'
import { es } from 'date-fns/locale'

const eventsStore = useEventsStore()
const selectedDate = ref(startOfToday())
const editingEvent = ref<TimeEvent | null>(null)
const showEditModal = ref(false)

// Form data para edición
const editForm = ref({
  title: '',
  notes: '',
  startDate: '',
  startTime: '',
  endDate: '',
  endTime: '',
  category: EventCategory.EFICAZ,
  timeType: TimeType.INDIVIDUAL,
  partner: Partner.MARISA
})

// Watcher para cambiar automáticamente el partner cuando se selecciona tiempo compartido
watch(() => editForm.value.timeType, (newTimeType) => {
  if (newTimeType === TimeType.COMPARTIDO) {
    editForm.value.partner = Partner.AMBAS
  } else if (editForm.value.partner === Partner.AMBAS) {
    editForm.value.partner = Partner.MARISA
  }
})

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
    [EventCategory.EFICAZ]: 'bg-purple-500',
    [EventCategory.ACT_ELLAS]: 'bg-pink-500'
  }
  return colors[category] || 'bg-gray-500'
}

const getEventBorderColor = (event: TimeEvent) => {
  if (event.partner === Partner.MARISA) {
    return 'border-pink-400 bg-pink-50'
  } else if (event.partner === Partner.SARA) {
    return 'border-red-400 bg-red-50'
  } else {
    return 'border-purple-400 bg-purple-50'
  }
}

const getEventDuration = (event: TimeEvent) => {
  const duration = (event.endDate.getTime() - event.startDate.getTime()) / (1000 * 60 * 60)
  return Math.round(duration * 10) / 10
}

const editEvent = (event: TimeEvent) => {
  editingEvent.value = event
  
  // Llenar el formulario con los datos del evento
  editForm.value = {
    title: event.title,
    notes: event.notes,
    startDate: format(event.startDate, 'yyyy-MM-dd'),
    startTime: format(event.startDate, 'HH:mm'),
    endDate: format(event.endDate, 'yyyy-MM-dd'),
    endTime: format(event.endDate, 'HH:mm'),
    category: event.category,
    timeType: event.timeType,
    partner: event.partner
  }
  
  showEditModal.value = true
}

const saveEditedEvent = () => {
  if (!editingEvent.value) return
  
  // Validaciones básicas
  if (!editForm.value.title.trim()) {
    alert('El título es obligatorio')
    return
  }
  
  // Crear las fechas combinando fecha y hora
  const startDateTime = new Date(`${editForm.value.startDate}T${editForm.value.startTime}`)
  const endDateTime = new Date(`${editForm.value.endDate}T${editForm.value.endTime}`)
  
  if (startDateTime >= endDateTime) {
    alert('La fecha de fin debe ser posterior a la fecha de inicio')
    return
  }
  
  // Actualizar el evento
  eventsStore.updateEvent(editingEvent.value.id, {
    title: editForm.value.title.trim(),
    notes: editForm.value.notes.trim(),
    startDate: startDateTime,
    endDate: endDateTime,
    category: editForm.value.category,
    timeType: editForm.value.timeType,
    partner: editForm.value.partner
  })
  
  // Cerrar modal
  cancelEdit()
}

const cancelEdit = () => {
  editingEvent.value = null
  showEditModal.value = false
  
  // Limpiar formulario
  editForm.value = {
    title: '',
    notes: '',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
    category: EventCategory.EFICAZ,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.MARISA
  }
}
</script> 