interface PasswordStrengthProps {
  password: string
}

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const getStrength = () => {
    let strength = 0
    
    if (password.length >= 8) strength++
    if (password.length >= 12) strength++
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++
    if (/\d/.test(password)) strength++
    if (/[!@#$%^&*]/.test(password)) strength++

    return strength
  }

  const strength = getStrength()
  const percentage = (strength / 5) * 100

  const getColor = () => {
    if (strength <= 2) return 'bg-red-500'
    if (strength <= 3) return 'bg-yellow-500'
    return 'bg-green-500'
  }

  const getLabel = () => {
    if (strength <= 2) return 'Weak'
    if (strength <= 3) return 'Medium'
    return 'Strong'
  }

  return (
    <div className="space-y-1">
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${getColor()}`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-muted-foreground">
        Password strength: <span className="font-medium">{getLabel()}</span>
      </p>
    </div>
  )
}
