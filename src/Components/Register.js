import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  const [user, setUser] = useState({ name: '', email: '' , phone :'', password: '', confirmPassword: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user.password !== user.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    try {
      await axios.post('http://localhost:4000/customer/register', user);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <section className="bg-light py-md-5">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-5 col-xxl-4">
              <div className="card border border-light-subtle rounded-3 shadow-sm">
                <div className="card-body p-3 p-md-4 p-xl-5">
                  <h2 className="fs-4 fw-normal text-center text-secondary mb-4">Sign Up to your account</h2>
                  <form onSubmit={handleSubmit}>
                    <div className="row gy-2 overflow-hidden">
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="text" name="name" onChange={handleChange} className="form-control" placeholder='User Name' required />
                          <label htmlFor="name" className="form-label">Name</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="tel" name="phone" onChange={handleChange} className="form-control" placeholder='User Name' required />
                          <label htmlFor="phone" className="form-label">Phone Number</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="email" name="email" onChange={handleChange} className="form-control" placeholder="Email" required />
                          <label htmlFor="email" className="form-label">Email</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="password" className="form-control" name="password" onChange={handleChange} placeholder="Password" required />
                          <label htmlFor="password" className="form-label">Password</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-floating mb-3">
                          <input type="password" className="form-control" name="confirmPassword" onChange={handleChange} placeholder="Confirm Password" required />
                          <label htmlFor="password" className="form-label">Confirm Password</label>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="d-grid my-3">
                          <button className="btn btn-primary btn-lg" type="submit">Log in</button>
                        </div>
                      </div>
                      <div className="col-12">
                        <p className="m-0 text-secondary text-center">Have an account? <Link to="/login" className="link-primary text-decoration-none">Sign In</Link></p>
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

export default Register;
