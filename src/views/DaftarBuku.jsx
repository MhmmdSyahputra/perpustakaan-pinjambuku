import React,{useEffect,useState} from 'react'
import { Books } from '../components/Books'
import { NavbarSide } from '../components/NavbarSide'
import axios from 'axios'
import { API_URL } from '../utils/constant'
import { useNavigate } from 'react-router-dom'


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

    const GetAllBook = () => {
        axios
        .get(`${API_URL}/Library`)
        .then((res)=>{
            setDaftarBuku(res.data)
            console.log(res.data)
        })
    }

    const AddBook = () =>{

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
                                        <i className="fa-solid fa-square-plus btn fs-2 text-primary" onClick={()=>{AddBook()}}></i>
                                    ) : ''
                                }
                            </div>
                            <hr />
                            <div className=" col-md-11 d-flex justify-content-center ">
                                <div className="row d-flex justify-content-center">
                                    {
                                        daftarbuku && daftarbuku.map((data,indexbuku)=>(
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
