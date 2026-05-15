import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AdminLoginForm from '@/modules/auth/ui/AdminLoginForm';


const HomePage = () => {
  return (
    <>
      <div className="h-[90vh] md:h-screen flex items-center justify-center px-4 md:px-0">
        <div className="flex w-[90%] md:w-[70%] mx-auto items-center justify-center">
          {/* Form Section */}
          <div className="w-full md:w-1/2 flex items-start justify-start">
            <AdminLoginForm />
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}

export default HomePage