import React, { useEffect, useState } from 'react'
import { NavbarSide } from '../components/NavbarSide'
import axios from 'axios'
import { API_URL } from '../utils/constant'
import { useNavigate } from 'react-router-dom'

export const Riwayat = () => {
    const [load, setLoad] = useState(false)

    const navigate = useNavigate()
    const local = JSON.parse(window.localStorage.getItem("token"))
    
    useEffect(() => {

        if (!local) {
            window.history.pushState({}, '', '/login');
            navigate("/login");
            return;
        }
        setLoad(true)
        GetHistory()
    }, [])

    const [datariwayat, setDataRiwayat] = useState()

    const GetHistory = () => {
        axios
            .get(`${API_URL}/pinjam/${local.user.email.split('@')[0]}`)
            .then((res) => {
                setDataRiwayat(res.data)
                console.log(res.data)
            })
    }

    return (
        <>
            {
                load && (

                    <div className="container-fluid">
                        <div className="row justify-content-start text-light">

                            {/* this content left  */}
                            <NavbarSide />

                            {/* this content center  */}
                            <div className="mx-3 p-0 col-8">
                                <div className="row d-flex justify-content-center py-5">
                                    <h2>Riwayat</h2>
                                    <hr />
                                    <div className=" col-md-11 d-flex justify-content-center ">
                                        <table className="table table-light table-striped">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Cover</th>
                                                    <th scope="col">Kode Buku</th>
                                                    <th scope="col">Judul Buku</th>
                                                    <th scope="col">Pengarang</th>
                                                    <th scope="col">Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    datariwayat && datariwayat.map((data) => (
                                                        <>
                                                            {data.buku.map((buku) => (
                                                                <tr>
                                                                    <td>
                                                                        <img src={buku.gambarCover} style={{ width: '200px', height: '270px', objectFit: 'cover' }} className='img-fluid' alt="" />
                                                                    </td>
                                                                    <td>{buku._id}</td>
                                                                    <td>{buku.judul}</td>
                                                                    <td>{buku.penerbit}</td>
                                                                    <td>{data.total}</td>
                                                                </tr>
                                                            ))}
                                                        </>
                                                    ))
                                                }
                                            </tbody>
                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                )
            }

        </>
    )
}
