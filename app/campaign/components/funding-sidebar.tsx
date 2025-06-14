"use client"

declare global {
  interface Window {
    solana?: any;
  }
}
import { API_URL } from "@/lib/config"
import { useEffect, useState } from "react"
import { ArrowLeft, Bookmark, Check, Info, MessageSquare, Pencil, Share2, ShieldCheck, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useUser } from "@auth0/nextjs-auth0/client"
import { useAccount } from "wagmi"
import { useToast } from "@/hooks/use-toast"
import { ethers } from "ethers"
import { FaSpinner } from "react-icons/fa6"
import * as solanaWeb3 from "@solana/web3.js";

import axios from "axios"


interface FundingSidebarProps {
  campaign: any // Using any for now as the full type is defined in the parent component
}



const usdcAbi = [
  {
    "constant": false,
    "inputs": [
      { "name": "spender", "type": "address" },
      { "name": "amount", "type": "uint256" }
    ],
    "name": "approve",
    "outputs": [{ "name": "", "type": "bool" }],
    "type": "function",
    "stateMutability": "nonpayable"
  },
  {
    "constant": false,
    "inputs": [
      { "name": "sender", "type": "address" },
      { "name": "recipient", "type": "address" },
      { "name": "amount", "type": "uint256" }
    ],
    "name": "transferFrom",
    "outputs": [{ "name": "", "type": "bool" }],
    "type": "function",
    "stateMutability": "nonpayable"
  }
];


const InvestorUSDCDepositABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_usdcAddress",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_multisigWallet",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "investor",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Deposited",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "MINIMUM_DEPOSIT",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "admin",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "deposits",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "investor",
        "type": "address"
      }
    ],
    "name": "getDeposit",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "multisigWallet",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "usdc",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

const CHAIN_CONFIG = {
  ethereum: {
    chainId: "0x1",
    chainName: "Ethereum Mainnet",
    rpcUrl: " https://lb.drpc.org/ogrpc?network=ethereum&dkey=Akl6MPCcvUmBvWxagjIuK2XnKhPlMLwR8I6PzoXPVSjK",
    contractAddress: "0x0a69744B3f791A33c37521ec68149828bc2c0ca5",
    usdcAddress: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrl: "https://etherscan.io",
  },

  arbitrum: {
    chainId: "0xa4b1",
    chainName: "Arbitrum One",
    rpcUrl: "https://lb.drpc.org/ogrpc?network=arbitrum&dkey=Akl6MPCcvUmBvWxagjIuK2WpTHZ7Qf0R8JrnxpZiEquA",
    contractAddress: "0xB331aD2D32eE92B4BC063786B9c2406D7D4992AA",
    usdcAddress: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    nativeCurrency: {
      name: "Ether",
      symbol: "ETH",
      decimals: 18,
    },
    blockExplorerUrl: "https://arbiscan.io",
  },

  // Solana is handled separately, no need to include here for EVM logic
};



const CONTRACT_ADDRESS = '0x0a69744B3f791A33c37521ec68149828bc2c0ca5';
const USDC_ADDRESS = '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48'; // Must match constructor param


