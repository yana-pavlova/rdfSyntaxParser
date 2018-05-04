let { fullUriToPrefixed } = require('./prefixes');
const cTable = require('console.table');

function view(triples) {
    let group = {};
    
    triples.forEach((t) => {
        let s = fullUriToPrefixed(t.s.value);
        let p = fullUriToPrefixed(t.p.value);
        let o = fullUriToPrefixed(t.o.value);
        if (!group.hasOwnProperty(s)) group[s] = [];
        group[s].push( {predicate: p, object: o} );
    })
    
    let edges = {};
    let words = [];
    for(let s in group) {
        group[s].forEach((po) => {
            if (po.predicate == 'owl:annotatedProperty') edges[s] = group[s];
            if (po.predicate == 'ontolex:writtenRep') {
                group[s].forEach((po) => {
                    words.push({s: s, p: po.predicate, o: po.object})
                })
            }
        })
    }
    console.table(words)
    let edgesTable = [];
    for(let s in edges) {
        let edgeType, source, target;
        edges[s].forEach((po) => {
            if (po.predicate == 'rdf:type') edgeType = `${po.object}(${s})`;
            if (po.predicate == 'owl:annotatedSource') source = po.object;
            if (po.predicate == 'owl:annotatedTarget') target = po.object;
        })
        edgesTable.push({head: source, edge: edgeType, dependant: target})
    }
    console.log('EDGES', edgesTable.length);
    
    console.table(edgesTable)
}

module.exports = view;