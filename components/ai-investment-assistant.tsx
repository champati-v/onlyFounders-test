"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Brain, ChevronRight, LineChart, Send, Sparkles, TrendingUp } from "lucide-react"

export function AIInvestmentAssistant() {
  const [query, setQuery] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [activeTab, setActiveTab] = useState("insights")

  const handleAnalyze = () => {
    setIsAnalyzing(true)
    // Simulate AI analysis
    setTimeout(() => {
      setIsAnalyzing(false)
    }, 2000)
  }

  return (
  <div className="relative">
    {/* Coming Soon Overlay */}
    <div className="absolute inset-0 bg-black/60 z-30 flex items-center justify-center rounded-lg">
      <span className="text-white text-4xl font-semibold">Coming Soon...</span>
    </div>
    <Card className="bg-[#202C41] border-[#313E54] mx-auto w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-[#635BFF]" />
            <CardTitle className="text-xl text-white">AI Investment Assistant</CardTitle>
          </div>
          <Badge className="bg-[#29305F]">
            <Sparkles className="mr-1 h-3 w-3 text-yellow-400" />
            Premium Feature
          </Badge>
        </div>
        <CardDescription className="text-[#A3A8AF]">
          Get personalized investment insights and recommendations powered by AI
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mx-auto">
            <div className="bg-[#1F2A3D] rounded-lg border border-[#313E54] p-4 hover:border-[#635BFF] transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                <LineChart className="h-5 w-5 text-[#635BFF]" />
                <h3 className="text-white font-medium">Portfolio Analysis</h3>
              </div>
              <p className="text-sm text-[#A3A8AF] mb-3">
                Get AI-powered insights on your current investment portfolio
              </p>
              <Button variant="link" className="p-0 h-auto text-[#635BFF]">
                Analyze Now <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <div className="bg-[#1F2A3D] rounded-lg border border-[#313E54] p-4 hover:border-[#635BFF] transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-5 w-5 text-[#635BFF]" />
                <h3 className="text-white font-medium">Investment Opportunities</h3>
              </div>
              <p className="text-sm text-[#A3A8AF] mb-3">
                Discover new projects that match your investment preferences
              </p>
              <Button variant="link" className="p-0 h-auto text-[#635BFF]">
                Discover <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>

            <div className="bg-[#1F2A3D] rounded-lg border border-[#313E54] p-4 hover:border-[#635BFF] transition-colors cursor-pointer">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-5 w-5 text-[#635BFF]" />
                <h3 className="text-white font-medium">Risk Assessment</h3>
              </div>
              <p className="text-sm text-[#A3A8AF] mb-3">
                Evaluate the risk profile of specific projects or your portfolio
              </p>
              <Button variant="link" className="p-0 h-auto text-[#635BFF]">
                Assess Risk <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>

          <div className="bg-[#1F2A3D] rounded-lg border border-[#313E54] p-4">
            <div className="flex flex-col space-y-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg?height=32&width=32" />
                  <AvatarFallback className="bg-[#29305F]">AI</AvatarFallback>
                </Avatar>
                <div className="bg-[#29305F] rounded-lg p-3 text-white text-sm">
                  <p>
                    Hello John! Based on your investment history, I've noticed you prefer DeFi projects with strong
                    technical teams. Would you like me to recommend some new projects in this space, or would you prefer
                    an analysis of your current portfolio?
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Input
                  placeholder="Ask the AI assistant a question..."
                  className="bg-[#29305F] border-[#313E54] text-white"
                />
                <Button size="icon" className="bg-[#635BFF] hover:bg-[#635BFF]/90">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="border-t border-[#313E54] pt-4">
        <div className="text-xs text-[#A3A8AF] w-full text-center">
          Powered by Optimus AI's advanced machine learning algorithms. Your data is processed securely.
        </div>
      </CardFooter>
    </Card>
  </div>
  )
}

