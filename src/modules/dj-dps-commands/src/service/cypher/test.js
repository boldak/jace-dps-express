// var neo4j = require('neo4j');
// var db = new neo4j.GraphDatabase(
//     "https://app83770167-ShU0I2:b.rIQ7MDqlCGPG.UiYEitJt5P1GbpW3@hobby-nlhgecabchbdgbkegbhaepel.dbs.graphenedb.com:24780"
// ) //process.env['GRAPHENEDB_URL']);
// console.log(db)
// db.query({
//     query: `MATCH (:Person {name: 'Tom Hanks'})-[:ACTED_IN]->(movies) RETURN movies.title AS title`
// }, function(err, results){
//     if (err) {
//         console.error('Error saving new node to database:', err);
//     } else {
//         console.log('Node saved to database with id:', JSON.stringify(results, null, " "));
//     }
// });


var neo4j = require('neo4j-driver');

var graphenedbURL = "bolt://hobby-nlhgecabchbdgbkegbhaepel.dbs.graphenedb.com:24787"//process.env.GRAPHENEDB_BOLT_URL;
var graphenedbUser = "EDU"//process.env.GRAPHENEDB_BOLT_USER;
var graphenedbPass = "b.C3oDsxRWmkiT.9tfqNvlO5uEm4KUW"//process.env.GRAPHENEDB_BOLT_PASSWORD;

var driver = neo4j.driver(graphenedbURL, neo4j.auth.basic(graphenedbUser, graphenedbPass), {encrypted: 'ENCRYPTION_ON'});

var session = driver.session();

session
    .run("MATCH (:Person {name: 'Tom Hanks'})-[:ACTED_IN]->(movies) RETURN movies")
    .then(function(result) {
	console.log(">>",result)
        result.records.forEach(function(record) {
            console.log(record)
        });

        session.close();
	   driver.close()
    })
    .catch(function(error) {
        console.log(error);
    });

 