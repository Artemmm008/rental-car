export interface Car {
    id: string;   
    year: number;   
    brand: string;    
    model: string;   
    type: string;
    img: string;
    description: string;   
    fuelConsumption: string;
    engine: string;   
    features: string[];    
    rentalPrice: string;    
    rentalCompany: string;    
    location: {    
        country: string;       
        city: string;   
        address: string;   
    };   
    rentalConditions: string[];
    mileage: number;
}

export interface CarResponse {
    cars: Car[];  
    totalPages: number;
    page: number;
}

export interface CarFilters {
    brand?: string;
    price?: number;
    minMileage?: number;
    maxMileage?: number;
    page?: number;
    perPage?: number;
}

export interface BookingReq {
    name: string;
    email: string;
    comment?: string;
}