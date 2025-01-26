const Instructions = () => {
  return (
    <div className="mt-12 p-8 bg-gradient-to-br from-red-950 to-red-900 rounded-lg shadow-xl max-w-md mx-auto border border-yellow-600/20">
      <h2 className="text-xl font-bold mb-6 gold-text">How to Get Started</h2>
      <ol className="space-y-4 text-red-100">
        <li className="flex items-start">
          <span className="mr-4 gold-text">1.</span>
          <div>
            <p className="font-semibold mb-2">Install MetaMask:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-sm opacity-90">
              <li>
                Visit{" "}
                <a
                  href="https://metamask.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-yellow-400 hover:underline"
                >
                  metamask.io
                </a>
              </li>
              <li>Download and follow the installation steps</li>
            </ul>
          </div>
        </li>
        <li className="flex items-start">
          <span className="mr-4 gold-text">2.</span>
          <div>
            <p className="font-semibold mb-2">Connect your wallet:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-sm opacity-90">
              <li>Click "Connect Wallet" in the top right</li>
              <li>Select MetaMask when prompted</li>
            </ul>
          </div>
        </li>
        <li className="flex items-start">
          <span className="mr-4 gold-text">3.</span>
          <div>
            <p className="font-semibold mb-2">Switch to Polygon network:</p>
            <ul className="list-disc list-inside ml-4 space-y-1 text-sm opacity-90">
              <li>Approve the network switch request</li>
              <li>Confirm the network change in MetaMask</li>
            </ul>
          </div>
        </li>
        <li className="flex items-start">
          <span className="mr-4 gold-text">4.</span>
          <div>
            <p className="font-semibold">Collect your Ang Bao and celebrate!</p>
          </div>
        </li>
      </ol>
    </div>
  )
}

export default Instructions

