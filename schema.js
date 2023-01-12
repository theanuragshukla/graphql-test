const { GraphQLInt, GraphQLList, GraphQLObjectType, GraphQLSchema, GraphQLString } = require('graphql')

const PersonType = new GraphQLObjectType({
	name:"PersonType", 
	desc:"...",
	fields:()=>({
		fname:{
			type:GraphQLString,
			resolve:(person)=> (person.fname)
		},
		lname:{
			type:GraphQLString,
			resolve:(person)=>(person.lname)
		}, 
		id:{
			type:GraphQLInt,
			resolve:(person)=>(person.id)
		}, 
		friends:{
			type:new GraphQLList(PersonType),
			resolve:(person, args, {loaders})=>loaders.person.loadMany(person.friends)
		}
	})
})

const QueryType = new GraphQLObjectType({
	name:"Query", 
	desc:"...", 
	fields:()=>({
		person:{
			type:PersonType, 
			args:{
				id:{type:GraphQLInt}
			},
			resolve:(root, args, {loaders})=>{
				return loaders.person.load(args.id) 
			}
		}
	})
})

module.exports =  new GraphQLSchema({
	query:QueryType
})
