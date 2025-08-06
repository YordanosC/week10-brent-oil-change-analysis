# app.py
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS
from models.price_analysis import (
    calculate_analysis_metrics,
    calculate_price_trends,
    calculate_yearly_average_price,
    calculate_price_distribution,
    calculate_event_impact,
    get_prices_around_event
)

app = Flask(__name__)
CORS(app)

# Load data
try:
    data = pd.read_csv('../../data/data.csv', parse_dates=['Date'])
    data['Date'] = pd.to_datetime(data['Date'], format='mixed')
    data.set_index('Date', inplace=True)
    print("Price data loaded successfully.")
except FileNotFoundError:
    print("Error: Could not find the data file.")
    data = pd.DataFrame()  # Initialize as an empty DataFrame
except Exception as e:
    print(f"Error loading price data: {e}")
    data = pd.DataFrame()  # Initialize as an empty DataFrame

key_events = {
    "Russian Financial Crisis": "1999-08-17",
    "Hurricane Katrina": "2005-08-29",
    "Arab Spring": "2010-12-14",
    "U.S. shale oil boom": "2014-06-30",
    "Post-COVID-19 Recovery + OPEC+ Cuts": "2021-09-22",
}

@app.route('/api/price-trends', methods=['GET'])
def get_price_trends():
    try:
        trends_data = []
        for event, date in key_events.items():
            event_date = pd.to_datetime(date)
            prices_around_event = get_prices_around_event(event_date, data, days_before=180, days_after=180)
            trends_data.append({
                'event': event,
                'date': date,
                'prices': prices_around_event['Price'].tolist(),
                'dates': [d.isoformat() for d in prices_around_event.index]  # Format dates as ISO strings
            })
        return jsonify(trends_data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/event-impact', methods=['GET'])
def get_event_impact():
    try:
        results = []
        for event, date in key_events.items():
            impact_data = calculate_event_impact(event, date, data)
            results.append(impact_data)
        return jsonify(results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/analysis-metrics', methods=['GET'])
def get_analysis():
    try:
        analysis_results = calculate_analysis_metrics(data.reset_index())
        return jsonify(analysis_results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/prices', methods=['GET'])
def get_price_trend():
    try:
        start_date_str = request.args.get('startDate')
        end_date_str = request.args.get('endDate')

        if start_date_str and end_date_str:
            start_date = pd.to_datetime(start_date_str)
            end_date = pd.to_datetime(end_date_str)
            filtered_data = data[(data.index >= start_date) & (data.index <= end_date)]
        else:
            filtered_data = data

        # Generate dataset
        price_data_dict = calculate_price_trends(filtered_data)

        return jsonify(price_data_dict)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/average-yearly-price', methods=['GET'])
def get_yearly_average():
    try:
        analysis_results = calculate_yearly_average_price(data)
        return jsonify(analysis_results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/api/price-distribution', methods=['GET'])
def get_distribution():
    try:
        analysis_results = calculate_price_distribution(data)
        return jsonify(analysis_results)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)