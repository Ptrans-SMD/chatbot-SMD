const mysql = require('mysql');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

dotenv.config({
    path: path.resolve(__dirname, '../.env')
});

const saveResults = (data) => new Promise((resolve, reject) => {
    fs.writeFile(path.resolve(__dirname, './test.json'), JSON.stringify(data), (err) => {
        if (err) {
            reject(err);
            return;
        }

        console.log('>> File written');
        resolve();
    });
});

const getProduct = (connection, myQuery) => new Promise((resolve, reject) => {
    connection.query({
        sql: myQuery,
        timeout: 3000, // 3.000s
    }, function (error, results, fields) {
        if (error) {
            reject(error);
            return;
        }
        resolve({
            products: results[0],
            product_number: results[0].length,
        });
    });
});

const sendQuery = (connection, category, feature) => new Promise((resolve, reject) => {

    var subQuery = 'select designation from ' + category[0] + ' where (designation LIKE \'%' + category[1] + '%\' or description LIKE \'%' + category[1] + '%\') AND';
    var subQuery2 = 'select designation from ' + category[0] + ' where (designation LIKE \'%' + category[1] + '%\') AND';

    feature.forEach(function (element) {
        subQuery += ' (designation LIKE \'%' + element + '%\' or description LIKE \'%' + element + '%\') AND';
        subQuery2 += ' (designation LIKE \'%' + element + '%\') AND';
    }, this);

    subQuery = subQuery.substring(0, subQuery.length - 4);
    subQuery2 = subQuery2.substring(0, subQuery2.length - 4);
    // console.log(subQuery);
    // console.log(subQuery2);

    const myQuery = 'CALL LoadProduct(\"' + category + '\",\"' + subQuery + '\",\"' + subQuery2 + '\")';
    console.log('>> Query to be sent' + myQuery);

    Promise.all([getProduct(connection, myQuery)])
        .then(saveResults)
        .catch(reject)
        .then(()=>{
            resolve();
        });
});

module.exports = sendQuery;