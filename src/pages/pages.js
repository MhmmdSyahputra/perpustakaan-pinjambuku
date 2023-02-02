import React from "react"
import { Routes, Route, Link } from "react-router-dom";
import { Header } from "../components/Header";
import { Daftarbuku } from "../views/DaftarBuku";
import { Home } from "../views/Home";
import { Login } from "../views/Login";
import { Peminjaman } from "../views/Peminjaman";
import { Registrasi } from "../views/Registrasi";
import { Riwayat } from "../views/Riwayat";

const Pages = () => {
  return (
    <>
    <Header />
      <Routes>

        <Route exact path='/' element={<Home />} />
        <Route exact path='/DaftarBuku' element={<Daftarbuku />} />
        <Route exact path='/Peminjaman/:id' element={<Peminjaman />} />
        <Route exact path='/Riwayat' element={<Riwayat />} />
        <Route exact path='/Login' element={<Login />} />
        <Route exact path='/Registrasi' element={<Registrasi />} />

      </Routes>
    </>
  )
}

export default Pages