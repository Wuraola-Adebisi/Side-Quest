import { useEffect, useState } from 'react'

export type View = 'home' | 'discover' | 'journal' | 'saved' | 'about' | 'terms' | 'privacy' | 'contact' | 'notfound'
export const views: View[] = ['home', 'discover', 'journal', 'saved', 'about', 'terms', 'privacy', 'contact']
export const CONTACT_EMAIL = 'hello@sidequest.app'

export function usePersisted(key: string) {
  const [v, setV] = useState<number[]>(() => { try { return JSON.parse(localStorage.getItem(key) || '[]') } catch { return [] } })
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)) } catch { /* storage unavailable */ } }, [key, v])
  return [v, setV] as const
}

export function useStored<T>(key: string, init: T) {
  const [v, setV] = useState<T>(() => { try { const r = localStorage.getItem(key); return r ? (JSON.parse(r) as T) : init } catch { return init } })
  useEffect(() => { try { localStorage.setItem(key, JSON.stringify(v)) } catch { /* storage unavailable */ } }, [key, v])
  return [v, setV] as const
}
