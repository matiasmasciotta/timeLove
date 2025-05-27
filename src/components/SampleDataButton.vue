<template>
  <div class="fixed bottom-24 left-4 flex flex-col gap-2">
    <button
      @click="addSampleData"
      class="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      title="Agregar datos de ejemplo"
    >
      <Database class="w-5 h-5" />
    </button>
    
    <button
      @click="clearData"
      class="bg-gradient-to-r from-red-500 to-pink-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      title="Limpiar todos los eventos"
    >
      <Trash2 class="w-5 h-5" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { Database, Trash2 } from 'lucide-vue-next'
import { useEventsStore } from '@/stores/events'
import { EventCategory, TimeType, Partner } from '@/types'

const eventsStore = useEventsStore()

console.log('Store disponible:', eventsStore)
console.log('clearAllEvents disponible:', typeof eventsStore.clearAllEvents)

const clearData = () => {
  console.log('Función clearData llamada')
  console.log('eventsStore:', eventsStore)
  console.log('clearAllEvents:', eventsStore.clearAllEvents)
  
  if (confirm('¿Estás seguro de que quieres eliminar TODOS los eventos? Esta acción no se puede deshacer.')) {
    eventsStore.clearAllEvents()
    alert('¡Todos los eventos han sido eliminados! 🗑️')
  }
}

