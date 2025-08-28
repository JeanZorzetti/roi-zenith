import { Outlet } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import EasterEgg from '@/components/EasterEgg';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-pure-black text-pure-white overflow-x-hidden">
      <EasterEgg />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;