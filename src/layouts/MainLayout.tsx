import { Outlet } from 'react-router';
import Navbar from '../ui/Navbar';

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
export default MainLayout;
