import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { 
  TimeEvent, 
  DayStats, 
  WeekStats,
  MonthStats 
} from '@/types'
import { 
  EventCategory, 
  TimeType, 
  Partner
} from '@/types'
import { 
  startOfDay, 
  endOfDay, 
  startOfWeek, 
  endOfWeek, 
  startOfMonth, 
  endOfMonth,
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  differenceInHours,
  isWithinInterval,
  isSameDay
} from 'date-fns'
import { es } from 'date-fns/locale'

export const useEventsStore = defineStore('events', () => {
  const events = ref<TimeEvent[]>([])

  // Cargar eventos del localStorage
  const loadEvents = () => {
    const stored = localStorage.getItem('timelove-events')
    if (stored) {
      const parsed = JSON.parse(stored)
      const eventsWithDates = parsed.map((event: any) => ({
        ...event,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate)
      }))
      
      // Eliminar duplicados basados en ID
      const uniqueEvents = eventsWithDates.filter((event: TimeEvent, index: number, self: TimeEvent[]) => 
        index === self.findIndex(e => e.id === event.id)
      )
      
      events.value = uniqueEvents
      
      // Si se encontraron duplicados, guardar la versión limpia
      if (uniqueEvents.length !== eventsWithDates.length) {
        saveEvents()
      }
    }
  }

  // Guardar eventos en localStorage
  const saveEvents = () => {
    localStorage.setItem('timelove-events', JSON.stringify(events.value))
  }

  // Agregar evento
  const addEvent = (event: Omit<TimeEvent, 'id'>) => {
    const newEvent: TimeEvent = {
      ...event,
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    }
    events.value.push(newEvent)
    saveEvents()
  }

  // Eliminar evento
  const deleteEvent = (id: string) => {
    events.value = events.value.filter(event => event.id !== id)
    saveEvents()
  }

  // Actualizar evento
  const updateEvent = (id: string, updatedEvent: Partial<TimeEvent>) => {
    const index = events.value.findIndex(event => event.id === id)
    if (index !== -1) {
      events.value[index] = { ...events.value[index], ...updatedEvent }
      saveEvents()
    }
  }

  // Obtener eventos de un día específico
  const getEventsForDay = (date: Date): TimeEvent[] => {
    const dayStart = startOfDay(date)
    const dayEnd = endOfDay(date)
    
    return events.value.filter(event => 
      isWithinInterval(event.startDate, { start: dayStart, end: dayEnd }) ||
      isWithinInterval(event.endDate, { start: dayStart, end: dayEnd }) ||
      (event.startDate <= dayStart && event.endDate >= dayEnd)
    )
  }

  // Calcular estadísticas de un día
  const getDayStats = (date: Date): DayStats => {
    const dayEvents = getEventsForDay(date)
    let marisaHours = 0
    let saraHours = 0
    let soloHours = 0  // Nuevo contador para tiempo solo
    let marisaEffectiveHours = 0  // Solo TIEMPO EFICAZ
    let saraEffectiveHours = 0    // Solo TIEMPO EFICAZ
    const categoryBreakdown = {
      [EventCategory.DORMIR]: 0,
      [EventCategory.LABORAL]: 0,
      [EventCategory.GYM]: 0,
      [EventCategory.EFICAZ]: 0,
      [EventCategory.ACT_ELLAS]: 0
    }

    dayEvents.forEach(event => {
      const hours = (event.endDate.getTime() - event.startDate.getTime()) / (1000 * 60 * 60)
      
      // Calcular horas por categoría
      categoryBreakdown[event.category] += hours

      // Calcular horas por pareja (excluyendo tiempo SOLO)
      if (event.partner === Partner.SOLO) {
        soloHours += hours
        // El tiempo solo no cuenta para ninguna pareja en el balance
      } else if (event.timeType === TimeType.COMPARTIDO && event.partner === Partner.AMBAS) {
        marisaHours += hours
        saraHours += hours
        
        // Solo contar TIEMPO EFICAZ y ACT_ELLAS como "horas efectivas"
        if (event.category === EventCategory.EFICAZ || event.category === EventCategory.ACT_ELLAS) {
          marisaEffectiveHours += hours
          saraEffectiveHours += hours
        }
      } else if (event.partner === Partner.MARISA) {
        marisaHours += hours
        
        // Solo contar TIEMPO EFICAZ y ACT_ELLAS como "horas efectivas"
        if (event.category === EventCategory.EFICAZ || event.category === EventCategory.ACT_ELLAS) {
          marisaEffectiveHours += hours
        }
      } else if (event.partner === Partner.SARA) {
        saraHours += hours
        
        // Solo contar TIEMPO EFICAZ y ACT_ELLAS como "horas efectivas"
        if (event.category === EventCategory.EFICAZ || event.category === EventCategory.ACT_ELLAS) {
          saraEffectiveHours += hours
        }
      }
    })

    // Para el porcentaje, solo considerar tiempo con parejas (no tiempo solo)
    const totalPartnerHours = marisaHours + saraHours
    const marisaPercentage = totalPartnerHours > 0 ? (marisaHours / totalPartnerHours) * 100 : 0
    const saraPercentage = totalPartnerHours > 0 ? (saraHours / totalPartnerHours) * 100 : 0

    // Total de horas incluye tiempo solo para estadísticas generales
    const totalHours = marisaHours + saraHours + soloHours

    return {
      date,
      marisaPercentage,
      saraPercentage,
      marisaHours: marisaEffectiveHours,  // Solo horas efectivas (TIEMPO EFICAZ)
      saraHours: saraEffectiveHours,      // Solo horas efectivas (TIEMPO EFICAZ)
      soloHours,                          // Horas de tiempo solo
      totalHours,
      events: dayEvents,
      categoryBreakdown
    }
  }

  // Calcular estadísticas de una semana
  const getWeekStats = (date: Date): WeekStats => {
    const weekStart = startOfWeek(date, { weekStartsOn: 1 }) // Lunes
    const weekEnd = endOfWeek(date, { weekStartsOn: 1 })
    
    const days = eachDayOfInterval({ start: weekStart, end: weekEnd })
      .map(day => getDayStats(day))

    // Sumar horas efectivas de todos los días (ya filtradas por TIEMPO EFICAZ)
    const totalMarisaHours = days.reduce((sum, day) => sum + day.marisaHours, 0)
    const totalSaraHours = days.reduce((sum, day) => sum + day.saraHours, 0)
    const totalSoloHours = days.reduce((sum, day) => sum + day.soloHours, 0)
    
    // Para el porcentaje, usar todas las horas (no solo efectivas) pero excluyendo tiempo SOLO
    const allMarisaHours = days.reduce((sum, day) => {
      return sum + day.events.reduce((eventSum, event) => {
        if (event.partner === Partner.SOLO) {
          return eventSum // No contar tiempo solo
        } else if (event.timeType === TimeType.COMPARTIDO && event.partner === Partner.AMBAS) {
          return eventSum + (event.endDate.getTime() - event.startDate.getTime()) / (1000 * 60 * 60)
        } else if (event.partner === Partner.MARISA) {
          return eventSum + (event.endDate.getTime() - event.startDate.getTime()) / (1000 * 60 * 60)
        }
        return eventSum
      }, 0)
    }, 0)
    
    const allSaraHours = days.reduce((sum, day) => {
      return sum + day.events.reduce((eventSum, event) => {
        if (event.partner === Partner.SOLO) {
          return eventSum // No contar tiempo solo
        } else if (event.timeType === TimeType.COMPARTIDO && event.partner === Partner.AMBAS) {
          return eventSum + (event.endDate.getTime() - event.startDate.getTime()) / (1000 * 60 * 60)
        } else if (event.partner === Partner.SARA) {
          return eventSum + (event.endDate.getTime() - event.startDate.getTime()) / (1000 * 60 * 60)
        }
        return eventSum
      }, 0)
    }, 0)

    // Calcular tiempo solo total para incluir en el total general
    const allSoloHours = days.reduce((sum, day) => {
      return sum + day.events.reduce((eventSum, event) => {
        if (event.partner === Partner.SOLO) {
          return eventSum + (event.endDate.getTime() - event.startDate.getTime()) / (1000 * 60 * 60)
        }
        return eventSum
      }, 0)
    }, 0)

    // Para porcentajes, solo considerar tiempo con parejas
    const totalPartnerHours = allMarisaHours + allSaraHours
    const totalMarisaPercentage = totalPartnerHours > 0 ? (allMarisaHours / totalPartnerHours) * 100 : 0
    const totalSaraPercentage = totalPartnerHours > 0 ? (allSaraHours / totalPartnerHours) * 100 : 0

    // Total incluye tiempo solo
    const totalHours = allMarisaHours + allSaraHours + allSoloHours

    return {
      weekStart,
      weekEnd,
      days,
      totalMarisaPercentage,
      totalSaraPercentage,
      totalMarisaHours,  // Solo horas efectivas
      totalSaraHours,    // Solo horas efectivas
      totalSoloHours,    // Total horas solo
      totalHours
    }
  }

  // Calcular estadísticas de un mes
  const getMonthStats = (date: Date): MonthStats => {
    const monthStart = startOfMonth(date)
    const monthEnd = endOfMonth(date)
    
    const weeks = eachWeekOfInterval(
      { start: monthStart, end: monthEnd },
      { weekStartsOn: 1 }
    ).map(weekStart => getWeekStats(weekStart))

    // Sumar horas efectivas de todas las semanas (ya filtradas por TIEMPO EFICAZ)
    const totalMarisaHours = weeks.reduce((sum, week) => sum + week.totalMarisaHours, 0)
    const totalSaraHours = weeks.reduce((sum, week) => sum + week.totalSaraHours, 0)
    const totalSoloHours = weeks.reduce((sum, week) => sum + week.totalSoloHours, 0)
    
    // Para el total de horas, calcular todas las horas de todos los eventos del mes
    let allMarisaHours = 0
    let allSaraHours = 0
    let allSoloHours = 0
    
    weeks.forEach(week => {
      week.days.forEach(day => {
        day.events.forEach(event => {
          const hours = (event.endDate.getTime() - event.startDate.getTime()) / (1000 * 60 * 60)
          
          if (event.partner === Partner.SOLO) {
            allSoloHours += hours
          } else if (event.timeType === TimeType.COMPARTIDO && event.partner === Partner.AMBAS) {
            allMarisaHours += hours
            allSaraHours += hours
          } else if (event.partner === Partner.MARISA) {
            allMarisaHours += hours
          } else if (event.partner === Partner.SARA) {
            allSaraHours += hours
          }
        })
      })
    })
    
    const totalHours = allMarisaHours + allSaraHours + allSoloHours

    return {
      month: date.getMonth(),
      year: date.getFullYear(),
      weeks,
      totalMarisaHours,  // Solo horas efectivas
      totalSaraHours,    // Solo horas efectivas
      totalHours,        // Todas las horas incluyendo tiempo solo
      allMarisaHours,    // Todas las horas de Marisa (para porcentajes)
      allSaraHours,      // Todas las horas de Sara (para porcentajes)
      totalSoloHours
    }
  }

  // Limpiar todos los eventos
  const clearAllEvents = () => {
    console.log('Limpiando todos los eventos...')
    events.value = []
    saveEvents()
    console.log('Eventos limpiados. Total actual:', events.value.length)
  }

  // Inicializar store
  loadEvents()

  return {
    events: computed(() => events.value),
    addEvent,
    deleteEvent,
    updateEvent,
    getEventsForDay,
    getDayStats,
    getWeekStats,
    getMonthStats,
    clearAllEvents
  }
}) 