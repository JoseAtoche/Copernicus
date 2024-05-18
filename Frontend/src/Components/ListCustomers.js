import React, { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "./Loader";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Pagination from "./Pagination";
import useRetryTimer from "./RetryTimer";  // Importa el nuevo hook

export const ListCustomers = () => {
    const [customers, setCustomers] = useState([]);
    const [showLoader, setShowLoader] = useState(true);
    const [errorApi, setErrorApi] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [customersPerPage] = useState(10); // Número de clientes por página
    const location = useLocation();
    const url = "http://localhost:7001/api/customers/";

    const onRetryTimeout = useCallback(() => {
        fetchData(); // Vuelve a intentar obtener los datos cuando el tiempo de reintentos llegue a cero
    }, []);

    const [retryTime, setRetryTime] = useRetryTimer(5, onRetryTimeout);  // Usa el nuevo hook

    const fetchData = useCallback(async () => {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Error fetching data');
            }
            const data = await response.json();
            setCustomers(data);
            setShowLoader(false);
            setErrorApi(false); // Reiniciar el estado de error si la solicitud es exitosa
        } catch (error) {
            setErrorApi(true);
            setShowLoader(false);
            setRetryTime(5); // Reiniciar el tiempo de reintentos si hay un error
        }
    }, [url, setRetryTime]);

    const deleteCustomer = async (idCustomer) => {
        try {
            const response = await fetch(`${url}${idCustomer}`, {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                throw new Error('Error deleting customer');
            }

            toast.success("Usuario eliminado", {
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

            setCustomers((prevCustomers) =>
                prevCustomers.filter((customer) => customer.id !== idCustomer)
            );
        } catch (error) {
            setErrorApi(true);
        }
    };

    useEffect(() => {
        if (location.pathname === "/" && customers.length === 0) {
            fetchData();
        } else {
            setShowLoader(false);
        }
    }, [location.pathname, customers.length, fetchData]);

    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = customers.slice(indexOfFirstCustomer, indexOfLastCustomer);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            {showLoader ? (
                <Loader setShowLoader={setShowLoader} />
            ) : (
                <div className="container mt-5">
                        {errorApi ? (
                            <div className="d-flex justify-content-center align-items-center vh-100">
                                <div className="centered-container text-center">
                                    <h1>Error de conexión con el Servidor</h1>
                                    <p>Reintentando en {retryTime} segundos</p>
                                </div>
                            </div>
                    ) : (
                        <div>
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
                            <div className="d-flex justify-content-between mb-3">
                                <Link to="/NewCustomer" className="btn btn-primary">
                                    Nuevo cliente
                                </Link>
                            </div>
                            <div className="table-responsive">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Email</th>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>Empresa</th>
                                            <th>Fecha creación</th>
                                            <th>País</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentCustomers.map((item) => (
                                            <tr key={item.id}>
                                                <td>{item.email}</td>
                                                <td>{item.first}</td>
                                                <td>{item.last}</td>
                                                <td>{item.company}</td>
                                                <td>{item.createdAt}</td>
                                                <td>{item.country}</td>
                                                <td>
                                                    <Link
                                                        to={`/updateCustomer/${item.id}`}
                                                        className="btn btn-primary"
                                                    >
                                                        Editar cliente
                                                    </Link>
                                                    <button
                                                        className="btn btn-outline-danger"
                                                        onClick={() => deleteCustomer(item.id)}
                                                    >
                                                        Eliminar Cliente
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="d-flex justify-content-center">
                                <Pagination
                                    customersPerPage={customersPerPage}
                                    totalCustomers={customers.length}
                                    paginate={paginate}
                                    currentPage={currentPage}  // Pasa la página actual
                                />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default ListCustomers;
