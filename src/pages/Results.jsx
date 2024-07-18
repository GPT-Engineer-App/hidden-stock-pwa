import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Button } from "@/components/ui/button"
import { useNavigate } from 'react-router-dom';

const fetchStockData = async (stockName) => {
  // This is a placeholder for the actual API call
  // In a real app, you would call your backend API here
  const response = await fetch(`/api/stock/${stockName}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const Results = () => {
  const { stockName } = useParams();
  const navigate = useNavigate();

  const { data, error, isLoading } = useQuery({
    queryKey: ['stockData', stockName],
    queryFn: () => fetchStockData(stockName),
  });

  if (isLoading) return <div className="text-center mt-8">Loading...</div>;
  if (error) return <div className="text-center mt-8 text-red-500">Error: {error.message}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Results for {stockName}</h1>
      {data && (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <p className="mb-4"><strong>Open:</strong> {data.open}</p>
          <p className="mb-4"><strong>High:</strong> {data.high}</p>
          <p className="mb-4"><strong>Low:</strong> {data.low}</p>
          <p className="mb-4"><strong>Close:</strong> {data.close}</p>
          <p className="mb-4"><strong>Volume:</strong> {data.volume}</p>
        </div>
      )}
      <div className="text-center">
        <Button onClick={() => navigate('/')}>
          Analyze Another Stock
        </Button>
      </div>
    </div>
  );
};

export default Results;