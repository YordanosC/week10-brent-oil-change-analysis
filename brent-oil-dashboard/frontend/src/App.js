// frontend/src/App.js
import React from 'react';
import Dashboard from './components/Dashboard';
import {
    DateRangeProvider
} from './contexts/DateRangeContext';

function App() {
    return ( <DateRangeProvider >
        <Dashboard / >
        </DateRangeProvider>
    );
}

export default App;