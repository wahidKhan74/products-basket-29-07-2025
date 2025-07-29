import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import api from '../api/api';
import { login } from '../features/auth/authSlice';

export default function Login() {
    // import necessary hooks and actions
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // create fields for email and password
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // create state for error messages
    const [error, setError] = useState('');
    const [ validation, setValidation] = useState({ email: '', password: '' });

    // handle input changes
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    }

    // validate inputs
    const validateForm = () => {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let emailError = '', passwordError = '';

        if (!emailRegex.test(email)) {
            emailError = 'Invalid email format';
            isValid = false;
        }

        if (password.length < 6) {
            passwordError = 'Password must be at least 6 characters';
            isValid = false;
        }

        setValidation({ email: emailError, password: passwordError });
        return isValid;
    };

    // handle form submission
    const handleLogin = async (e) => {
        // prevent default form submission
        e.preventDefault();
        // clear previous error messages
        if (!validateForm()) return;
        try {
            const res = await api.get(`/users?email=${email}&password=${password}`);
            if (res.length > 0) {
                const user = res[0];
                // dispatch login action and navigate to home page
                dispatch(login(user));
                // store user in local storage
                localStorage.setItem('user', JSON.stringify(user));
                // redirect to home page
                navigate('/');
            } else {
                setError('Invalid email or password');
            }
        } catch (err) {
        console.error(err);
        setError('Login failed');
        }
  };


    return (
         <div className="mt-20 flex items-center justify-center px-4">
        <div className="bg-white p-6 rounded-2xl shadow-lg border w-full max-w-sm ">
            <h2 className="text-xl font-bold mb-6 text-center">
            <i className="fas fa-user-circle text-3xl text-blue-600 mr-2"></i>Login
            </h2>
            <form onSubmit={handleLogin} className="space-y-4">
            <div>
                <label className="block mb-1">Email</label>
                <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400">
                    <i className="fas fa-envelope"></i>
                </span>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border rounded pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                </div>
                {validation.email && <p className="text-red-500 text-sm mt-1">{validation.email}</p>}
            </div>
            <div>
                <label className="block mb-1">Password</label>
                <div className="relative">
                <span className="absolute left-3 top-2.5 text-gray-400">
                    <i className="fas fa-lock"></i>
                </span>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full border rounded pl-10 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                />
                </div>
                {validation.password && <p className="text-red-500 text-sm mt-1">{validation.password}</p>}
            </div>
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}
            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-200"
            >
                <i className="fas fa-sign-in-alt mr-2"></i>Login
            </button>
            </form>
        </div>
        </div>
    );
}