import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Wallet } from "./wallets/near-wallet.js"
import axios from "axios";

const CONTRACT_NAME = "yana03.testnet"
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_NAME })

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const initFunction = async () => {
      const isSignedIn = await wallet.startUp();
      setIsSignedIn(isSignedIn);
      if (isSignedIn) {
        getUser();
        console.log(user);
      }
    };
    initFunction();
  }, []);

  const signIn = () => {
    wallet.signIn();
    setIsSignedIn(true);
  };

  const signOut = () => {
    wallet.signOut();
    setIsSignedIn(false);
  };

  async function getUser() {
    try {
      await axios.get('/userManager/user/' + wallet.accountId).then(({ data }) => {
        setUser(data);
      });
    } catch (err) {
      if (err.response.status === 404) {
        await axios.post('/userManager/user', { user_id: wallet.accountId }).then(({ data }) => {
          setUser(data);
        });
      }
    }

  }

  return (
    <UserContext.Provider value={{ isSignedIn, signIn, signOut, user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};