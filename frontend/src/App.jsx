import './App.css'
import { Route, Routes } from "react-router-dom";
import { Wallet } from "./wallets/near-wallet.js"
import IndexPage from "./pages/IndexPage.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./Layout.jsx";
import axios from 'axios';
import { useEffect, useState } from 'react'
import { utils } from 'near-api-js';
import UserContextProvider from './UserContext.jsx';
import AccountPage from './pages/AccountPage.jsx';

const CONTRACT_NAME = "yana03.testnet"
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_NAME })

axios.defaults.baseURL = 'http://localhost:8080';

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const initFunction = async () => {
      const isSignedIn = await wallet.startUp();

      setIsSignedIn(isSignedIn);

    }
    initFunction();

  }, []);

  return (
    <UserContextProvider wallet={wallet}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/:subpage?" element={<AccountPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}
export default App
