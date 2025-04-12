"use client"

import * as React from "react"
import { ToastProps } from "@/components/ui/toast"

type ToastActionElement = React.ReactElement<any>

interface Toast extends ToastProps {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: ToastActionElement
}

interface ToastContextType {
  toasts: Toast[]
  toast: (props: Omit<Toast, "id">) => { id: string }
  dismiss: (id: string) => void
}

const ToastContext = React.createContext<ToastContextType>({
  toasts: [],
  toast: () => ({ id: '' }),
  dismiss: () => {}
})

export function useToast(): ToastContextType {
  return React.useContext(ToastContext)
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = React.useState<Toast[]>([])

  const toast = React.useCallback((props: Omit<Toast, "id">) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prev) => [...prev, { ...props, id }])
    return { id }
  }, [])

  const dismiss = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
    </ToastContext.Provider>
  )
} 