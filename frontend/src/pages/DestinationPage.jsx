import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Image from "../Image.jsx";
import AddressLink from "../AddressLink"; 
import "./DestinationPage.css";

export default function DestinationPage() {
  const { id } = useParams();
  const [destination, setDestination] = useState(null);

  useEffect(() => {
    axios.get(`/destinationManager/destination/${id}`).then(response => {
      setDestination(response.data);
    });
  }, [id]);

  if (!destination) {
    return <div>Loading...</div>;
  }

  return (
    <div className="destination-container mt-8 bg-gray-100">
      <div className="destination-content">
      <AddressLink className="font-bold text-2xl mb-4  uppercase">{destination.address}</AddressLink>
        <div className="flex justify-between items-center">
          <Image 
            className="destination-image rounded-2xl object-cover aspect-square float-left" 
            src={"../../images/destinations/" + destination.image} 
            alt={destination.title} 
          />
          <p className="text-center ml-4">{destination.description}</p>
        </div>
            
      </div>
    </div>
  );
}
