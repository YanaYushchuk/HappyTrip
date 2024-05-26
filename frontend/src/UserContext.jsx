import React, { createContext, useState, useEffect } from 'react';
import axios from "axios";

export const UserContext = createContext();

const UserContextProvider = ({ children, wallet }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userId, setUserId] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const initFunction = async () => {
      const isSignedIn = await wallet.startUp();
      setIsSignedIn(isSignedIn);
      if(isSignedIn){
        setUserId(wallet.accountId);
        getUser(userId);
      } else {
        setUserId("");
        setUser(null);
      }
    };
    initFunction();
  }, [wallet]);

  const signIn = () => {
    wallet.signIn();
    setIsSignedIn(true);
  };

  const signOut = () => {
    wallet.signOut();
    setIsSignedIn(false);
  };

  async function getUser (user_id) 
  {
    await axios.get('/userManager/user/' + user_id).then(({data}) => {
        setUser(data);
      });
  }

  return (
    <UserContext.Provider value={{ isSignedIn, signIn, signOut }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
