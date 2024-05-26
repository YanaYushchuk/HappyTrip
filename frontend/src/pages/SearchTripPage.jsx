import { Link, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

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
                    <Link to={'/trip/' + trip._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{trip.title}</h2>
                            <p className="text-sm mt-2">{trip.description}</p>
                            <p className="text-sm mt-2">{trip.price}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}