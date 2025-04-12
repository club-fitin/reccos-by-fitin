"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

interface ToastProps {
  id?: string
  className?: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  variant?: "default" | "destructive"
  open?: boolean
  onOpenChange?: (open: boolean) => void
  children?: React.ReactNode
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}

export const ToastViewport: React.FC<{ className?: string }> = ({ className }) => {
  return <div className={cn("fixed bottom-0 right-0 z-50 p-4 md:max-w-[420px]", className)} />
}

export const Toast: React.FC<ToastProps> = ({ 
  className, 
  title, 
  description, 
  children,
  ...props 
}) => {
  return (
    <div
      className={cn(
        "bg-white border rounded-md shadow-lg p-4", 
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export const ToastTitle: React.FC<{ className?: string, children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  return <div className={cn("font-medium", className)}>{children}</div>
}

export const ToastDescription: React.FC<{ className?: string, children: React.ReactNode }> = ({ 
  className, 
  children 
}) => {
  return <div className={cn("text-sm text-gray-500", className)}>{children}</div>
}

export const ToastClose: React.FC<{ className?: string, onClick?: () => void }> = ({ 
  className, 
  onClick 
}) => {
  return (
    <button 
      className={cn("absolute top-2 right-2 text-gray-400 hover:text-gray-600", className)}
      onClick={onClick}
    >
      ×
    </button>
  )
}

export const ToastAction: React.FC<{ className?: string, children: React.ReactNode, onClick?: () => void }> = ({ 
  className, 
  children,
  onClick 
}) => {
  return (
    <button 
      className={cn("px-3 py-1 text-sm border rounded-md bg-transparent", className)}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export type { ToastProps }
export type ToastActionElement = React.ReactElement<typeof ToastAction> 