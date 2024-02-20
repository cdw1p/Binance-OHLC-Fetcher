const axios = require('axios')
const fs = require('fs-extra')

/**
 * Fetches market data from Binance API.
 * @param {string} pair - The trading pair symbol.
 * @param {string} timeframe - The interval of the data (e.g., '1m', '5m', '1h').
 * @param {number} lookback - The number of intervals to look back.
 * @returns {Promise<Object>} - The response object containing the status code and market data.
 */
getMarketHistory = async (pair, timeframe, lookback = 1) => {
  try {
    const hoursSequence = [], ohlcDataSequence = []
    const hoursData = { '1h': 1, '2h': 2, '4h': 4, '6h': 6, '8h': 8, '12h': 12, '1d': 24, '3d': 72, '1w': 168, '1M': 720 }
    const hoursInPoint = hoursData[timeframe] * 3600000 * 1000
    const hoursTimeNow = new Date().getTime()
    for (let i = 0; i < lookback; i++) {
      hoursSequence.push(hoursTimeNow - (hoursInPoint * i))
    }
    for (let hours of hoursSequence) {
      const { status: statusCode, data: dataMarket } = await axios.get(`https://www.binance.me/fapi/v1/markPriceKlines?symbol=${pair}&limit=1000&interval=${timeframe}&endTime=${hours}`)
      if (statusCode === 200) {
        if (dataMarket.length > 0) {
          ohlcDataSequence.push(...dataMarket)
        } else {
          break
        }
      }
    }
    if (ohlcDataSequence.length > 0) {
      return [...new Set(ohlcDataSequence)].sort((a, b) => a[6] - b[6])
    }
    return []
  } catch (err) {
    throw new Error(err)
  }
}

/**
 * Main function that serves as the entry point of the program.
 */
const main = async () => {
  try {
    const listPair = ['BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'SOLUSDT', 'XRPUSDT', 'ADAUSDT', 'AVAXUSDT', 'DOGEUSDT', 'TRONUSDT', 'LINKUSDT', 'DOTUSDT', 'MATICUSDT']
    const listTimeframe = ['1h', '2h', '4h', '6h', '8h', '12h', '1d', '3d', '1w']
    for (let pair of listPair) {
      try {
        console.log(`\n+ Fetching market history data for ${pair}`)
        for (let timeframe of listTimeframe) {
          console.log(`  - Looking back ${timeframe}...`)
          await getMarketHistory(pair, timeframe, 9999).then(data => {
            if (data.length > 0) {
              console.log(`  - Found ${data.length} data points...`)
              if (!(fs.existsSync('./data'))) {
                fs.mkdirSync('./data')
              }
              console.log(`  - Writing data to file...`)
              fs.writeJsonSync(`./data/${pair}-${timeframe}.json`, data, { spaces: 2 })
            }
          })
          setTimeout(() => { }, 5000)
        }
      } catch (err) {
        console.error(`Failed to fetch market history data for ${pair}: ${err.message}`)
      }
    }
  } catch (err) {
    console.error(err)
  }
}

/**
 * Run the main function
 */
main()