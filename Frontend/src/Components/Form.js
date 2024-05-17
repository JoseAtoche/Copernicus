import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export const Form = ({ customer }) => {
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [email, setEmail] = useState("");
    const [empresa, setEmpresa] = useState("");
    const [fechaCreacion, setFechaCreacion] = useState("");
    const [pais, setPais] = useState("");
    const [errorApi, setErrorApi] = useState(false);
    const url = "http://localhost:7001/api/customers/";

    useEffect(() => {
        if (customer) {
            setNombre(customer.first || "");
            setApellido(customer.last || "");
            setEmail(customer.email || "");
            setEmpresa(customer.company || "");
            setFechaCreacion(customer.createdAt || "");
            setPais(customer.country || "");
        }
    }, [customer]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const customerData = {
            email: email !== "" ? email : customer?.email,
            first: nombre !== "" ? nombre : customer?.first,
            last: apellido !== "" ? apellido : customer?.last,
            company: empresa !== "" ? empresa : customer?.company,
            createdAt: fechaCreacion !== "" ? fechaCreacion : customer?.createdAt,
            country: pais !== "" ? pais : customer?.country,
        };

        const toastError = (metodo) => {
            toast.error(`Hubo un problema al ${metodo} el customer`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        };

        const toastExito = (metodo) => {
            toast.success(`Usuario ${metodo} con éxito`, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
            });
        };

        if (customer?.id === undefined) {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(customerData),
            }).then((response) => {
                if (response.ok) {
                    toastExito("Created");
                } else {
                    setErrorApi(true);
                    toastError("error");
                }
            });
        } else {
            fetch(`${url}${customer.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(customerData),
            }).then((response) => {
                if (response.ok) {
                    toastExito("Modificated");
                } else {
                    toastError("Error");
                }
            });
        }

        // Reiniciar el form
        setEmail("");
        setNombre("");
        setApellido("");
        setEmpresa("");
        setPais("");
    };

    return (
        <>
            {errorApi ? (
                <div className="container text-center mt-5">
                    <h1>Error de conexion con el Servidor</h1>
                </div>
            ) : (
                <div className="container d-flex justify-content-center align-items-center vh-100">
                    <div className="w-50">
                        <h1 className="text-center">
                            {customer === undefined
                                ? "Nuevo customer"
                                : `Modificar ${customer.first} ${customer.last}`}
                        </h1>
                        <ToastContainer
                            position="top-center"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="email" className="form-label">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    className="form-control"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">Nombre</label>
                                <input
                                    id="nombre"
                                    type="text"
                                    className="form-control"
                                    value={nombre}
                                    onChange={(e) => setNombre(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="apellido" className="form-label">Apellido</label>
                                <input
                                    id="apellido"
                                    type="text"
                                    className="form-control"
                                    value={apellido}
                                    onChange={(e) => setApellido(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="empresa" className="form-label">Empresa</label>
                                <input
                                    id="empresa"
                                    type="text"
                                    className="form-control"
                                    value={empresa}
                                    onChange={(e) => setEmpresa(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="alta" className="form-label">Fecha creación</label>
                                <input
                                    id="alta"
                                    type="datetime-local"
                                    className="form-control"
                                    value={fechaCreacion}
                                    onChange={(e) => setFechaCreacion(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="pais" className="form-label">País</label>
                                <input
                                    id="pais"
                                    className="form-control"
                                    value={pais}
                                    onChange={(e) => setPais(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit" className="btn btn-success w-100">Enviar</button>
                        </form>
                        <div className="mt-3 text-center">
                            <Link to="/" className="btn btn-secondary">Volver a inicio</Link>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
