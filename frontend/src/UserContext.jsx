import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Wallet } from "./wallets/near-wallet.js"
import axios from "axios";
import { AccountId, utils } from 'near-api-js';

const CONTRACT_NAME = "tickets5.yana03.testnet"
const wallet = new Wallet({ createAccessKeyFor: CONTRACT_NAME })

export const UserContext = createContext();

export default function UserContextProvider({ children }) {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [tickets, setTickets]= useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const initFunction = async () => {
      const isSignedIn = await wallet.startUp();
      setIsSignedIn(isSignedIn);
      if (isSignedIn) {
        getUser();
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

  const getTickets = async () => {
    const total_tickets = await wallet.viewMethod({ contractId: CONTRACT_NAME, method: "total_tickets" });
    console.log(total_tickets);
    const from_index = total_tickets >= 10 ? total_tickets - 10 : 0;
    console.log(user.user_id);
    const check = await wallet.viewMethod({ contractId: CONTRACT_NAME, method: "get_tickets", args: { userId: user.user_id, from_index: String(from_index), limit: "10" } });
    console.log(check);
    setTickets(check);
  }

  const getAllTickets = async () => {
    const check = await wallet.viewMethod({ contractId: CONTRACT_NAME, method: "get_all_tickets", args: { } });
    console.log("ALL " + check);
    return check
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    const { price, text } = e.target.elements;

    fieldset.disabled = true;

    // Add ticket to the guest book
    const deposit = utils.format.parseNearAmount(price.value);
    await wallet.callMethod({ contractId: CONTRACT_NAME, method: "buy_ticket", args: { text: text.value, price: price.value}, deposit });
  };

  return (
    <UserContext.Provider value={{ isSignedIn, signIn, signOut, user, tickets, setUser, onSubmit, getTickets, getAllTickets }}>
      {children}
    </UserContext.Provider>
  );
};