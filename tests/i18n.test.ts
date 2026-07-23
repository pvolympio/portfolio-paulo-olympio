import { describe, it, expect } from 'vitest'
import { locales, defaultLocale } from '../src/i18n/config'
import ptMessages from '../src/messages/pt.json'
import enMessages from '../src/messages/en.json'

function getObjectKeysRecursive(obj: Record<string, any>, prefix = ''): string[] {
  return Object.keys(obj).reduce((acc: string[], key: string) => {
    const pre = prefix.length ? `${prefix}.` : ''
    if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
      acc.push(...getObjectKeysRecursive(obj[key], pre + key))
    } else {
      acc.push(pre + key)
    }
    return acc
  }, [])
}

describe('Internationalization (i18n) Configuration & Dictionaries', () => {
  it('should define supported locales as pt and en only', () => {
    expect(locales).toEqual(['pt', 'en'])
  })

  it('should set default locale to pt', () => {
    expect(defaultLocale).toBe('pt')
  })

  it('should have identical key parity between pt.json and en.json', () => {
    const ptKeys = getObjectKeysRecursive(ptMessages).sort()
    const enKeys = getObjectKeysRecursive(enMessages).sort()

    expect(ptKeys).toEqual(enKeys)
  })
})
