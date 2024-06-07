import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import TripGallery from "../TripGallery";
import './TripPage.css';
import CommentForm from "../CommentForm";
import AddressLink from "../AddressLink";
import { UserContext } from "../UserContext.jsx";
import Ticket from "../Ticket";



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

export default function TripPage() {
    const { isSignedIn, onSubmit } = useContext(UserContext);
    const { id } = useParams();
    const [trip, setTrip] = useState(null);

    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/tripManager/trip/${id}`).then(response => {

            setTrip(response.data);
        });
    }, [id]);

    if (!trip) return '';

    const duration = getTripDuration(trip.startTime[0], trip.finishTime[0]);

    return (
        <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
            <h1 className="text-3xl text-center">{trip.title}</h1>
            <TripGallery trip={trip} />
            <div className="mt-8 mb-8 grid gap-8 grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div>
                    <div className="my-4">
                        <h2 className="font-semibold  text-2xl">Опис</h2>
                        {trip.description}
                    </div>
                    <p>Ціна: {trip.price}</p>
                    <p>Місце збору:<AddressLink>{trip.startPlace}</AddressLink></p>
                    <p>Дата початку туру: {new Date(trip.startTime[0]).toLocaleString()}</p>
                    <p>Дата кінця туру: {new Date(trip.finishTime[0]).toLocaleString()}</p>
                    <p>Тривалість подорожі: {duration.days} днів, {duration.hours} годин, {duration.minutes} хвилин</p>
                </div>
                <div>
                    <h2 className="font-semibold text-2xl mb-4">Маршрут</h2>
                    {trip.destinationSequences.length > 0 && trip.destinationSequences.sort((seq1, seq2) => seq1.position - seq2.position).map(seq => {
                        const destination = trip.destinations.find(dest => dest._id === seq.destination);
                        return (
                            <Link key={seq.destination} to={'/destination/' + seq.destination} className="flex items-center gap-4 bg-gray-100 p-4 rounded-2xl hover:bg-gray-200 transition duration-300">
                                <div className="grow-0 shrink">

                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 className="text-xl">{destination.title}</h2>
                                </div>
                            </Link>
                        );
                    })}
                </div>
                {isSignedIn ? (
                    // Якщо користувач зареєстрований, відображаємо іконку
                    <Ticket onSubmit={onSubmit} trip={trip} />
                ) : (
                    // Якщо користувач не зареєстрований, відображаємо кнопку "Логін"
                    <p>Щоб забронювати потрібно авторизуватися.</p>
                )}
               
                <br/>
                < CommentForm tripId={id} /> 
                {console.log("tripId в TripPage:", id)}
            </div>
        </div>
    );
}