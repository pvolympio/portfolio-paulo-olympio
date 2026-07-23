import { z } from 'zod'

export const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name is too short').max(100, 'Name is too long'),
  email: z.string().trim().email('Invalid email address').max(254, 'Email is too long'),
  message: z.string().trim().min(5, 'Message is too short').max(2000, 'Message is too long'),
  website: z.string().optional() // Honeypot field for anti-spam
})

export type ContactFormData = z.infer<typeof contactSchema>
