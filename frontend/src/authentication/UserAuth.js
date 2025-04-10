import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axiosInstance';

const Auth = ({ onLogin }) => {
  const [isLoginPage, setIsLoginPage] = useState(true);
  const [isValid, setIsValid] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const navigate = useNavigate();

  const toggleAuthPage = () => {
    setIsLoginPage(!isLoginPage);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);

    if (isLoginPage) {
      setIsValid(updatedFormData.email && updatedFormData.password);
    } else {
      setIsValid(
        updatedFormData.name &&
        updatedFormData.email &&
        updatedFormData.password
      );
    }
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axiosInstance.post("/register", formData);
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      alert("Registration successful");
      navigate('/home');
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error(error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();  // Make sure e is an event object

    try {
      const { data } = await axiosInstance.post('/login', {
        email: formData.email.toLowerCase(),
        password: formData.password,
      });

      localStorage.setItem('token', data.token);
      localStorage.setItem("userInfo", JSON.stringify(data.user));
      alert("Login successful");

      navigate('/home');  // ✅ Correct navigation after login
    } catch (error) {
      setError('Login failed. Please check your credentials.');
      console.error(error);
    }
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <form
          className="w-1/3 p-8 bg-gray-200 text-gray-800 shadow-lg rounded-lg z-10"
          onSubmit={!isLoginPage ? handleRegister : handleLogin}
        >
          {!isLoginPage && (
            <div className="mb-4">
              <label className="block text-gray-700 font-medium">Name</label>
              <input
                type="text"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium">Email</label>
            <input
              type="text"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="relative mb-4">
            <label className="block text-gray-700 font-medium">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-2/3 transform -translate-y-1/2 bg-gray-200 p-1 rounded cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className={`w-full py-2 rounded-md text-white font-bold transition-all text-xl cursor-pointer ${
              isValid ? 'bg-blue-500 hover:bg-blue-600' : 'bg-gray-400'
            }`}
            disabled={!isValid}
          >
            {isLoginPage ? `Sign in` : `Sign up`}
          </button>

          <button
          type="button"
          className='mt-2 bg-green-600 font-bold rounded-lg w-full cursor-pointer text-white text-2xl hover:bg-green-700 py-2'
          onClick={() => {
            setFormData({
              ...formData,
              email: "lovely@gmail.com",
              password: "lovely",
            });
            }}
          >
            Continue as Guest
          </button>

          {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          <div>
            <p className="text-sm text-gray-500 mt-4">
              {isLoginPage ? `Don't have an account? ` : `Already have an account? `}
              <span
                className="text-blue-500 underline cursor-pointer"
                onClick={toggleAuthPage}
              >
                {isLoginPage ? 'Sign up' : 'Sign in'}
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;