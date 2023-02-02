import React from 'react'
import { useLocation } from 'react-router-dom'

export const Header = () => {
    const location = useLocation();
    if (location.pathname === "/login" || location.pathname === "/Registrasi") {
        return null;
    }
    return (
        <>

            <nav class="navbar navbar-expand-lg p-3 sticky-top navbar-light bg-light">
                <div class="container-fluid">

                    <div className="container" style={{ marginLeft: '50vh' }}>
                        <a class="navbar-brand h1 fw-bold fs-3">Peminjaman Buku Perpustakaan</a>
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">

                        </div>
                    </div>
                </div>
            </nav>

        </>
    )
}
