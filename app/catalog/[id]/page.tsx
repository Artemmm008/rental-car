'use client';

import { useEffect, useState, use } from 'react';
import Image from 'next/image';
import { FiMapPin, FiCheckCircle, FiCalendar, FiLayers, FiDroplet, FiSettings } from 'react-icons/fi';
import { fetchCarById } from '@/services/api';
import { Car } from '@/types/car';
import BookingForm from '@/components/Form/Form';
import css from './CarDetails.module.css';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function CarDetailsPage({ params }: PageProps) {
  const { id } = use(params);
  const [car, setCar] = useState<Car | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const getCarData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchCarById(id);
        setCar(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    getCarData();
  }, [id]);

  if (isLoading) return <div className={css.loader}>Loading...</div>;
  if (!car) return <div className={css.error}>Car not found</div>;

  return (
    <main className={css.container}>
      <div className={css.contentWrapper}>

        <section className={css.leftSide}>
          <div className={css.imageContainer}>
            <Image 
              src={car.img} 
              alt={car.brand} 
              fill 
              priority 
              className={css.image}
            />
          </div>
          <div className={css.formCard}>
            <BookingForm carId={car.id} />
          </div>
        </section>

        <section className={css.rightSide}>
          <header className={css.header}>
            <div className={css.titleRow}>
              <h1 className={css.title}>{car.brand} {car.model}, {car.year}</h1>
              <span className={css.carId}>Id: {car.id.slice(0, 4)}</span>
            </div>
            <div className={css.meta}>
              <span><FiMapPin /> {car.location.city}, {car.location.country}</span>
              <span>Mileage: {car.mileage.toLocaleString()} km</span>
            </div>
            <p className={css.price}>${car.rentalPrice}</p>
          </header>

          <p className={css.description}>{car.description}</p>

          <div className={css.detailsGrid}>
            <div className={css.infoGroup}>
              <h3 className={css.groupTitle}>Rental Conditions:</h3>
              <ul className={css.iconList}>
                {car.rentalConditions.map((text, icon) => (
                  <li key={icon}><FiCheckCircle className={css.icon} /> {text}</li>
                ))}
              </ul>
            </div>

            <div className={css.infoGroup}>
              <h3 className={css.groupTitle}>Car Specifications:</h3>
              <ul className={css.iconList}>
                <li><FiCalendar className={css.icon} /> Year: {car.year}</li>
                <li><FiLayers className={css.icon} /> Type: {car.type}</li>
                <li><FiDroplet className={css.icon} /> Fuel Consumption: {car.fuelConsumption}L</li>
                <li><FiSettings className={css.icon} /> Engine Size: {car.engine}</li>
              </ul>
            </div>

            <div className={css.infoGroup}>
              <h3 className={css.groupTitle}>Accessories and functionalities:</h3>
              <ul className={css.iconList}>
                {car.features.map((item, i) => (
                  <li key={i}><FiCheckCircle className={css.icon} /> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}