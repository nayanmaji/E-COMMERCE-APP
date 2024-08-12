import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:4000/customer/login', { phone, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('customer_id', res.data.customer_id);
      navigate('/');
    } catch (err) {
      console.error(err);
      alert('Invalid credentials');
    }
  };

  return (
    <>
      <section className="bg-light py-3 py-md-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
              <div className="card border border-light-subtle rounded-3 shadow-sm">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <h2 className="fs-4 fw-normal text-center text-secondary mb-4">Log in to your account</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="row gy-2 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" name="phone" placeholder='Phone Number' required />
                          <label htmlFor="user-name" className="form-label">Phone Number</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="password" className="form-control" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                          <label htmlFor="password" className="form-label">Password</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid my-3">
                          <button className="btn btn-primary btn-lg" type="submit">Log in</button>
                        </div>
                      </div>
                      <div className="col-12">
                        <p className="m-0 text-secondary text-center">Don't have an account? <Link to="/register" className="link-primary text-decoration-none">Sign up</Link></p>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
