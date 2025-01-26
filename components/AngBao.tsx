"use client"

import { useState } from "react"
import { ethers } from "ethers"

const AngBao = () => {
  const [angBaoCollected, setAngBaoCollected] = useState(false)
  const [angBaoOpened, setAngBaoOpened] = useState(false)

  const collectAngBao = async () => {
    setAngBaoCollected(true)
  }

  const openAngBao = () => {
    setAngBaoOpened(true)
  }

  return (
    <div className="flex flex-col items-center mt-8">
      {!angBaoCollected ? (
        <button
          onClick={collectAngBao}
          className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white px-8 py-4 rounded-md hover:from-yellow-500 hover:to-yellow-400 transition-all transform hover:scale-105 shadow-lg font-semibold tracking-wide"
        >
          Collect Ang Bao
        </button>
      ) : !angBaoOpened ? (
        <button
          onClick={openAngBao}
          className="bg-gradient-to-r from-red-800 to-red-600 text-white px-8 py-4 rounded-md hover:from-red-700 hover:to-red-500 transition-all transform hover:scale-105 shadow-lg font-semibold tracking-wide"
        >
          Open Ang Bao
        </button>
      ) : (
        <div className="text-center">
          <p className="gold-text text-2xl font-bold mb-2">恭喜发财!</p>
          <p className="text-red-100">Gong Xi Fa Cai!</p>
        </div>
      )}
    </div>
  )
}

export default AngBao

