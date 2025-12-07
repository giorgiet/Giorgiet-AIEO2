"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import WizardStep from "./wizard-step"
import GiftResults from "./gift-results"

export interface WizardState {
  relationship: string
  age: string
  gender: string
  personality: string
  interests: string[]
  budget: string
  gift_type: string
  surprise_level: string
  practicality: string
}

const initialState: WizardState = {
  relationship: "",
  age: "",
  gender: "",
  personality: "",
  interests: [],
  budget: "",
  gift_type: "",
  surprise_level: "",
  practicality: "",
}

function FallingGifts() {
  const gifts = ["🎁", "🎀", "🎉", "✨"]
  const giftElements = Array.from({ length: 9 }, (_, i) => ({
    id: i,
    emoji: gifts[i % gifts.length],
  }))

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {giftElements.map((gift) => (
        <div key={gift.id} className={`falling-gift gift-${gift.id + 1}`}>
          {gift.emoji}
        </div>
      ))}
    </div>
  )
}

export default function GiftWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [state, setState] = useState<WizardState>(initialState)
  const [showResults, setShowResults] = useState(false)

  const steps = [
    {
      title: "Who are you buying for?",
      description: "Select the relationship with the recipient",
      key: "relationship",
      options: ["Partner", "Friend", "Family Member", "Coworker", "Parent", "Sibling"],
      type: "radio",
    },
    {
      title: "Tell us about them",
      description: "Age, gender, and personality type",
      key: "age",
      questions: [
        {
          key: "age",
          label: "Age Range",
          options: ["Teen (13-19)", "Young Adult (20-29)", "Adult (30-44)", "Mature (45-60)", "Senior (60+)"],
        },
        {
          key: "gender",
          label: "Gender",
          options: ["Male", "Female"], // Updated gender options
        },
        {
          key: "personality",
          label: "Personality Type",
          options: ["Adventurous", "Practical", "Creative", "Social", "Intellectual"],
        },
      ],
      type: "multi",
    },
    {
      title: "What are their interests?",
      description: "Select all that apply",
      key: "interests",
      options: [
        "Technology",
        "Sports",
        "Travel",
        "Fashion",
        "Reading",
        "Home & Garden",
        "Gaming",
        "Music",
        "Cooking",
        "Art & Craft",
        "Fitness",
        "Photography",
      ],
      type: "checkbox",
    },
    {
      title: "What's your budget?",
      description: "Choose a budget range",
      key: "budget",
      options: ["Under $25", "$25-50", "$50-100", "$100-200", "Over $200"],
      type: "radio",
    },
    {
      title: "Final preferences",
      description: "Help us refine your recommendations",
      key: "gift_type",
      questions: [
        {
          key: "gift_type",
          label: "Experience or Physical Gift?",
          options: ["Physical Gift", "Experience", "Either"],
        },
        {
          key: "surprise_level",
          label: "How surprising should it be?",
          options: ["Practical & Expected", "Somewhat Surprising", "Very Surprising"],
        },
        {
          key: "practicality",
          label: "Practicality vs Fun?",
          options: ["Practical", "Balanced", "Fun & Unique"],
        },
      ],
      type: "multi",
    },
  ]

  const progressPercentage = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setShowResults(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  const isStepComplete = () => {
    const step = steps[currentStep]
    if (step.type === "radio" || step.type === "checkbox") {
      if (step.key === "interests") {
        return state.interests.length > 0
      }
      return state[step.key as keyof WizardState] !== ""
    }
    return true
  }

  if (showResults) {
    return (
      <GiftResults
        state={state}
        onRestart={() => {
          setCurrentStep(0)
          setState(initialState)
          setShowResults(false)
        }}
      />
    )
  }

  return (
    <>
      <FallingGifts />
      <div className="w-full max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-3">
            🎁 GiftWizard
          </h1>
          <p className="text-muted-foreground text-lg">Find the perfect Christmas gift in just 5 steps</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm font-semibold text-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              {Math.round(progressPercentage)}%
            </Badge>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Card */}
        <Card className="p-8 shadow-xl border-0">
          {/* Step Content */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-2">{steps[currentStep].title}</h2>
            <p className="text-muted-foreground mb-6">{steps[currentStep].description}</p>

            <WizardStep step={steps[currentStep]} state={state} setState={setState} />
          </div>

          {/* Buttons */}
          <div className="flex gap-4 justify-between pt-6 border-t border-border">
            <Button variant="outline" onClick={handleBack} disabled={currentStep === 0} className="px-8 bg-transparent">
              Back
            </Button>
            <Button
              onClick={handleNext}
              disabled={!isStepComplete()}
              className="px-8 bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
            >
              {currentStep === steps.length - 1 ? "Get Recommendations" : "Next"}
            </Button>
          </div>
        </Card>

        {/* Footer */}
        <p className="text-center text-muted-foreground text-sm mt-6">
          ✨ Your personalized gift recommendations await!
        </p>
      </div>
    </>
  )
}
