import AngBao from "../components/AngBao"
import DragonAnimation from "../components/DragonAnimation"
import Header from "../components/Header"
import Instructions from "../components/Instructions"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-900 to-red-800">
      <Header />
      <main className="flex flex-col items-center justify-center p-8 md:p-24">
        <h1 className="spaced-text gold-text text-2xl md:text-4xl font-cinzel mb-4 text-center">Lunar New Year</h1>
        <p className="text-lg md:text-xl text-red-100 mb-12 text-center max-w-2xl">
          Celebrate the Year of the Dragon with Digital Ang Baos
        </p>
        <DragonAnimation />
        <AngBao />
        <Instructions />
      </main>
    </div>
  )
}

