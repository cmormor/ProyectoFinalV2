export const arrayNominas = [
    {
        emisorCIF: "B98765432",
        receptorId: 1,
        metodoPago: "TRANSFERENCIA",
        mesLiquidacion: "Enero",
        anoLiquidacion: 2025,
        Trabajo: "Software Engineer",
        moneda: "EUR",
        tipoDocumento: "ReciboNomina",
        Fecha: "2025-01",
        dias: 31,
        conceptos: [
            { nombre: "Salario Base", importe: 70.00, tipo: "Salario" },
            { nombre: "Antiguedad", importe: 60.00, tipo: "Salario" },
            { nombre: "Productividad", importe: 15.00, tipo: "Salario" },
            { nombre: "IRPF", importe: 8.0, tipo: "Descuento" },
            { nombre: "Cuota SS", importe: 2.0, tipo: "Descuento" }
        ]
    },
    {
        emisorCIF: "B98765433",
        receptorId: 2,
        metodoPago: "CHEQUE",
        mesLiquidacion: "Febrero",
        anoLiquidacion: 2025,
        moneda: "EUR",
        tipoDocumento: "ReciboNomina",
        Fecha: "2025-02",
        dias: 28,
        conceptos: [
            { nombre: "Salario Base", importe: 65.00, tipo: "Salario" },
            { nombre: "Antiguedad", importe: 30.00, tipo: "Salario" },
            { nombre: "Productividad", importe: 12.00, tipo: "Salario" },
            { nombre: "IRPF", importe: 7.0, tipo: "Descuento" },
            { nombre: "Cuota SS", importe: 1.8, tipo: "Descuento" }
        ]
    },
    {
        emisorCIF: "B98765434",
        receptorId: 3,
        metodoPago: "TRANSFERENCIA",
        mesLiquidacion: "Marzo",
        anoLiquidacion: 2025,
        moneda: "EUR",
        tipoDocumento: "ReciboNomina",
        Fecha: "2025-03",
        dias: 31,
        conceptos: [
            { nombre: "Salario Base", importe: 80.00, tipo: "Salario" },
            { nombre: "Antiguedad", importe: 70.00, tipo: "Salario" },
            { nombre: "Productividad", importe: 20.00, tipo: "Salario" },
            { nombre: "IRPF", importe: 10.0, tipo: "Descuento" },
            { nombre: "Cuota SS", importe: 2.5, tipo: "Descuento" }
        ]
    },
    {
        emisorCIF: "B98765435",
        receptorId: 4,
        metodoPago: "EFECTIVO",
        mesLiquidacion: "Abril",
        anoLiquidacion: 2025,
        moneda: "EUR",
        tipoDocumento: "ReciboNomina",
        Fecha: "2025-04",
        dias: 30,
        conceptos: [
            { nombre: "Salario Base", importe: 75.00, tipo: "Salario" },
            { nombre: "Antiguedad", importe: 40.00, tipo: "Salario" },
            { nombre: "Productividad", importe: 18.00, tipo: "Salario" },
            { nombre: "IRPF", importe: 9.0, tipo: "Descuento" },
            { nombre: "Cuota SS", importe: 2.3, tipo: "Descuento" }
        ]
    },
    {
        emisorCIF: "B98765436",
        receptorId: 5,
        metodoPago: "TRANSFERENCIA",
        mesLiquidacion: "Mayo",
        anoLiquidacion: 2025,
        moneda: "EUR",
        tipoDocumento: "ReciboNomina",
        Fecha: "2025-05",
        dias: 31,
        conceptos: [
            { nombre: "Salario Base", importe: 85.00, tipo: "Salario" },
            { nombre: "Antiguedad", importe: 50.00, tipo: "Salario" },
            { nombre: "Productividad", importe: 22.00, tipo: "Salario" },
            { nombre: "IRPF", importe: 11.0, tipo: "Descuento" },
            { nombre: "Cuota SS", importe: 2.7, tipo: "Descuento" }
        ]
    },
    {
        emisorCIF: "B98765437",
        receptorId: 6,
        metodoPago: "CHEQUE",
        mesLiquidacion: "Junio",
        anoLiquidacion: 2025,
        moneda: "EUR",
        tipoDocumento: "ReciboNomina",
        Fecha: "2025-06",
        dias: 30,
        conceptos: [
            { nombre: "Salario Base", importe: 90.00, tipo: "Salario" },
            { nombre: "Antiguedad", importe: 60.00, tipo: "Salario" },
            { nombre: "Productividad", importe: 25.00, tipo: "Salario" },
            { nombre: "IRPF", importe: 12.0, tipo: "Descuento" },
            { nombre: "Cuota SS", importe: 3.0, tipo: "Descuento" }
        ]
    },
    {
        emisorCIF: "B98765438",
        receptorId: 7,
        metodoPago: "EFECTIVO",
        mesLiquidacion: "Julio",
        anoLiquidacion: 2025,
        moneda: "EUR",
        tipoDocumento: "ReciboNomina",
        Fecha: "2025-07",
        dias: 31,
        conceptos: [
            { nombre: "Salario Base", importe: 95.00, tipo: "Salario" },
            { nombre: "Antiguedad", importe: 65.00, tipo: "Salario" },
            { nombre: "Productividad", importe: 30.00, tipo: "Salario" },
            { nombre: "IRPF", importe: 13.0, tipo: "Descuento" },
            { nombre: "Cuota SS", importe: 3.2, tipo: "Descuento" }
        ]
    }
];

