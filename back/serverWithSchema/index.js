var express = require('express');
var { graphqlHTTP } = require('express-graphql');
var { buildSchema, GraphQLError } = require('graphql');

var schema = buildSchema(`
  scalar BigInt
  type TimeDecompose {
    year: Int
    month: Int
    day: Int
    hour: Int
    minute: Int
    second: Int
    unixtime: BigInt
  }
  type Query {
    times(iso: String!): TimeDecompose
  }
`);

// 该类继承 RandomDie GraphQL 类型
class TimeDecompose {
  constructor(iso) {
    this.iso = new Date(iso);
  }


  year() {
    return this.iso.getUTCFullYear()
  }

  month() {
    return this.iso.getUTCMonth()
  }

  day() {
    return this.iso.getUTCDay()
  }

  hour() {
    return this.iso.getUTCHours()
  }

  minute() {
    return this.iso.getUTCMinutes()
  }

  second() {
    return this.iso.getUTCSeconds()
  }

  unixtime() {
    return new Date(this.iso).valueOf()
  }

}


// // 根节点为每个 API 入口端点提供一个 resolver 函数
var root = {
  times: ({ iso }) => {
    return new TimeDecompose(iso);
  },
};


var app = express();
app.use('/parsetime', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(4000);
console.log('Running a GraphQL API server at http://localhost:4000/parsetime');