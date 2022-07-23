const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
//sets the hashing npm node
const bcrypt = require("bcrypt");

//create our User model, verify user's password by comparing the plaintext and the hased password verison.  this class is to access the password property of each user instance.  the checkPassword takes in the plaintext password retrieved from the client requests at req.body.email and compares that with the hashed password
class User extends Model {
  //set up method to run on instance data(per user) to check password
  checkPassword(loginPw) {
    //keyword this. we can access the user's properties, including the password which was stored in the hashed string
    return bcrypt.compareSync(loginPw, this.password);
  }
}

//define table columns and configuration
User.init(
  {
    //TABLE COLUMN DEFINITIONS GO HERE
    //define an id column
    id: {
      // use the special Sequelize DataTypes object provide what type of data it is
      type: DataTypes.INTEGER,
      // this is the equivalent of SQL's `NOT NULL` option
      allowNull: false,
      // instruct that this is the Primary Key
      primaryKey: true,
      // turn on auto increment
      autoIncrement: true,
    },
    // define a username column
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    // define an email column
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // there cannot be any duplicate email values in this table
      unique: true,
      // if allowNull is set to false, we can run our data through validators before creating the table data
      validate: {
        isEmail: true,
      },
    },
    // define a password column
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // this means the password must be at least four characters long
        len: [4],
      },
    },
  },
  {
    //Sequelize functions, a lifecycle events, called before or after calls in Sequelize this hook is to hash the password
    hooks: {
      //set up beforeCreate lifecycle "hook" functionality
      async beforeCreate(newUserData) {
        //async/await works one in front of the other, makes the function see more synchronous expression.  await will gracefully assigne the value of the response to newUserData's password property
        newUserData.password = await bcrypt.hash(newUserData.password, 10);
        return newUserData;
      },

      //set up beforeUpdate lifecycle "hook" functionality
      //need to add option to the query call for beforeUpdate, need individualHooks: true under user-routes.js in api folder
      async beforeUpdate(updatedUserData) {
        updatedUserData.password = await bcrypt.hash(
          updatedUserData.password,
          10
        );
        return updatedUserData;
      },
    },

    //TABLE CONFIGURATION OPTIONS GO HERE (https://sequelize.org/v5/manual/models-definition.html#configuration))

    //pass in our imported sequelize connection (the direct connection to our database)
    sequelize,
    //dont automactially create createdAt/updatedAt timestamp fields
    timestamps: false,
    //don't pluralize name of database table, so it takes in the actual name in, this reflects the id portion above
    freezeTableName: true,
    //use underscores instead of camel-casing (i.e. `comment_text` and not `commentText`)
    underscored: true,
    //make it so our model name stays lowercase in the database
    modelName: "user",
  }
);

//pushes on the models/index.js
module.exports = User;
