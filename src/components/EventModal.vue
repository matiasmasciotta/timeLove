<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-all duration-250 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div 
        class="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50"
        @click="$emit('close')"
      >
        <Transition
          enter-active-class="transition-all duration-350 ease-out"
          enter-from-class="opacity-0 scale-75 translate-y-12 rotate-3"
          enter-to-class="opacity-100 scale-100 translate-y-0 rotate-0"
          leave-active-class="transition-all duration-250 ease-in"
          leave-from-class="opacity-100 scale-100 translate-y-0 rotate-0"
          leave-to-class="opacity-0 scale-90 translate-y-8 rotate-1"
        >
          <div 
            class="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden transform"
            @click.stop
          >
            <!-- Header -->
            <div class="bg-gradient-to-r from-pink-500 to-rose-500 text-white p-6">
              <div class="flex items-center justify-between">
                <h2 class="text-xl font-bold">💕 Registrar Evento</h2>
                <button 
                  @click="$emit('close')" 
                  class="text-white hover:text-pink-200 transition-all duration-150 p-2 rounded-lg hover:bg-white/20 transform hover:scale-110 hover:rotate-90"
                >
                  <X class="w-6 h-6" />
                </button>
              </div>
            </div>

            <!-- Form Container with Custom Scroll -->
            <div class="overflow-y-auto max-h-[calc(90vh-88px)] custom-scroll">
              <form @submit.prevent="submitEvent" class="p-6 space-y-6">
                <!-- Título -->
                <div class="transform transition-all duration-150 hover:scale-[1.01]">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Título del evento
                  </label>
                  <input
                    v-model="form.title"
                    type="text"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-150 hover:border-pink-300 hover:shadow-sm"
                    placeholder="Ej: Dormir con Marisa"
                  />
                </div>

                <!-- Fecha y Hora de Inicio -->
                <div class="grid grid-cols-2 gap-4">
                  <div class="transform transition-all duration-150 hover:scale-[1.01]">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Fecha
                    </label>
                    <input
                      v-model="form.startDate"
                      type="date"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-150 hover:border-pink-300 hover:shadow-sm"
                    />
                  </div>
                  <div class="transform transition-all duration-150 hover:scale-[1.01]">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      Hora inicio
                    </label>
                    <input
                      v-model="form.startTime"
                      type="time"
                      required
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-150 hover:border-pink-300 hover:shadow-sm"
                    />
                  </div>
                </div>

                <!-- Hora de Fin -->
                <div class="transform transition-all duration-150 hover:scale-[1.01]">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Hora de fin
                  </label>
                  <input
                    v-model="form.endTime"
                    type="time"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-150 hover:border-pink-300 hover:shadow-sm"
                  />
                </div>

                <!-- Categoría -->
                <div class="transform transition-all duration-150 hover:scale-[1.01]">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Categoría
                  </label>
                  <select
                    v-model="form.category"
                    required
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-150 hover:border-pink-300 hover:shadow-sm"
                  >
                    <option value="">Selecciona una categoría</option>
                    <option :value="EventCategory.DORMIR">😴 {{ EventCategory.DORMIR }}</option>
                    <option :value="EventCategory.LABORAL">💼 {{ EventCategory.LABORAL }}</option>
                    <option :value="EventCategory.GYM">💪 {{ EventCategory.GYM }}</option>
                    <option :value="EventCategory.EFICAZ">❤️ {{ EventCategory.EFICAZ }}</option>
                    <option :value="EventCategory.ACT_ELLAS">💃 {{ EventCategory.ACT_ELLAS }}</option>
                  </select>
                </div>

                <!-- Tipo de Tiempo -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de tiempo
                  </label>
                  <div class="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      @click="form.timeType = TimeType.INDIVIDUAL"
                      :class="[
                        'px-4 py-3 rounded-lg border-2 transition-all duration-150 transform hover:scale-105 active:scale-95',
                        form.timeType === TimeType.INDIVIDUAL
                          ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-md scale-105'
                          : 'border-gray-300 text-gray-700 hover:border-pink-300 hover:bg-pink-50 hover:shadow-sm'
                      ]"
                    >
                      Individual
                    </button>
                    <button
                      type="button"
                      @click="form.timeType = TimeType.COMPARTIDO"
                      :class="[
                        'px-4 py-3 rounded-lg border-2 transition-all duration-150 transform hover:scale-105 active:scale-95',
                        form.timeType === TimeType.COMPARTIDO
                          ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-md scale-105'
                          : 'border-gray-300 text-gray-700 hover:border-pink-300 hover:bg-pink-50 hover:shadow-sm'
                      ]"
                    >
                      Compartido
                    </button>
                  </div>
                </div>

                <!-- Pareja -->
                <Transition
                  enter-active-class="transition-all duration-250 ease-out"
                  enter-from-class="opacity-0 translate-y-4 scale-95"
                  enter-to-class="opacity-100 translate-y-0 scale-100"
                  leave-active-class="transition-all duration-200 ease-in"
                  leave-from-class="opacity-100 translate-y-0 scale-100"
                  leave-to-class="opacity-0 translate-y-2 scale-95"
                >
                  <div v-if="form.timeType">
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                      {{ form.timeType === TimeType.INDIVIDUAL ? 'Con quién' : 'Participantes' }}
                    </label>
                    <div class="space-y-2">
                      <button
                        v-if="form.timeType === TimeType.INDIVIDUAL"
                        type="button"
                        v-for="partner in individualPartners"
                        :key="partner"
                        @click="form.partner = partner"
                        :class="[
                          'w-full px-4 py-3 rounded-lg border-2 transition-all duration-150 text-left transform hover:scale-[1.01] active:scale-95',
                          form.partner === partner
                            ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-md scale-[1.01]'
                            : 'border-gray-300 text-gray-700 hover:border-pink-300 hover:bg-pink-50 hover:shadow-sm'
                        ]"
                      >
                        {{ partner }}
                      </button>
                      <button
                        v-else
                        type="button"
                        @click="form.partner = Partner.AMBAS"
                        :class="[
                          'w-full px-4 py-3 rounded-lg border-2 transition-all duration-150 text-left transform hover:scale-[1.01] active:scale-95',
                          form.partner === Partner.AMBAS
                            ? 'border-pink-500 bg-pink-50 text-pink-700 shadow-md scale-[1.01]'
                            : 'border-gray-300 text-gray-700 hover:border-pink-300 hover:bg-pink-50 hover:shadow-sm'
                        ]"
                      >
                        Con ambas
                      </button>
                    </div>
                  </div>
                </Transition>

                <!-- Notas -->
                <div class="transform transition-all duration-150 hover:scale-[1.01]">
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    Notas (opcional)
                  </label>
                  <textarea
                    v-model="form.notes"
                    rows="3"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent resize-none transition-all duration-150 hover:border-pink-300 hover:shadow-sm"
                    placeholder="Agrega detalles sobre el evento..."
                  ></textarea>
                </div>

                <!-- Botones -->
                <div class="flex gap-3 pt-4">
                  <button
                    type="button"
                    @click="$emit('close')"
                    class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-150 transform hover:scale-105 active:scale-95 hover:shadow-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    class="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white rounded-lg hover:from-pink-600 hover:to-rose-600 transition-all duration-150 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                  >
                    Guardar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Transition>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { X } from 'lucide-vue-next'
