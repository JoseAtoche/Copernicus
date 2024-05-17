import React, { useState, useEffect } from "react";

const Loader = ({ setShowLoader }) => {
    const [dots, setDots] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prevDots) => (prevDots.length === 3 ? "" : prevDots + "."));
        }, 500);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        setTimeout(() => {
            setShowLoader(false);
            setDots(""); // Reiniciar los puntos cuando se oculta el cargador
        }, 2800);
    }, [setShowLoader]);

    return (
        <div className="loader">
            <br />
            <h1 style={{ color: "black" }}>Cargando{dots}</h1>
        </div>
    );
};

export default Loader;
