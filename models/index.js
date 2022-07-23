const User = require("./User");
const Post = require("./Post");
const Comment = require("./Comment");

//create associations
//thank to sequelize, we can now use JavaScript to explicitly create this relation that user can make many posts.
//creates the reference for the id column in the user model to link to the corresponding foreign key pair, which is the user_id in the Post model
User.hasMany(Post, {
  foreignKey: "user_id",
});

//post can only belong to one user
Post.belongsTo(User, {
  foreignKey: "user_id",
});

//user can make many comments
User.hasMany(Comment, {
  foreignKey: "user_id",
});

//comment can only belong to one user
Comment.belongsTo(User, {
  foreignKey: "user_id",
});

//user can make many posts
Post.hasMany(Comment, {
  foreignKey: "post_id",
});

//a comment can only belong to one user
Comment.belongsTo(Post, {
  foreignKey: "post_id",
});

//can add mutliple models into one line by using, which is exported
module.exports = { User, Post, Comment };
