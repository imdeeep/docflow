import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { authInstance } from '/src/firebase.js';
import LoadingBar from 'react-top-loading-bar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const loadingBarRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Start the loading bar
      loadingBarRef.current.continuousStart();

      await signInWithEmailAndPassword(authInstance, email, password);
 
      setTimeout(() => {
        loadingBarRef.current.complete();
        alert('Successfully logged in!');
        
        // Navigate to Home
        navigate('/');
      }, 1000);
    } catch (error) {
      console.error('Error during login:', error.message);
      if (error.code === 'auth/wrong-password') {
        setError('Invalid password. Please try again.');
      } else if (error.code === 'auth/network-request-failed') {
        setError('Network issue. Please check your internet connection and try again.');
      } else if (error.code === 'auth/too-many-requests') {
        setError('Account temporarily disabled due to too many failed login attempts. Please try again later or reset your password.');
      } else {
        setError('Invalid email or password. Please try again.');
      }

      loadingBarRef.current.complete();
    }
  };  

  return (
    <>
      <section className="bg-gray-50 dark:bg-white">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-2 mt-2 text-3xl font-bold text-gray-900 dark:text-black">
            LOG IN
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-100 dark:border-gray-400">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-black">
                Login to an existing account
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black"
                    placeholder="name@mail.com"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-100 dark:border-gray-400 dark:placeholder-gray-400 dark:text-black"
                      required
                    />
                    <span
                      className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <svg
                          className="h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M17.707 2.293a1 1 0 0 1 1.414 1.414l-1.4 1.4a7.982 7.982 0 0 1-2.117-.902L12 4a7 7 0 0 1 0 14 7 7 0 0 1-4.342-1.488l-1.415 1.414A8.966 8.966 0 0 0 12 20a9 9 0 0 0 9-9 8.965 8.965 0 0 0-1.488-4.341l1.414-1.415zM12 6a5 5 0 0 0 0 10 5 5 0 0 0 0-10zm1 2a3 3 0 0 0-6 0 3 3 0 0 0 6 0zm-6 6a3 3 0 0 0 6 0 3 3 0 0 0-6 0z"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="h-5 w-5 text-gray-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                            clipRule="evenodd"
                          />
                          <path
                            fillRule="evenodd"
                            d="M2 10a8 8 0 1116 0 8 8 0 01-16 0zm8-6a6 6 0 00-6 6 6 6 0 1012 0 6 6 0 00-6-6z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                    </span>
                  </div>
                </div>
                {error && (
                  <p className="text-sm font-light text-red-500 dark:text-red-500">
                    {error}
                  </p>
                )}
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      aria-describedby="terms"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-50 dark:border-gray-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-light text-gray-900 dark:text-gray-900">
                      I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a>
                    </label>
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-black dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Login
                </button>
                <p className="text-sm font-light text-gray-900 dark:text-gray-900">
                  Don't have an Account ? <Link to="/signup" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Signup here</Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <LoadingBar color='#005CC8' ref={loadingBarRef} />
    </>
  );
};

export default Login;
