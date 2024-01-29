import { useState } from 'react';
import customFetch from '../utils/customFetch';
import { toast } from 'react-toastify';
import { useGlobalContext } from '../context';

const RegisterModal = ({ setShowRegModal, renderSignIn }) => {
  const { setContextUser } = useGlobalContext();

  const [user, setUser] = useState({
    name: 'Jim Bob',
    email: 'testing@test.com',
    password: '12345678',
  });

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await customFetch.post('/auth/register', user);
      setContextUser(user);
      setShowRegModal(false);
      toast.success('Registration Successful!');
    } catch (error) {
      toast.error(error?.response?.data?.msg || 'unable to complete signup!');
      return error;
    }
  };

  return (
    <div className="relative z-10 " role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity z-10"></div>

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg self-center">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="">
                <div className="mt-3 text-center sm:mt-0 sm:text-left">
                  <div className="mt-2">
                    {/* forms starts here */}
                    <div className="align-center">
                      <form className="" onSubmit={handleSubmit}>
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="username"
                          >
                            Name
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            name="name"
                            type="text"
                            placeholder="Name"
                            required
                            value={user.name}
                            onChange={handleChange}
                          />
                        </div>
                        <div className="mb-4">
                          <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="username"
                          >
                            Email
                          </label>
                          <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            name="email"
                            type="text"
                            placeholder="Email"
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

                        <div className="flex items-center justify-center">
                          <button
                            className="inline-flex  text-blue-500  rounded-md bg-white px-20 py-2 text-sm font-semibold shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 w-auto"
                            type="submit"
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row sm:px-6 flex justify-between text-sm">
              <div className="flex place-items-center" id="tessst">
                Already a member?{' '}
                <span
                  className=" text-blue-500 hover:text-blue-800 pl-2 cursor-pointer"
                  onClick={renderSignIn}
                >
                  {' '}
                  Sign in
                </span>
              </div>
              <button
                onClick={() => setShowRegModal(false)}
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

export default RegisterModal;
