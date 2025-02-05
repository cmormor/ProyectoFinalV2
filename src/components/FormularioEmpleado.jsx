import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const FormularioEmpleado = ({ empleado, onGuardar, onCrear }) => {
    const [formData, setFormData] = useState({
        id: '',
        first_name: '',
        last_name: '',
        email: '',
        address: '',
        nafiliacionss: '',
        antiguedad: '',
        job: ''
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (empleado) {
            setFormData({
                id: empleado.id,
                first_name: empleado.first_name,
                last_name: empleado.last_name,
                email: empleado.email,
                address: empleado.address,
                nafiliacionss: empleado.nafiliacionss,
                antiguedad: empleado.antiguedad,
                job: empleado.job
            });
        }
    }, [empleado]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!empleado) {
            const { first_name, last_name, email, address, nafiliacionss, antiguedad, job } = formData;
            if (!first_name || !last_name || !email || !address || !nafiliacionss || !antiguedad || !job) {
                alert('Por favor, complete todos los campos obligatorios.');
                return;
            }
        }

        empleado ? onGuardar(formData) : onCrear(formData);
        navigate('/');
    };

    const handleCancel = () => {
        if (Object.values(formData).some(value => value !== '')) {
            if (confirm("¿Estás seguro de que quieres cancelar los cambios?")) {
                navigate('/');
            }
        } else {
            navigate('/');
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow p-4">
                <h2 className="mb-4 text-center text-primary">{empleado ? 'Editando Empleado' : 'Añade un nuevo Empleado'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Nombre:</label>
                        <input type="text" className="form-control" name="first_name" value={formData.first_name} onChange={handleChange} required={!empleado} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Apellido:</label>
                        <input type="text" className="form-control" name="last_name" value={formData.last_name} onChange={handleChange} required={!empleado} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Email:</label>
                        <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required={!empleado} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Dirección:</label>
                        <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required={!empleado} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Número de afiliación:</label>
                        <input type="number" className="form-control" name="nafiliacionss" value={formData.nafiliacionss} onChange={handleChange} required={!empleado} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Año de antigüedad:</label>
                        <input type="number" className="form-control" name="antiguedad" value={formData.antiguedad} onChange={handleChange} required={!empleado} />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Puesto:</label>
                        <input type="text" className="form-control" name="job" value={formData.job} onChange={handleChange} required={!empleado} />
                    </div>
                    <div className="mt-4 d-flex justify-content-end gap-2">
                        <button type="submit" className="btn btn-primary me-2">
                            <i className="bi bi-save me-2"></i>
                            {empleado ? 'Guardar cambios' : 'Añadir empleado'}
                        </button>
                        <button type="button" className="btn btn-secondary ml-2" onClick={handleCancel}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
