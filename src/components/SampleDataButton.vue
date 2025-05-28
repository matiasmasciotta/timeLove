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

// Función helper para agregar eventos con delay
const addEventWithDelay = (eventData: any, delayMs: number) => {
  setTimeout(() => {
    eventsStore.addEvent(eventData)
  }, delayMs)
}

const addSampleData = () => {
  // Generar datos para Mayo y Junio 2025
  const meses = [
    { mes: 4, año: 2025, nombre: 'Mayo' },    // Mayo (mes 4 en JavaScript)
    { mes: 5, año: 2025, nombre: 'Junio' }   // Junio (mes 5 en JavaScript)
  ]

  let delay = 0
  let horasEficazMayoMarisa = 0
  let horasEficazMayoSara = 0
  let horasEficazJunioMarisa = 0
  let horasEficazJunioSara = 0

  meses.forEach((mesInfo, indiceMes) => {
    const primerDia = new Date(mesInfo.año, mesInfo.mes, 1)
    const ultimoDia = new Date(mesInfo.año, mesInfo.mes + 1, 0)
    
    // Estrategia de balance: Mayo favorece a Marisa, Junio favorece a Sara
    const favoreceMarisa = indiceMes === 0 // Mayo favorece a Marisa
    
    console.log(`Generando datos para ${mesInfo.nombre} ${mesInfo.año}...`)
    
    // Generar cada día del mes
    for (let dia = 1; dia <= ultimoDia.getDate(); dia++) {
      const fecha = new Date(mesInfo.año, mesInfo.mes, dia)
      const diaSemana = fecha.getDay() // 0=Domingo, 1=Lunes, etc.
      
      // Estrategia especial para domingos (día de compensación)
      const esDomingo = diaSemana === 0
      const esLunes = diaSemana === 1
      const esMartes = diaSemana === 2
      const esMiercoles = diaSemana === 3
      const esJueves = diaSemana === 4
      const esViernes = diaSemana === 5
      const esSabado = diaSemana === 6
      
      // Patrón de dormir: alternar cada semana
      const semanaDelMes = Math.ceil(dia / 7)
      const duermeCasaSara = (semanaDelMes === 2) // Solo una semana al mes en casa de Sara
      
      // DORMIR (00:00 - 07:00)
      if (esDomingo && dia > 7) {
        // Domingos especiales: dormir los 5
        addEventWithDelay({
          title: 'Dormir los 5',
          notes: 'Noche familiar del sábado',
          startDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 0, 0),
          endDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 9, 0),
          category: EventCategory.DORMIR,
          timeType: TimeType.COMPARTIDO,
          partner: Partner.AMBAS
        }, delay += 10)
      } else if (duermeCasaSara && (esLunes || esMartes)) {
        // Semana especial en casa de Sara
        addEventWithDelay({
          title: 'Dormir con Sara (semana especial)',
          notes: 'Una vez al mes duermo en casa de Sara',
          startDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 0, 0),
          endDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 7, 0),
          category: EventCategory.DORMIR,
          timeType: TimeType.INDIVIDUAL,
          partner: Partner.SARA
        }, delay += 10)
      } else {
        // Rutina normal: dormir con Marisa
        addEventWithDelay({
          title: 'Dormir con Marisa',
          notes: 'Rutina normal',
          startDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 0, 0),
          endDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 7, 0),
          category: EventCategory.DORMIR,
          timeType: TimeType.INDIVIDUAL,
          partner: Partner.MARISA
        }, delay += 10)
      }

      // TRABAJO MATUTINO
      if (esLunes || esMartes || esMiercoles) {
        // Días laborales: trabajo en casa con Marisa
        addEventWithDelay({
          title: 'Trabajo en casa con Marisa',
          notes: 'Trabajo desde casa en la mañana',
          startDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 8, 0),
          endDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 13, 0),
          category: EventCategory.LABORAL,
          timeType: TimeType.INDIVIDUAL,
          partner: Partner.MARISA
        }, delay += 10)
      } else if (esJueves) {
        // Jueves: trabajo en oficina (solo)
        addEventWithDelay({
          title: 'Trabajo en oficina',
          notes: 'Trabajo en la oficina (no en casa)',
          startDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 9, 0),
          endDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 18, 0),
          category: EventCategory.LABORAL,
          timeType: TimeType.INDIVIDUAL,
          partner: Partner.SOLO
        }, delay += 10)
      } else if (esViernes) {
        // Viernes: trabajo los 3
        addEventWithDelay({
          title: 'Trabajo los 3',
          notes: 'Trabajo grupal en casa',
          startDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 9, 0),
          endDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 14, 0),
          category: EventCategory.LABORAL,
          timeType: TimeType.COMPARTIDO,
          partner: Partner.AMBAS
        }, delay += 10)
      }

      // TRABAJO VESPERTINO
      if (esLunes || esMartes) {
        // Trabajo con Sara en la tarde
        addEventWithDelay({
          title: 'Trabajo con Sara',
          notes: 'Trabajo en casa de Sara',
          startDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 14, 0),
          endDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 18, 0),
          category: EventCategory.LABORAL,
          timeType: TimeType.INDIVIDUAL,
          partner: Partner.SARA
        }, delay += 10)
      } else if (esMiercoles) {
        // Miércoles: trabajo con Sara hasta las 18
        addEventWithDelay({
          title: 'Almuerzo y trabajo con Sara',
          notes: 'Almuerzo en casa de Sara y trabajo',
          startDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 13, 0),
          endDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 18, 0),
          category: EventCategory.LABORAL,
          timeType: TimeType.INDIVIDUAL,
          partner: Partner.SARA
        }, delay += 10)
      }

      // ACTIVIDADES ESPECIALES
      if (esMartes) {
        // Martes: Psicólogo con Milena
        addEventWithDelay({
          title: 'Psicólogo con Milena',
          notes: 'Acompañar a Milena al psicólogo',
          startDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 14, 30),
          endDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 16, 0),
          category: EventCategory.EFICAZ,
          timeType: TimeType.INDIVIDUAL,
          partner: Partner.MARISA
        }, delay += 10)
        
        if (indiceMes === 0) horasEficazMayoMarisa += 1.5
        else horasEficazJunioMarisa += 1.5

        // Fútbol los martes por la noche
        addEventWithDelay({
          title: 'Fútbol',
          notes: 'Jugar fútbol solo',
          startDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 21, 0),
          endDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 22, 0),
          category: EventCategory.GYM,
          timeType: TimeType.INDIVIDUAL,
          partner: Partner.SOLO
        }, delay += 10)
      }

      if (esSabado) {
        // Sábados: Basket solo
        addEventWithDelay({
          title: 'Basket',
          notes: 'Jugar basket solo',
          startDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 15, 30),
          endDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 16, 30),
          category: EventCategory.GYM,
          timeType: TimeType.INDIVIDUAL,
          partner: Partner.SOLO
        }, delay += 10)
      }

      // GYM (Lunes, Miércoles, Viernes)
      if (esLunes || esMiercoles || esViernes) {
        addEventWithDelay({
          title: 'Gimnasio los 3',
          notes: 'Entrenamiento grupal Matias, Marisa y Sara',
          startDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 18, 0),
          endDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 20, 0),
          category: EventCategory.GYM,
          timeType: TimeType.COMPARTIDO,
          partner: Partner.AMBAS
        }, delay += 10)
      }

      // TWERK (Jueves)
      if (esJueves) {
        addEventWithDelay({
          title: 'Clases de Twerk',
          notes: 'Bailar twerk con Marisa y Sara',
          startDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 19, 0),
          endDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 21, 0),
          category: EventCategory.ACT_ELLAS,
          timeType: TimeType.COMPARTIDO,
          partner: Partner.AMBAS
        }, delay += 10)
        
        if (indiceMes === 0) {
          horasEficazMayoMarisa += 2
          horasEficazMayoSara += 2
        } else {
          horasEficazJunioMarisa += 2
          horasEficazJunioSara += 2
        }
      }

      // TIEMPO EFICAZ NOCTURNO - SISTEMA DE BALANCE INTELIGENTE
      if (esLunes || esMartes || esMiercoles) {
        // Días laborales: alternar según el mes y balance
        let conQuien = Partner.MARISA
        let horasEficaz = 3
        
        if (favoreceMarisa) {
          // Mayo favorece a Marisa: 60% Marisa, 40% Sara
          conQuien = (dia % 5 < 3) ? Partner.MARISA : Partner.SARA
        } else {
          // Junio favorece a Sara: 40% Marisa, 60% Sara
          conQuien = (dia % 5 < 2) ? Partner.MARISA : Partner.SARA
        }
        
        addEventWithDelay({
          title: `Cena y tiempo eficaz con ${conQuien}`,
          notes: conQuien === Partner.MARISA ? 'Cena en casa + tiempo de calidad' : 'Cena en casa de Sara + tiempo de calidad',
          startDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 20, 30),
          endDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 23, 30),
          category: EventCategory.EFICAZ,
          timeType: TimeType.INDIVIDUAL,
          partner: conQuien
        }, delay += 10)
        
        if (indiceMes === 0) {
          if (conQuien === Partner.MARISA) horasEficazMayoMarisa += horasEficaz
          else horasEficazMayoSara += horasEficaz
        } else {
          if (conQuien === Partner.MARISA) horasEficazJunioMarisa += horasEficaz
          else horasEficazJunioSara += horasEficaz
        }
      }

      if (esJueves) {
        // Jueves: tiempo después del twerk
        let conQuien = favoreceMarisa ? Partner.MARISA : Partner.SARA
        
        addEventWithDelay({
          title: `Tiempo eficaz con ${conQuien}`,
          notes: 'Tiempo de calidad después del twerk',
          startDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 21, 30),
          endDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + 1, 0, 0),
          category: EventCategory.EFICAZ,
          timeType: TimeType.INDIVIDUAL,
          partner: conQuien
        }, delay += 10)
        
        if (indiceMes === 0) {
          if (conQuien === Partner.MARISA) horasEficazMayoMarisa += 2.5
          else horasEficazMayoSara += 2.5
        } else {
          if (conQuien === Partner.MARISA) horasEficazJunioMarisa += 2.5
          else horasEficazJunioSara += 2.5
        }
      }

      if (esViernes) {
        // Viernes: almuerzo y cena los 3
        addEventWithDelay({
          title: 'Almuerzo los 3',
          notes: 'Sara viene a almorzar a casa',
          startDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 14, 0),
          endDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 16, 0),
          category: EventCategory.EFICAZ,
          timeType: TimeType.COMPARTIDO,
          partner: Partner.AMBAS
        }, delay += 10)

        addEventWithDelay({
          title: 'Cena y tiempo eficaz los 3',
          notes: 'Cena grupal + tiempo de calidad',
          startDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 20, 30),
          endDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + 1, 0, 0),
          category: EventCategory.EFICAZ,
          timeType: TimeType.COMPARTIDO,
          partner: Partner.AMBAS
        }, delay += 10)
        
        if (indiceMes === 0) {
          horasEficazMayoMarisa += 5.5 // 2 + 3.5
          horasEficazMayoSara += 5.5
        } else {
          horasEficazJunioMarisa += 5.5
          horasEficazJunioSara += 5.5
        }
      }

      if (esSabado) {
        // Sábados: actividades familiares
        addEventWithDelay({
          title: 'Almuerzo familiar los 5',
          notes: 'Almuerzo con Milena y Nicole',
          startDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 13, 0),
          endDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 15, 0),
          category: EventCategory.EFICAZ,
          timeType: TimeType.COMPARTIDO,
          partner: Partner.AMBAS
        }, delay += 10)

        const actividadesTarde = [
          'Tarde en el parque los 5',
          'Tarde de shopping los 5', 
          'Juntada de amigos en casa',
          'Tarde en casa relajada los 5'
        ]
        
        addEventWithDelay({
          title: actividadesTarde[dia % actividadesTarde.length],
          notes: 'Actividad familiar de tarde',
          startDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 17, 0),
          endDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 19, 0),
          category: EventCategory.EFICAZ,
          timeType: TimeType.COMPARTIDO,
          partner: Partner.AMBAS
        }, delay += 10)

        const actividadesNoche = [
          'Cena en casa + series los 5',
          'Cena en restaurante los 5',
          'Cena en casa de Silvia los 5',
          'Juntada nocturna con amigos los 5'
        ]
        
        addEventWithDelay({
          title: actividadesNoche[dia % actividadesNoche.length],
          notes: 'Actividad familiar de noche',
          startDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 19, 30),
          endDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + 1, 0, 0),
          category: EventCategory.EFICAZ,
          timeType: TimeType.COMPARTIDO,
          partner: Partner.AMBAS
        }, delay += 10)
        
        if (indiceMes === 0) {
          horasEficazMayoMarisa += 6.5 // 2 + 2 + 2.5
          horasEficazMayoSara += 6.5
        } else {
          horasEficazJunioMarisa += 6.5
          horasEficazJunioSara += 6.5
        }
      }

      if (esDomingo) {
        // Domingos: día de compensación inteligente
        if (dia > 7) {
          // Desayuno los 5
          addEventWithDelay({
            title: 'Desayuno familiar los 5',
            notes: 'Desayuno relajado del domingo',
            startDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 11, 0),
            endDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 13, 0),
            category: EventCategory.EFICAZ,
            timeType: TimeType.COMPARTIDO,
            partner: Partner.AMBAS
          }, delay += 10)
          
          // Compensación inteligente basada en el balance del mes
          let conQuienTarde = favoreceMarisa ? Partner.MARISA : Partner.SARA
          let conQuienNoche = favoreceMarisa ? Partner.SARA : Partner.MARISA
          
          addEventWithDelay({
            title: `Tiempo eficaz con ${conQuienTarde} (compensación)`,
            notes: 'Tarde completa para balancear el mes',
            startDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 15, 0),
            endDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 19, 0),
            category: EventCategory.EFICAZ,
            timeType: TimeType.INDIVIDUAL,
            partner: conQuienTarde
          }, delay += 10)

          addEventWithDelay({
            title: `Cena y tiempo eficaz con ${conQuienNoche}`,
            notes: 'Tiempo final antes de dormir',
            startDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate(), 19, 30),
            endDate: new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate() + 1, 0, 0),
            category: EventCategory.EFICAZ,
            timeType: TimeType.INDIVIDUAL,
            partner: conQuienNoche
          }, delay += 10)
          
          if (indiceMes === 0) {
            horasEficazMayoMarisa += 2 // Desayuno compartido
            horasEficazMayoSara += 2
            if (conQuienTarde === Partner.MARISA) {
              horasEficazMayoMarisa += 4
              horasEficazMayoSara += 4.5
            } else {
              horasEficazMayoSara += 4
              horasEficazMayoMarisa += 4.5
            }
          } else {
            horasEficazJunioMarisa += 2
            horasEficazJunioSara += 2
            if (conQuienTarde === Partner.MARISA) {
              horasEficazJunioMarisa += 4
              horasEficazJunioSara += 4.5
            } else {
              horasEficazJunioSara += 4
              horasEficazJunioMarisa += 4.5
            }
          }
        }
      }
    }
  })

  // Mostrar resumen del balance
  const balanceMayo = horasEficazMayoMarisa - horasEficazMayoSara
  const balanceJunio = horasEficazJunioMarisa - horasEficazJunioSara
  
  alert(`¡Datos de 2 meses completos agregados! 🎉\n\n📅 MAYO 2025:\n• Marisa: ${Math.round(horasEficazMayoMarisa * 10) / 10}h efectivas\n• Sara: ${Math.round(horasEficazMayoSara * 10) / 10}h efectivas\n• Balance: ${balanceMayo > 0 ? '+' : ''}${Math.round(balanceMayo * 10) / 10}h hacia Marisa\n\n📅 JUNIO 2025:\n• Marisa: ${Math.round(horasEficazJunioMarisa * 10) / 10}h efectivas\n• Sara: ${Math.round(horasEficazJunioSara * 10) / 10}h efectivas\n• Balance: ${balanceJunio > 0 ? '+' : ''}${Math.round(balanceJunio * 10) / 10}h hacia Marisa\n\n✅ Sistema de compensación inteligente aplicado\n✅ Mayo favorece a Marisa, Junio favorece a Sara\n✅ Actividades fijas respetadas\n✅ Tiempo SOLO incluido (oficina, fútbol, basket)\n\n¡Revisa las estadísticas mensuales! 💕`)
}
</script>

<style scoped>
/* Estilos existentes */
</style> 