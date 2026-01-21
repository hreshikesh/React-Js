

import AdminDashBoardBody from '../BodyComponents/AdminDashBoardBody';
import AdminDashBoardNavBar from '../NavBar/AdminDashBoardNavBar';





const AdminDashBoard = () => {
  

    return (
        <div className=" bg-gray-900 text-white">
            <AdminDashBoardNavBar />
            <AdminDashBoardBody />
            
        </div>
    );
}

export default AdminDashBoard;