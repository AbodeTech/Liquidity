import { Check } from 'lucide-react'

interface FormProgressProps {
  steps: string[]
  currentStep: number
}

export function FormProgress({ steps, currentStep }: FormProgressProps) {
  return (
    <div className="space-y-3">
      {/* Progress Bar */}
      <div className="relative">
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-muted" />
        <div 
          className="absolute top-5 left-0 h-0.5 bg-primary transition-all duration-300"
          style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
        />
        
        {/* Step Indicators */}
        <div className="relative flex justify-between">
          {steps.map((step, index) => {
            const stepNumber = index + 1
            const isCompleted = stepNumber < currentStep
            const isCurrent = stepNumber === currentStep
            
            return (
              <div key={step} className="flex flex-col items-start">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-colors ${
                    isCompleted 
                      ? 'bg-primary text-primary-foreground' 
                      : isCurrent 
                      ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : stepNumber}
                </div>
                <span className={`mt-2 text-xs font-medium text-center max-w-[80px] ${
                  isCurrent ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
