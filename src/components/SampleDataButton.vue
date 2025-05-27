<template>
  <button
    @click="addSampleData"
    class="fixed bottom-24 left-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
    title="Agregar datos de ejemplo"
  >
    <Database class="w-5 h-5" />
  </button>
</template>

<script setup lang="ts">
import { Database } from 'lucide-vue-next'
import { useEventsStore } from '@/stores/events'
import { EventCategory, TimeType, Partner } from '@/types'

const eventsStore = useEventsStore()

const addSampleData = () => {
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)

  // Eventos de ayer
  eventsStore.addEvent({
    title: 'Dormir con Marisa',
    notes: 'Noche tranquila juntos',
    startDate: new Date(yesterday.getFullYear(), yesterday.getMonth(), yesterday.getDate(), 23, 0),
    endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 7, 0),
    category: EventCategory.DORMIR,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.MARISA
  })

  // Eventos de hoy
  eventsStore.addEvent({
    title: 'Trabajar con Marisa',
    notes: 'Trabajo desde casa juntos',
    startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 8, 0),
    endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
    category: EventCategory.LABORAL,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.MARISA
  })

  eventsStore.addEvent({
    title: 'Almuerzo con Sara',
    notes: 'Almuerzo romántico en casa',
    startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 13, 0),
    endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 30),
    category: EventCategory.EFICAZ,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.SARA
  })

  eventsStore.addEvent({
    title: 'Trabajar con Sara',
    notes: 'Trabajo en la oficina',
    startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 15, 0),
    endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 0),
    category: EventCategory.LABORAL,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.SARA
  })

  eventsStore.addEvent({
    title: 'Gimnasio con ambas',
    notes: 'Entrenamiento en familia',
    startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 18, 30),
    endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20, 0),
    category: EventCategory.GYM,
    timeType: TimeType.COMPARTIDO,
    partner: Partner.AMBAS
  })

  eventsStore.addEvent({
    title: 'Cena y tiempo libre con Sara',
    notes: 'Cena romántica y película',
    startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 20, 30),
    endDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 0),
    category: EventCategory.EFICAZ,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.SARA
  })

  // Eventos de mañana
  eventsStore.addEvent({
    title: 'Dormir con Sara',
    notes: 'Noche con Sara',
    startDate: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 30),
    endDate: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 7, 30),
    category: EventCategory.DORMIR,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.SARA
  })

  eventsStore.addEvent({
    title: 'Desayuno con Marisa',
    notes: 'Desayuno especial',
    startDate: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 8, 0),
    endDate: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 9, 0),
    category: EventCategory.EFICAZ,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.MARISA
  })

  alert('¡Datos de ejemplo agregados! 🎉')
}
</script> 