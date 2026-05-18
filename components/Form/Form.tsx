'use client'

import { useState } from "react";
import toast from "react-hot-toast";
import css from "./Form.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { sendRentalOrder } from "@/services/api";

interface BookingFormProps {
  carId: string;
}

export default function BookingForm({ carId }: BookingFormProps) {

    const [startDate, setStartDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);

        const bookingData = {
            name: formData.get("name") as string,
            email: formData.get("email") as string,
            comment: formData.get("comment") as string,
        };

    try {
        await sendRentalOrder(carId, bookingData);

        toast.success("Car rented successfully!");
        (e.target as HTMLFormElement).reset();
        setStartDate(new Date());
    } catch {
        toast.error("Something went wrong. Try again.");   
    } finally {
        setIsLoading(false);
        }
    };

    return (

        <section className={css.section}> 
            <h2 className={css.title}>Book your car now</h2>

            <p className={css.text}> 
                Stay connected! We are always ready to help you.   
            </p>

            <form className={css.form} onSubmit={handleSubmit}>

                <input   
                    className={css.input}
                    type="text"
                    name="name"
                    placeholder="Name*"
                    required 
                />

                <input
                    className={css.input}     
                    type="email"     
                    name="email"   
                    placeholder="Email*"
                    required
                />
                

                <div className={css.dateWrapper}>
                    <DatePicker              
                        selected={startDate}
                        onChange={(date: Date | null) => {
                            if (date) setStartDate(date);  
                        }}
                        minDate={new Date()}  
                        placeholderText="Booking date"          
                        dateFormat="dd/MM/yyyy"  
                        className={css.input}   
                        portalId="datepicker-portal"
                        required          
                    />  
                </div>
                
                <textarea 
                    className={css.textarea}   
                    name="comment"
                    placeholder="Comment"
                />

                <button
                    
                    className={`btn ${css.button}`}  
                    type="submit"
                    disabled={isLoading}      
                >
                    {isLoading ? "Sending..." : "Send"}  
                </button>
            </form>
        </section>
    );
};

