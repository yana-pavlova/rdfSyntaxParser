let { fullUriToPrefixed } = require('./prefixes');

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
    let words = {};
    for(let s in group) {
        group[s].forEach((po) => {
            if (po.predicate == 'owl:annotatedProperty') edges[s] = group[s];
            if (po.predicate == 'ontolex:writtenRep') words[s] = group[s];
        })
    }
    
    let edgesView = `EDGES (${Object.keys(edges).length}):\n`;
    for(let s in edges) {
        let edgeType, source, target;
        edges[s].forEach((po) => {
            if (po.predicate == 'rdf:type') edgeType = `${po.object}(${s})`;
            if (po.predicate == 'owl:annotatedSource') source = po.object;
            if (po.predicate == 'owl:annotatedTarget') target = po.object;
        })
        edgesView += `${source} -> ${edgeType} -> ${target} \n`;
    }
    
    // console.log(`Words ${Object.keys(words).length}:`, words);
    console.log(`Edges ${Object.keys(edges).length}:`, edges);
    console.log(edgesView);
    
}

module.exports = view;