export function FundingSidebar({ campaign }: FundingSidebarProps) {
  const [copied, setCopied] = useState(false)
  const [investModalOpen, setInvestModalOpen] = useState(false)
  const [amount, setAmount] = useState("")
  const [agreedToTerms, setAgreedToTerms] = useState(true)
  const { user, isLoading } = useUser()
  const [onboardingStatus, setOnboardingStatus] = useState<boolean>(false)  // Check if user is the owner of the campaign
  const { address, isConnected } = useAccount();
  const isOwner = campaign.isOwner || false
  const { toast } = useToast()
  const [status, setStatus] = useState("")
  const [depositing, setDepositing] = useState(false)
  const [selectedChain, setSelectedChain] = useState("ethereum");

  const user_id = user?.sub?.substring(14) || ""

  useEffect(() => {
    const getOnboardingStatus = async () => {
      try {
        if (!user || isLoading) return;
        const userID = user.sub?.substring(14);

        const response = await fetch(
          `${API_URL}/api/profile/get-onboarding-status`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              user_id: userID || "",
            },
          }
        );

        const data = await response.json();
        setOnboardingStatus(data.status);
      } catch (error) {
        console.error("Error checking profile status:", error);
      }
    };

    getOnboardingStatus();
  }, [])


  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(amount)
  }

  // Calculate days remaining until deadline
  const calculateDaysRemaining = () => {
    const deadline = new Date(campaign.deadline)
    const today = new Date()
    const diffTime = deadline.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
  }

  // Calculate funding progress percentage
  const progressPercentage = (campaign.totalRaisedOnPlatform / campaign.fundingTarget) * 100
  const daysRemaining = calculateDaysRemaining()

  // Handle share functionality
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: campaign.campaignName,
          text: campaign.tagline,
          url: window.location.href,
        })
        .catch((err) => console.error("Error sharing:", err))
    } else {
      navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleInvest = () => {
    if (!user) {
      toast({
        title: "Login and Complete Profile",
        description: " To invest, please log in and finish setting up your profile (just takes 2 mins).",
      })
      return
    }
    else if (!onboardingStatus) {
      toast({
        title: "Complete Onboarding",
        description: "Please complete your onboarding before investing.",
        variant: "destructive",
      })
      return
    }
    else if (!isConnected) {
      toast({
        title: "Connect Wallet",
        description: "Please connect your wallet to invest in this campaign.",
        variant: "destructive",
      })
      return
    }
    else {
      setInvestModalOpen(true)
    }
  }


  const ETHEREUM_MAINNET_CHAIN_ID = '0x1'; // Hexadecimal for chainId 1
 const handleDeposit = async () => {
  // if (selectedChain === "solana") {
  //   return handleSolanaDeposit(); // Solana handled separately
  // }

  const chainConfig = CHAIN_CONFIG[selectedChain as keyof typeof CHAIN_CONFIG];
  if (!chainConfig) {
    toast({
      title: "❌ Unsupported Chain",
      description: `${selectedChain} is not supported`,
      variant: "destructive",
    });
    return;
  }

  const {
    chainId,
    chainName,
    rpcUrl,
    nativeCurrency,
    blockExplorerUrl,
    contractAddress,
    usdcAddress,
  } = chainConfig;

  try {
    if (!window.ethereum) {
      alert("MetaMask not found");
      return;
    }

    let currentChainId = await window.ethereum.request({ method: "eth_chainId" });

    // Switch chain if not already on it
    if (currentChainId !== chainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId }],
        });
      } catch (switchError: any) {
        // If chain not found, add it
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId,
                  chainName,
                  rpcUrls: [rpcUrl],
                  nativeCurrency,
                   blockExplorerUrls: blockExplorerUrl ? [blockExplorerUrl] : [],
                },
              ],
            });

            // Try switching again
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId }],
            });
          } catch (addError) {
            console.error("Add chain failed", addError);
            toast({
              title: "⚠️ Add Network Failed",
              description: `Please try manually adding ${selectedChain} in MetaMask.`,
              variant: "destructive",
            });
            return;
          }
        } else {
          console.error("Switch error", switchError);
          toast({
            title: "⚠️ Network Switch Failed",
            description: `Could not switch to ${selectedChain}`,
            variant: "destructive",
          });
          return;
        }
      }

      // Confirm switch successful
      currentChainId = await window.ethereum.request({ method: "eth_chainId" });
      if (currentChainId !== chainId) {
        toast({
          title: "⚠️ Wrong Network",
          description: `Please switch to ${selectedChain} in your wallet`,
          variant: "destructive",
        });
        return;
      }
    }

    // Proceed with USDC deposit
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, InvestorUSDCDepositABI, signer);
    const usdc = new ethers.Contract(usdcAddress, usdcAbi, signer);
    const parsedAmount = ethers.parseUnits(amount, 6);

    if (parsedAmount < ethers.parseUnits("5", 6)) {
      toast({
        title: "❌ Minimum Investment",
        description: "Minimum of 5 USDC required",
        variant: "destructive",
      });
      return;
    }

    setDepositing(true);
    setStatus("Approving USDC...");

    const approveTx = await usdc.approve(contractAddress, parsedAmount);
    await approveTx.wait();

    setStatus("Depositing...");

    const tx = await contract.deposit(parsedAmount);
    await tx.wait();

    setStatus("Recording investment...");

    const response = await axios.post(
      `${API_URL}/api/startup/add-investment`,
      {
        campaign_id: campaign._id,
        amount: parseFloat(amount),
        walletAddress: address,
        chain:selectedChain,
      },
      {
        headers: { user_id },
      }
    );

    if (response.status !== 200) {
      toast({
        title: "❌ Failed to record investment",
        description: response.data.message || "",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "✅ Investment Successful",
      description: `You have successfully invested ${amount} USDC on ${selectedChain}`,
    });

    setStatus("Success");
  } catch (err) {
    console.error("Deposit error:", err);
    toast({
      title: "❌ Error",
      description: "Something went wrong during the transaction",
      variant: "destructive",
    });
    setStatus("Error");
  } finally {
    setDepositing(false);
    setAmount("");
    setInvestModalOpen(false);
  }
};





  // const handleSolanaDeposit = async () => {
  //   try {
  //     const provider = window.solana;
  //     if (!provider || !provider.isPhantom) {
  //       alert("Please install Phantom Wallet");
  //       return;
  //     }

  //     const connection = new solanaWeb3.Connection(solanaWeb3.clusterApiUrl("mainnet-beta"));
  //     const fromPubkey = provider.publicKey;
  //     const toPubkey = new solanaWeb3.PublicKey(SOLANA_PROGRAM_ADDRESS);

  //     const lamports = parseFloat(amount) * 1_000_000; // USDC has 6 decimals
  //     const transaction = new solanaWeb3.Transaction().add(
  //       solanaWeb3.SystemProgram.transfer({
  //         fromPubkey,
  //         toPubkey,
  //         lamports,
  //       })
  //     );

  //     const { blockhash } = await connection.getRecentBlockhash();
  //     transaction.recentBlockhash = blockhash;
  //     transaction.feePayer = fromPubkey;

  //     const signed = await provider.signTransaction(transaction);
  //     const txid = await connection.sendRawTransaction(signed.serialize());
  //     await connection.confirmTransaction(txid);

  //     await axios.post("https://ofStaging.azurewebsites.net/api/startup/add-investment", {
  //       campaign_id: campaign._id,
  //       amount: parseFloat(amount),
  //       walletAddress: fromPubkey.toBase58(),
  //       // chain: "solana",
  //     }, { headers: { user_id } });

  //     toast({ title: "✅ Investment Successful", description: `TxID: ${txid}` });
  //   } catch (error) {
  //     console.error(error);
  //     toast({ title: "❌ Solana Error", description: error.message, variant: "destructive" });
  //   }
  // };



  return (
    <div className="bg-[#0c1425] rounded-lg p-6 shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
      {/* Funding Progress */}
      <h3 className="text-xl font-bold mb-4">Funding Progress</h3>

      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span>Raised</span>
          <span className="font-medium">
            {campaign.totalRaisedOnPlatform} USDC / {campaign.fundingTarget}{" "} USDC
          </span>
        </div>
        <div className="w-full bg-[#1e293b] rounded-full h-1.5">
          <div
            className="h-1.5 rounded-full bg-gradient-to-r from-[#3b82f6] to-[#39e7f5]"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          ></div>
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-sm text-gray-400">{Math.round(progressPercentage)}% funded</span>
          <span className="text-sm text-[#f59e0b] font-medium">{daysRemaining} days left</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 border-b border-[#1e293b] pb-4">
        <div className="text-center">
          <div className="text-3xl font-bold">{campaign.tokenPrice || 0}</div>
          <div className="text-xs text-gray-400">Token Price</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold capitalize">{campaign.stage || "Seed"}</div>
          <div className="text-xs text-gray-400">Startup Stage</div>
        </div>
        <div className="text-center">
          <div className="text-3xl font-bold">{daysRemaining}</div>
          <div className="text-xs text-gray-400">Days Left</div>
        </div>
      </div>

      <Button
        onClick={() => handleInvest()}
        disabled={campaign.campaignStatus === "Completed" || campaign.campaignStatus === "Pending"}
        className="w-full bg-gradient-to-r from-[#4361ff] to-[#7e5bf8] text-white py-4 rounded-md font-medium mb-3 shadow-sm hover:shadow-md transition-shadow">
        Invest Now
      </Button>

      {isOwner && (
        <Button className="w-full bg-[#10b981] hover:bg-[#10b981]/90 text-white py-4 rounded-md font-medium mb-3 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center gap-2">
          <Pencil size={16} />
          Edit Campaign
        </Button>
      )}

      <div className="grid grid-cols-2 gap-3 mb-8">
        <Button
          variant="outline"
          className="border border-[#1e293b] bg-transparent text-white py-2 px-4 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-[#131e32] transition-colors"
          onClick={handleShare}
        >
          <Share2 size={16} />
          <span>{copied ? "Copied!" : "Share"}</span>
        </Button>


        <Button
          asChild
          variant="outline"
          className="border border-[#1e293b] bg-transparent text-white py-2 px-4 rounded-md font-medium flex items-center justify-center gap-2 hover:bg-[#131e32] transition-colors">
          <a href={campaign.socialLinks.telegram} target="_blank" rel="noopener noreferrer">
            <MessageSquare size={16} />
            <span>Contact</span>
          </a>
        </Button>
      </div>

      {/* Project Verification */}
      <h3 className="text-xl font-bold mb-4 pt-2 border-t border-[#1e293b]">Project Verification</h3>

      <div className="space-y-4 mb-8">
        <div className="flex justify-between items-center p-3 rounded-md bg-[#0f1a2c]">
          <div className="flex items-center gap-2">
            <div className={campaign.verifiedStatus ? "text-[#10b981]" : "text-gray-400"}>
              <ShieldCheck size={20} />
            </div>
            <span>KYC Verified</span>
          </div>
          <span
            className={`${campaign.verifiedStatus ? "bg-[#10b981]" : "bg-[#f97316]"} text-white text-xs px-4 py-1 rounded-full font-medium`}
          >
            {campaign.verifiedStatus ? "Passed" : "Coming Soon"}
          </span>
        </div>

        <div className="flex justify-between items-center p-3 rounded-md bg-[#0f1a2c]">
          <div className="flex items-center gap-2">
            <div className="text-gray-400">
              <ShieldCheck size={20} />
            </div>
            <span>Smart Contract Audit</span>
          </div>
          <span className="bg-[#f97316] text-white text-xs px-4 py-1 rounded-full font-medium">Coming Soon</span>
        </div>

        <div className="flex justify-between items-center p-3 rounded-md bg-[#0f1a2c]">
          <div className="flex items-center gap-2">
            <div className="text-gray-400">
              <Users size={20} />
            </div>
            <span>Team Verification</span>
          </div>
          <span className="bg-[#f97316] text-white text-xs px-4 py-1 rounded-full font-medium">Coming Soon</span>
        </div>
      </div>

      {/* AI Risk Assessment */}
      <div className="bg-[#0f1a2c] rounded-lg p-4 border border-[#1e293b] shadow-[inset_0_1px_1px_rgba(255,255,255,0.03)]">
        <div className="flex items-center gap-2 mb-3">
          <div className="text-[#3b82f6]">
            <Info size={18} />
          </div>
          <h3 className="font-bold">AI Risk Assessment</h3>
        </div>

        <p className="text-sm text-gray-300">
          OnlyFounders has analyzed this project and assigned it a {campaign.verifiedStatus ? "low" : "moderate"} risk
          score based on team credentials, code quality, and tokenomics model.
        </p>
      </div>

      {investModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="relative bg-[#1C232D] rounded-2xl p-6 w-full max-w-xl text-white font-poppins shadow-xl">
            {/* Close Button */}
            <button
              onClick={() => setInvestModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <div className="w-full max-w-[650px] flex flex-col items-center">
                {/* Title */}
                <h1 className="text-white text-center font-poppins text-3xl mb-[60px]">
                  Invest in <span className="text-[#0DF]">{campaign.campaignName}</span>
                </h1>

                <select
                  className="mb-6 w-full bg-[#191E25] text-white border border-[#222531] rounded-xl p-3"
                  value={selectedChain}
                  onChange={(e) => setSelectedChain(e.target.value)}
                  disabled={depositing}
                >
                  <option value="ethereum">Ethereum</option>
                  <option value="arbitrum">Arbitrum</option>
                  {/* <option value="solana">Solana</option> */}
                </select>

                {/* Amount Input */}
                <div className="w-full flex items-center rounded-xl border border-[#222531] bg-[#191E25] mb-6">
                  <input
                    type="number"
                    placeholder="Enter Amount to Invest (min 100 USDC)"
                    value={amount}
                    disabled={depositing}
                    min="100"
                    onChange={(e) => setAmount(e.target.value)}
                    className="flex-1 bg-transparent pl-4 py-4 pr-2 text-white placeholder-gray-400 outline-none font-poppins text-left"
                  />
                  <div className="flex items-center gap-2 bg-[#222531] px-5 py-4 rounded-r-xl">
                    <div className="w-6 h-6 bg-[#0DF] rounded-full flex items-center justify-center">
                      <span className="text-black text-xs font-bold font-poppins">$</span>
                    </div>
                    <span className="text-white font-poppins font-medium">USDC</span>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="w-full flex items-center gap-3 mb-[100px] px-1">
                  <button
                    onClick={() => setAgreedToTerms(!agreedToTerms)}
                    disabled={depositing}
                    className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors flex-shrink-0 ${agreedToTerms ? "bg-[#0DF] border-[#0DF]" : "border-gray-400 bg-transparent"
                      }`}
                  >
                    {agreedToTerms && <Check className="w-4 h-4 text-black" />}
                  </button>
                  <span className="text-white font-poppins font-normal text-left">
                    I agree to the <a href="https://foundershub.notion.site/Legal-Terms-and-Conditions-207f8b9deb7980799a4ec9148380184a?source=copy_link" target="_blank" className="text-[#0DF] cursor-pointer hover:underline">Terms & Conditions</a>
                  </span>
                </div>

                {/* Pay & Invest Button */}
                <button
                  onClick={() => handleDeposit()}
                  className="w-full flex items-center justify-center gap-2.5 px-4 py-2 rounded-xl bg-[#0DF] text-black font-poppins font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-50"
                  disabled={!agreedToTerms || !amount}
                >
                  Pay & Invest
                  {depositing ? <FaSpinner className="animate-spin" /> : <ArrowLeft className="w-5 h-5 rotate-180" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )



}
