import React from "react";
import { useNavigate } from "react-router-dom";

export const ListarEmpleado = ({ empleados, onEditar, onEliminar, buscar, añadir, verNominas }) => {
    const navigate = useNavigate();

    const handleEditClick = (empleado) => {
        onEditar(empleado);
        navigate(`/editar/${empleado.id}`);
    };

    return (
        <>
            <hr />
            <h2 className="mb-4">LISTA DE EMPLEADOS</h2>
            <div className="d-flex align-items-center gap-3 mb-3">
                {buscar}
                {añadir}
                {verNominas}
            </div>
            <table border={1} className="table table-hover align-middle">
                <thead>
                    <tr>
                        <th>NOMBRE</th>
                        <th>APELLIDO</th>
                        <th>EMAIL</th>
                        <th>DIRECCIÓN</th>
                        <th>AFILIACIÓN</th>
                        <th>ANTIGÜEDAD</th>
                        <th>TRABAJO</th>
                        <th>OPCIÓN</th>
                    </tr>
                </thead>
                <tbody>
                    {empleados.map((empleado) => (
                        <tr key={empleado.id}>
                            <td>{empleado.first_name}</td>
                            <td>{empleado.last_name}</td>
                            <td>{empleado.email}</td>
                            <td>{empleado.address}</td>
                            <td>{empleado.nafiliacionss}</td>
                            <td>{empleado.antiguedad}</td>
                            <td>{empleado.job}</td>
                            <td className="col-1">
                                <button
                                    onClick={() => handleEditClick(empleado)}
                                    className="btn btn-outline-warning btn-sm"
                                >
                                    <i className="bi bi-pencil"></i>
                                </button>
                                <button
                                    onClick={() => onEliminar(empleado.id)}
                                    className="btn btn-outline-danger btn-sm ms-1"
                                >
                                    <i className="bi bi-trash-fill"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
};
