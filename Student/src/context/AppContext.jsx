import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Stripe from 'stripe';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [teachers, setTeachers] = useState([]);
       
/////////////////////

    useEffect(() => {
        const fetchTeachers = async () => {
            try {
                const response = await axios.get('https://booking-lessons-production.up.railway.app/api/teachers'); // Adjust the URL as necessary
                setTeachers(response.data.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTeachers();
    }, []);

    return (
        <AppContext.Provider value={{ teachers }}>
            {children}
        </AppContext.Provider>
    );
};