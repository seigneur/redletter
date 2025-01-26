"use client"

import { useState, useEffect } from "react"
import { ethers } from "ethers"

interface AngBaoProps {
  score: number
}

const AngBao: React.FC<AngBaoProps> = ({ score }) => {
  const [angBaoCollected, setAngBaoCollected] = useState(false)
  const [angBaoOpened, setAngBaoOpened] = useState(false)
  const [angBaoUnlocked, setAngBaoUnlocked] = useState(false)

  useEffect(() => {
    if (score >= 20) {
      setAngBaoUnlocked(true)
    }
  }, [score])

  const collectAngBao = async () => {
    // Here you would typically interact with a smart contract
    // For now, we'll just set the state
    setAngBaoCollected(true)
  }

  const openAngBao = () => {
    // Here you would typically interact with a smart contract
    // For now, we'll just set the state
    setAngBaoOpened(true)
  }

  return (
    <div className="flex flex-col items-center mt-8">
      {angBaoUnlocked && !angBaoCollected && (
        <button
          onClick={collectAngBao}
          className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white px-8 py-4 rounded-md hover:from-yellow-500 hover:to-yellow-400 transition-all transform hover:scale-105 shadow-lg font-semibold tracking-wide"
        >
          Collect Ang Bao
        </button>
      )}
      {angBaoCollected && !angBaoOpened && (
        <button
          onClick={openAngBao}
          className="bg-gradient-to-r from-red-800 to-red-600 text-white px-8 py-4 rounded-md hover:from-red-700 hover:to-red-500 transition-all transform hover:scale-105 shadow-lg font-semibold tracking-wide"
        >
          Open Ang Bao
        </button>
      )}
      {angBaoOpened && (
        <div className="text-center">
          <p className="gold-text text-2xl font-bold mb-2">恭喜发财!</p>
          <p className="text-red-100">Gong Xi Fa Cai!</p>
          <p className="text-yellow-400 mt-4">You've received a lucky digital Ang Bao!</p>
        </div>
      )}
      {!angBaoUnlocked && <p className="text-yellow-400 mt-4">Reach a score of 20 to unlock your Ang Bao!</p>}
    </div>
  )
}

export default AngBao

