import React from 'react'
import { useLocation } from 'react-router-dom'

export const Header = () => {
    const location = useLocation();
    if (location.pathname === "/login" || location.pathname === "/Registrasi") {
        return null;
    }
    const local = JSON.parse(window.localStorage.getItem("token"))
    return (
        <>
            {
                local && (

                    <nav className="navbar navbar-expand-lg navbar-light shadow" style={{ background: '#87cfe8' }}>
                        <div className="container-fluid">
                            <a className="navbar-brand h1 fw-bold fs-3 ms-5" href="#">Peminjaman Buku Perpustakaan</a>
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav ms-auto">
                                    <a className="nav-link active fw-bold" href="#">{local.user.username} - {local.user.email.split('@')[0]}</a>
                                </div>
                            </div>
                        </div>
                    </nav>
                )
            }


        </>
    )
}
