import axios from "axios";
import { Car, CarResponse, CarFilters, BookingReq } from "@/types/car";

const baseURL = process.env.NEXT_PUBLIC_API_URL;

export const api = axios.create({
    baseURL,
});

export const fetchCars = async (filters: CarFilters) => {
  const { data } = await api.get<CarResponse>("/cars", { params: filters });
  return data;
};

export const fetchFilters = async () => {
    const { data } = await api.get("/cars/filters")
    return data
};

export const fetchCarById = async (id: string) => {
    const { data } = await api.get<Car>(`/cars/${id}`)
    return data
};

export const sendRentalOrder = async (carId: string, BookingData: BookingReq) => {
    const { data } = await api.post(`/cars/${carId}/booking-requests`, BookingData)
    return data
};