import './App.css'
import { Route, Routes } from "react-router-dom";
//import { Wallet } from "./wallets/near-wallet.js"
import IndexPage from "./pages/IndexPage.jsx";
// import LoginPage from "./pages/LoginPage.jsx";
import Layout from "./Layout.jsx";
import axios from 'axios';
//import { useEffect, useState } from 'react'
import { utils } from 'near-api-js';
import UserContextProvider from './UserContext.jsx';
import AccountPage from './pages/AccountPage.jsx';
import SearchTripPage from './pages/SearchTripPage.jsx';
import TripPage from './pages/TripPage.jsx';
import DestinationPage from './pages/DestinationPage.jsx';
import BookingsPage from './pages/BookingsPage.jsx';

axios.defaults.baseURL = 'http://localhost:8080';

function App() {

  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/account/:subpage?" element={<AccountPage />} />
          <Route path="/search-trip" element={<SearchTripPage />} />
          <Route path="/trip/:id" element={<TripPage />} />
          <Route path="/destination/:id" element={<DestinationPage />} /> 
          <Route path="/account/bookings" element={<BookingsPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  )
}
export default App
