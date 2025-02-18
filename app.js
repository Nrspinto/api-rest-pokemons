const express = require('express'); //on importe le module express pour gérer les routes
const favicon = require('serve-favicon'); //on importe le module serve-favicon pour gérer les favicons
const bodyParser = require('body-parser'); //on importe le module body-parser pour gérer les requêtes POST
const sequelize= require('./src/db/sequelize'); //on importe le module sequelize pour gérer la base de données
const cors = require('cors'); //on importe le module cors pour gérer les requêtes cross-origin (une sorte de sécurité)

const app = express();
const port = process.env.PORT || 3001;


//on importe les routes
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(bodyParser.json())
    .use(cors())

sequelize.initDb()

app.get('/', (req, res) => {
    res.json('Hello world! 😊👌👌')
})
// ici nous placons nos futures points de terminaison
require('./src/routes/findAllPokemons')(app);
require('./src/routes/findPokemonByPk')(app);
require('./src/routes/createPokemon')(app);
require('./src/routes/updatePokemon')(app);
require('./src/routes/deletePokemon')(app);
require('./src/routes/login')(app);

//on ajoute la gestion des erreurs
app.use(( res) => {
    const message = 'Impossible de trouver la ressource demandée ! vous pouvez essayer une autre URL.'
    res.status(404).json({message})
})


app.listen(port, () => {console.log(`Notre application Node est démarrée sur http://localhost:${port}`)});