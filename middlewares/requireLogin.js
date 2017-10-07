module.exports = (req, res, next) => {
    // If user is not logges in produe error message and return (abort workflow)
    if (!req.user) {
        return res.status(401).send({ error: 'You must log in! '});
    }

    // Next: If nothing is wrong continue on to request handler 
    next();
};