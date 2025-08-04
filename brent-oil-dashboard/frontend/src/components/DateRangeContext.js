// frontend/src/contexts/DateRangeContext.js

import React, {
    createContext,
    useState
} from 'react';

// Create the context
export const DateRangeContext = createContext();

// Create a provider component
export const DateRangeProvider = ({
    children
}) => {
    const [startDate, setStartDate] = useState(new Date('2023-01-01')); // Default start date
    const [endDate, setEndDate] = useState(new Date('2024-01-01')); // Default end date

    return ( <
        DateRangeContext.Provider value = {
            {
                startDate,
                setStartDate,
                endDate,
                setEndDate
            }
        } > {
            children
        } </DateRangeContext.Provider>
    );
};