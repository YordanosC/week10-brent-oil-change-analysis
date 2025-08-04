// frontend/src/components/Dashboard.js

import React, {
    useEffect,
    useState,
    useContext // Import useContext
} from 'react';
import axios from 'axios';
import EventFilter from './EventFilter';
import PriceChart from './PriceChart';
import Statistics from './Statistics';
import DataExport from './DataExport';
import EventImpact from './EventImpact';
import {
    Container,
    Row,
    Col,
    Tabs,
    Tab,
    Spinner,
    Alert
} from 'react-bootstrap'; // More Bootstrap
import './Dashboard.css';

// Import the DateRangeContext
import { DateRangeContext } from '../contexts/DateRangeContext';

const Dashboard = () => {
    const {
        startDate,
        setStartDate,
        endDate,
        setEndDate
    } = useContext(DateRangeContext); // Use context

    const [getPrices, setPrices] = useState([]);
    const [analysis, setAnalysis] = useState({});
    const [averageYearlyData, setAverageYearlyData] = useState([]);
    const [priceDistributionData, setPriceDistributionData] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Fetch price data based on selected start and end date
    const fetchPrices = async () => {
        setLoading(true);
        setError(null);
        try {
            const priceResponse = await axios.get('http://localhost:5000/api/prices');
            console.log("Price trend response data:", priceResponse.data);

            // Assuming response data structure is { prices: [...], dates: [...] }
            const pricesData = priceResponse.data;
            const formattedData = pricesData.dates.map((date, index) => ({
                dates: date, // x-axis
                prices: pricesData.prices[index] // y-axis
            }));

            setPrices(formattedData); // Set formatted data to state
        } catch (error) {
            console.error("Error fetching price trend data:", error);
            setError("Failed to load price data. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    // Fetch analysis metrics for statistics display
    const fetchAnalysis = async () => {
        try {
            const analysisResponse = await axios.get('http://localhost:5000/api/analysis-metrics');
            setAnalysis(analysisResponse.data);
        } catch (error) {
            console.error("Error fetching analysis data:", error);
            setError("Failed to load analysis data.");
        }
    };

    // Fetch additional data: average yearly prices and price distribution
    const fetchAdditionalData = async () => {
        try {
            const yearlyResponse = await axios.get('http://localhost:5000/api/average-yearly-price');
            const distributionResponse = await axios.get('http://localhost:5000/api/price-distribution');
            setAverageYearlyData(yearlyResponse.data);
            setPriceDistributionData(distributionResponse.data);
            console.log(priceDistributionData)
        } catch (error) {
            console.error("Error fetching additional analysis data:", error);
            setError("Failed to load additional analysis data.");
        }
    };

    // Fetch data when startDate or endDate is updated
    useEffect(() => {
        fetchPrices();
        fetchAnalysis();
        fetchAdditionalData();
    }, [startDate, endDate]); //  dependency array includes startDate and endDate

    const handleFilterChange = (start, end) => {
        setStartDate(start);
        setEndDate(end);
    };

    return (
        <Container fluid className="dashboard-container">
            {loading && (
                <div className="loading-overlay">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </div>
            )}

            {error && (
                <Alert variant="danger" className="mt-3">
                    {error}
                </Alert>
            )}

            <Row className="mb-4">
                <Col>
                    <h2 className="dashboard-title">Brent Oil Price Dashboard</h2>
                    <p className="dashboard-description">
                        Explore how various events have impacted Brent oil prices over time. Use the filters below to narrow down the data, view analysis metrics, and export the results.
                    </p>
                </Col>
            </Row>

            <Tabs defaultActiveKey="statistics" id="dashboard-tabs" className="mb-4">

                {/* Statistics Tab */}
                <Tab eventKey="statistics" title="Statistics">
                    <Row className="mb-4">
                        <Col md={12}>

                            <Statistics analysis={analysis} />
                        </Col>


                    </Row>
                </Tab>

                {/* Price Trend, Yearly Average, and Distribution Tab */}
                <Tab eventKey="price-trend" title="Time Series Analysis">
                    <Row className="mb-4">
                        <Col >
                            <EventFilter onFilter={handleFilterChange} />
                        </Col>
                    </Row>
                    <Row className="mb-4">

                        <Col>
                            <PriceChart
                                data={getPrices}
                                chartType="line"
                                dataKey="prices"
                                xKey="dates"
                                title="Price Trend Over Time"
                            />

                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <PriceChart
                                data={averageYearlyData}
                                chartType="bar"
                                dataKey="Average_Price"
                                xKey="Year"
                                title="Average Yearly Price"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col>
                            <PriceChart
                                data={priceDistributionData}
                                chartType="bar"
                                dataKey="Frequency"
                                xKey="PriceRange"
                                title="Price Distribution"
                            />
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col className="text-end">
                            <DataExport data={getPrices} />
                        </Col>
                    </Row>
                </Tab>

                {/* Event Impact Tab */}
                <Tab eventKey="event-impact" title="Event Impact">
                    <EventImpact /> {/* Display the EventImpact component in this tab */}
                </Tab>
            </Tabs>

        </Container>
    );
};

export default Dashboard;