import React from "react";
import { useNavigate, Link } from "react-router-dom";

const calcularTotal = (conceptos) => {
    const totalSalarios = conceptos
        .filter((c) => c.tipo === "Salario")
        .reduce((acc, c) => acc + parseFloat(c.importe), 0);
    const totalDescuentos = conceptos
        .filter((c) => c.tipo === "Descuento")
        .reduce((acc, c) => acc + parseFloat(c.importe), 0);
    return totalSalarios - totalDescuentos;
};

export const ListarNomina = ({ nominas, onEditar, onEliminar, onBuscarEmpleado, buscar, añadir, volver, generarID }) => {
    const navigate = useNavigate();

    generarID()

    const handleEditClick = (nomina) => {
        onEditar(nomina);
        console.log(nomina);
        navigate(`/editarNomina/${nomina.id}`);
    };

    return (
        <>
            <hr />
            <h2 className="mb-4">LISTA DE NOMINAS</h2>
            <div className="d-flex align-items-center gap-3 mb-3">
                {buscar}
                {añadir}
                {volver}
            </div>
            <table border={1} className="table table-hover align-middle">
                <thead className="thead-dark">
                    <tr>
                        <th>Empleado</th>
                        <th>Mes</th>
                        <th>Año</th>
                        <th>Puesto</th>
                        <th>Total Neto</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {nominas.map((nomina, i) => {
                        const conceptos = nomina.conceptos || [];
                        const totalNeto = calcularTotal(conceptos);
                        const empleado = onBuscarEmpleado(nomina.receptorId);

                        return (
                            <tr key={nomina.id || i}>
                                <td>{empleado.first_name} {empleado.last_name}</td>
                                <td>{nomina.mesLiquidacion}</td>
                                <td>{nomina.anoLiquidacion}</td>
                                <td>{empleado.job}</td>
                                <td>{totalNeto.toFixed(2)}</td>
                                <td>
                                    <button
                                        className="btn btn-warning me-2"
                                        onClick={() => handleEditClick(nomina)}
                                    >
                                        <i className="bi bi-pencil"></i>
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => onEliminar(nomina, true)}
                                    >
                                        <i className="bi bi-trash-fill"></i>
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </>
    );
};