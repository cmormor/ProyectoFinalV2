import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const arrayMeses = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
];

const salarios = ["Salario Base", "Antiguedad", "Productividad"]

export const FormularioNomina = ({ nomina, plantilla, plantillaEmisores, onGuardar, onCrear, onBuscarEmpleado, onBuscarEmisor }) => {
    const [formData, setFormData] = useState({
        id: '',
        emisorCIF: '',
        receptorId: '',
        metodoPago: '',
        mesLiquidacion: '',
        anoLiquidacion: '',
        dias: '',
        Fecha: '',
        conceptos: []
    });

    const empleado = nomina ? onBuscarEmpleado(nomina.receptorId) : {};
    const emisor = nomina ? onBuscarEmisor(nomina.emisorCIF) : {};
    const navigate = useNavigate();

    useEffect(() => {
        if (nomina) {
            const mes = arrayMeses.indexOf(nomina.mesLiquidacion) + 1;
            console.log(nomina.metodoPago);
            setFormData({
                id: nomina.id,
                emisorCIF: nomina.emisorCIF,
                receptorId: nomina.receptorId,
                metodoPago: nomina.metodoPago,
                mesLiquidacion: nomina.mesLiquidacion,
                anoLiquidacion: nomina.anoLiquidacion,
                dias: nomina.dias,
                Fecha: `${nomina.anoLiquidacion}-${mes}`,
                conceptos: nomina.conceptos || []
            });
        }
    }, [nomina]);

    const handleCancel = () => {
        if (window.confirm("¿Estás seguro de que deseas cancelar? Los cambios no se guardarán.")) {
            navigate('/nominas');
        }
    };

    const handleChange = (e) => {
        console.log(formData)
        const { name, value } = e.target;
        setFormData((prevData) => {
            const [section, key] = name.split('.');
            return key
                ? {
                    ...prevData,
                    [section]: {
                        ...prevData[section],
                        [key]: value,
                    },
                }
                : { ...prevData, [name]: value };
        });
    };

    const handleConceptoChange = (index, e) => {
        const { name, value } = e.target;
        const newConceptos = [...formData.conceptos];
        newConceptos[index] = { ...newConceptos[index], [name]: value };
        if (name === "nombre") {
            newConceptos[index].tipo = salarios.includes(value) ? "Salario" : "Descuento";
        }
        setFormData((prevData) => ({ ...prevData, conceptos: newConceptos }));
    };

    const handleAddConcepto = () => {
        setFormData((prevData) => (
            {
                ...prevData,
                conceptos: [...prevData.conceptos, { nombre: '', importe: '', tipo: '' }]
            }
        ));
    };

    const handleRemoveConcepto = (index) => {
        const newConceptos = formData.conceptos.filter((_, i) => i !== index);
        setFormData((prevData) => ({ ...prevData, conceptos: newConceptos }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.anoLiquidacion < 2025 || formData.anoLiquidacion > 2030) {
            alert("El año debe estar entre 2025 y 2030.");
            return;
        }

        if (formData.dias <= 0) {
            alert("Los días trabajados deben ser un número positivo.");
            return;
        }

        const updatedNomina = { ...formData, id: nomina && nomina.id ? nomina.id : Math.random().toString(36).slice(2, 7) };

        if (nomina) {
            onGuardar(updatedNomina);
        } else {
            onCrear(updatedNomina);
        }
        navigate("/nominas");
    };


    return (
        <div className="container mt-4">
            <div className="card shadow p-4">
                <form onSubmit={handleSubmit} >
                    <h2 className="mb-4 text-center text-primary text-uppercase">{nomina ? 'Editar Nómina' : 'Crear Nómina'}</h2>
                    <hr />
                    <div className="form-group mb-4">
                        <div className='d-flex'>
                            <i className="bi bi-person-square text-secondary fs-4 me-2"></i>
                            <h3 className="text-secondary">Datos del Emisor (no editables)</h3>
                        </div>
                        {plantillaEmisores && (
                            <select
                                name="emisorCIF"
                                value={emisor.CIF}
                                onChange={handleChange}
                                className="form-control mt-2"
                                required
                            >
                                <option value="">Selecciona un emisor</option>
                                {plantillaEmisores.map((emisor) => (
                                    <option key={emisor.CIF} value={emisor.CIF}>
                                        {emisor.CIF} {emisor.razonSocial}
                                    </option>
                                ))}
                            </select>
                        )}
                        {nomina && emisor && (
                            <div className="d-flex row gap-3 mt-3">
                                <label>
                                    Razon Social:
                                    <input type="text" value={emisor.razonSocial} className="form-control mt-2" readOnly />
                                </label>
                                <label>
                                    Dirección:
                                    <input type="text" value={emisor.domicilio.calle} className="form-control mt-2" readOnly />
                                </label>
                                <label>
                                    CIF:
                                    <input type="text" value={emisor.CIF} className="form-control mt-2" readOnly />
                                </label>
                            </div>
                        )}
                    </div>
                    <div className="form-group mb-4">
                        <div className='d-flex'>
                            <i className="bi bi-building text-secondary fs-4 me-2"></i>
                            <h3 className="text-secondary">Datos del Receptor (no editables)</h3>
                        </div>
                        {plantilla && (
                            <select
                                name="receptorId"
                                value={formData.receptorId}
                                onChange={handleChange}
                                className="form-control mt-2"
                                required
                            >
                                <option value="">Selecciona un empleado</option>
                                {plantilla.map((empleado) => (
                                    <option key={empleado.id} value={empleado.id}>
                                        {empleado.first_name} {empleado.last_name}
                                    </option>
                                ))}
                            </select>
                        )}
                        {nomina && empleado && (
                            <div className="d-flex row gap-3 mt-3">
                                <label>
                                    Nombre:
                                    <input type="text" value={empleado.first_name} className="form-control mt-2" readOnly />
                                </label>
                                <label>
                                    Apellidos:
                                    <input type="text" value={empleado.last_name} className="form-control mt-2" readOnly />
                                </label>
                                <label>
                                    Puesto:
                                    <input type="text" value={empleado.job} className="form-control mt-2" readOnly />
                                </label>
                            </div>
                        )}
                    </div>
                    <div className="d-flex flex-column mb-4 gap-4">
                        <div className='d-flex'>
                            <i className="bi bi-file-bar-graph text-secondary fs-4 me-2"></i>
                            <h3 className="text-secondary">Datos de la Nomina</h3>
                        </div>
                        <label className="text-uppercase">
                            Método de Pago:
                            <select
                                name="metodoPago"
                                value={formData.metodoPago}
                                onChange={handleChange}
                                className="form-control mt-2"
                                required
                            >
                                <option value="">Selecciona un método de pago</option>
                                <option value="TRANSFERENCIA">Transferencia</option>
                                <option value="CHEQUE">Cheque</option>
                                <option value="EFECTIVO">Efectivo</option>
                            </select>
                        </label>

                        <label>
                            Mes:
                            <select
                                name="mesLiquidacion"
                                onChange={handleChange}
                                defaultValue={nomina && nomina.mesLiquidacion}
                                className="form-control mt-2"
                                required
                            >
                                <option value="">Selecciona un mes</option>
                                {arrayMeses.map((mes, i) => (
                                    <option key={i} value={mes}>
                                        {mes}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            Año:
                            <input
                                type="text"
                                name="anoLiquidacion"
                                value={formData.anoLiquidacion}
                                onChange={handleChange}
                                className="form-control mt-2"
                                required
                            />
                        </label>
                        <label>
                            Días Trabajados:
                            <input
                                type="number"
                                name="dias"
                                value={formData.dias}
                                onChange={handleChange}
                                className="form-control mt-2"
                                required
                            />
                        </label>
                    </div>
                    <div className="d-flex mb-4">
                        <h3 className="me-3 text-primary">Conceptos de la Nómina</h3>
                        <button
                            type="button"
                            className="btn btn-sm btn-success"
                            onClick={handleAddConcepto}
                        >
                            Añadir Concepto
                        </button>
                    </div>
                    {formData.conceptos.map((concepto, index) => (
                        <div key={index} className="mb-4">
                            <label>Concepto {index + 1}:</label>
                            <select
                                name="nombre"
                                value={concepto.nombre}
                                onChange={(e) => handleConceptoChange(index, e)}
                                className="form-control mt-2"
                                required
                            >
                                <option value="">Selecciona un concepto</option>
                                <option value="Salario Base">Salario Base</option>
                                <option value="Antiguedad">Antigüedad</option>
                                <option value="Productividad">Productividad</option>
                                <option value="IRPF">IRPF</option>
                                <option value="Cuota SS">Cuota SS</option>
                            </select>
                            <input
                                type="number"
                                name="importe"
                                value={concepto.importe}
                                onChange={(e) => handleConceptoChange(index, e)}
                                className="form-control mt-2"
                                placeholder="Importe"
                                required
                            />
                            <div className="d-flex justify-content-end mt-2">
                                <button
                                    type="button"
                                    className="btn btn-danger btn-sm mt-2"
                                    onClick={() => handleRemoveConcepto(index)}
                                >
                                    Eliminar Concepto
                                </button>
                            </div>
                        </div>
                    ))}
                    <div className="mt-4 d-flex justify-content-end gap-2">
                        <button type="submit" className="btn btn-primary me-2">
                            <i className="bi bi-save me-2"></i>
                            {nomina ? 'Guardar Cambios' : 'Crear Nómina'}
                        </button>
                        <button type="button" onClick={handleCancel} className="btn btn-secondary ml-2">
                            <i className="bi bi-x-circle me-2"></i>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
