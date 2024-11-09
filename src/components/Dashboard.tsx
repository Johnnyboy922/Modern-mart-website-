import { Card, Title, AreaChart, DonutChart, BarList } from '@tremor/react';
import { useStore } from '../store/useStore';

export default function Dashboard() {
  const { user, recentlyViewed } = useStore();

  if (!user) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <p className="text-xl text-gray-600">Please login to view your dashboard</p>
      </div>
    );
  }

  const salesData = [
    { date: '2024-01', sales: 2300 },
    { date: '2024-02', sales: 3200 },
    { date: '2024-03', sales: 4100 },
  ];

  const categoryDistribution = [
    { name: 'Electronics', value: 35 },
    { name: 'Clothing', value: 25 },
    { name: 'Books', value: 20 },
    { name: 'Home', value: 20 },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <Title>Sales Overview</Title>
          <AreaChart
            className="h-72 mt-4"
            data={salesData}
            index="date"
            categories={['sales']}
            colors={['blue']}
          />
        </Card>
        <Card>
          <Title>Category Distribution</Title>
          <DonutChart
            className="h-72 mt-4"
            data={categoryDistribution}
            category="value"
            index="name"
            colors={['blue', 'cyan', 'indigo', 'violet']}
          />
        </Card>
      </div>
      
      <Card>
        <Title>Recently Viewed</Title>
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentlyViewed.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow"
            >
              <img
                src={product.images[0]}
                alt={product.title}
                className="w-full h-40 object-cover rounded-md"
              />
              <h3 className="mt-2 font-semibold">{product.title}</h3>
              <p className="text-gray-600">${product.price}</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}