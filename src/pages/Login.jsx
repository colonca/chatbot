import React, { useState } from 'react';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import AuthServices from '../services/AuthServices';
import { setToken } from '../utils/auth-helper';

function Login() {
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  async function handleSubmit(values) {
    try {
      const resp = await AuthServices.login(values);
      if (resp.status === 200) {
        setToken(resp.token);
        navigate('/dashboard');
      }
    } catch (err) {
      setMessage(err.message);
    }
  }
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img
            className="mx-auto h-28 w-auto"
            src="https://hotelwayaguajira.com/wp-content/uploads/2020/08/Waya-V.svg"
            alt="Workflow"
          />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Iniciar Sesion
          </h2>
          {message}
        </div>
        <Formik
          initialValues={{
            email: '',
            password: ''
          }}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {(formik) => (
            <form
              className="mt-8 space-y-6"
              action="#"
              method="POST"
              onSubmit={formik.handleSubmit}
            >
              <input type="hidden" name="remember" value="true" />
              <div className="rounded-md shadow-sm -space-y-px">
                <div>
                  <label htmlFor="email-address" className="sr-only">
                    Email
                  </label>
                  <input
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                    name="email"
                    type="email"
                    value={formik.values.email}
                    required
                    placeholder="Email"
                    onChange={formik.handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Contraseña
                  </label>
                  <input
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    id="password"
                    name="password"
                    type="password"
                    value={formik.values.password}
                    autoComplete="current-password"
                    required
                    placeholder="Contraseña"
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-700 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <svg
                      className="h-5 w-5 text-gray-100 group-hover:text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  Iniciar Sesion
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Login;
