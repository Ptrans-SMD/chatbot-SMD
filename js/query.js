const mysql       = require('mysql');
const dotenv      = require('dotenv');
const writeInFile  = require('./stories');

dotenv.config({path:'../.env'});

//informations de connection à la base de données. Les infos de connection sont dans le fichier .env qui est lui même dans le git ignore histoire que les accès à la bdd soient pas sur github
const connection  = mysql.createConnection({
    host        : process.env.MYSQL_HOST,
    port        : process.env.MYSQL_PORT,
    user        : process.env.MYSQL_ID,
    password    : process.env.MYSQL_PASSWORD,
    database    : process.env.MYSQL_DATABASE
});

const category; //catégorie trouvée par le bot
const feature; //caractéristique trouvée par le bot

const myQuery = "
DECLARE @TABLE_NAME VARCHAR(128)
DECLARE @SCHEMA_NAME VARCHAR(128)

-----------------------------------------------------------------------

-- Set up the name of the table here :
SET @TABLE_NAME = "+category+"
-- Set up the name of the schema here, or just leave set to 'dbo' :
SET @SCHEMA_NAME = "+process.env.MYSQL_DATABASE+"

-----------------------------------------------------------------------

DECLARE @vvc_ColumnName VARCHAR(128)
DECLARE @vvc_ColumnList VARCHAR(MAX)

IF @SCHEMA_NAME =''
  BEGIN
  PRINT 'Error : No schema defined!'
  RETURN
  END

IF NOT EXISTS (SELECT * FROM sys.tables T JOIN sys.schemas S
      ON T.schema_id=S.schema_id
      WHERE T.Name=@TABLE_NAME AND S.name=@SCHEMA_NAME)
  BEGIN
  PRINT 'Error : The table '''+@TABLE_NAME+''' in schema '''+
      @SCHEMA_NAME+''' does not exist in this database!' 
  RETURN
 END

DECLARE TableCursor CURSOR FAST_FORWARD FOR
SELECT   CASE WHEN PATINDEX('% %',C.name) > 0 
     THEN '['+ C.name +']' 
     ELSE C.name 
     END
FROM     sys.columns C
JOIN     sys.tables T
ON       C.object_id  = T.object_id
JOIN     sys.schemas S
ON       S.schema_id  = T.schema_id
WHERE    T.name    = @TABLE_NAME
AND      S.name    = @SCHEMA_NAME
ORDER BY column_id


SET @vvc_ColumnList=''

OPEN TableCursor
FETCH NEXT FROM TableCursor INTO @vvc_ColumnName

WHILE @@FETCH_STATUS=0
  BEGIN
   SET @vvc_ColumnList = @vvc_ColumnList + @vvc_ColumnName

    -- get the details of the next column
   FETCH NEXT FROM TableCursor INTO @vvc_ColumnName

  -- add a comma if we are not at the end of the row
   IF @@FETCH_STATUS=0
    SET @vvc_ColumnList = @vvc_ColumnList + ','
   END

 CLOSE TableCursor
 DEALLOCATE TableCursor


SELECT * FROM "+category+" WHERE "+feature+" in (@vvc_ColumnList)"


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

connection.connect(function(err) {
    if (err) {
        console.error('error connecting : ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);

    Promise.all(getProduct(connection))
        .catch(console.error)
        .then(() => {
            connection.end(function(err) {
                console.log('The connection is terminated now');
            });
        });
});
