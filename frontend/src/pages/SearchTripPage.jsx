import { Link, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Image from "../Image.jsx";
import './SearchTrip.css';



// Функція для обчислення тривалості подорожі
function getTripDuration(startTime, finishTime) {
    const start = new Date(startTime);
    const finish = new Date(finishTime);


    const duration = finish - start; // різниця в мілісекундах

    const days = Math.floor(duration / (1000 * 60 * 60 * 24));
    const hours = Math.floor((duration % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((duration % (1000 * 60 * 60)) / (1000 * 60));

    return { days, hours, minutes };
}

export default function SearchTripPage() {
    const [trips, setTrips] = useState([]);
    let [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        axios.get('/tripManager/search-trips', {
            params: {
                destination: searchParams.get("destination"),
                price: searchParams.get("price"),
                alphabetical: searchParams.get("alphabetical"),
                page: searchParams.get("page"),
                limit: searchParams.get("limit")
            }
        }).then(({ data }) => {
            setTrips(data);
        });
    }, []);


    return (
        <div>
          <div className="mt-4">
            {trips.length > 0 && trips.map(trip => (
              <Link to={'/trip/' + trip._id} className="cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl link-container flex"> {/* Додано link-container */}
                <div className="bg-gray-500 mb-2 rounded-2xl flex" style={{ width: '150px', height: '150px' }}>
                  <Image
                    className="rounded-2xl object-cover aspect-square"
                    src={"../../images/trips/" + trip.photos[0]}
                    alt=""
                  />
                </div>
                <div className="grow-0 shrink">
                  <h2 className="text-xl font-semibold">{trip.title}</h2>
                  <p className="text-sm mt-2 font-medium">{trip.price}</p>
                  <p className="text-sm mt-2 font-light">
                    {Math.floor((new Date(trip.finishTime[0]) - new Date(trip.startTime[0])) / (1000 * 60 * 60 * 24))} днів,
                    {Math.floor(((new Date(trip.finishTime[0]) - new Date(trip.startTime[0])) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))} годин,
                    {Math.floor(((new Date(trip.finishTime[0]) - new Date(trip.startTime[0])) % (1000 * 60 * 60)) / (1000 * 60))} хвилин
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      );
    }      