import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { API_URL } from '../utils/constant'

export const Books = ({data}) => {
    const navigate = useNavigate()

    const local = JSON.parse(window.localStorage.getItem("token"))
    const pinjam = (idbuku) =>{
        if (!local) {
                   // window.location.replace("/login");
                   window.history.pushState({}, '', '/login');
                   swal({
                       title: "Error!",
                       text: "Login Dahulu!",
                       icon: "warning",
                   });
                   navigate("/login");
                   return;
               }
        navigate(`/Peminjaman/${idbuku}`)
    }

    const deleteBook = (idbook) =>{
        axios
        .delete(`${API_URL}/Library/${idbook}`,{
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
            navigate("/");
        })
    }

    return (
        <>

                    <div className="col-md-5 m-3 p-0 book shadow text-dark" style={{background:'#f0f0f0'}}>
                        <div className="cover bg-dark">
                            <img src={data.gambarCover} style={{ width: '700px', height: '350px', objectFit: 'cover' }} className='img-fluid' alt="" />
                        </div>
                        <div className="title m-3">
                            <div className='fs-5 h3'>{data.judul}</div>
                            <div className='text-muted'>{data.penerbit}</div>
                            <div className='text-muted'>Tahun Terbit {data.tanggalTerbit.split('-')[2]}  ●  {data.lembar} lembar</div>
                            <div className='pinjam m-4 text-end'>
                                {
                                    local.user.email == "211111111@students.mikroskil.ac.id" ? (
                                        <button className='btn btn-danger mx-2' onClick={() => deleteBook(data._id)}><i className="fa-solid fa-trash"></i></button>
                                    ) : ''
                                }
                                <button className='btn btn-dark' onClick={()=>{pinjam(data._id)}}><i className="fa-solid fa-book-bookmark"></i> Pinjam</button>
                            </div>
                        </div>
                    </div>

        </>
    )
}
