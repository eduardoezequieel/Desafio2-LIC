import { Outlet } from 'react-router';
import Navbar from '../ui/Navbar';
import { Toaster } from 'sonner';

const MainLayout = () => {
  return (
    <>
      <Toaster richColors />
      <Navbar />
      <div className="pt-[72px]">
        <Outlet />
      </div>
    </>
  );
};
export default MainLayout;
