import Sequelize from 'sequelize'

import User from './user'
import Food from './food'
import Entry from './entry'
import FoodEntry from './foodentry'

export default class db {

    constructor() {
        this.__db_connString = process.env.DATABASE_URL;
        this.__db_connOptions = {
            dialectOptions: {
                ssl: (process.env.ENVIRONMENT == 'dev')
            }
        }
        this.db = new Sequelize(this.__db_connString, this.__db_connOptions);
    }

    setupDb() {
        this.User = User(this.db, Sequelize);
        this.Food = Food(this.db, Sequelize);
        this.Entry = Entry(this.db, Sequelize);
        this.FoodEntry = FoodEntry(this.db, Sequelize);

        this.User.hasMany(this.Entry, { as: 'Entries'});
        this.User.hasMany(this.Food, { as: 'Foods' });

        this.Food.belongsToMany(this.Entry, { as: "Entries", through: this.FoodEntry });
        this.Entry.belongsToMany(this.Food, { as: "Foods", through: this.FoodEntry });
    }

}

