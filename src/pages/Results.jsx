import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';
import { fetchStockData } from '@/lib/mockStockAPI';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Results = () => {
  const { stockName } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ['stockData', stockName],
    queryFn: () => fetchStockData(stockName),
  });

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error.message}</div>;

  const renderSupportResistance = () => (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">Support and Resistance Levels</h2>
      {Object.entries(data.supportResistance).map(([period, levels]) => (
        <div key={period} className="mb-2">
          <p><strong>{period}:</strong> Support: {levels.support.toFixed(2)}, Resistance: {levels.resistance.toFixed(2)}</p>
        </div>
      ))}
    </div>
  );

  const renderForecasts = () => (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">Price Forecasts</h2>
      {Object.entries(data.forecasts).map(([period, forecast]) => (
        <div key={period} className="mb-4">
          <h3 className="text-lg font-semibold mb-2">{period} Forecast</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={forecast}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="prediction" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );

  const renderStockChart = () => (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-xl font-bold mb-4">Stock Price and Moving Averages</h2>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data.stockData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="close" stroke="#8884d8" name="Close Price" />
          <Line type="monotone" dataKey="ma50" stroke="#82ca9d" name="50-day MA" />
          <Line type="monotone" dataKey="ma200" stroke="#ffc658" name="200-day MA" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Results for {stockName}</h1>
      {renderStockChart()}
      {renderSupportResistance()}
      {renderForecasts()}
      <div className="text-center">
        <Button onClick={() => navigate('/')}>
          Analyze Another Stock
        </Button>
      </div>
    </div>
  );
};

export default Results;