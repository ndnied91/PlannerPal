import { useState } from 'react';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useGlobalContext } from '../context';

const Modal = ({ setShowLoginModal, renderRegister }) => {
  const { setContextUser } = useGlobalContext();
  const [user, setUser] = useState({
    email: 'testing@test.com',
    password: '12345678',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await customFetch.post('/auth/login', user);

      setContextUser(data.user);
      window.location.reload();
      setShowLoginModal(false);
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'invalid credentials!');
      return error;
    }
  };

  return (
    <div className="relative z-10 " role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg self-center">
            <div className="bg-white px-4 pb-4 sm:p-6 sm:pb-4">
              <div className="">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <div className="mt-2">
                    <div className="align-center">
                      <form
                        className="form"
                        method="post"
                        onSubmit={handleSubmit}
                      >
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                          >
                            Email
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="text"
                            name="email"
                            placeholder="email"
                            required
                            value={user.email}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-6">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="password"
                          >
                            Password
                          </label>
                          <input
                            className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            name="password"
                            placeholder="******************"
                            required
                            value={user.password}
                            onChange={handleChange}
                          />
                        </div>

                        <div className="flex items-center justify-between">
                          <button
                            className="inline-flex  text-blue-500 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 w-auto"
                            type="submit"
                          >
                            Sign In
                          </button>
                          <a
                            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                            href="#"
                          >
                            Forgot Password?
                          </a>
                        </div>
                      </form>
                      {/* </Form> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6 flex justify-between text-sm">
              <div className="flex place-items-center">
                Not a member yet?{' '}
                <span
                  className=" text-blue-500 hover:text-blue-800 pl-2 cursor-pointer"
                  onClick={renderRegister}
                >
                  {' '}
                  Register
                </span>
              </div>
              <button
                onClick={() => setShowLoginModal(false)}
                type="button"
                className="inline-flex  text-red-700 justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 w-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
