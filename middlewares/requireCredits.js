module.exports = (req, res, next) => {
    // If user has no credits produce error message and return (abort workflow)
    if (req.user.credits < 1) {
        return res.status(403).send({ error: 'Not enough credits!'});
    }
    // Next: If nothing is wrong continue on to request handler 
    next();
};