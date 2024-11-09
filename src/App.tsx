import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import Marketplace from './components/Marketplace';
import LiveStreams from './components/LiveStreams';
import RareItems from './components/RareItems';
import Profile from './components/Profile';
import Cart from './components/Cart';
import Auth from './components/Auth';
import ProductDetails from './components/ProductDetails';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Marketplace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/live" element={<LiveStreams />} />
              <Route path="/rare-items" element={<RareItems />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/product/:id" element={<ProductDetails />} />
            </Routes>
          </main>
        </div>
      </Router>
    </QueryClientProvider>
  );
}