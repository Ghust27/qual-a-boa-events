import { DateTime } from 'luxon'

export interface CreateEventDTO {
  name: string
  description?: string
  location: string
  eventDate: DateTime
  maxCapacity: number
  organizerId: number
}