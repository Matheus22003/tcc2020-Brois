const { app, io, server } = require('./src/config/custom-express')
const rotasInicio = require('./src/app/routes/helper_routes/rotasInicio');
const email = require('./src/app/routes/email'); // Rota de E-Mail
const teams = require('./src/app/routes/teams') // Rota de Equipe
const tournament = require('./src/app/routes/tournament') // Rota de Torneio
const verificarDisponivel = require('./src/app/scripts/verificarIdDisponivel') //Verificar disponibilidade de email em tempo real
const listarAmigos = require('./src/app/scripts/listarUsuariosParaAmigos'); // listarUsuariosParaAdd
const addAmigos = require('./src/app/scripts/addAmigo');
const completaTorunament = require('./src/app/scripts/iniciarTorneio')

//Rotas
    // Rota Raiz
        app.route('/')
            .get(rotasInicio.rotaGet)
            .put(rotasInicio.rotaCadastro)
            .post(rotasInicio.rotaLogin);
    // Logout    
        app.get('/logout', (req, res) => {
                req.logOut();
                req.flash('error_msg', "Deslogado com sucesso");
                res.redirect('/');
        })
    // Rota Email
        app.use('/email', email);
    // Rota Equipe
        app.use('/teams',teams)
    //Rota Torneio
        app.use('/tournament', tournament)
    // Rota de Erro
        app.get('/erro',(req,res) => {
            res.status(404).send('what???');
        })
        app.get('*', function(req, res){
            res.status(404).send('what???');
        });

const port = process.env.PORT || 8080;

// io.on('connection', (socket) => {
//     console.log(`Nova conexão: ${socket.id}`);
//     socket.emit('teste',"Alguma msg qualquer: Olá")
// })
server.listen(port, () =>{
    console.log(`Servidor rodando no endereco local: http://localhost:${port}`);
})