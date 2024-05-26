import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
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
    <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      {destinations.length > 0 && destinations.map(destination => (
        <Link to={`/search-trip?${buildQueryString({ destination: destination._id})}`}>
          {/* <div className="bg-gray-500 mb-2 rounded-2xl flex">
            {destination.photos?.[0] && (
              <Image className="rounded-2xl object-cover aspect-square" src={place.photos?.[0]} alt=""/>
            )}
          </div> */}
          <h2 className="font-bold">{destination.title}</h2>
          <h3 className="text-sm text-gray-500">{destination.description}</h3>
        </Link>
      ))}
    </div>
  );
}