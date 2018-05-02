const mongoose = require('mongoose');
const chalk = require('chalk');
const log = console.log;
const error = chalk.bold.red;

//'mongodb://hushino:123@ds161742.mlab.com:61742/anime'
//mongodb://localhost:27017/anime
//require('dotenv').config({ path: 'variables.env' });
mongoose.Promise = global.Promise;
// Es nesesario declarar explicitamente la url de coneccion o no funcionara en produccion

let mongodbUri = mongoose.connect('mongodb://hushino:123@ds161742.mlab.com:61742/anime', {
    poolSize: 5, //Number of connections in the connection pool for each server instance, set to 5 as default for legacy reasons.
    reconnectTries: 240, //intenta conectarse 60 veceses cada tantos milisegundos, default 30
    reconnectInterval: 900, //milliseconds
    autoReconnect: true,
    noDelay: true,
    loggerLevel: "error",//warn, info, debug. Default: "error"
    //appname: "RedMagic Corp." //Soporte apartir de mongo 3.4
});

//Logger de mongo
//mongoose.set('debug', true);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () { log(chalk.hex('#FFEB3B')("Te conectaste a la base de datos sin errores 👏 "),chalk.greenBright( "😁"))}); // 1 speed

//Sirve para especificar errores en mongodb
process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
    // application specific logging, throwing an error, or other logic here
  });


const start = require('./app');



// Start the server
/* app.set('port', process.env.PORT || 9000);
const server = app.listen(app.get('port'), () => log(chalk.underline.hex('#DEADED')('Server is listening music on port:'), chalk.hex('#4CAF50')(`\uD83C\uDF0F http://localhost:${port} 🎶`)));
 */

start.set('port', process.env.PORT || 9000);
const server = start.listen(start.get('port'), () => {
  log(chalk.underline.hex('#DEADED')('Server is listening music on port:'), chalk.hex('#4CAF50')(`\uD83C\uDF0F  PORT → ${server.address().port} 🎶`));
  //console.log(`Express running → PORT ${server.address().port}`);
});
