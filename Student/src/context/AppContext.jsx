import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Stripe from 'stripe';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [teachers, setTeachers] = useState([]);
    const [error, setError] = useState(null);
    const [point, setPoint] = useState(0);
    
    const [accounts, setAccounts] = useState({
      myAccount: { id: '1', points: 100 },
      anotherAccount: { id: '2', points: 50 },
  });

  const transferPoints = (senderId, receiverId, amount) => {
    setAccounts((prev) => {
        const senderPoints = prev[senderId].points - amount;
        const receiverPoints = prev[receiverId].points + amount;
        return {
            ...prev,
            [senderId]: { ...prev[senderId], points: senderPoints },
            [receiverId]: { ...prev[receiverId], points: receiverPoints },
        };
    });
};

////////////
    
    

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
        <AppContext.Provider value={{ teachers ,accounts , transferPoints}}>
            {children}
        </AppContext.Provider>
    );
};