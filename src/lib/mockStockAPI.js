// This is a mock API to simulate fetching stock data
const generateMockData = (stockSymbol) => {
  const startDate = new Date('2023-01-01');
  const data = [];
  let price = 100 + Math.random() * 100; // Random starting price between 100 and 200

  for (let i = 0; i < 365; i++) {
    const date = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
    price += (Math.random() - 0.5) * 5; // Random daily change
    data.push({
      date: date.toISOString().split('T')[0],
      close: parseFloat(price.toFixed(2)),
    });
  }

  return data;
};

const calculateSMA = (data, period) => {
  return data.map((_, index) => {
    if (index < period - 1) return null;
    const sum = data.slice(index - period + 1, index + 1).reduce((acc, val) => acc + val.close, 0);
    return parseFloat((sum / period).toFixed(2));
  });
};

export const fetchStockData = async (stockSymbol) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  const mockData = generateMockData(stockSymbol);
  const ma50 = calculateSMA(mockData, 50);
  const ma200 = calculateSMA(mockData, 200);

  const stockData = mockData.map((item, index) => ({
    ...item,
    ma50: ma50[index],
    ma200: ma200[index],
  }));

  const latestPrice = stockData[stockData.length - 1].close;

  const supportResistance = {
    '3months': {
      support: parseFloat((latestPrice * 0.9).toFixed(2)),
      resistance: parseFloat((latestPrice * 1.1).toFixed(2)),
    },
    '6months': {
      support: parseFloat((latestPrice * 0.85).toFixed(2)),
      resistance: parseFloat((latestPrice * 1.15).toFixed(2)),
    },
    '1year': {
      support: parseFloat((latestPrice * 0.8).toFixed(2)),
      resistance: parseFloat((latestPrice * 1.2).toFixed(2)),
    },
  };

  const generateForecast = (days) => {
    const forecast = [];
    let forecastPrice = latestPrice;
    const lastDate = new Date(stockData[stockData.length - 1].date);

    for (let i = 1; i <= days; i++) {
      const date = new Date(lastDate.getTime() + i * 24 * 60 * 60 * 1000);
      forecastPrice += (Math.random() - 0.48) * 2; // Slight upward bias
      forecast.push({
        date: date.toISOString().split('T')[0],
        prediction: parseFloat(forecastPrice.toFixed(2)),
      });
    }
    return forecast;
  };

  const forecasts = {
    '6months': generateForecast(180),
    '1year': generateForecast(365),
    '5years': generateForecast(1825),
  };

  return {
    stockData,
    supportResistance,
    forecasts,
  };
};