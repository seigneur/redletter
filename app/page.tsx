"use client";

import { useState } from "react";
import AngBao from "../components/AngBao";
import SnakeGame from "../components/SnakeGame";
import Header from "../components/Header";
import Instructions from "../components/Instructions";
import {
  DynamicContextProvider,
  DynamicWidget,
} from "@dynamic-labs/sdk-react-core";
import { DynamicWagmiConnector } from "@dynamic-labs/wagmi-connector";
import { createConfig, WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { http } from "viem";
import { mainnet } from "viem/chains";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { ZeroDevSmartWalletConnectors } from "@dynamic-labs/ethereum-aa";
import FloatingElements from "../components/FloatingElements"

const config = createConfig({
  chains: [mainnet],
  multiInjectedProviderDiscovery: false,
  transports: {
    [mainnet.id]: http(),
  },
});

const queryClient = new QueryClient();

export default function Home() {
  const [score, setScore] = useState(0);

  const handleScoreChange = (newScore: number) => {
    setScore(newScore);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 to-red-800">
      
      <main className="flex flex-col items-center justify-center p-8 md:p-24">
        <h1 className="spaced-text gold-text text-2xl md:text-4xl font-cinzel mb-4 text-center">
          Lunar New Year Snake Game
        </h1>
        <p className="text-lg md:text-xl text-red-100 mb-12 text-center max-w-2xl">
          Celebrate the Year of the Snake with Silver Bullion Group!
        </p>
        <DynamicContextProvider
          settings={{
            environmentId: process.env.NEXT_PUBLIC_DYNAMIC_ID || "",
            walletConnectors: [EthereumWalletConnectors, ZeroDevSmartWalletConnectors],
          }}
        >
          <FloatingElements />
          <Header />
          <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
              <DynamicWagmiConnector>
                <DynamicWidget />

                <SnakeGame onScoreChange={handleScoreChange} />
                <AngBao score={score} />
                <Instructions />
              </DynamicWagmiConnector>
            </QueryClientProvider>
          </WagmiProvider>
        </DynamicContextProvider>
      </main>
    </div>
  );
}
