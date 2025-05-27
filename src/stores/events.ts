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
      events.value = parsed.map((event: any) => ({
        ...event,
        startDate: new Date(event.startDate),
        endDate: new Date(event.endDate)
      }))
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
      id: Date.now().toString()
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
    const categoryBreakdown = {
      [EventCategory.DORMIR]: 0,
      [EventCategory.LABORAL]: 0,
      [EventCategory.GYM]: 0,
      [EventCategory.EFICAZ]: 0
    }

    dayEvents.forEach(event => {
      const hours = differenceInHours(event.endDate, event.startDate)
      
      // Calcular horas por categoría
      categoryBreakdown[event.category] += hours

      // Calcular horas por pareja
      if (event.timeType === TimeType.COMPARTIDO && event.partner === Partner.AMBAS) {
        marisaHours += hours
        saraHours += hours
      } else if (event.partner === Partner.MARISA) {
        marisaHours += hours
      } else if (event.partner === Partner.SARA) {
        saraHours += hours
      }
    })

    const totalHours = marisaHours + saraHours
    const marisaPercentage = totalHours > 0 ? (marisaHours / totalHours) * 100 : 0
    const saraPercentage = totalHours > 0 ? (saraHours / totalHours) * 100 : 0

    return {
      date,
      marisaPercentage,
      saraPercentage,
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

    const totalMarisaPercentage = days.reduce((sum, day) => sum + day.marisaPercentage, 0) / 7
    const totalSaraPercentage = days.reduce((sum, day) => sum + day.saraPercentage, 0) / 7

    return {
      weekStart,
      weekEnd,
      days,
      totalMarisaPercentage,
      totalSaraPercentage
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

    const totalMarisaHours = weeks.reduce((sum, week) => 
      sum + week.days.reduce((daySum, day) => 
        daySum + day.events.reduce((eventSum, event) => {
          if (event.partner === Partner.MARISA || 
              (event.timeType === TimeType.COMPARTIDO && event.partner === Partner.AMBAS)) {
            return eventSum + differenceInHours(event.endDate, event.startDate)
          }
          return eventSum
        }, 0), 0), 0)

    const totalSaraHours = weeks.reduce((sum, week) => 
      sum + week.days.reduce((daySum, day) => 
        daySum + day.events.reduce((eventSum, event) => {
          if (event.partner === Partner.SARA || 
              (event.timeType === TimeType.COMPARTIDO && event.partner === Partner.AMBAS)) {
            return eventSum + differenceInHours(event.endDate, event.startDate)
          }
          return eventSum
        }, 0), 0), 0)

    return {
      month: date.getMonth(),
      year: date.getFullYear(),
      weeks,
      totalMarisaHours,
      totalSaraHours
    }
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
    getMonthStats
  }
}) 