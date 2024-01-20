import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const Users = db.define('users',{
    name:{
        type: DataTypes.STRING
    },
    email:{
        type: DataTypes.STRING
    },
    password:{
        type: DataTypes.STRING
    },
    refresh_token:{
        type: DataTypes.TEXT
    },
// STRING:
// Biasanya digunakan untuk menyimpan data teks dengan panjang maksimal tertentu.
// TEXT:
// Digunakan untuk menyimpan data teks dengan panjang variabel atau tanpa batasan panjang tertentu.

},{
    freezeTableName:true
});

export default Users;