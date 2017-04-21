const mysql       = require('mysql');
const dotenv      = require('dotenv');
const fs          = require('fs');

dotenv.config({path:'../.env'});

//informations de connection à la base de données. Les infos de connection sont dans le fichier .env qui est lui même dans le git ignore histoire que les accès à la bdd soient pas sur github
const connection  = mysql.createConnection({
    host        : process.env.MYSQL_HOST,
    port        : process.env.MYSQL_PORT,
    user        : process.env.MYSQL_ID,
    password    : process.env.MYSQL_PASSWORD,
    database    : process.env.MYSQL_DATABASE
});

const category="the"; //catégorie trouvée par le bot
const feature="bio"; //caractéristique trouvée par le bot

const myQuery = 'select designation from '+category+' where designation LIKE \'%'+feature+'%\' or description LIKE \'%'+feature+'%\'';

const getProduct = (connection) => new Promise((resolve, reject) => {
    connection.query({
        sql: myQuery,
        timeout: 36000, // 36.000s :-)
    }, function (error, results, fields) {
        if (error) {
            reject(error);
            return;
        }
        resolve({
            products: results,
            product_number: results.length,
        });
    });
});

const saveResults = (data) =>  new Promise((resolve, reject) => {
    fs.writeFile('test.json', JSON.stringify(data), (err) => {
        if (err) {
            reject(err);
            return;
        }

        console.log('File wrtitten');
        resolve();
    });
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting : ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);

    Promise.all([getProduct(connection)])
        .then(saveResults)
        .catch(console.error)
        .then(() => {
            connection.end(function(err) {
                console.log('The connection is terminated now');
            });
        });
});
