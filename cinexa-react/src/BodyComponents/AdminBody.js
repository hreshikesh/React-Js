
import AdminLoginNavBar from '../NavBar/AdminLoginNavBar';
import AdminLoginForm from '../Forms/AdminLogin';


const AdminBody = () => {

    


   
    return(
        <div>
            <AdminLoginNavBar />
                <div className="mt-7 text-yellow-700 flex flex-col items-center justify-center">

                <h1 className="text-4xl font-bold mb-8">Admin Login</h1>
                <AdminLoginForm />
                
            </div >

        </div>
    )
}

export default AdminBody;