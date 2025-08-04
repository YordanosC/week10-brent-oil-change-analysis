# Brent Oil Price Analysis Dashboard

## Overview

This project aims to analyze the impact of major political and economic events on Brent oil prices. It provides an interactive dashboard that allows stakeholders to explore historical trends, forecasts, and correlations, supporting informed decision-making in the energy sector.

## Business Objective

To provide investors, analysts, and policymakers with actionable insights into how various events (political decisions, conflicts, economic sanctions, OPEC policies) influence Brent oil price fluctuations.

## Situational Overview

This project is part of a consultancy service provided by Birhan Energies, a leading firm specializing in data-driven insights for the energy sector. The task involves analyzing how big political and economic events affect Brent oil prices to offer strategic advice to stakeholders.

## Key Tasks

### Task 1: Data Analysis Workflow and Understanding

1.  **Defining the Data Analysis Workflow:**
    - **Objective:** Outline the steps for analyzing Brent oil prices, ensuring a comprehensive understanding of data generation, sampling, compilation, model inputs, and outputs.
    - **Outputs:** A clear workflow, assumptions, limitations, and communication channels for results.
2.  **Understanding the Model and Data:**
    - **Objective:** Grasp key concepts and models (ARIMA, GARCH) suitable for time series analysis related to Brent oil prices.
    - **Outputs:** An explanation of model purpose, application in analyzing price fluctuations, data generation processes, expected outputs, limitations, and prediction methods.

### Task 2: Analyzing and Adapting the Model

1.  **Analyze Brent Oil Prices:**
    - **Objective:** Apply knowledge of time series analysis to analyze historical Brent oil prices.
2.  **Utilize Additional Statistical and Econometric Models:**
    - **Objective:** Refine analysis by exploring advanced time series models such as VAR and machine learning models like LSTM networks.
3.  **Explore Other Potential Factors Influencing Oil Prices:**
    - **Objective:** Investigate how economic indicators (GDP, inflation, unemployment, exchange rates), technological changes, and political/regulatory factors affect oil prices.
4.  **Adapting the Model to a New Scenario:**
    - **Objective:** Extend the analysis to different commodities, integrate new variables, and validate the model's performance.

### Task 3: Developing an Interactive Dashboard

1.  **Backend (Flask):**
    - Develop APIs to serve data from analysis results.
    - Handle requests for datasets, model outputs, and performance metrics.
    - Integrate data sources for real-time updates (optional).
2.  **Frontend (React):**
    - Create an intuitive user interface to display analysis results.
    - Design interactive visualizations to show correlations between events and oil prices.
    - Include filters, date ranges, and comparisons for data exploration.
    - Ensure responsiveness for various devices.

## Key Features of the Dashboard

- **Historical Trends:** Present historical trends, forecasts, and correlations with events.
- **Event Highlighting:** Allow users to see how specific events influenced Brent oil prices.
- **Data Filtering:** Enable users to filter data, select date ranges, and drill down into details.
- **Key Indicators:** Display key indicators like volatility, average price changes, and model accuracy metrics (RMSE, MAE).

## Technologies Used

- **Backend:** Flask (Python)
- **Frontend:** React (JavaScript)
- **Charting Libraries:** React Chart.js 2, Recharts
- **Data Analysis:** Pandas, NumPy, Scikit-learn
- **Database:** (Specify if you used a database)

## Installation and Setup

1.  **Clone the repository:**

    ```bash
    git clone [repository URL]
    cd [project directory]
    ```

2.  **Backend (Flask):**

    ```bash
    cd backend
    pip install -r requirements.txt
    python app.py
    ```

3.  **Frontend (React):**
    ```bash
    cd frontend
    npm install
    npm start
    ```

## Usage

1.  Ensure both the Flask backend and React frontend are running.
2.  Access the dashboard in your web browser at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Commit your changes with descriptive messages.
4.  Submit a pull request.

## License

## Contact

[Alebachew Biset]
[alebachewbisett@gmail.com]