export const arrayEmisores = [
    {
        CIF: "B98765432",
        razonSocial: "INNOVATECH S.A.",
        domicilio: {
            calle: "Calle de la Innovación 12",
            localidad: "MADRID",
            municipio: "MADRID",
            provincia: "MADRID",
            pais: "ESPAÑA",
            codigoPostal: 28010
        }
    },
    {
        CIF: "B98765433",
        razonSocial: "DIGITECH SOLUTIONS S.A.",
        domicilio: {
            calle: "Calle de la Innovación 12",
            localidad: "MADRID",
            municipio: "MADRID",
            provincia: "MADRID",
            pais: "ESPAÑA",
            codigoPostal: 28010
        }
    },
    {
        CIF: "B98765434",
        razonSocial: "SOFTLINE TECHNOLOGIES S.A.",
        domicilio: {
            calle: "Calle de la Innovación 12",
            localidad: "MADRID",
            municipio: "MADRID",
            provincia: "MADRID",
            pais: "ESPAÑA",
            codigoPostal: 28010
        }
    },
    {
        CIF: "B98765435",
        razonSocial: "NEXTGEN TECHNOLOGY S.A.",
        domicilio: {
            calle: "Calle de la Innovación 12",
            localidad: "MADRID",
            municipio: "MADRID",
            provincia: "MADRID",
            pais: "ESPAÑA",
            codigoPostal: 28010
        }
    },
    {
        CIF: "B98765436",
        razonSocial: "BRAINTECH S.A.",
        domicilio: {
            calle: "Calle de la Innovación 12",
            localidad: "MADRID",
            municipio: "MADRID",
            provincia: "MADRID",
            pais: "ESPAÑA",
            codigoPostal: 28010
        }
    },
    {
        CIF: "B98765437",
        razonSocial: "FUTUREBYTE S.A.",
        domicilio: {
            calle: "Calle de la Innovación 12",
            localidad: "MADRID",
            municipio: "MADRID",
            provincia: "MADRID",
            pais: "ESPAÑA",
            codigoPostal: 28010
        }
    },
    {
        CIF: "B98765438",
        razonSocial: "TECHMIND S.A.",
        domicilio: {
            calle: "Calle de la Innovación 12",
            localidad: "MADRID",
            municipio: "MADRID",
            provincia: "MADRID",
            pais: "ESPAÑA",
            codigoPostal: 28010
        }
    }
];