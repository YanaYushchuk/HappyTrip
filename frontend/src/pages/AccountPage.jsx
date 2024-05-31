import {useContext, useState} from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext.jsx";
import Button from "@mui/material/Button";
import {Link, Navigate, useParams} from "react-router-dom";
import AccountNav from "../AccountNav";

export default function AccountPage() {
    const { isSignedIn, signOut, user } = useContext(UserContext);
    let {subpage} = useParams();
    if (subpage === undefined) { 
    subpage = 'profile';
    }

    //console.log(subpage);

    // function linkClasses(type = null) {
    //     let classes = 'py-2 px-6 bg-gray-200 rounded-full';
    //     if (type === subpage || (subpage === underfined && type === 'profile')) {
    //         classes = 'py-2 px-6 bg-primary rounded-full';
    //     }
    //     return classes
    // }
    console.log("Acc Page isSignedIn = " + isSignedIn);
    console.log("Acc Page user = " + user);
    return (
        <div>
      <AccountNav />
      {subpage === 'profile' && (
        <div className="text-center max-w-lg mx-auto">
          Logged in as {user.user_id} <br />
          <button onClick={signOut} className="priminline-flex gap-1 py-2 px-6 bg-[#76adff] rounded-full text-white max-w-sm mt-2">Logout</button>
        </div>
      )}
      {subpage === 'bookings' && (
        <PlacesPage />
      )}
    </div>
    );
}



