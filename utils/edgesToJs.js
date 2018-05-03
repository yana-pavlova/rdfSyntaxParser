var N3 = require('n3');
var fs = require('fs');
var N3Util = N3.Util;

var parser = N3.Parser();
var triples = fs.readFileSync('./ud2rdf.ttl');

parser.parse(triples.toString(), function(error, triple, prefixes) {
  if (error) console.log(error);
  else if (triple) {    
    if (triple.predicate == 'http://www.w3.org/2000/01/rdf-schema#label') {
      console.log(`"${N3Util.getLiteralValue(triple.object)}" : "${triple.subject}" ,`);
    }
  }
    
});