import { useEventsStore } from '@/stores/events'
import { EventCategory, TimeType, Partner } from '@/types'
import { format } from 'date-fns'

const emit = defineEmits<{
  close: []
}>()

const eventsStore = useEventsStore()

const categories = Object.values(EventCategory)
const individualPartners = [Partner.MARISA, Partner.SARA, Partner.SOLO]

const form = ref({
  title: '',
  startDate: '',
  startTime: '',
  endTime: '',
  category: '' as EventCategory,
  timeType: '' as TimeType,
  partner: '' as Partner,
  notes: ''
})

// Inicializar con fecha y hora actual
onMounted(() => {
  const now = new Date()
  form.value.startDate = format(now, 'yyyy-MM-dd')
  form.value.startTime = format(now, 'HH:mm')
  
  // Hora de fin una hora después
  const endTime = new Date(now.getTime() + 60 * 60 * 1000)
  form.value.endTime = format(endTime, 'HH:mm')
})

const submitEvent = () => {
  if (!form.value.title || !form.value.category || !form.value.timeType || !form.value.partner) {
    return
  }

  const startDateTime = new Date(`${form.value.startDate}T${form.value.startTime}`)
  const endDateTime = new Date(`${form.value.startDate}T${form.value.endTime}`)

  // Si la hora de fin es menor que la de inicio, asumimos que es al día siguiente
  if (endDateTime < startDateTime) {
    endDateTime.setDate(endDateTime.getDate() + 1)
  }

  eventsStore.addEvent({
    title: form.value.title,
    notes: form.value.notes,
    startDate: startDateTime,
    endDate: endDateTime,
    category: form.value.category,
    timeType: form.value.timeType,
    partner: form.value.partner
  })

  emit('close')
}
</script>

<style scoped>
.custom-scroll {
  scrollbar-width: thin;
  scrollbar-color: #ec4899 #f1f5f9;
}

.custom-scroll::-webkit-scrollbar {
  width: 6px;
}

.custom-scroll::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 0;
}

.custom-scroll::-webkit-scrollbar-thumb {
  background: linear-gradient(45deg, #ec4899, #f43f5e);
  border-radius: 3px;
}

.custom-scroll::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(45deg, #db2777, #e11d48);
}
</style> 