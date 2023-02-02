import React from 'react'
import { useNavigate } from 'react-router-dom'

export const Books = ({data}) => {
    const navigate = useNavigate()

    const pinjam = (idbuku) =>{
        navigate(`/Peminjaman/${idbuku}`)
    }

    return (
        <>

                    <div className="col-md-5 m-3 p-0 bg-light book shadow">
                        <div className="cover bg-dark">
                            <img src={data.gambarCover} style={{ width: '700px', height: '350px', objectFit: 'cover' }} className='img-fluid' alt="" />
                        </div>
                        <div className="title m-3">
                            <div className='fs-5 h3'>{data.judul}</div>
                            <div className='text-muted'>{data.penerbit}</div>
                            <div className='text-muted'>Tahun Terbit 2020  ●  {data.lembar} lembar</div>
                            <div className='pinjam m-4 text-end'>
                                <button className='btn btn-dark' onClick={()=>{pinjam(data._id)}}><i class="fa-solid fa-book-bookmark"></i> Pinjam</button>
                            </div>
                        </div>
                    </div>

        </>
    )
}
