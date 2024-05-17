import { useLocation, useParams } from "react-router-dom";
import { Form } from "./Form";
import { useEffect, useState } from "react";

function UpdateCustomer() {
    const { idCustomer } = useParams();
    const location = useLocation();

    const [customer, setCustomer] = useState({});
    const [errorApi, setErrorApi] = useState(false);

    const fetchData = async () => {
        try {
            const response = await fetch(
                `http://localhost:7001/api/customers/${idCustomer}`
            );

            if (!response.ok) {
                setErrorApi(true);
                return;
            }

            const data = await response.json();
            setCustomer(data);
        } catch (error) {
            setErrorApi(true);
        }
    };

    useEffect(() => {
        if (
            location.pathname === `/updateCustomer/${idCustomer}` &&
            Object.keys(customer).length === 0
        ) {
            fetchData();
        }
    }, [location.pathname, idCustomer]);

    return (
        <div className="centered-container">
            {errorApi ? (
                <h1>Error de conexion con el Servidor</h1>
            ) : (
                <Form customer={customer} />
            )}
        </div>
    );

}

export default UpdateCustomer;
