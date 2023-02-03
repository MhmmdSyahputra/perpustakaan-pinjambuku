import React, { useEffect, useState } from 'react'
import { Books } from '../components/Books'
import { NavbarSide } from '../components/NavbarSide'
import axios from 'axios'
import { API_URL } from '../utils/constant'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert';

export const Daftarbuku = () => {

    const navigate = useNavigate()
    const local = JSON.parse(window.localStorage.getItem("token"))
    useEffect(() => {

        if (!local) {
            window.history.pushState({}, '', '/login');
            navigate("/login");
            return;
        }

        GetAllBook()
    }, [])

    const [daftarbuku, setDaftarBuku] = useState()

    const [imgcover, setImgCover] = useState()
    const [judul, setJudul] = useState()
    const [penerbit, setPenerbit] = useState()
    const [lembar, setLembar] = useState()


    const GetAllBook = () => {
        axios
            .get(`${API_URL}/Library`)
            .then((res) => {
                setDaftarBuku(res.data)
                console.log(res.data)
            })
    }

    const AddBook = (e) => {
        e.preventDefault()
        axios
            .post(`${API_URL}/Library`,{
                judul: judul,
                penerbit: penerbit,
                gambarCover: imgcover,
                lembar: lembar,
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': window.localStorage.getItem("token")
                }
            })
            .then((res)=>{
                swal({
                    title: "Success",
                    text: res.data.message,
                    icon: "success",
                });
                GetAllBook()

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
                        <div className="row d-flex text-light justify-content-center py-5">
                            <h2>Daftar buku</h2>
                            <div>

                                {
                                    local.user.email == "211111111@students.mikroskil.ac.id" ? (
                                        <>
                                            <i className="fa-solid fa-square-plus btn fs-2 text-primary" data-bs-toggle="modal" data-bs-target="#exampleModal"></i>

                                            <div className="modal fade text-dark" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h5 className="modal-title" id="exampleModalLabel">Tambah Buku</h5>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div className="modal-body">

                                                            <form onSubmit={AddBook}>
                                                                <div className="col-9 my-3">

                                                                    <div className="imgpost">
                                                                        <label htmlFor="" className="fw-bold">Cover Book</label>
                                                                        <div className="text-muted">*insert with url img</div>
                                                                        <input type="text" value={imgcover} onChange={e => setImgCover(e.target.value)} className="form-control" />
                                                                    </div>

                                                                    <div className="judul">
                                                                        <label htmlFor="" className="fw-bold">Judul Buku</label>
                                                                        <input type="text" value={judul} onChange={e => setJudul(e.target.value)} className="form-control" />
                                                                    </div>

                                                                    <div className="penerbit">
                                                                        <label htmlFor="" className="fw-bold">Penerbit</label>
                                                                        <input type="text" value={penerbit} onChange={e => setPenerbit(e.target.value)} className="form-control" />
                                                                    </div>

                                                                    <div className="judul">
                                                                        <label htmlFor="" className="fw-bold">Lembar</label>
                                                                        <input type="number" value={lembar} onChange={e => setLembar(e.target.value)} className="form-control" />
                                                                    </div>


                                                                </div>
                                                                <div className="modal-footer">
                                                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                    <button type="submit" className="btn btn-primary">Save changes</button>
                                                                </div>
                                                            </form>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>


                                    ) : ''
                                }
                            </div>
                            <hr />
                            <div className=" col-md-11 d-flex justify-content-center ">
                                <div className="row d-flex justify-content-center">
                                    {
                                        daftarbuku && daftarbuku.map((data, indexbuku) => (
                                            <Books data={data} key={indexbuku} />
                                        ))
                                    }

                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
