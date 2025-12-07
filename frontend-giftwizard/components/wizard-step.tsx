"use client"

import type { WizardState } from "./gift-wizard"

export interface StepConfig {
  title: string
  description: string
  key: string
  options?: string[]
  questions?: {
    key: string
    label: string
    options: string[]
  }[]
  type: "radio" | "checkbox" | "multi"
}

interface WizardStepProps {
  step: StepConfig
  state: WizardState
  setState: (state: WizardState) => void
}

export default function WizardStep({ step, state, setState }: WizardStepProps) {
  const handleRadio = (value: string) => {
    setState({
      ...state,
      [step.key]: value,
    })
  }

  const handleCheckbox = (value: string) => {
    const current = state.interests || []
    const updated = current.includes(value) ? current.filter((item) => item !== value) : [...current, value]
    setState({
      ...state,
      interests: updated,
    })
  }

  const handleMultiQuestion = (questionKey: string, value: string) => {
    setState({
      ...state,
      [questionKey]: value,
    })
  }

  if (step.type === "radio") {
    return (
      <div className="space-y-3">
        {step.options?.map((option) => (
          <label
            key={option}
            className="flex items-center p-4 border-2 border-border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300 hover:scale-105 hover:shadow-md"
            style={{
              borderColor: state[step.key as keyof WizardState] === option ? "var(--primary)" : undefined,
              backgroundColor: state[step.key as keyof WizardState] === option ? "rgba(215, 38, 61, 0.05)" : undefined,
            }}
          >
            <input
              type="radio"
              name={step.key}
              value={option}
              checked={state[step.key as keyof WizardState] === option}
              onChange={(e) => handleRadio(e.target.value)}
              className="w-5 h-5 accent-primary cursor-pointer"
            />
            <span className="ml-3 font-medium text-foreground">{option}</span>
          </label>
        ))}
      </div>
    )
  }

  if (step.type === "checkbox") {
    return (
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
        {step.options?.map((option) => (
          <label
            key={option}
            className="flex items-center p-3 border-2 border-border rounded-lg cursor-pointer hover:border-accent hover:bg-accent/5 transition-all duration-300 hover:scale-105 hover:shadow-md"
            style={{
              borderColor: state.interests.includes(option) ? "var(--accent)" : undefined,
              backgroundColor: state.interests.includes(option) ? "rgba(27, 153, 139, 0.05)" : undefined,
            }}
          >
            <input
              type="checkbox"
              value={option}
              checked={state.interests.includes(option)}
              onChange={(e) => handleCheckbox(e.target.value)}
              className="w-4 h-4 accent-accent cursor-pointer"
            />
            <span className="ml-2 font-medium text-sm text-foreground">{option}</span>
          </label>
        ))}
      </div>
    )
  }

  // Multi-question step
  return (
    <div className="space-y-6">
      {step.questions?.map((question) => (
        <div key={question.key}>
          <h3 className="font-semibold text-foreground mb-3">{question.label}</h3>
          <div className="space-y-2">
            {question.options.map((option) => (
              <label
                key={option}
                className="flex items-center p-3 border-2 border-border rounded-lg cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300 hover:scale-105 hover:shadow-md"
                style={{
                  borderColor: state[question.key as keyof WizardState] === option ? "var(--primary)" : undefined,
                  backgroundColor:
                    state[question.key as keyof WizardState] === option ? "rgba(215, 38, 61, 0.05)" : undefined,
                }}
              >
                <input
                  type="radio"
                  name={question.key}
                  value={option}
                  checked={state[question.key as keyof WizardState] === option}
                  onChange={(e) => handleMultiQuestion(question.key, e.target.value)}
                  className="w-4 h-4 accent-primary cursor-pointer"
                />
                <span className="ml-3 font-medium text-foreground">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
