const validTypes = ['Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik', 'Poison', 'Fée', 'Vol', 'Combat', 'Psy'] 
/* L’API Rest et la Base de données : Créer un modèle Sequelize */
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Pokemon', {    
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false ,  // le nom est obligatoire
        unique: {msg: 'Le nom est déjà utilisé'},  // le nom doit être unique
        Validate: {
          notNull: {msg: 'Le nom est une propriété requise'},
          notEmpty: {msg: 'Le nom ne doit pas être vide'}
        }
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate : {
          isInt: {msg: 'Le nombre de points de vie doit être un entier'},
          notNull: {msg: 'Le nombre de points de vie est une propriété requise' },
          min: {args: [0], msg: 'Le nombre de points de vie doit être supérieur ou égal à 0' },
          max: {args: [99], msg: 'Le nombre de points de vie doit être inférieur ou égal à 999' }
        }
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate : {
          isInt: {msg: 'Le nombre de points de dégats doit être un entier'},
          notNull: {msg: 'Le nombre de points de dégats est une propriété requise' },
          min: {args: [0], msg: 'Le nombre de points de dégats doit être supérieur ou égal à 0' },
          max: {args: [99], msg: 'Le nombre de points de dégats doit être inférieur ou égal à 999' }
        }
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate : {
          isUrl: {msg: 'L\'URL de l\'image n\'est pas valide'},
          notNull: {msg: 'L\'URL de l\'image est une propriété requise' }
        }
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types').split(',')  // on récupère les types sous forme de tableau
        },
        set(types) {
          this.setDataValue('types', types.join())  // on stocke les types sous forme de string
        },
        validate : {
          isTypesValid(value) {
          if(!value){
            throw new Error('Le pokémon doit avoir au moins un type')
          }
          if(value.split(',').length > 3) {
            throw new Error('Le pokémon ne peut avoir plus de 3 types')
          }
          value.split(',').forEach(type => {
            if(!validTypes.includes(type)){
              throw new Error(`Le type du pokémon doit appartenir à la liste suivante ${validTypes}`)
            }
          });
        }
      }
    }
  }, {
      timestamps: true,
      createdAt: 'created', // on renomme la date de création
      updatedAt: false  // on désactive la mise à jour
    })
  }