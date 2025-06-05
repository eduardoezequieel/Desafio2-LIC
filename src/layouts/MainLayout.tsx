import { Outlet } from 'react-router';
import Navbar from '../ui/Navbar';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="pt-[72px]">
        <Outlet />
      </div>
    </>
  );
};
export default MainLayout;
