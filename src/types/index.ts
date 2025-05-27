export interface TimeEvent {
  id: string
  title: string
  notes: string
  startDate: Date
  endDate: Date
  category: EventCategory
  timeType: TimeType
  partner: Partner
}

export enum EventCategory {
  DORMIR = 'TIEMPO DORMIR',
  LABORAL = 'TIEMPO LABORAL', 
  GYM = 'TIEMPO GYM',
  EFICAZ = 'TIEMPO EFICAZ'
}

export enum TimeType {
  INDIVIDUAL = 'TIEMPO INDIVIDUAL',
  COMPARTIDO = 'TIEMPO COMPARTIDO'
}

export enum Partner {
  MARISA = 'Marisa',
  SARA = 'Sara',
  AMBAS = 'Ambas'
}

export enum ViewMode {
  DAY = 'day',
  WEEK = 'week', 
  MONTH = 'month'
}

export interface DayStats {
  date: Date
  marisaPercentage: number
  saraPercentage: number
  marisaHours: number // Solo horas de TIEMPO EFICAZ
  saraHours: number   // Solo horas de TIEMPO EFICAZ
  totalHours: number  // Todas las horas de todas las categorías
  events: TimeEvent[]
  categoryBreakdown: {
    [key in EventCategory]: number
  }
}

export interface WeekStats {
  weekStart: Date
  weekEnd: Date
  days: DayStats[]
  totalMarisaPercentage: number
  totalSaraPercentage: number
  totalMarisaHours: number // Solo horas de TIEMPO EFICAZ
  totalSaraHours: number   // Solo horas de TIEMPO EFICAZ
  totalHours: number       // Todas las horas de todas las categorías
}

export interface MonthStats {
  month: number
  year: number
  weeks: WeekStats[]
  totalMarisaHours: number // Solo horas de TIEMPO EFICAZ
  totalSaraHours: number   // Solo horas de TIEMPO EFICAZ
  totalHours: number       // Todas las horas de todas las categorías
  allMarisaHours: number   // Todas las horas de Marisa (para porcentajes)
  allSaraHours: number     // Todas las horas de Sara (para porcentajes)
} 