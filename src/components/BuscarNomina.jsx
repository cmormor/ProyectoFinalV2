import React, { useState } from "react";

export const BuscarNomina = ({ nominas, onFiltrar, onBuscar }) => {
    const [termino, setTermino] = useState("");

    const handleChange = (e) => {
        const valor = e.target.value;
        setTermino(valor);

        const nominasFiltradas = nominas.filter((nomina) => {
            const empleado = onBuscar(nomina.receptorId);

            return (
                `${empleado.first_name.toLowerCase()} ${empleado.last_name.toLowerCase()}`.includes(valor.toLowerCase()) ||
                nomina.mesLiquidacion.toLowerCase().includes(valor.toLowerCase()) ||
                nomina.anoLiquidacion.toString().includes(valor.toLowerCase()) ||
                empleado.job.toLowerCase().includes(valor.toLowerCase())
            );
        });

        onFiltrar(nominasFiltradas);
    };

    return (
        <div className="w-75">
            <input
                className="w-100"
                type="text"
                placeholder="Buscar nómina..."
                value={termino}
                onChange={handleChange}
            />
        </div>
    );
};