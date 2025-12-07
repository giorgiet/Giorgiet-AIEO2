"use client"

import { useEffect, useState } from "react"
import type { WizardState } from "./gift-wizard"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Confetti from "./confetti"

interface GiftResultsProps {
  state: WizardState
  onRestart: () => void
}

interface GiftRecommendation {
  id: number
  name: string
  description: string
  price: string
  match: number
  interests: string[]
  image: string
  buyLink?: string
}

// Mock gift recommendations based on profile
const generateRecommendations = (state: WizardState): GiftRecommendation[] => {
  const recommendations: GiftRecommendation[] = [
    {
      id: 1,
      name: "Premium Wireless Headphones",
      description: "High-quality noise-canceling headphones perfect for music lovers and travelers.",
      price: "$120-180",
      match: 95,
      interests: ["Technology", "Music", "Travel"],
      image: "/premium-wireless-headphones-gift.jpg",
      buyLink: "#",
    },
    {
      id: 2,
      name: "Luxury Travel Luggage Set",
      description: "Durable and stylish luggage set with TSA locks, perfect for frequent travelers.",
      price: "$150-250",
      match: 88,
      interests: ["Travel", "Fashion"],
      image: "/luxury-luggage-travel-gift.jpg",
      buyLink: "#",
    },
    {
      id: 3,
      name: "Creative DIY Art Kit",
      description: "Complete art supplies bundle for beginners and experienced artists alike.",
      price: "$45-80",
      match: 92,
      interests: ["Art & Craft", "Creative"],
      image: "/art-craft-diy-kit-gift.jpg",
      buyLink: "#",
    },
    {
      id: 4,
      name: "Smart Fitness Tracker",
      description: "Advanced health tracking device with heart rate monitoring and sleep tracking.",
      price: "$100-200",
      match: 85,
      interests: ["Fitness", "Technology"],
      image: "/fitness-tracker-smartwatch-gift.jpg",
      buyLink: "#",
    },
    {
      id: 5,
      name: "Personalized Photo Book",
      description: "Beautiful custom-made photo book with your favorite memories and moments.",
      price: "$30-60",
      match: 90,
      interests: ["Photography", "Family"],
      image: "/personalized-photo-book-gift.jpg",
      buyLink: "#",
    },
  ]

  return recommendations.slice(0, 5)
}

export default function GiftResults({ state, onRestart }: GiftResultsProps) {
  const recommendations = generateRecommendations(state)
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    // Trigger confetti on mount
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {showConfetti && <Confetti />}
      <div className="w-full max-w-4xl mx-auto slide-up-fade-in">
        {/* Header */}
        <div className="text-center mb-8 scale-pop">
          <h1 className="text-4xl font-bold text-foreground mb-2">🎉 Your Perfect Gifts!</h1>
          <p className="text-muted-foreground">Personalized recommendations based on your answers</p>
        </div>

        {/* Summary */}
        <Card className="p-6 mb-8 border-0 shadow-lg bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 slide-up-fade-in" style={{ animationDelay: "0.1s" }}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm text-muted-foreground mb-1">Recipient</p>
            <p className="font-semibold text-foreground">{state.relationship}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Budget</p>
            <p className="font-semibold text-foreground">{state.budget}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Style</p>
            <p className="font-semibold text-foreground">{state.gift_type}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">Top Interest</p>
            <p className="font-semibold text-foreground">{state.interests[0] || "General"}</p>
          </div>
        </div>
      </Card>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {recommendations.map((gift, index) => (
          <Card
            key={gift.id}
            className="overflow-hidden hover:shadow-xl transition-shadow border-0 slide-up-fade-in"
            style={{ animationDelay: `${0.2 + index * 0.1}s` }}
          >
            {/* Image */}
            <div className="relative h-48 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center overflow-hidden">
              <img
                src={gift.image || "/placeholder.svg"}
                alt={gift.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
              />
              <Badge className="absolute top-3 right-3 bg-gradient-to-r from-primary to-secondary text-white">
                {gift.match}% Match
              </Badge>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-bold text-lg text-foreground mb-2">{gift.name}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{gift.description}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {gift.interests.slice(0, 2).map((interest) => (
                  <Badge key={interest} variant="outline" className="text-xs bg-accent/10 text-accent border-accent/30">
                    {interest}
                  </Badge>
                ))}
              </div>

              {/* Price and Button */}
              <div className="flex items-center justify-between pt-4 border-t border-border">
                <span className="font-bold text-primary">{gift.price}</span>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white"
                  onClick={() => gift.buyLink && window.open(gift.buyLink)}
                >
                  View Details
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <Card className="p-8 text-center border-0 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10 mb-8 slide-up-fade-in" style={{ animationDelay: "0.7s" }}>
        <h2 className="text-2xl font-bold text-foreground mb-2">Love these recommendations?</h2>
        <p className="text-muted-foreground mb-6">Start with a different person to get more unique gift ideas!</p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Button
            onClick={onRestart}
            className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Find Another Gift
          </Button>
          <Button variant="outline" className="px-8 border-2 bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:bg-background/50">
            Share Results
          </Button>
        </div>
      </Card>

      {/* Footer */}
      <p className="text-center text-muted-foreground text-sm slide-up-fade-in" style={{ animationDelay: "0.8s" }}>
        🎄 Happy gift giving! May your Christmas be filled with joy and perfect presents.
      </p>
    </div>
    </>
  )
}
