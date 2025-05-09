import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/'); 
  };

  return (
    <div>
      <button onClick={handleLogout} className='border-2 border-black rounded-xl hover:bg-gray-800 bg-slate-900 text-white font-bold p-2 text-xl mt-4 mx-2 cursor-pointer'>
        Logout
      </button>
    </div>
  );
};

export default Logout;