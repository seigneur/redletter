"use client"

import { useDynamicContext } from "@dynamic-labs/sdk-react-core"

const Header = () => {
  const { user, handleLogOut, showAuthFlow } = useDynamicContext()

  return (
    <header className="absolute top-0 right-0 m-4">
      {user ? (
        <div className="flex items-center space-x-4">
          <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 px-4 py-2 rounded-md shadow-lg">
            <p className="text-white font-medium">
              {user.email || user.wallet?.address.slice(0, 6) + "..." + user.wallet?.address.slice(-4)}
            </p>
          </div>
          <button
            onClick={handleLogOut}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
          >
            Log Out
          </button>
        </div>
      ) : (
        <button
          onClick={() => showAuthFlow()}
          className="bg-gradient-to-r from-yellow-600 to-yellow-500 text-white px-4 py-2 rounded-md hover:from-yellow-500 hover:to-yellow-400 transition-all shadow-lg font-medium"
        >
          Connect
        </button>
      )}
    </header>
  )
}

export default Header

