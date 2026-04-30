
module.exports = (req, res, next) => {
    if (!req.session.customerFound) {
        return res.status(401).json({ loggedIn: false })
    }

    next();
}