'use client'

import { useRef, useEffect } from 'react'
import { Input } from '@/components/ui/input'

interface OTPInputProps {
  value: string
  onChange: (value: string) => void
  disabled?: boolean
}

export function OTPInput({ value, onChange, disabled }: OTPInputProps) {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    // Auto-focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus()
    }
  }, [])

  const handleChange = (index: number, digit: string) => {
    // Only allow numbers
    if (digit && !/^\d$/.test(digit)) return

    const newValue = value.split('')
    newValue[index] = digit
    const updatedValue = newValue.join('').slice(0, 6)
    onChange(updatedValue)

    // Auto-advance to next input
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !value[index] && index > 0) {
      // Move to previous input on backspace if current is empty
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault()
    const pastedData = e.clipboardData.getData('text').slice(0, 6).replace(/\D/g, '')
    onChange(pastedData)

    // Focus the next empty input or last input
    const nextIndex = Math.min(pastedData.length, 5)
    inputRefs.current[nextIndex]?.focus()
  }

  return (
    <div className="flex gap-2 justify-center">
      {[0, 1, 2, 3, 4, 5].map((index) => (
        <Input
          key={index}
          ref={(el) => { if (el) inputRefs.current[index] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[index] || ''}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className="w-12 h-12 text-center text-lg font-semibold"
          aria-label={`Digit ${index + 1}`}
        />
      ))}
    </div>
  )
}
