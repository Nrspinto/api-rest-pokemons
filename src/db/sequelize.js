// Importer le modèle Pokemon dans src/db/sequelize.js
/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt') // on importe bcrypt pour crypter le mot de passe

// on se connecte à la base de données pokedex
let sequelize 

if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize('pokedex', 'root', '', { 
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false
  })

}else{
  sequelize = new Sequelize('pokedex', 'root', '', { 
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
    timezone: 'Etc/GMT-2',
  },
  logging: false
})
}

// on crée le modèle Pokemon
const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

// on exporte le modèle Pokemon
const initDb = () => {
  return sequelize.sync({force: true}).then(_ => {  // force: true permet de recréer la base de données à chaque fois; à enlever en production ! (mettre : sync())
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      }).then(pokemon => console.log(pokemon.toJSON()))
    })

    // on crée un utilisateur par défaut
    bcrypt.hash('pikachu', 10) // on crypte le mot de passe
    .then(hash =>{
      User.create({username: 'pikachu',password: hash})
      .then(user => console.log(user.toJSON()))
    })

    console.log('La base de donnée a bien été initialisée !')
  })
}

module.exports = { 
  initDb, Pokemon, User
}