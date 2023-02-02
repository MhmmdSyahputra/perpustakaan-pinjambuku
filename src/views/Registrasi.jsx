import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/constant'
import swal from 'sweetalert';

export const Registrasi = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    // verif email agar email yg diterima hanya email seperti punya mikroskil 
    const emailRegex = /^\d{9}@students.mikroskil.ac.id$/;

    const Signup = (e) => {
        e.preventDefault();

        if (email == '' || password == '') {
            swal({
                title: "Error!",
                text: "Data Masih Ada Yang Kosong",
                icon: "error",
              });
            emptyvalue()
            return
        }

        if (!emailRegex.test(email)) {
            swal({
                title: "Error!",
                text: 'Email Tidak Valid!\ncth:211110636@stundents.mikroskil.ac.id',
                icon: "error",
              });
            emptyvalue()
            return
        }
        
        axios
        .post(API_URL + `/system/registrasi/`, {
            username: username,
            email: email,
            password: password,
        })
        .then((response) => {
            // console.log(response);
            
            // jika email sudah di pakai 
            if (response.data.error) {
                swal({
                  title: "Error!",
                  text: response.data.error,
                  icon: "error",
                });
                emptyvalue()
                return;
              }

            swal({
                title: "Success!",
                text: response.data.message,
                icon: "success",
              });
              emptyvalue()
            
        })
        .catch((err)=>{
            swal({
                title: "Gagal!",
                text: 'Ada yang Salah Dengan Server',
                icon: "error",
              });
        })
       
    }

    const emptyvalue = () =>{
        setUsername('')
        setEmail('')
        setPassword('')
    }


    return (
        <>
            <div className="container">
                <div className="row d-flex justify-content-center">

                    <div className="col-md-5 px-0 bg-light my-5 shadow" style={{ borderRadius: '10px' }}>
                        <div className="fs-3 fw-bold text-light p-2 px-5" style={{ backgroundColor: '#094584', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                            Sign Up
                        </div>
                        <div className="m-4">
                            <div className="form p-5 pt-3">

                                <form onSubmit={Signup}>

                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control input-login bg-light" id="username" placeholder="Putra" value={username} onChange={e=>setUsername(e.target.value)} />
                                        <label htmlFor="username">Username</label>
                                    </div>
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control input-login bg-light" id="email" placeholder="name@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
                                        <label htmlFor="email">Email address</label>
                                    </div>
                                    <div className="form-floating mb-4">
                                        <input type="password" className="form-control input-login bg-light" id="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
                                        <label htmlFor="password">Password</label>
                                    </div>


                                    <button className='btn text-light mb-3' type='submit' style={{ backgroundColor: '#094584', width: '100%', height: '45px', borderRadius: '30px' }}>Sign Up</button>

                                </form>

                                <div className='text-center'>Already have an Account? <Link to='/Login' className='text-decoration-none fw-bold'>Sign In</Link></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
