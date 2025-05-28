<template>
  <div class="fixed bottom-24 left-4 flex flex-col gap-2">
    <button
      @click="addSampleData"
      class="bg-gradient-to-r from-purple-500 to-indigo-500 text-white p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
      title="Agregar datos de ejemplo (mes completo)"
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

const clearData = () => {
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

  // Función para agregar eventos con delay
  const addEventWithDelay = (event: any, delay: number) => {
    setTimeout(() => {
      eventsStore.addEvent(event)
    }, delay)
  }

  let delay = 0

  // Generar 4 semanas de datos
  for (let semana = 0; semana < 4; semana++) {
    const inicioSemana = new Date(monday)
    inicioSemana.setDate(monday.getDate() + (semana * 7))
    
    // Determinar patrones de balance para esta semana
    const dormirEnCasaSara = semana === 1 // Solo una vez al mes
    const cenarConSaraLunes = semana % 2 === 0
    const cenarConSaraMartes = !cenarConSaraLunes
    const cenarConSaraJueves = semana % 2 === 1

    // LUNES
    const lunes = new Date(inicioSemana)
    
    // Dormir con Marisa (excepto si es la semana especial)
    addEventWithDelay({
      title: dormirEnCasaSara && semana === 1 ? 'Dormir con Sara (semana especial)' : 'Dormir con Marisa',
      notes: dormirEnCasaSara && semana === 1 ? 'Una vez al mes duermo en casa de Sara' : 'Rutina normal',
      startDate: new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate(), 0, 0),
      endDate: new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate(), 7, 0),
      category: EventCategory.DORMIR,
      timeType: TimeType.INDIVIDUAL,
      partner: dormirEnCasaSara && semana === 1 ? Partner.SARA : Partner.MARISA
    }, delay += 10)

    // Trabajo en casa con Marisa
    addEventWithDelay({
      title: 'Trabajo en casa con Marisa',
      notes: 'Trabajo desde casa en la mañana',
      startDate: new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate(), 8, 0),
      endDate: new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate(), 13, 0),
      category: EventCategory.LABORAL,
      timeType: TimeType.INDIVIDUAL,
      partner: Partner.MARISA
    }, delay += 10)

    // Trabajo en casa de Sara (tarde)
    addEventWithDelay({
      title: 'Trabajo en casa de Sara',
      notes: 'Trabajo en casa de Sara después del almuerzo',
      startDate: new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate(), 14, 0),
      endDate: new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate(), 18, 0),
      category: EventCategory.LABORAL,
      timeType: TimeType.INDIVIDUAL,
      partner: Partner.SARA
    }, delay += 10)

    // Gym los 3
    addEventWithDelay({
      title: 'Gimnasio los 3',
      notes: 'Entrenamiento grupal Matias, Marisa y Sara',
      startDate: new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate(), 18, 0),
      endDate: new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate(), 20, 0),
      category: EventCategory.GYM,
      timeType: TimeType.COMPARTIDO,
      partner: Partner.AMBAS
    }, delay += 10)

    // Cena y tiempo eficaz (balanceado)
    if (cenarConSaraLunes) {
      addEventWithDelay({
        title: 'Cena y tiempo eficaz con Sara',
        notes: 'Cena en casa de Sara + tiempo de calidad',
        startDate: new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate(), 20, 30),
        endDate: new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate(), 23, 30),
        category: EventCategory.EFICAZ,
        timeType: TimeType.INDIVIDUAL,
        partner: Partner.SARA
      }, delay += 10)
    } else {
      addEventWithDelay({
        title: 'Cena y tiempo eficaz con Marisa',
        notes: 'Cena en casa + tiempo de calidad',
        startDate: new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate(), 20, 30),
        endDate: new Date(lunes.getFullYear(), lunes.getMonth(), lunes.getDate(), 23, 30),
        category: EventCategory.EFICAZ,
        timeType: TimeType.INDIVIDUAL,
        partner: Partner.MARISA
      }, delay += 10)
    }

    // MARTES
    const martes = new Date(inicioSemana)
    martes.setDate(inicioSemana.getDate() + 1)

    // Dormir con Marisa
    addEventWithDelay({
      title: 'Dormir con Marisa',
      notes: 'Rutina normal',
      startDate: new Date(martes.getFullYear(), martes.getMonth(), martes.getDate(), 0, 0),
      endDate: new Date(martes.getFullYear(), martes.getMonth(), martes.getDate(), 7, 0),
      category: EventCategory.DORMIR,
      timeType: TimeType.INDIVIDUAL,
      partner: Partner.MARISA
    }, delay += 10)

    // Trabajo en casa con Marisa
    addEventWithDelay({
      title: 'Trabajo en casa con Marisa',
      notes: 'Trabajo desde casa en la mañana',
      startDate: new Date(martes.getFullYear(), martes.getMonth(), martes.getDate(), 8, 0),
      endDate: new Date(martes.getFullYear(), martes.getMonth(), martes.getDate(), 14, 0),
      category: EventCategory.LABORAL,
      timeType: TimeType.INDIVIDUAL,
      partner: Partner.MARISA
    }, delay += 10)

    // Psicólogo con Milena
    addEventWithDelay({
      title: 'Psicólogo con Milena',
      notes: 'Acompañar a Milena al psicólogo',
      startDate: new Date(martes.getFullYear(), martes.getMonth(), martes.getDate(), 14, 30),
      endDate: new Date(martes.getFullYear(), martes.getMonth(), martes.getDate(), 16, 0),
      category: EventCategory.EFICAZ,
      timeType: TimeType.INDIVIDUAL,
      partner: Partner.MARISA
    }, delay += 10)

    // Trabajo con Sara
    addEventWithDelay({
      title: 'Trabajo con Sara',
      notes: 'Trabajo en casa de Sara',
      startDate: new Date(martes.getFullYear(), martes.getMonth(), martes.getDate(), 16, 30),
      endDate: new Date(martes.getFullYear(), martes.getMonth(), martes.getDate(), 19, 0),
      category: EventCategory.LABORAL,
      timeType: TimeType.INDIVIDUAL,
      partner: Partner.SARA
    }, delay += 10)

    // Cena y tiempo eficaz (balanceado)
    if (cenarConSaraMartes) {
      addEventWithDelay({
        title: 'Cena y tiempo eficaz con Sara',
        notes: 'Cena en casa de Sara + tiempo de calidad',
        startDate: new Date(martes.getFullYear(), martes.getMonth(), martes.getDate(), 20, 0),
        endDate: new Date(martes.getFullYear(), martes.getMonth(), martes.getDate(), 23, 30),
        category: EventCategory.EFICAZ,
        timeType: TimeType.INDIVIDUAL,
        partner: Partner.SARA
      }, delay += 10)
    } else {
      addEventWithDelay({
        title: 'Cena y tiempo eficaz con Marisa',
        notes: 'Cena en casa + tiempo de calidad',
        startDate: new Date(martes.getFullYear(), martes.getMonth(), martes.getDate(), 20, 0),
        endDate: new Date(martes.getFullYear(), martes.getMonth(), martes.getDate(), 23, 30),
        category: EventCategory.EFICAZ,
        timeType: TimeType.INDIVIDUAL,
        partner: Partner.MARISA
      }, delay += 10)
    }

    // MIÉRCOLES
    const miercoles = new Date(inicioSemana)
    miercoles.setDate(inicioSemana.getDate() + 2)

    // Dormir en casa
    addEventWithDelay({
      title: 'Dormir con Marisa',
      notes: 'Dormir en casa',
      startDate: new Date(miercoles.getFullYear(), miercoles.getMonth(), miercoles.getDate(), 0, 0),
      endDate: new Date(miercoles.getFullYear(), miercoles.getMonth(), miercoles.getDate(), 7, 0),
      category: EventCategory.DORMIR,
      timeType: TimeType.INDIVIDUAL,
      partner: Partner.MARISA
    }, delay += 10)

    // Trabajo en casa hasta mediodía
    addEventWithDelay({
      title: 'Trabajo en casa con Marisa',
      notes: 'Trabajo desde casa en la mañana',
      startDate: new Date(miercoles.getFullYear(), miercoles.getMonth(), miercoles.getDate(), 8, 0),
      endDate: new Date(miercoles.getFullYear(), miercoles.getMonth(), miercoles.getDate(), 12, 0),
      category: EventCategory.LABORAL,
      timeType: TimeType.INDIVIDUAL,
      partner: Partner.MARISA
    }, delay += 10)

    // Almuerzo y trabajo en casa de Sara
    addEventWithDelay({
      title: 'Almuerzo y trabajo con Sara',
      notes: 'Almuerzo en casa de Sara y trabajo',
      startDate: new Date(miercoles.getFullYear(), miercoles.getMonth(), miercoles.getDate(), 13, 0),
      endDate: new Date(miercoles.getFullYear(), miercoles.getMonth(), miercoles.getDate(), 18, 0),
      category: EventCategory.LABORAL,
      timeType: TimeType.INDIVIDUAL,
      partner: Partner.SARA
    }, delay += 10)

    // Gym los 3
    addEventWithDelay({
      title: 'Gimnasio los 3',
      notes: 'Entrenamiento grupal Matias, Marisa y Sara',
      startDate: new Date(miercoles.getFullYear(), miercoles.getMonth(), miercoles.getDate(), 18, 0),
      endDate: new Date(miercoles.getFullYear(), miercoles.getMonth(), miercoles.getDate(), 20, 0),
      category: EventCategory.GYM,
      timeType: TimeType.COMPARTIDO,
      partner: Partner.AMBAS
    }, delay += 10)

    // Cena balanceada (opuesta al lunes)
    if (!cenarConSaraLunes) {
      addEventWithDelay({
        title: 'Cena y tiempo eficaz con Sara',
        notes: 'Cena en casa de Sara + tiempo de calidad',
        startDate: new Date(miercoles.getFullYear(), miercoles.getMonth(), miercoles.getDate(), 20, 30),
        endDate: new Date(miercoles.getFullYear(), miercoles.getMonth(), miercoles.getDate(), 23, 30),
        category: EventCategory.EFICAZ,
        timeType: TimeType.INDIVIDUAL,
        partner: Partner.SARA
      }, delay += 10)
    } else {
      addEventWithDelay({
        title: 'Cena y tiempo eficaz con Marisa',
        notes: 'Cena en casa + tiempo de calidad',
        startDate: new Date(miercoles.getFullYear(), miercoles.getMonth(), miercoles.getDate(), 20, 30),
        endDate: new Date(miercoles.getFullYear(), miercoles.getMonth(), miercoles.getDate(), 23, 30),
        category: EventCategory.EFICAZ,
        timeType: TimeType.INDIVIDUAL,
        partner: Partner.MARISA
      }, delay += 10)
    }

    // JUEVES
    const jueves = new Date(inicioSemana)
    jueves.setDate(inicioSemana.getDate() + 3)

    // Dormir con Marisa
    addEventWithDelay({
      title: 'Dormir con Marisa',
      notes: 'Rutina normal',
      startDate: new Date(jueves.getFullYear(), jueves.getMonth(), jueves.getDate(), 0, 0),
      endDate: new Date(jueves.getFullYear(), jueves.getMonth(), jueves.getDate(), 7, 0),
      category: EventCategory.DORMIR,
      timeType: TimeType.INDIVIDUAL,
      partner: Partner.MARISA
    }, delay += 10)

    // Trabajo en oficina (solo)
    addEventWithDelay({
      title: 'Trabajo en oficina',
      notes: 'Trabajo en la oficina (no en casa)',
      startDate: new Date(jueves.getFullYear(), jueves.getMonth(), jueves.getDate(), 11, 0),
      endDate: new Date(jueves.getFullYear(), jueves.getMonth(), jueves.getDate(), 19, 0),
      category: EventCategory.LABORAL,
      timeType: TimeType.INDIVIDUAL,
      partner: Partner.MARISA // Asignado a Marisa para balance
    }, delay += 10)

    // Twerk con ambas
    addEventWithDelay({
      title: 'Clases de Twerk',
      notes: 'Bailar twerk con Marisa y Sara',
      startDate: new Date(jueves.getFullYear(), jueves.getMonth(), jueves.getDate(), 20, 0),
      endDate: new Date(jueves.getFullYear(), jueves.getMonth(), jueves.getDate(), 22, 0),
      category: EventCategory.ACT_ELLAS,
      timeType: TimeType.COMPARTIDO,
      partner: Partner.AMBAS
    }, delay += 10)

    // Tiempo eficaz balanceado después del twerk
    if (cenarConSaraJueves) {
      addEventWithDelay({
        title: 'Tiempo eficaz con Sara',
        notes: 'Tiempo de calidad después del twerk',
        startDate: new Date(jueves.getFullYear(), jueves.getMonth(), jueves.getDate(), 22, 30),
        endDate: new Date(jueves.getFullYear(), jueves.getMonth(), jueves.getDate() + 1, 0, 0),
        category: EventCategory.EFICAZ,
        timeType: TimeType.INDIVIDUAL,
        partner: Partner.SARA
      }, delay += 10)
    } else {
      addEventWithDelay({
        title: 'Tiempo eficaz con Marisa',
        notes: 'Tiempo de calidad después del twerk',
        startDate: new Date(jueves.getFullYear(), jueves.getMonth(), jueves.getDate(), 22, 30),
        endDate: new Date(jueves.getFullYear(), jueves.getMonth(), jueves.getDate() + 1, 0, 0),
        category: EventCategory.EFICAZ,
        timeType: TimeType.INDIVIDUAL,
        partner: Partner.MARISA
      }, delay += 10)
    }

    // VIERNES
    const viernes = new Date(inicioSemana)
    viernes.setDate(inicioSemana.getDate() + 4)

    // Dormir con Marisa
    addEventWithDelay({
      title: 'Dormir con Marisa',
      notes: 'Inicio del fin de semana',
      startDate: new Date(viernes.getFullYear(), viernes.getMonth(), viernes.getDate(), 0, 0),
      endDate: new Date(viernes.getFullYear(), viernes.getMonth(), viernes.getDate(), 7, 0),
      category: EventCategory.DORMIR,
      timeType: TimeType.INDIVIDUAL,
      partner: Partner.MARISA
    }, delay += 10)

    // Almuerzo los 3
    addEventWithDelay({
      title: 'Almuerzo los 3',
      notes: 'Sara viene a almorzar a casa',
      startDate: new Date(viernes.getFullYear(), viernes.getMonth(), viernes.getDate(), 11, 0),
      endDate: new Date(viernes.getFullYear(), viernes.getMonth(), viernes.getDate(), 13, 0),
      category: EventCategory.EFICAZ,
      timeType: TimeType.COMPARTIDO,
      partner: Partner.AMBAS
    }, delay += 10)

    // Trabajo los 3
    addEventWithDelay({
      title: 'Trabajo los 3',
      notes: 'Trabajo grupal en casa',
      startDate: new Date(viernes.getFullYear(), viernes.getMonth(), viernes.getDate(), 13, 0),
      endDate: new Date(viernes.getFullYear(), viernes.getMonth(), viernes.getDate(), 18, 0),
      category: EventCategory.LABORAL,
      timeType: TimeType.COMPARTIDO,
      partner: Partner.AMBAS
    }, delay += 10)

    // Gym los 3
    addEventWithDelay({
      title: 'Gimnasio los 3',
      notes: 'Entrenamiento de fin de semana',
      startDate: new Date(viernes.getFullYear(), viernes.getMonth(), viernes.getDate(), 19, 0),
      endDate: new Date(viernes.getFullYear(), viernes.getMonth(), viernes.getDate(), 21, 0),
      category: EventCategory.GYM,
      timeType: TimeType.COMPARTIDO,
      partner: Partner.AMBAS
    }, delay += 10)

    // Cena y dormir los 3
    addEventWithDelay({
      title: 'Cena y tiempo eficaz los 3',
      notes: 'Cena grupal + tiempo de calidad',
      startDate: new Date(viernes.getFullYear(), viernes.getMonth(), viernes.getDate(), 21, 30),
      endDate: new Date(viernes.getFullYear(), viernes.getMonth(), viernes.getDate() + 1, 0, 0),
      category: EventCategory.EFICAZ,
      timeType: TimeType.COMPARTIDO,
      partner: Partner.AMBAS
    }, delay += 10)

    // SÁBADO
    const sabado = new Date(inicioSemana)
    sabado.setDate(inicioSemana.getDate() + 5)

    // Dormir los 3 (madrugada del viernes)
    addEventWithDelay({
      title: 'Dormir los 3',
      notes: 'Noche especial de viernes',
      startDate: new Date(sabado.getFullYear(), sabado.getMonth(), sabado.getDate(), 0, 0),
      endDate: new Date(sabado.getFullYear(), sabado.getMonth(), sabado.getDate(), 9, 0),
      category: EventCategory.DORMIR,
      timeType: TimeType.COMPARTIDO,
      partner: Partner.AMBAS
    }, delay += 10)

    // Almuerzo familiar los 5
    addEventWithDelay({
      title: 'Almuerzo familiar los 5',
      notes: 'Almuerzo con Milena y Nicole',
      startDate: new Date(sabado.getFullYear(), sabado.getMonth(), sabado.getDate(), 13, 0),
      endDate: new Date(sabado.getFullYear(), sabado.getMonth(), sabado.getDate(), 15, 0),
      category: EventCategory.EFICAZ,
      timeType: TimeType.COMPARTIDO,
      partner: Partner.AMBAS
    }, delay += 10)

    // Actividad tarde (variada)
    const actividadesTarde = [
      'Tarde en el parque los 5',
      'Tarde de shopping los 5', 
      'Juntada de amigos en casa',
      'Tarde en casa relajada los 5'
    ]
    addEventWithDelay({
      title: actividadesTarde[semana % actividadesTarde.length],
      notes: 'Actividad familiar de tarde',
      startDate: new Date(sabado.getFullYear(), sabado.getMonth(), sabado.getDate(), 15, 0),
      endDate: new Date(sabado.getFullYear(), sabado.getMonth(), sabado.getDate(), 18, 0),
      category: EventCategory.EFICAZ,
      timeType: TimeType.COMPARTIDO,
      partner: Partner.AMBAS
    }, delay += 10)

    // Actividad noche (variada)
    const actividadesNoche = [
      'Cena en casa + series los 5',
      'Cena en restaurante los 5',
      'Cena en casa de Silvia los 5',
      'Juntada nocturna con amigos los 5'
    ]
    addEventWithDelay({
      title: actividadesNoche[semana % actividadesNoche.length],
      notes: 'Actividad familiar de noche',
      startDate: new Date(sabado.getFullYear(), sabado.getMonth(), sabado.getDate(), 19, 0),
      endDate: new Date(sabado.getFullYear(), sabado.getMonth(), sabado.getDate() + 1, 0, 0),
      category: EventCategory.EFICAZ,
      timeType: TimeType.COMPARTIDO,
      partner: Partner.AMBAS
    }, delay += 10)

    // DOMINGO
    const domingo = new Date(inicioSemana)
    domingo.setDate(inicioSemana.getDate() + 6)

    // Dormir los 5
    addEventWithDelay({
      title: 'Dormir los 5',
      notes: 'Noche familiar del sábado',
      startDate: new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate(), 0, 0),
      endDate: new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate(), 11, 0),
      category: EventCategory.DORMIR,
      timeType: TimeType.COMPARTIDO,
      partner: Partner.AMBAS
    }, delay += 10)

    // Desayuno los 5
    addEventWithDelay({
      title: 'Desayuno familiar los 5',
      notes: 'Desayuno relajado del domingo',
      startDate: new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate(), 11, 0),
      endDate: new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate(), 13, 0),
      category: EventCategory.EFICAZ,
      timeType: TimeType.COMPARTIDO,
      partner: Partner.AMBAS
    }, delay += 10)

    // Tarde balanceada (alternando)
    if (semana % 2 === 0) {
      // Sara se queda a almorzar y se va
      addEventWithDelay({
        title: 'Tiempo eficaz con Marisa',
        notes: 'Tarde relajada en casa',
        startDate: new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate(), 15, 0),
        endDate: new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate(), 19, 0),
        category: EventCategory.EFICAZ,
        timeType: TimeType.INDIVIDUAL,
        partner: Partner.MARISA
      }, delay += 10)

      addEventWithDelay({
        title: 'Cena y tiempo eficaz con Sara',
        notes: 'Cena en casa de Sara + tiempo de calidad',
        startDate: new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate(), 19, 0),
        endDate: new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate(), 23, 0),
        category: EventCategory.EFICAZ,
        timeType: TimeType.INDIVIDUAL,
        partner: Partner.SARA
      }, delay += 10)

      addEventWithDelay({
        title: 'Tiempo eficaz con Marisa',
        notes: 'Tiempo final antes de dormir',
        startDate: new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate(), 23, 0),
        endDate: new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate() + 1, 0, 0),
        category: EventCategory.EFICAZ,
        timeType: TimeType.INDIVIDUAL,
        partner: Partner.MARISA
      }, delay += 10)
    } else {
      // Patrón alternativo
      addEventWithDelay({
        title: 'Tiempo eficaz con Sara',
        notes: 'Tarde en casa de Sara',
        startDate: new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate(), 15, 0),
        endDate: new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate(), 19, 0),
        category: EventCategory.EFICAZ,
        timeType: TimeType.INDIVIDUAL,
        partner: Partner.SARA
      }, delay += 10)

      addEventWithDelay({
        title: 'Cena y tiempo eficaz con Marisa',
        notes: 'Cena en casa + tiempo de calidad',
        startDate: new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate(), 19, 0),
        endDate: new Date(domingo.getFullYear(), domingo.getMonth(), domingo.getDate() + 1, 0, 0),
        category: EventCategory.EFICAZ,
        timeType: TimeType.INDIVIDUAL,
        partner: Partner.MARISA
      }, delay += 10)
    }
  }

  alert(`¡Datos de ejemplo agregados! 🎉\n\nSe han creado 4 semanas de eventos balanceados entre Marisa y Sara, respetando tus patrones fijos:\n\n✅ Actividades fijas respetadas\n✅ Gym en horarios correctos\n✅ Viernes especiales los 3\n✅ Sábados familiares los 5\n✅ Balance equitativo\n✅ Una noche al mes en casa de Sara\n\nRevisa las estadísticas para ver el balance! 💕`)
}
</script>

<style scoped>
/* Estilos existentes */
</style> 