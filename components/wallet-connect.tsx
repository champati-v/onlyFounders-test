"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Wallet, ChevronDown } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function WalletConnect() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [selectedWallet, setSelectedWallet] = useState("")

  const wallets = [
    {
      name: "MetaMask",
      icon: "/placeholder.svg?height=40&width=40",
      popular: true,
    },
    {
      name: "Coinbase Wallet",
      icon: "/placeholder.svg?height=40&width=40",
      popular: true,
    },
    {
      name: "WalletConnect",
      icon: "/placeholder.svg?height=40&width=40",
      popular: false,
    },
    {
      name: "Phantom",
      icon: "/placeholder.svg?height=40&width=40",
      popular: false,
    },
  ]

  const connectWallet = (walletName: string) => {
    setSelectedWallet(walletName)
    // Mock wallet connection
    setTimeout(() => {
      const mockAddress = "0x" + Math.random().toString(16).slice(2, 12) + "..."
      setWalletAddress(mockAddress)
      setIsConnected(true)
    }, 1000)
  }

  const disconnectWallet = () => {
    setIsConnected(false)
    setWalletAddress("")
    setSelectedWallet("")
  }
  console.log("wallet connected status",isConnected);
  if (isConnected) {
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="border-gray-700 text-white">
            <Wallet className="mr-2 h-4 w-4 text-blue-400" />
            {walletAddress}
            <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-gray-900 border-gray-800 text-white z-50">
          <DialogHeader>
            <DialogTitle>Connected Wallet</DialogTitle>
            <DialogDescription className="text-gray-400">You are connected with {selectedWallet}</DialogDescription>
          </DialogHeader>
          <div className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center mr-3">
                <Wallet className="h-5 w-5 text-blue-400" />
              </div>
              <div>
                <div className="font-medium">{walletAddress}</div>
                <div className="text-sm text-gray-400">Connected to Ethereum</div>
              </div>
            </div>
            <Badge className="bg-green-600">Connected</Badge>
          </div>
          <div className="flex justify-between mt-4">
            <Button variant="outline" className="border-gray-700 text-white">
              View on Explorer
            </Button>
            <Button variant="destructive" onClick={disconnectWallet}>
              Disconnect
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gray-800 hover:bg-gray-700 text-white">
          <Wallet className="mr-2 h-4 w-4" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-800 text-white z-50">
        <DialogHeader>
          <DialogTitle>Connect Wallet</DialogTitle>
          <DialogDescription className="text-gray-400">
            Connect your wallet to access all features of Optimus AI
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {wallets.map((wallet) => (
            <Button
              key={wallet.name}
              variant="outline"
              className="flex justify-between items-center h-14 px-4 border-gray-700 hover:border-blue-600 hover:bg-gray-800"
              onClick={() => connectWallet(wallet.name)}
            >
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden mr-3">
                  <Image src={wallet.icon || "/placeholder.svg"} alt={wallet.name} width={32} height={32} />
                </div>
                <span>{wallet.name}</span>
                {wallet.popular && <Badge className="ml-2 bg-blue-900/30 text-blue-400 border-blue-800">Popular</Badge>}
              </div>
              <ChevronDown className="h-4 w-4 text-gray-400" />
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

