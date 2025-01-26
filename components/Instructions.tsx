const Instructions = () => {
  return (
    <div className="mt-12 p-8 bg-gradient-to-br from-red-950 to-red-900 rounded-lg shadow-xl max-w-md mx-auto border border-yellow-600/20">
      <h2 className="text-xl font-bold mb-6 text-yellow-500">How to Get Your Ang Bao</h2>
      <ol className="space-y-4 text-red-100">
        <li className="flex items-start">
          <span className="mr-4 text-yellow-500">1.</span>
          <div>
            <p className="font-semibold mb-2">Play the Snake Game:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-sm opacity-90">
              <li>Use arrow keys to control the snake</li>
              <li>Collect red items to grow longer</li>
              <li>Avoid hitting walls and yourself</li>
            </ul>
          </div>
        </li>
        <li className="flex items-start">
          <span className="mr-4 text-yellow-500">2.</span>
          <div>
            <p className="font-semibold mb-2">Reach score 20:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-sm opacity-90">
              <li>Your current high score is shown above</li>
              <li>Score increases with each item collected</li>
            </ul>
          </div>
        </li>
        <li className="flex items-start">
          <span className="mr-4 text-yellow-500">3.</span>
          <div>
            <p className="font-semibold mb-2">Register your details:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-sm opacity-90">
              <li>Click "Sign Up" when you reach 20 points</li>
              <li>Fill in your name and email</li>
            </ul>
          </div>
        </li>
        <li className="flex items-start">
          <span className="mr-4 text-yellow-500">4.</span>
          <div>
            <p className="font-semibold">Collect your Ang Bao and Gong Xi Fa Cai!</p>
          </div>
        </li>
      </ol>
    </div>
  )
}

export default Instructions