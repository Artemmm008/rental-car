"use client";

import { useState } from "react";
import Link from 'next/link';
import Image from "next/image"
import { Car } from "@/types/car"
import css from "./CarCard.module.css"
import { FiHeart } from "react-icons/fi"; 
import { FaHeart } from "react-icons/fa";

export default function CarCard({ car }: { car: Car }) {

    const [like, setLike] = useState(false);
    
    const city = car.location.city;
    const country = car.location.country;
    
    return (
        <div className={css.container}>
            <div className={css.item}>
                <div className={css.imgWrapper}>
                    <button 
                        className={css.heartBtn} 
                        onClick={() => setLike(!like)}
                        type="button"
                    >   
                        {like ? (
                            <FaHeart className={css.heartActive} />
                        ) : (
                            <FiHeart className={css.heartNormal} />
                        )}
                    </button>

                    <Image                        
                        src={car.img}    
                        alt={`${car.brand} ${car.model}`}                       
                        className={css.img}   
                        fill
                    />
                </div>
                <div className={css.content}>
                    <div className={css.header}>
                    <h3 className={css.title}>
                            {car.brand} <span className={css.span}>{car.model}</span>, {car.year}
                        </h3>
                        <span className={css.price}>${car.rentalPrice}</span>
                    </div>
                    <div className={css.info}>
                        <p>{city} | {country} | {car.rentalCompany}</p>
                        <p>{car.type} | {car.mileage.toLocaleString()} km</p>
                    </div>
                </div>
            </div>   
            <Link
                href={`/catalog/${car.id}`}
                target="_blank"
                className={css.button}
            >
                Read more
            </Link>
        </div>
    )
}   