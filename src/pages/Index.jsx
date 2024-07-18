import { useState } from 'react';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const [stockName, setStockName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (stockName.trim()) {
      navigate(`/results/${stockName}`);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Stock Analysis App</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col space-y-4">
          <Input
            type="text"
            placeholder="Enter stock name"
            value={stockName}
            onChange={(e) => setStockName(e.target.value)}
            className="w-full"
          />
          <Button type="submit" className="w-full">
            Analyze Stock
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Index;