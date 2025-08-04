// frontend/src/contexts/DateRangeContext.js
import React, {
    createContext,
    useState
} from 'react';
export const DateRangeContext = createContext();
export const DateRangeProvider = ({
    children
}) => {
    const [startDate, setStartDate] = useState(new Date('2023-01-01'));
    const [endDate, setEndDate] = useState(new Date('2024-01-01'));
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