import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Image from "../Image.jsx"

export default function IndexPage() {
  const [destinations, setDestinations] = useState([]);
  useEffect(() => {
    axios.get('/destinationManager/destinations').then(response => {
      setDestinations(response.data);
    });
  }, []);

  const buildQueryString = (params) => {
    const query = new URLSearchParams(params);
    return query.toString();
  };

  return (
    <div className="mt-8">
      <h2 className="text-3xl  flex justify-center font-bold mb-6 text-gray-900 uppercase tracking-wider ">Напрямки</h2>
      <div className="grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
        {destinations.length > 0 && destinations.map(destination => (
          <Link to={`/search-trip?${buildQueryString({ destination: destination._id })}`}>
            <div className="mb-2 rounded-2xl flex">
              <Image className="rounded-2xl object-cover aspect-square" src={"../../images/destinations/" + destination.image} alt="" />
            </div>
            <h2 className="font-bold text-center">{destination.title}</h2>
          </Link>
        ))}
      </div>
    </div>
  );
}