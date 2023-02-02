import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { NavbarSide } from '../components/NavbarSide'
import axios from 'axios'
import { API_URL } from '../utils/constant'

export const Home = () => {
    const navigate = useNavigate()
    const local = JSON.parse(window.localStorage.getItem("token"))
    useEffect(() => {

        if (!local) {
            window.history.pushState({}, '', '/login');
            navigate("/login");
            return;
        }
    }, [])


    const [totalbuku, setTotalBuku] = useState()
    const [totaluser, setTotalUser] = useState()
    const [iborrow, setIBorrow] = useState()
    const [totall, setTotAll] = useState()

    useEffect(() => {
        GetAllBook()
        LenUser()
        iBorrow()
        AllBorrow()
    }, [])


    const GetAllBook = () => {
        axios
            .get(`${API_URL}/Library`)
            .then((res) => {
                setTotalBuku(res.data.length)
            })
        }
        
        const LenUser = () => {
            axios
            .get(`${API_URL}/system/lenUser`)
            .then((res) => {
                setTotalUser(res.data)
            })
    }

    const iBorrow = () => {
        axios
            .get(`${API_URL}/pinjam/${local.user.email.split('@')[0]}`)
            .then((res) => {
                setIBorrow(res.data.length)
            })
    }

    const AllBorrow = () => {
        axios
            .get(`${API_URL}/pinjam`)
            .then((res) => {
                setTotAll(res.data.length)
            })
    }
    return (
        <>


            <div className="container-fluid">
                <div className="row justify-content-start">

                    {/* this content left  */}
                    <NavbarSide />

                    {/* this content center  */}
                    <div className="mx-3 p-0 col-8">
                        <div className="row  py-5">
                            <h2>Dashboard</h2>
                            <hr />
                            <div className="col-md-12" style={{ minHeight: '40vh' }}>
                                <div className="row d-flex justify-content-center">

                                    <div className="col p-0 m-2 d-flex flex-column justify-content-between alert alert-success">
                                        <div className="row m-2 my-4">
                                            <div className="col-1">
                                                <div className="total fw-bold fs-4">
                                                    {totalbuku}
                                                </div>
                                            </div>
                                            <div className="col-5 ms-auto">
                                                <i className="fa-solid fa-swatchbook fa-3x fs-1"></i>
                                            </div>
                                        </div>
                                        <div className='text-center fw-bold'>
                                            Total Buku
                                        </div>
                                    </div>

                                    <div className="col p-0 m-2 d-flex flex-column justify-content-between alert alert-danger">
                                        <div className="row m-2 my-4">
                                            <div className="col-1">
                                                <div className="total fw-bold fs-4">
                                                    {iborrow}
                                                </div>
                                            </div>
                                            <div className="col-5 ms-auto">
                                                <i className="fa-solid fa-clipboard fa-3x fs-1"></i>
                                            </div>
                                        </div>

                                        <div className='text-center fw-bold'>
                                            Saya Pinjam
                                        </div>
                                    </div>

                                    <div className="col p-0 m-2 d-flex flex-column justify-content-between alert alert-primary">
                                        <div className="row m-2 my-4">
                                            <div className="col-1">
                                                <div className="total fw-bold fs-4">
                                                    {totaluser}
                                                </div>
                                            </div>
                                            <div className="col-5 ms-auto">
                                                <i className="fa-solid fa-users fa-3x fs-1"></i>
                                            </div>
                                        </div>

                                        <div className='text-center fw-bold'>
                                            Total Anggota
                                        </div>
                                    </div>

                                    <div className="col p-0 m-2 d-flex flex-column justify-content-between alert alert-warning">
                                        <div className="row m-2 my-4">
                                            <div className="col-1">
                                                <div className="total fw-bold fs-4">
                                                    {totall}
                                                </div>
                                            </div>
                                            <div className="col-5 ms-auto">
                                                <i className="fa-solid fa-clock-rotate-left fa-3x fs-1"></i>
                                            </div>
                                        </div>

                                        <div className='text-center fw-bold'>
                                            Riwayat
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="col-12" style={{ marginTop: '1vh' }}>
                                <h1 className='text-center'>
                                    Selamat Datang di Aplikasi Perpustakaan
                                </h1>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
