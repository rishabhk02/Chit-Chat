import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignupForm = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
    });

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if (userInfo) navigate('/chat');
    }, []);


    const handleFieldChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            const response = await axios.post('http://localhost:5000/chat-app/register', formData);
            if (response.status == 201) {
                navigate('/');
            }
        } catch (error) {
            console.error(error);
            alert(error?.response?.data?.message || 'Something went wrong! Try again');
        }

    };

    return (
        <section className="vh-100" style={{ backgroundColor: "#eee" }}>
            <div className="container h-80">
                <div className="row d-flex justify-content-center align-items-center h-40">
                    <div className="col-lg-12 col-xl-11 mt-5">
                        <div className="card text-black" style={{ borderRadius: "25px" }}>
                            <div className="card-body p-md-5">
                                <div className="row justify-content-center">
                                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                                        <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>

                                        <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    {/* <label className="form-label" for="form3Example1c">First Name*</label> */}
                                                    <input type="text" placeholder='Enter First Name *' id="form3Example1c11" className="form-control"
                                                        value={formData?.firstName || ''} name='firstName' onChange={handleFieldChange} />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    {/* <label className="form-label" for="form3Example1c">Last Name*</label> */}
                                                    <input type="text" placeholder='Enter Last Name *' id="form3Example1c22" className="form-control"
                                                        value={formData?.lastName || ''} name='lastName' onChange={handleFieldChange} />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    {/* <label className="form-label" for="form3Example3c">Username*</label> */}
                                                    <input type="text" placeholder='Enter Username *' id="form3Example3c23" className="form-control"
                                                        value={formData?.userName || ''} name='userName' onChange={handleFieldChange} />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    {/* <label className="form-label" for="form3Example3c">Email*</label> */}
                                                    <input type="email" placeholder='Enter Email *' id="form3Example3c20" className="form-control"
                                                        value={formData?.email || ''} name='email' onChange={handleFieldChange} />
                                                </div>
                                            </div>

                                            <div className="d-flex flex-row align-items-center mb-4">
                                                <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                                                <div data-mdb-input-init className="form-outline flex-fill mb-0">
                                                    {/* <label className="form-label" for="form3Example4c">Password</label> */}
                                                    <input type="password" placeholder='Enter Password *' id="form3Example4de" className="form-control"
                                                        value={formData?.password || ''} name='password' onChange={handleFieldChange} />
                                                </div>
                                            </div>


                                            <div className="form-check d-flex justify-content-center mb-4">
                                                {/* <input className="form-check-input me-2" type="checkbox" value="" id="form2Example3c" /> */}
                                                <label className="form-check-label" htmlFor="form2Example3">
                                                    Already have an account ? <a href="/">Sign in</a>
                                                </label>
                                            </div>

                                            <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                <button type="submit" data-mdb-button-init data-mdb-ripple-init className="btn btn-primary btn-lg">Register</button>
                                            </div>

                                        </form>

                                    </div>
                                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                                            className="img-fluid" alt="Sample image" />

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SignupForm;