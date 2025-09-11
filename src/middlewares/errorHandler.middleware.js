const errorHandler = (err, req, res, next) => {
    // Maneja errores específicos de Mongoose
    if (err.name === 'CastError' || err.name === 'ValidationError') {
        return res.status(400).json({
            status: 'error',
            message: `Datos de solicitud inválidos: ${err.message}`
        });
    }

    // Errores de duplicación
    if (err.code === 11000) {
        const field = Object.keys(err.keyPattern)[0];
        return res.status(409).json({
            status: 'error',
            message: `El campo '${field}' ya existe.`
        });
    }

    // Si el error tiene un código de estado, úsalo.
    const statusCode = err.statusCode || 500;
    // Si el error tiene un mensaje, úsalo.
    const message = err.message || 'Ocurrió un error inesperado en el servidor.';

    // Envía el error genérico
    res.status(statusCode).json({
        status: 'error',
        message: message
    });
};

export default errorHandler;