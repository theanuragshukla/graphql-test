var express = require('express');
var app = express();
var { graphqlHTTP } = require('express-graphql');
const DataLoader = require('dataloader')
const schema = require('./schema')
const db = require('./db')
function getUser(id){
	return db[id]
}
app.use('/graphql', graphqlHTTP(req => {
	const personLoader = new DataLoader(
		keys => Promise.all(keys.map(getUser))
	)
	const loaders = {
		person:personLoader 
	}
	return {
		graphiql:true, 
		schema:schema,
		context:{loaders}
	}
}));


app.listen(4000, ()=>{
	console.log(`running on http://localhost:4000/graphql`);
});
