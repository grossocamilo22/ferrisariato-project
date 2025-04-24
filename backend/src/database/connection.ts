import { DB_DATABASE, DB_HOST, DB_PASSWORD, DB_USERNAME } from 'configs';
import {Sequelize} from 'sequelize';

const sequelizeConexion:Sequelize = new Sequelize(DB_DATABASE,DB_USERNAME, DB_PASSWORD,{
    host: DB_HOST,
    dialect:'postgres',
    port:5432
});

export default sequelizeConexion