const addSampleData = () => {
  const today = new Date()
  
  // Calcular el lunes de esta semana
  const currentDay = today.getDay()
  const daysToMonday = currentDay === 0 ? -6 : 1 - currentDay
  const monday = new Date(today)
  monday.setDate(today.getDate() + daysToMonday)

  // Crear fechas para toda la semana
  const weekDays = []
  for (let i = 0; i < 7; i++) {
    const day = new Date(monday)
    day.setDate(monday.getDate() + i)
    weekDays.push(day)
  }

  // Función para agregar eventos con delay
  const addEventWithDelay = (event: any, delay: number) => {
    setTimeout(() => {
      eventsStore.addEvent(event)
    }, delay)
  }

  let delay = 0

  // LUNES
  const lunes = weekDays[0]
  addEventWithDelay({
    title: 'Dormir con Marisa',
    notes: 'Inicio de semana descansando juntos',
    startDate: new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate(), 0, 0),
    endDate: new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate(), 7, 0),
    category: EventCategory.DORMIR,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.MARISA
  }, delay += 10)

  addEventWithDelay({
    title: 'Trabajo remoto con Marisa',
    notes: 'Trabajamos desde casa juntos',
    startDate: new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate(), 8, 0),
    endDate: new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate(), 14, 0),
    category: EventCategory.LABORAL,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.MARISA
  }, delay += 10)

  addEventWithDelay({
    title: 'Almuerzo con Sara',
    notes: 'Almuerzo de trabajo con Sara',
    startDate: new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate(), 14, 0),
    endDate: new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate(), 15, 30),
    category: EventCategory.EFICAZ,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.SARA
  }, delay += 10)

  addEventWithDelay({
    title: 'Trabajo con Sara',
    notes: 'Tarde productiva en la oficina',
    startDate: new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate(), 16, 0),
    endDate: new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate(), 20, 0),
    category: EventCategory.LABORAL,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.SARA
  }, delay += 10)

  // MARTES
  const martes = weekDays[1]
  addEventWithDelay({
    title: 'Dormir con Sara',
    notes: 'Noche tranquila con Sara',
    startDate: new Date(martes.getFullYear(), martes.getMonth(), martes.getDate(), 0, 0),
    endDate: new Date(martes.getFullYear(), martes.getMonth(), martes.getDate(), 6, 30),
    category: EventCategory.DORMIR,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.SARA
  }, delay += 10)

  addEventWithDelay({
    title: 'Gimnasio con ambas',
    notes: 'Entrenamiento matutino en familia',
    startDate: new Date(martes.getFullYear(), martes.getMonth(), martes.getDate(), 7, 0),
    endDate: new Date(martes.getFullYear(), martes.getMonth(), martes.getDate(), 8, 30),
    category: EventCategory.GYM,
    timeType: TimeType.COMPARTIDO,
    partner: Partner.AMBAS
  }, delay += 10)

  addEventWithDelay({
    title: 'Trabajo con Marisa',
    notes: 'Proyecto importante con Marisa',
    startDate: new Date(martes.getFullYear(), martes.getMonth(), martes.getDate(), 9, 0),
    endDate: new Date(martes.getFullYear(), martes.getMonth(), martes.getDate(), 13, 0),
    category: EventCategory.LABORAL,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.MARISA
  }, delay += 10)

  addEventWithDelay({
    title: 'Tiempo eficaz con Sara',
    notes: 'Planificación y organización',
    startDate: new Date(martes.getFullYear(), martes.getMonth(), martes.getDate(), 15, 0),
    endDate: new Date(martes.getFullYear(), martes.getMonth(), martes.getDate(), 18, 0),
    category: EventCategory.EFICAZ,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.SARA
  }, delay += 10)

  // MIÉRCOLES
  const miercoles = weekDays[2]
  addEventWithDelay({
    title: 'Dormir con Marisa',
    notes: 'Mitad de semana con Marisa',
    startDate: new Date(miercoles.getFullYear(), miercoles.getMonth(), miercoles.getDate(), 0, 0),
    endDate: new Date(miercoles.getFullYear(), miercoles.getMonth(), miercoles.getDate(), 7, 30),
    category: EventCategory.DORMIR,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.MARISA
  }, delay += 10)

  addEventWithDelay({
    title: 'Trabajo con Sara',
    notes: 'Reuniones importantes',
    startDate: new Date(miercoles.getFullYear(), miercoles.getMonth(), miercoles.getDate(), 8, 30),
    endDate: new Date(miercoles.getFullYear(), miercoles.getMonth(), miercoles.getDate(), 12, 30),
    category: EventCategory.LABORAL,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.SARA
  }, delay += 10)

  addEventWithDelay({
    title: 'Almuerzo con ambas',
    notes: 'Almuerzo especial juntos',
    startDate: new Date(miercoles.getFullYear(), miercoles.getMonth(), miercoles.getDate(), 13, 0),
    endDate: new Date(miercoles.getFullYear(), miercoles.getMonth(), miercoles.getDate(), 14, 30),
    category: EventCategory.EFICAZ,
    timeType: TimeType.COMPARTIDO,
    partner: Partner.AMBAS
  }, delay += 10)

  addEventWithDelay({
    title: 'Trabajo con Marisa',
    notes: 'Tarde productiva',
    startDate: new Date(miercoles.getFullYear(), miercoles.getMonth(), miercoles.getDate(), 15, 0),
    endDate: new Date(miercoles.getFullYear(), miercoles.getMonth(), miercoles.getDate(), 19, 0),
    category: EventCategory.LABORAL,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.MARISA
  }, delay += 10)

  // JUEVES
  const jueves = weekDays[3]
  addEventWithDelay({
    title: 'Dormir con Sara',
    notes: 'Descanso reparador con Sara',
    startDate: new Date(jueves.getFullYear(), jueves.getMonth(), jueves.getDate(), 0, 0),
    endDate: new Date(jueves.getFullYear(), jueves.getMonth(), jueves.getDate(), 6, 45),
    category: EventCategory.DORMIR,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.SARA
  }, delay += 10)

  addEventWithDelay({
    title: 'Tiempo eficaz con Marisa',
    notes: 'Planificación del fin de semana',
    startDate: new Date(jueves.getFullYear(), jueves.getMonth(), jueves.getDate(), 8, 0),
    endDate: new Date(jueves.getFullYear(), jueves.getMonth(), jueves.getDate(), 10, 0),
    category: EventCategory.EFICAZ,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.MARISA
  }, delay += 10)

  addEventWithDelay({
    title: 'Trabajo con Sara',
    notes: 'Cierre de proyectos',
    startDate: new Date(jueves.getFullYear(), jueves.getMonth(), jueves.getDate(), 11, 0),
    endDate: new Date(jueves.getFullYear(), jueves.getMonth(), jueves.getDate(), 16, 0),
    category: EventCategory.LABORAL,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.SARA
  }, delay += 10)

  addEventWithDelay({
    title: 'Gimnasio con Marisa',
    notes: 'Entrenamiento de fuerza',
    startDate: new Date(jueves.getFullYear(), jueves.getMonth(), jueves.getDate(), 17, 0),
    endDate: new Date(jueves.getFullYear(), jueves.getMonth(), jueves.getDate(), 18, 30),
    category: EventCategory.GYM,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.MARISA
  }, delay += 10)

  // VIERNES
  const viernes = weekDays[4]
  addEventWithDelay({
    title: 'Dormir con Marisa',
    notes: 'Último día laboral',
    startDate: new Date(viernes.getFullYear(), viernes.getMonth(), viernes.getDate(), 0, 0),
    endDate: new Date(viernes.getFullYear(), viernes.getMonth(), viernes.getDate(), 7, 15),
    category: EventCategory.DORMIR,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.MARISA
  }, delay += 10)

  addEventWithDelay({
    title: 'Trabajo con ambas',
    notes: 'Reunión de equipo',
    startDate: new Date(viernes.getFullYear(), viernes.getMonth(), viernes.getDate(), 8, 0),
    endDate: new Date(viernes.getFullYear(), viernes.getMonth(), viernes.getDate(), 12, 0),
    category: EventCategory.LABORAL,
    timeType: TimeType.COMPARTIDO,
    partner: Partner.AMBAS
  }, delay += 10)

  addEventWithDelay({
    title: 'Tiempo eficaz con Sara',
    notes: 'Preparativos para el fin de semana',
    startDate: new Date(viernes.getFullYear(), viernes.getMonth(), viernes.getDate(), 14, 0),
    endDate: new Date(viernes.getFullYear(), viernes.getMonth(), viernes.getDate(), 17, 0),
    category: EventCategory.EFICAZ,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.SARA
  }, delay += 10)

  addEventWithDelay({
    title: 'Cena con ambas',
    notes: 'Celebración de fin de semana',
    startDate: new Date(viernes.getFullYear(), viernes.getMonth(), viernes.getDate(), 19, 0),
    endDate: new Date(viernes.getFullYear(), viernes.getMonth(), viernes.getDate(), 21, 30),
    category: EventCategory.EFICAZ,
    timeType: TimeType.COMPARTIDO,
    partner: Partner.AMBAS
  }, delay += 10)

  // SÁBADO
  const sabado = weekDays[5]
  addEventWithDelay({
    title: 'Dormir con Sara',
    notes: 'Descanso de fin de semana',
    startDate: new Date(sabado.getFullYear(), sabado.getMonth(), sabado.getDate(), 0, 0),
    endDate: new Date(sabado.getFullYear(), sabado.getMonth(), sabado.getDate(), 9, 0),
    category: EventCategory.DORMIR,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.SARA
  }, delay += 10)

  addEventWithDelay({
    title: 'Gimnasio con ambas',
    notes: 'Entrenamiento de fin de semana',
    startDate: new Date(sabado.getFullYear(), sabado.getMonth(), sabado.getDate(), 10, 0),
    endDate: new Date(sabado.getFullYear(), sabado.getMonth(), sabado.getDate(), 12, 0),
    category: EventCategory.GYM,
    timeType: TimeType.COMPARTIDO,
    partner: Partner.AMBAS
  }, delay += 10)

  addEventWithDelay({
    title: 'Tiempo eficaz con Marisa',
    notes: 'Actividades del hogar y planificación',
    startDate: new Date(sabado.getFullYear(), sabado.getMonth(), sabado.getDate(), 14, 0),
    endDate: new Date(sabado.getFullYear(), sabado.getMonth(), sabado.getDate(), 17, 0),
    category: EventCategory.EFICAZ,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.MARISA
  }, delay += 10)

  addEventWithDelay({
    title: 'Cena y película con Sara',
    notes: 'Noche de cine romántica',
    startDate: new Date(sabado.getFullYear(), sabado.getMonth(), sabado.getDate(), 19, 0),
    endDate: new Date(sabado.getFullYear(), sabado.getMonth(), sabado.getDate(), 22, 30),
    category: EventCategory.EFICAZ,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.SARA
  }, delay += 10)

  // DOMINGO
  const domingo = weekDays[6]
  addEventWithDelay({
    title: 'Dormir con Marisa',
    notes: 'Descanso dominical',
    startDate: new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate(), 0, 0),
    endDate: new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate(), 8, 30),
    category: EventCategory.DORMIR,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.MARISA
  }, delay += 10)

  addEventWithDelay({
    title: 'Brunch con ambas',
    notes: 'Desayuno tardío en familia',
    startDate: new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate(), 10, 0),
    endDate: new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate(), 12, 0),
    category: EventCategory.EFICAZ,
    timeType: TimeType.COMPARTIDO,
    partner: Partner.AMBAS
  }, delay += 10)

  addEventWithDelay({
    title: 'Tiempo eficaz con Sara',
    notes: 'Preparación para la semana',
    startDate: new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate(), 14, 0),
    endDate: new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate(), 17, 0),
    category: EventCategory.EFICAZ,
    timeType: TimeType.INDIVIDUAL,
    partner: Partner.SARA
  }, delay += 10)

  addEventWithDelay({
    title: 'Cena familiar con ambas',
    notes: 'Cierre de semana en familia',
    startDate: new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate(), 18, 0),
    endDate: new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate(), 20, 30),
    category: EventCategory.EFICAZ,
    timeType: TimeType.COMPARTIDO,
    partner: Partner.AMBAS
  }, delay += 10)

  alert('¡Semana completa de datos agregada! 📅✨')
}
</script> 