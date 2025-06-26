export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result)
      } else {
        reject(new Error("Failed to convert file to base64"))
      }
    }
    reader.onerror = (error) => reject(error)
  })
}

export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif"]

  if (file.size > maxSize) {
    return { isValid: false, error: "File size must be less than 5MB" }
  }

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: "Only PNG, JPG, and GIF files are allowed" }
  }

  return { isValid: true }
}
