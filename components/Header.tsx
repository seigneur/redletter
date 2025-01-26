"use client"

import { useState, useEffect } from "react"
import { createPublicClient, http } from "viem"
import { polygon } from "viem/chains"
import { ethers } from "ethers"

declare global {
  interface Window {
    ethereum?: any
  }
}

const Header = () => {
  const [address, setAddress] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const connectWallet = async () => {
    setIsLoading(true)
    setError(null)

    try {
      if (!window.ethereum) {
        throw new Error("Please install MetaMask to continue")
      }

      // Create Viem public client
      const publicClient = createPublicClient({
        chain: polygon,
        transport: http(),
      })

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found")
      }

      // Create Ethers provider and get signer
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      const address = await signer.getAddress()
      setAddress(address)

      // Switch to Polygon network
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0x89" }], // Polygon Mainnet
        })
      } catch (switchError: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: "0x89",
                  chainName: "Polygon Mainnet",
                  nativeCurrency: {
                    name: "MATIC",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  rpcUrls: ["https://polygon-rpc.com/"],
                  blockExplorerUrls: ["https://polygonscan.com/"],
                },
              ],
            })
          } catch (addError: any) {
            throw new Error("Failed to add Polygon network: " + addError.message)
          }
        }
        throw new Error("Failed to switch to Polygon network: " + switchError.message)
      }
    } catch (error: any) {
      console.error("Wallet connection error:", error)
      setError(error.message || "Failed to connect wallet")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    // Only try to connect if MetaMask is installed
    if (window.ethereum) {
      connectWallet()
    }
  }, [])

  // Listen for account changes
  useEffect(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", () => {
        window.location.reload()
      })

      window.ethereum.on("chainChanged", () => {
        window.location.reload()
      })

      return () => {
        window.ethereum.removeListener("accountsChanged", () => {})
        window.ethereum.removeListener("chainChanged", () => {})
      }
    }
  }, [])

  return (
    <header className="absolute top-0 right-0 m-4">
      {error && <div className="mb-2 px-4 py-2 bg-red-900/80 text-red-100 rounded-md text-sm">{error}</div>}
      {address ? (
        <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 px-4 py-2 rounded-md shadow-lg">
          <p className="text-white font-medium">{`${address.slice(0, 6)}...${address.slice(-4)}`}</p>
        </div>
      ) : (
        <button
          onClick={connectWallet}
          disabled={isLoading}
          className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white px-4 py-2 rounded-md hover:from-yellow-500 hover:to-yellow-400 transition-all shadow-lg font-medium disabled:opacity-50"
        >
          {isLoading ? "Connecting..." : "Connect Wallet"}
        </button>
      )}
    </header>
  )
}

export default Header

