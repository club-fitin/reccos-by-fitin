"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { Share } from "lucide-react"

interface WhatsAppShareButtonProps {
  title: string
  url: string
  message?: string
}

export function WhatsAppShareButton({ 
  title, 
  url, 
  message = "Check out this healthy food recommendation from Reccos by Fitin!" 
}: WhatsAppShareButtonProps) {
  
  const handleShare = () => {
    const text = `${message}\n\n${title}\n${url}`
    const encodedText = encodeURIComponent(text)
    const whatsappUrl = `https://api.whatsapp.com/send?text=${encodedText}`
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer")
  }
  
  return (
    <Button 
      variant="outline"
      onClick={handleShare}
      className="bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700"
    >
      <Share className="mr-2 h-4 w-4" />
      Share
    </Button>
  )
} 