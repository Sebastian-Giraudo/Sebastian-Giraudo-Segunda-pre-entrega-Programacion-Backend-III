const authorization = (role) => {
    return (req, res, next) => {
        // Verifica si el usuario y el rol existen en la solicitud (vienen del middleware de autenticación)
        if (!req.user || !req.user.role) {
            return res.status(401).send({ status: 'error', message: 'No se ha autenticado' });
        }
        
        // Verifica si el rol del usuario coincide con el rol requerido
        if (req.user.role !== role) {
            return res.status(403).send({ status: 'error', message: 'No tienes los permisos necesarios' });
        }
        
        next();
    };
};

export default authorization;