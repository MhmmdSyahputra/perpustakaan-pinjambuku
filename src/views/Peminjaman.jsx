import React, { useState, useEffect } from 'react'
import { NavbarSide } from '../components/NavbarSide'
import moment from 'moment';
import { customAlphabet } from 'nanoid'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/constant';
import swal from 'sweetalert';

export const Peminjaman = () => {

    const navigate = useNavigate()
    const local = JSON.parse(window.localStorage.getItem("token"))
    const [load, setLoad] = useState(false)

    useEffect(() => {

        if (!local) {
            window.history.pushState({}, '', '/login');
            navigate("/login");
            return;
        }
        cekbook()
        setLoad(true)
        getBook()

    }, [])

    const timeNow = moment().format('DD/MM/YYYY');
    const nanoid = customAlphabet('1234567890abcdef', 10)
    const idTrans = 'MK-' + nanoid()

    const [onebook, setOneBook] = useState()

    // idbuku yg didapat di params 
    // cek apakah dia membawa idbuku 
    const cekbook = () => {
        if (params.id == 'nobook') {
            swal({
                title: "Error!",
                text: "Pilih Buku Dahulu!",
                icon: "warning",
            })
            navigate("/DaftarBuku");
            return
        }
    }



    // console.log(local.user);

    const params = useParams();
    const id = params.id

    const [notransaksi, setNoTransaksi] = useState(idTrans)
    const [tglpinjam, setTglPinjam] = useState(timeNow)
    const [tglkembali, setTglKembali] = useState('')
    const [nim, setNim] = useState(local.user.email.split('@')[0])
    const [username, setUsername] = useState(local.user.username)
    const [totpinjam, setTotPinjam] = useState('')

    const getBook = () => {
        axios
            .get(`${API_URL}/Library/${id}`)
            .then((res) => {
                setOneBook(res.data)
                console.log(res.data)
            })
    }

    const PinjamBuku = () => {
        axios
            .post(`${API_URL}/pinjam`, {
                NoTransaksi: notransaksi,
                TanggalPinjam: tglpinjam,
                TanggalKembali: tglkembali,
                total: totpinjam,
                peminjam: [
                    {
                        nim: nim,
                        username: username
                    }
                ],
                buku: onebook
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': window.localStorage.getItem("token")
                }
            }).then((res) => {
                console.log(res.data.message);
                swal({
                    title: "Success",
                    text: res.data.message,
                    icon: "success",
                }).then(() => {
                    navigate('/')
                });
            })
    }


    return (
        <>

            {
                load && (
                    <div className="container-fluid">
                        <div className="row justify-content-start">

                            {/* this content left  */}
                            <NavbarSide />

                            {/* this content center  */}
                            <div className="mx-3 p-0 col-8">
                                <div className="row d-flex justify-content-center py-5">
                                    <h2>Transaksi Peminjaman</h2>
                                    <hr />
                                    <div className="col-md-11 d-flex justify-content-center ">
                                        <div className="row">

                                            {/* TRANSAKSI -------------------------------------- */}
                                            <div className="col-md-11 mb-4 p-5 bg-light shadow">
                                                <div className="row">
                                                    <div className="col-6">

                                                        <div className="mb-3 row">
                                                            <label className="col-4  fw-bold col-form-label">No.Transaksi</label>
                                                            <div className="col-7">
                                                                <input type="text" value={notransaksi} readOnly className="form-control" />
                                                            </div>
                                                        </div>

                                                        <div className="mb-3 row">
                                                            <label className="col-4  fw-bold col-form-label ">Tgl Pinjam</label>
                                                            <div className="col-7">
                                                                <input type="text" value={tglpinjam} readOnly className="form-control" />
                                                            </div>
                                                        </div>

                                                        <div className="mb-3 row">
                                                            <label className="col-4  fw-bold col-form-label">Tgl Kembali</label>
                                                            <div className="col-7">
                                                                <input type="date" value={tglkembali} onChange={e => setTglKembali(e.target.value)} className="form-control" />
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <div className="col-6">

                                                        <div className="mb-3 row">
                                                            <label className="col-4 fw-bold col-form-label">NIM</label>
                                                            <div className="col-7">
                                                                <input type="text" readOnly className="form-control" value={nim} />
                                                            </div>
                                                        </div>

                                                        <div className="mb-3 row">
                                                            <label className="col-4  fw-bold col-form-label ">Nama</label>
                                                            <div className="col-7">
                                                                <input type="text" readOnly className="form-control" value={username} />
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>

                                            {/* BUKU -------------------------------------- */}
                                            <div className="col-md-11 mb-4 p-5 bg-light shadow">

                                                <table className="table">
                                                    <thead>
                                                        <tr>
                                                            <th scope="col">Kode Buku</th>
                                                            <th scope="col">Judul Buku</th>
                                                            <th scope="col">Pengarang</th>
                                                        </tr>
                                                    </thead>
                                                    {
                                                        onebook && onebook.map((data) => (
                                                            <tbody>

                                                                <tr>
                                                                    <td>{data._id}</td>
                                                                    <td>{data.judul}</td>
                                                                    <td>{data.penerbit}</td>
                                                                </tr>
                                                                <tr>
                                                                    <th scope="row">Total Buku</th>
                                                                    <td></td>
                                                                    <td colSpan={2}><input type="number" value={totpinjam} onChange={e => { setTotPinjam(e.target.value) }} className='form-control' /></td>
                                                                </tr>
                                                            </tbody>
                                                        ))
                                                    }
                                                </table>

                                                <div className="simpan">
                                                    <button className='btn btn-success' onClick={() => { PinjamBuku() }}>Pinjam Buku</button>
                                                </div>

                                            </div>


                                        </div>
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
