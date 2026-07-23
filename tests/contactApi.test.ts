import { describe, it, expect, vi, beforeEach } from 'vitest'
import { contactSchema } from '../src/data/contactSchema'
import { POST } from '../src/app/api/contact/route'

describe('Contact API & Validation Schema', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv }
  })

  it('should validate valid contact payload using schema', () => {
    const validData = {
      name: 'João Silva',
      email: 'joao@example.com',
      message: 'Olá, gostaria de falar sobre um projeto.'
    }
    const result = contactSchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('should reject invalid email in schema', () => {
    const invalidEmail = {
      name: 'João Silva',
      email: 'not-an-email',
      message: 'Mensagem válida de teste.'
    }
    const result = contactSchema.safeParse(invalidEmail)
    expect(result.success).toBe(false)
  })

  it('should detect honeypot field', () => {
    const honeypotData = {
      name: 'Bot User',
      email: 'bot@example.com',
      message: 'Mensagem de teste',
      website: 'http://spam-link.com'
    }
    const result = contactSchema.safeParse(honeypotData)
    expect(result.success).toBe(true)
    expect(result.data?.website).toBe('http://spam-link.com')
  })

  it('should return HTTP 503 when Resend environment variables are missing', async () => {
    delete process.env.RESEND_API_KEY
    delete process.env.RESEND_FROM_EMAIL
    delete process.env.CONTACT_DEST_EMAIL

    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Maria Santos',
        email: 'maria@example.com',
        message: 'Mensagem de teste para API 503'
      })
    })

    const res = await POST(req)
    expect(res.status).toBe(503)

    const json = await res.json()
    expect(json).toHaveProperty('error', 'service_unavailable')
    expect(json).not.toHaveProperty('success', true)
  })

  it('should reject malformed JSON with HTTP 400', async () => {
    const req = new Request('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: 'invalid-json{'
    })

    const res = await POST(req)
    expect(res.status).toBe(400)
  })
})
