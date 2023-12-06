// pages/Login.js

import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../src/layout/Layout';
import PageBanner from '../src/components/PageBanner';
import { login } from "../utils/api";

const Login = () => {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async() => {
      try {
        const userData = await login(email, password);
        console.log('Login successful:', userData.userdetails);
  
        router.push('/');
      } catch (error) {
        setError(error.message);       
      }
  };

  return (

    <Layout>
    <PageBanner pageName={"Login"} ></PageBanner>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mb-80 mt-80">
            <div className="card-header">Login</div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="username"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn "
                  style={{background:"#76A713", color:"white", padding:"10px 20px 10px 18px"}}
                  onClick={handleLogin}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Layout>

  );
};

export default Login;
