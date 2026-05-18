"use client";

import { useEffect, useState } from "react";
import { Car, CarFilters } from "@/types/car";
import { fetchCars } from "@/services/api"; 
import CarCard from "@/components/CarCard/CarCard";
import Filters from "@/components/Filters/Filters";
import css from "./CatalogPage.module.css";

export default function CatalogPage() {
    const [cars, setCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const [page, setPage] = useState(1);
    const [allFilters, setAllFilters] = useState<CarFilters>({});

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetchCars({ ...allFilters, page });          
                if (page === 1) {
                    setCars(res.cars);
                } else {
                    setCars((previous) => [...previous, ...res.cars]);                   
                }                
        
                setTotalPages(res.totalPages); 
            } catch (error) {   
                console.error(error);  
            } finally {
                setLoading(false);     
            } 
        };    

        fetchData();
    }, [page, allFilters]);

    const handleFilterChange = (newFilters: CarFilters) => {
        setAllFilters(newFilters);
        setPage(1);     
    };

    return (
        <div className={css.container}> 
            <Filters onFilterChange={handleFilterChange} />

            <div className={css.allcars}> 
                {cars.map((car) => (
                    <CarCard key={car.id} car={car} />
                ))}
            </div>     

            {loading && <p>Loading...</p>}

            {!loading && page < totalPages && (
                <button        
                    className={css.loadMore} 
                    onClick={() => setPage(previous => previous + 1)}   
                >
                    Load more
                </button> 
            )}
        </div>
    );
}