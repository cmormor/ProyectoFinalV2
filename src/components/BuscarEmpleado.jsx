import React, { useState } from "react";

export const BuscarEmpleado = ({ empleados, onFiltrar }) => {
    const [termino, setTermino] = useState("");

    const handleChange = (e) => {
        const valor = e.target.value;
        setTermino(valor);

        const empleadosFiltrados = empleados.filter((empleado) =>
            Object.values(empleado).some((campo) =>
                campo.toString().toLowerCase().includes(valor.toLowerCase())
            )
        );

        onFiltrar(empleadosFiltrados);
    };

    return (
        <div className="w-75">
            <input
                className="w-100"
                onChange={handleChange}
                placeholder="Buscar empleado..."
                type="text"
                value={termino}
            />
        </div>
    );
};