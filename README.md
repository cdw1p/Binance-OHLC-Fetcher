# Binance-OHLC-Fetcher
This Node.js script is designed to fetch historical market data from the Binance API for various cryptocurrency trading pairs and timeframes. It provides a structured approach to retrieve open, high, low, and close (OHLC) data for different intervals, helping users analyze market trends over specific periods.

## Features
- Fetches market history data for multiple trading pairs.
- Supports a wide range of timeframes, from 1 hour to 1 week.
- Saves the fetched data in JSON format, organized by trading pair and timeframe.
- Utilizes asynchronous programming for efficient data retrieval.

## Prerequisites
- Node.js installed on your system.
- axios for making HTTP requests.
- fs-extra for filesystem operations with additional capabilities.

## Installation
Before running the script, you need to install the necessary Node.js packages. Run the following commands in your terminal:
```bash
npm init -y
npm install axios fs-extra
```
or
```bash
npm install
```

## Usage
To start fetching market data, run the script with Node.js:
```bash
node index.js
```
The script performs the following operations:
- Iterates over a predefined list of cryptocurrency trading pairs.
- For each pair, it fetches historical data across a set of timeframes.
- The data is then saved in a structured JSON format in the ./data directory, with filenames corresponding to the trading pair and timeframe.

## Configuration
You can customize the script by modifying the following variables:
- listPair: An array of trading pairs to fetch data for.
- listTimeframe: A list of timeframes for which you want to retrieve historical data.
- lookback: Determines how many intervals to look back for each timeframe.

## Important Notes
- Ensure you have an active internet connection and that the Binance API is accessible from your network.
- Be mindful of API rate limits. This script includes a delay between requests to prevent hitting the rate limits, but excessive use may still trigger restrictions.

## Disclaimer
This script is for educational purposes only.