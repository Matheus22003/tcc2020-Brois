module.exports = {
    eLogado: (req, res, next) => {
        if (req.isAuthenticated() && req.user.eLogado == 1) {
            req.flash('error_msg',"Você já esta logado com uma conta");
            res.redirect('/');
        }
        else {
            return next();
        }
    }
}