import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/constant'
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
    let navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const emptyvalue = () =>{
        setEmail('')
        setPassword('')
    }


    const local = JSON.parse(window.localStorage.getItem("token"))
    // jika masih ada localStorage atau sudah Login(blm logout) maka lempar dia ke halaman admin langsung)
    useEffect(() => {
        if (local) {
            navigate("/login");
            return;
        }
    }, [])
    

    const Masuk = (e) => {
        e.preventDefault()
        axios
            .post(API_URL + `/system/login/`, {
                email: email,
                password: password,
            })
            // .then((res) => res.json())   
            .then((data)=>{
                emptyvalue()
                // console.log(data);
                if (data.data.status == "error") {
                    swal({
                        title: "Error!",
                        text: data.data.message,
                        icon: "error",
                      });
                }
                if(data.data.status == "ok"){
                    swal({
                        title: "Success!",
                        text: "Selamat Datang",
                        icon: "success",
                      });               
                    //   console.log(data.data.data);
                      window.localStorage.setItem("token",JSON.stringify({ token: data.data.data, user: data.data.user }))       
                    navigate("/");

                }
            }).catch((err)=>{
                swal({
                    title: "Gagal!",
                    text: 'Ada yang Salah Dengan Server',
                    icon: "error",
                  });
            })

    }

    return (
        <>
            <div className="container">
                <div className="row d-flex justify-content-center">

                    <div className="col-md-5 px-0 bg-light my-5 shadow" style={{ borderRadius: '10px' }}>
                        <div className="fs-3 fw-bold p-2 px-5" style={{ backgroundColor: '#87cfe8', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}>
                            Login
                        </div>
                        <div className="m-4">
                            <div className="form p-5 pt-3">
                                <form onSubmit={Masuk}>

                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control input-login bg-light" id="floatingInput" placeholder="name@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
                                        <label htmlFor="floatingInput">Email address</label>
                                    </div>
                                    <div className="form-floating mb-4">
                                        <input type="password" className="form-control input-login bg-light" id="floatingPassword" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
                                        <label htmlFor="floatingPassword">Password</label>
                                    </div>

                                    <button className='btn mb-3' type='submit' style={{ backgroundColor: '#87cfe8', width: '100%', height: '45px', borderRadius: '30px' }}>Login</button>
                                </form>

                                <div className='text-center'>Don't Have an Account? <Link to='/Registrasi' className='text-decoration-none fw-bold'>Sign Up</Link></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}
