import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { arrayEmpleados } from '../data/empleados';
import { arrayNominas, arrayEmisores } from '../data/nominas';
import { ListarEmpleado } from './ListarEmpleado';
import { BuscarEmpleado } from './BuscarEmpleado';
import { BuscarNomina } from './BuscarNomina';
import { FormularioEmpleado } from './FormularioEmpleado';
import { ListarNomina } from './ListarNomina';
import { FormularioNomina } from './FormularioNomina';
import { MiBoton } from './MiBoton';
import { Snackbar, Alert } from '@mui/joy';

export const App = () => {
    const [empleados, setEmpleados] = useState(arrayEmpleados);
    const [empleadoEnEdicion, setEmpleadoEnEdicion] = useState(null);
    const [empleadosFiltrados, setEmpleadosFiltrados] = useState(arrayEmpleados);
    const [nominas, setNominas] = useState(arrayNominas);
    const [nominaEnEdicion, setNominaEnEdicion] = useState(null);
    const [nominasFiltradas, setNominasFiltradas] = useState(arrayNominas);
    const [emisores, setEmisores] = useState(arrayEmisores || []);
    const [mensaje, setMensaje] = useState('');
    const [open, setOpen] = useState(false);

    const seleccionarEmpleadoParaEdicion = (empleado) => {
        setEmpleadoEnEdicion(empleado);
    };

    const guardarEmpleadoEditado = (empleadoEditado) => {
        const empleadosActualizados = empleados.map((empleado) => empleado.id === empleadoEditado.id ? empleadoEditado : empleado);
        setEmpleados(empleadosActualizados);
        setEmpleadosFiltrados(empleadosActualizados);
        setMensaje(`El empleado se ha actualizado correctamente`);
        setOpen(true);
    };

    const agregarEmpleado = (nuevoEmpleado) => {
        const nuevoEmpleadoConId = {
            ...nuevoEmpleado,
            id: empleados.length ? empleados[empleados.length - 1].id + 1 : 1,
        };
        const nuevosEmpleados = [...empleados, nuevoEmpleadoConId];
        setEmpleados(nuevosEmpleados);
        setEmpleadosFiltrados(nuevosEmpleados);
        setMensaje(`El empleado ${nuevoEmpleado.first_name} se ha creado correctamente`);
        setOpen(true);
    };

    const eliminarEmpleado = (id) => {
        if (confirm("¿Seguro que quieres eliminar al usuario?")) {
            const empleadosActualizados = empleados.filter((empleado) => empleado.id !== id);
            setEmpleados(empleadosActualizados);
            setEmpleadosFiltrados(empleadosActualizados);
            const nominasBorradas = eliminarNominasEmpleadoPorId(id);
            setMensaje(`El empleado se ha borrado correctamente (${nominasBorradas} nominas borradas)`);
            setOpen(true);
        }
    };

    const eliminarNominasEmpleadoPorId = (id) => {
        let total = 0;
        nominas.forEach((nomina) => {
            if (nomina.receptorId == id) {
                eliminarNomina(nomina, false);
                total++;
            }
        });
        return total;
    };

    const buscarEmpleadoPorId = (id) => empleados.find((empleado) => empleado.id == id);
    const buscarEmisorPorCIF = (CIF) => emisores.find((emisor) => emisor.CIF == CIF);
    const filtrarEmpleados = (empleadosFiltrados) => setEmpleadosFiltrados(empleadosFiltrados);

    const seleccionarNominaParaEdicion = (nomina) => {
        setNominaEnEdicion(nomina);
    };

    const guardarNominaEditada = (nominaEditada) => {
        const nominasActualizadas = nominas.map((nomina) => nomina.id === nominaEditada.id ? nominaEditada : nomina);
        setNominas(nominasActualizadas);
        setNominasFiltradas(nominasActualizadas);
        setMensaje(`La nomina se ha actualizado correctamente`);
        setOpen(true);
    };

    const generarIdNominas = () => {
        arrayNominas.forEach((nomina) => {
            nomina.id = nomina.id ? nomina.id : Math.random().toString(36).slice(2, 7);
        });
    };

    const agregarNomina = (nuevaNomina) => {
        const nuevasNominas = [...nominas, nuevaNomina];
        setNominas(nuevasNominas);
        setNominasFiltradas(nuevasNominas);
        setMensaje(`La nomina se ha creado correctamente`);
        setOpen(true);
    };

    const eliminarNomina = (nomina, preguntar) => {
        if (preguntar && !confirm("¿Seguro que quieres eliminar todas las nóminas del empleado?")) {
            return;
        }
        const nominasActualizadas = nominas.filter((otra) => nomina.receptorId !== otra.receptorId);
        setNominas(nominasActualizadas);
        setNominasFiltradas(nominasActualizadas);
        setMensaje(`La nomina se ha borrado correctamente`);
        setOpen(true);
    };

    const filtrarNominas = (nominasFiltradas) => setNominasFiltradas(nominasFiltradas);

    useEffect(() => {
        setEmpleados(empleados);
        setEmpleadosFiltrados(empleados);
        setNominas(arrayNominas);
        setNominasFiltradas(arrayNominas);
    }, []);

    useEffect(() => {
        if (open) {
            const timer = setTimeout(() => {
                setOpen(false);
            }, 2500);
            return () => clearTimeout(timer);
        }
    }, [open]);

    return (
        <Router>
            <h1 className="text-center my-5">
                GESTIÓN DE USUARIOS
                <p className="bg-primary w-50 mx-auto">TechSolutions!</p>
            </h1>
            <div className='font'>
                <Snackbar
                    open={open}
                    message={mensaje}
                    sx={{ p: 0 }}
                >
                    <Alert
                        startDecorator={<i className="bi bi-info-circle"></i>}
                        variant="soft"
                        color="primary"
                        sx={{ width: '100%', fontSize: "1.25em" }}
                    >
                        {mensaje}
                    </Alert>
                </Snackbar>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <ListarEmpleado
                                empleados={empleadosFiltrados}
                                onEditar={seleccionarEmpleadoParaEdicion}
                                onEliminar={eliminarEmpleado}
                                buscar={<BuscarEmpleado empleados={empleados} onFiltrar={filtrarEmpleados} />}
                                añadir={<MiBoton texto="Añadir Empleado" ruta="/crear" icono="person-fill ms-1" />}
                                verNominas={<MiBoton texto="Ver Nóminas" ruta="/nominas" icono="file-earmark-text ms-1" />}
                            />
                        }
                    />
                    <Route
                        path="/editar/:id"
                        element={
                            <FormularioEmpleado
                                empleado={empleadoEnEdicion}
                                onGuardar={guardarEmpleadoEditado}
                                onCrear={agregarEmpleado}
                            />
                        }
                    />
                    <Route
                        path="/crear"
                        element={
                            <FormularioEmpleado
                                empleado={null}
                                onGuardar={guardarEmpleadoEditado}
                                onCrear={agregarEmpleado}
                            />
                        }
                    />
                    <Route
                        path="/nominas"
                        element={
                            <ListarNomina
                                nominas={nominasFiltradas}
                                onEditar={seleccionarNominaParaEdicion}
                                onEliminar={eliminarNomina}
                                onBuscarEmpleado={buscarEmpleadoPorId}
                                buscar={<BuscarNomina nominas={nominas} onFiltrar={filtrarNominas} onBuscar={buscarEmpleadoPorId} />}
                                añadir={<MiBoton texto="Añadir Nomina" ruta="/crearNomina" icono="file-earmark-diff-fill ms-2" />}
                                volver={<MiBoton texto="Volver" ruta="/" icono="arrow-left-circle ms-2" />}
                                generarID={generarIdNominas}
                            />
                        }
                    />
                    <Route
                        path="/editarNomina/:id"
                        element={
                            <FormularioNomina
                                nomina={nominaEnEdicion}
                                onGuardar={guardarNominaEditada}
                                onCrear={agregarNomina}
                                onBuscarEmpleado={buscarEmpleadoPorId}
                                onBuscarEmisor={buscarEmisorPorCIF}
                            />
                        }
                    />
                    <Route
                        path="/crearNomina"
                        element={
                            <FormularioNomina
                                nomina={null}
                                plantilla={empleados}
                                plantillaEmisores={emisores}
                                onGuardar={guardarNominaEditada}
                                onCrear={agregarNomina}
                                onBuscarEmpleado={buscarEmpleadoPorId}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};
