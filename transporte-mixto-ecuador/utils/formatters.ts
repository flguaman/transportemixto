export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat("es-EC", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount)
}

export const formatDate = (date: string | Date): string => {
  const dateObj = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat("es-EC", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(dateObj)
}

export const formatTime = (time: string): string => {
  const [hours, minutes] = time.split(":")
  return `${hours}:${minutes}`
}

export const formatDuration = (minutes: number): string => {
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) {
    return `${remainingMinutes}min`
  }

  if (remainingMinutes === 0) {
    return `${hours}h`
  }

  return `${hours}h ${remainingMinutes}min`
}

export const formatDistance = (kilometers: number): string => {
  if (kilometers < 1) {
    return `${Math.round(kilometers * 1000)}m`
  }

  return `${kilometers.toFixed(1)}km`
}

export const formatPhoneNumber = (phone: string): string => {
  // Format Ecuadorian phone numbers
  const cleaned = phone.replace(/\D/g, "")

  if (cleaned.startsWith("593")) {
    // International format
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 4)} ${cleaned.slice(4, 8)}-${cleaned.slice(8)}`
  }

  if (cleaned.startsWith("0")) {
    // National format
    return `${cleaned.slice(0, 4)}-${cleaned.slice(4)}`
  }

  return phone
}

export const formatPlateNumber = (plate: string): string => {
  // Format Ecuadorian license plates (ABC-1234)
  const cleaned = plate.replace(/[^A-Z0-9]/g, "")

  if (cleaned.length === 7) {
    return `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`
  }

  return plate
}

export const formatPercentage = (value: number, decimals = 1): string => {
  return `${value.toFixed(decimals)}%`
}

export const formatRating = (rating: number): string => {
  return rating.toFixed(1)
}

export const getTimeAgo = (date: string | Date): string => {
  const now = new Date()
  const past = typeof date === "string" ? new Date(date) : date
  const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return "Hace menos de 1 minuto"
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `Hace ${diffInMinutes} minuto${diffInMinutes > 1 ? "s" : ""}`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `Hace ${diffInHours} hora${diffInHours > 1 ? "s" : ""}`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  return `Hace ${diffInDays} día${diffInDays > 1 ? "s" : ""}`
}
