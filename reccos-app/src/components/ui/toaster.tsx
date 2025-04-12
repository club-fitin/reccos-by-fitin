"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export function Toaster() {
  const { toasts, dismiss } = useToast()

  return (
    <>
      {toasts.map(({ id, title, description, ...props }) => (
        <div key={id} className="fixed bottom-4 right-4 z-50">
          <Toast {...props}>
            {title && <ToastTitle>{title}</ToastTitle>}
            {description && <ToastDescription>{description}</ToastDescription>}
            <ToastClose onClick={() => dismiss(id)} />
          </Toast>
        </div>
      ))}
    </>
  )
} 