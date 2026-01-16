export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  // Ecuadorian phone number validation
  const phoneRegex = /^(\+593|0)[0-9]{9}$/
  return phoneRegex.test(phone.replace(/\s|-/g, ""))
}

export const validateCedula = (cedula: string): boolean => {
  // Ecuadorian cedula validation
  if (cedula.length !== 10) return false

  const digits = cedula.split("").map(Number)
  const province = Number.parseInt(cedula.substring(0, 2))

  if (province < 1 || province > 24) return false

  const thirdDigit = digits[2]
  if (thirdDigit > 6) return false

  // Validation algorithm
  const coefficients = [2, 1, 2, 1, 2, 1, 2, 1, 2]
  let sum = 0

  for (let i = 0; i < 9; i++) {
    let product = digits[i] * coefficients[i]
    if (product > 9) product -= 9
    sum += product
  }

  const checkDigit = sum % 10 === 0 ? 0 : 10 - (sum % 10)
  return checkDigit === digits[9]
}

export const validateLicenseNumber = (license: string): boolean => {
  // Ecuadorian license number validation (simplified)
  const licenseRegex = /^EC[0-9]{9}$/
  return licenseRegex.test(license)
}

export const validatePlateNumber = (plate: string): boolean => {
  // Ecuadorian license plate validation
  const plateRegex = /^[A-Z]{3}-[0-9]{4}$/
  return plateRegex.test(plate)
}

export const validatePassword = (
  password: string,
): {
  isValid: boolean
  errors: string[]
} => {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push("La contraseña debe tener al menos 8 caracteres")
  }

  if (!/[A-Z]/.test(password)) {
    errors.push("La contraseña debe contener al menos una letra mayúscula")
  }

  if (!/[a-z]/.test(password)) {
    errors.push("La contraseña debe contener al menos una letra minúscula")
  }

  if (!/[0-9]/.test(password)) {
    errors.push("La contraseña debe contener al menos un número")
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

export const validateRequired = (value: string, fieldName: string): string | null => {
  if (!value || value.trim() === "") {
    return `${fieldName} es requerido`
  }
  return null
}

export const validateMinLength = (value: string, minLength: number, fieldName: string): string | null => {
  if (value.length < minLength) {
    return `${fieldName} debe tener al menos ${minLength} caracteres`
  }
  return null
}

export const validateMaxLength = (value: string, maxLength: number, fieldName: string): string | null => {
  if (value.length > maxLength) {
    return `${fieldName} no puede tener más de ${maxLength} caracteres`
  }
  return null
}
