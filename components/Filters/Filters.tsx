'use client';
import { HiChevronDown } from 'react-icons/hi2';
import { useState, useEffect } from 'react';
import css from './Filters.module.css';
import { fetchFilters } from '@/services/api';
import { CarFilters } from '@/types/car';

interface FiltersProps {
  onFilterChange: (filters: CarFilters) => void;
}

export default function Filters({ onFilterChange }: FiltersProps) {
  const [brand, setBrand] = useState('');
  const [price, setPrice] = useState('');
  const [minMileage, setMinMileage] = useState('');
  const [maxMileage, setMaxMileage] = useState('');
  
  const [brands, setBrands] = useState<string[]>([]);
  const [priceOptions, setPriceOptions] = useState<number[]>([]);
  
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isPriceOpen, setIsPriceOpen] = useState(false);
  

  useEffect(() => {
    const getFilterData = async () => {
      try {
        const data = await fetchFilters();
        setBrands(data.brands);

        const min = data.price.min;
        const max = data.price.max;
        const options = [];
        for (let i = Math.ceil(min / 10) * 10; i <= max; i += 10) {
          options.push(i);
        }
        setPriceOptions(options);
      } catch (error) {
        console.error("Failed to fetch filters:", error);
      }
    };
    getFilterData();
  }, []);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onFilterChange({
      brand: brand || undefined,
      price: price ? Number(price) : undefined,
      minMileage: minMileage ? Number(minMileage) : undefined,
      maxMileage: maxMileage ? Number(maxMileage) : undefined,
      page: 1,
    });
  };

  return (
    <form className={css.form} onSubmit={handleSearch}>
      <div className={css.group}>
        <label className={css.label}>Car brand</label>
        <div className={css.selectWrapper}>
        <div className={css.customSelect} onClick={() => setIsBrandOpen(!isBrandOpen)}>
            {brand || "Choose a brand"}
            <HiChevronDown className={`${css.icon} ${isBrandOpen ? css.iconRotate : ""}`} />
          </div>

          <ul className={`${css.optionsList} ${isBrandOpen ? css.optionsVisible : ""}`}>
            {brands.map(brand => (
              <li key={brand} className={css.option} onClick={() => { setBrand(brand); setIsBrandOpen(false); }}>
                {brand}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={css.group}>
        <label className={css.label}>Price/ 1 hour</label>
        <div className={css.selectWrapper}>
         <div className={css.customSelect} onClick={() => setIsPriceOpen(!isPriceOpen)}>
            {price ? `To ${price}$` : "Choose a price"}
            <HiChevronDown className={`${css.icon} ${isPriceOpen ? css.iconRotate : ""}`} />
          </div>

          <ul className={`${css.optionsList} ${isPriceOpen ? css.optionsVisible : ""}`}>
            {priceOptions.map(price => (
              <li key={price} className={css.option} onClick={() => { setPrice(String(price)); setIsPriceOpen(false); }}>
                {price}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={css.group}>
        <label className={css.label}>Car mileage / km</label>
        <div className={css.mileageContainer}>
          <div className={css.mileageInputWrapper}>
            <span className={css.word}>From</span>
            <input 
              type="number" 
              className={css.mileageInput} 
              value={minMileage} 
              onChange={(e) => setMinMileage(e.target.value)} 
            />
          </div>
          <div className={css.mileageInputWrapper}>
            <span className={css.word}>To</span>
            <input 
              type="number" 
              className={css.mileageInput} 
              value={maxMileage} 
              onChange={(e) => setMaxMileage(e.target.value)} 
            />
          </div>
        </div>
      </div>

      <button type="submit" className={css.button}>Search</button>
    </form>
  );
}