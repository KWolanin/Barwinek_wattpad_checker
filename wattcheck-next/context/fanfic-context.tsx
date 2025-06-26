import { Fic } from '@/app/types/types'
import { createContext } from 'react'

export interface FanficContextType {
  fanfic: Fic | null
  setFic: (fic: Fic | null) => void
  abortAll: () => void
  getSignal: () => AbortSignal
}

export const FanficContext = createContext<FanficContextType | null>(null)
