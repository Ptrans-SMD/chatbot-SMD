
const mysql  = require('mysql');
const dotenv = require('dotenv');
const fs     = require('fs');
const path   = require('path');

dotenv.config({
    path: path.resolve(__dirname, '../.env')
});

/*
 * Informations de connection à la base de données. 
 * Les infos de connection sont dans le fichier .env qui est lui même dans le git ignore.
 * Cela sert à éviter que les accès à la bdd se retrouvent sur github.
 *
 */

const connection = mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    port     : process.env.MYSQL_PORT,
    user     : process.env.MYSQL_ID,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
});

console.log(process.env.MYSQL_HOST);


const saveResults = (data) =>  new Promise((resolve, reject) => {
    fs.writeFile(path.resolve(__dirname, './test.json'), JSON.stringify(data), (err) => {
        if (err) {
            reject(err);
            return;
        }

        console.log('File written');
        resolve();
    });
});

const getProduct = (connection, myQuery) => new Promise((resolve, reject) => {
    connection.query({
        sql: myQuery,
        timeout: 36000, // 36.000s :-)
    }, function (error, results, fields) {
        if (error) {
            reject(error);
            return;
        }
        resolve({
            products       : results,
            product_number : results.length,
        });
    });
});

const sendQuery = (category/*, feature*/) => {

    const feature=["bague","rose"];
    var myQuery  = 'select case when exists designation from ' + category + ' where';

    feature.forEach(function(element) {
        myQuery +=  ' (designation LIKE \'%' + element + '%\' or description LIKE \'%' + element + '%\') AND';
    }, this);

    myQuery = myQuery.substring(0, myQuery.length-4);
    console.log(myQuery);

    connection.connect(function(err) {
        if (err) {
            console.error('error connecting : ' + err.stack);
            return;
        }

        console.log('connected as id ' + connection.threadId);

        Promise.all([getProduct(connection, myQuery)])
            .then(saveResults)
            .catch(console.error)
            .then(() => {
                connection.end(function(err) {
                    console.log('The connection is terminated now');
                });
            });
    });
};

module.exports = sendQuery;