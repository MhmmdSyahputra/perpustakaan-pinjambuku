import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

export const NavbarSide = () => {
    const navigate = useNavigate()

        const Logout = () => {
            window.localStorage.removeItem("token");
            // window.location.replace("/login");
            window.history.pushState({}, '', '/login');
            navigate("/login");
          }
    return (
        <>
            <div className="col-3 me-5" style={{background:'#ADD8E6'}}>

                <nav className="nav d-block sticky-top">
                    <Link to='/' className="nav-link my-4 text-dark" href="#"><i className="fa-solid fa-house-chimney fs-3 me-4"></i>Dasboard</Link>
                    <Link to='/DaftarBuku' className="nav-link my-4 text-dark" href="#"><i className="fa-solid fa-book fs-3 me-4"></i>Daftar Buku</Link>
                    <Link to='/Peminjaman/nobook' className="nav-link my-4 text-dark" href="#"><i className="fa-solid fa-book-bookmark fs-3 me-4"></i>Peminjaman Buku</Link>
                    <Link to='/Riwayat' className="nav-link my-4 text-dark" href="#"><i className="fa-solid fa-clock-rotate-left fs-3 me-4"></i>Riwayat</Link>
                    <a className="nav-link my-4 text-dark" href="#" onClick={()=>Logout()}><i className="fa-solid fa-right-from-bracket fs-3 me-4"></i>Logout</a>
                </nav>
            </div>
        </>
        
    )
}
