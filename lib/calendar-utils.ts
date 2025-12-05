/**
 * Calendar utility functions for generating Add to Calendar links
 * Supports Google Calendar, Apple Calendar (ICS), and Outlook
 */

interface CalendarEventData {
  title: string
  description: string
  location: string
  startDate: Date
  endDate: Date
  url?: string
}

/**
 * Format date to Google Calendar format: YYYYMMDDTHHmmssZ
 */
function formatGoogleDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

/**
 * Format date to ICS format: YYYYMMDDTHHmmssZ
 */
function formatICSDate(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '')
}

/**
 * Generate Google Calendar URL
 */
export function generateGoogleCalendarUrl(data: CalendarEventData): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: data.title,
    details: data.description,
    location: data.location,
    dates: `${formatGoogleDate(data.startDate)}/${formatGoogleDate(data.endDate)}`,
  })

  if (data.url) {
    params.set('details', `${data.description}\n\nLink Undangan: ${data.url}`)
  }

  return `https://calendar.google.com/calendar/render?${params.toString()}`
}

/**
 * Generate ICS file content for Apple Calendar and Outlook
 */
export function generateICSFile(data: CalendarEventData): string {
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Wedding Invitation//Calendar//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `DTSTART:${formatICSDate(data.startDate)}`,
    `DTEND:${formatICSDate(data.endDate)}`,
    `DTSTAMP:${formatICSDate(new Date())}`,
    `SUMMARY:${data.title}`,
    `DESCRIPTION:${data.description}${data.url ? `\\n\\nLink Undangan: ${data.url}` : ''}`,
    `LOCATION:${data.location}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-PT24H',
    'DESCRIPTION:Reminder',
    'ACTION:DISPLAY',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n')

  return icsContent
}

/**
 * Download ICS file
 */
export function downloadICSFile(data: CalendarEventData, filename: string = 'wedding-event.ics'): void {
  const icsContent = generateICSFile(data)
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(link.href)
}

/**
 * Generate Outlook.com Calendar URL
 */
export function generateOutlookUrl(data: CalendarEventData): string {
  const params = new URLSearchParams({
    path: '/calendar/action/compose',
    rru: 'addevent',
    subject: data.title,
    body: data.description + (data.url ? `\n\nLink Undangan: ${data.url}` : ''),
    location: data.location,
    startdt: data.startDate.toISOString(),
    enddt: data.endDate.toISOString(),
  })

  return `https://outlook.live.com/calendar/0/deeplink/compose?${params.toString()}`
}

/**
 * Detect user's device/platform
 */
export function detectPlatform(): 'ios' | 'android' | 'mac' | 'windows' | 'other' {
  if (typeof window === 'undefined') return 'other'
  
  const userAgent = window.navigator.userAgent.toLowerCase()
  
  if (/iphone|ipad|ipod/.test(userAgent)) return 'ios'
  if (/android/.test(userAgent)) return 'android'
  if (/macintosh|mac os x/.test(userAgent)) return 'mac'
  if (/windows/.test(userAgent)) return 'windows'
  
  return 'other'
}
