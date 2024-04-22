const dbConfig = require("../config/dbConfig");
const { Sequelize, DataTypes } = require("sequelize");

// Create Sequelize instance with database configurations
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

// Test the database connection
sequelize
    .authenticate()
    .then(() => {
        console.log("CONNECTED!!");
    })
    .catch((err) => {
        console.log("Error" + err);
    });

// Initialize empty object to hold our models
const db = {};

// Add Sequelize and sequelize instances to the db object
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import and define the Blog model
db.blogs = require('./blogModel')(sequelize, DataTypes);

// Import and define the Task model
db.tasks = require('./taskModel')(sequelize, DataTypes);

// Sync all defined models to the database
db.sequelize.sync({ force: false }).then(() => {
    console.log("yes re-sync done");
});

// Export the db object containing all models
module.exports = db;
