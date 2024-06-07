import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Image from "../Image.jsx";
import "./SearchTripPage.css"; // Шлях до вашого CSS файлу

function SearchTripPage() {
    const [trips, setTrips] = useState([]);
    const [destinations, setDestinations] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        // Отримання списку доступних дестінацій з сервера
        axios.get('/destinationManager/destinations')
            .then(({ data }) => {
                setDestinations(data);
            })
            .catch(error => {
                console.error('Помилка під час отримання дестінацій:', error);
            });

        // Отримання списку подорожей з сервера з урахуванням поточних параметрів пошуку
        axios.get('/tripManager/search-trips', {
            params: {
                ...Object.fromEntries(searchParams), // Перетворюємо URLSearchParams на об'єкт
                limit: 2 // Відображати 2 подорожі на сторінку
            }
        }).then(({ data }) => {
            setTrips(data.trips);
        }).catch(error => {
            console.error('Помилка під час отримання списку подорожей:', error);
        });
        
    }, [searchParams]);

    const goToPage = (pageNumber) => {
        setSearchParams({ ...Object.fromEntries(searchParams), page: pageNumber });
    };

    const handleSortChange = (e) => {
        const selectedValue = e.target.value;
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("price", selectedValue);
        setSearchParams(newSearchParams);
    };

    const handleAlphabeticalSortChange = (e) => {
        const selectedValue = e.target.value;
        const newSearchParams = new URLSearchParams(searchParams);
        let alphabeticalValue = "";
        if (selectedValue === "asc") {
            alphabeticalValue = "asc";
        } else if (selectedValue === "desc") {
            alphabeticalValue = "desc";
        }
        newSearchParams.set("alphabetical", alphabeticalValue);
        setSearchParams(newSearchParams);
    };

    const handleDestinationChange = (e) => {
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.set("destination", e.target.value);
        setSearchParams(newSearchParams);
    };

    const currentPage = Number(searchParams.get("page")) || 1;

    return (
        <div>
            {/* Sorting controls */}
            <div className="sorting-container">
                <select id="sorting-select" className="sorting-select" onChange={handleSortChange} value={searchParams.get("price") || ""}>
                    <option value="">Сортування за ціною</option>
                    <option value="asc">Від найнижчої до найвищої</option>
                    <option value="desc">Від найвищої до найнижчої</option>
                </select>
                <select id="alphabetical-sorting-select" className="sorting-select" onChange={handleAlphabeticalSortChange} value={searchParams.get("alphabetical") || ""}>
                    <option value="">Сортування за алфавітом</option>
                    <option value="asc">Від A до Я</option>
                    <option value="desc">Від Я до A</option>
                </select>
                <select id="destination-select" className="sorting-select" onChange={handleDestinationChange} value={searchParams.get("destination") || ""}>
                    <option value="">Оберіть дестінацію</option>
                    {destinations.map(destination => (
                        <option key={destination._id} value={destination._id}>{destination.title}</option>
                    ))}
                </select>
            </div>
            <div className="mt-4">
                {trips.length > 0 && trips.map(trip => (
                    <Link to={'/trip/' + trip._id} className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl" key={trip._id}>
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
                                {Math.floor((new Date(trip.finishTime[0]) - new Date(trip.startTime[0])) / (1000 * 60 * 60 * 24))} days,
                                {Math.floor(((new Date(trip.finishTime[0]) - new Date(trip.startTime[0])) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))} hours,
                                {Math.floor(((new Date(trip.finishTime[0]) - new Date(trip.startTime[0])) % (1000 * 60 * 60)) / (1000 * 60))} minutes
                            </p>
                        </div>
                    </Link>
                ))}
            </div>
            {/* Pagination controls */}
            <div className="pagination-container">
                <button className="pagination-button" onClick={() => goToPage(1)} disabled={currentPage === 1}>First Page</button>
                <button className="pagination-button" onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>Previous Page</button>
                <button className="pagination-button" onClick={() => goToPage(currentPage + 1)}>Next Page</button>
            </div>
        </div>
    );
}

export default SearchTripPage;