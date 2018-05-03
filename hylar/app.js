// По балльной системе Германия получила 12 баллов, США, Швейцария - 4, Англия, Китай, Швеция - 3, Франция, Япония - 2 балла

let  Hylar = require('hylar');
let h = new Hylar();
let getBase = require('./getBase');
let { prefixedToFullUri } = require('./prefixes');
let view = require('./view');


// http://www.w3.org/1999/02/22-rdf-syntax-ns#rdf:type http://kloud.one/rdfudedges#Obl
// -> (:id http://www.w3.org/1999/02/22-rdf-syntax-ns#type http://kloud.one/rdfudedges#Case) ^ (:id http://www.w3.org/2002/07/owl#annotatedProperty http://www.w3.org/2000/01/rdf-schema#subClassOf) ^ (:id http://www.w3.org/2002/07/owl#annotatedSource ?S) ^ (:id http://www.w3.org/2002/07/owl#annotatedTarget ?O) .",
// let q = `
// PREFIX ontolex: <http://www.w3.org/ns/lemon/ontolex#>
// PREFIX lexinfo: <http://www.lexinfo.net/ontology/2.0/lexinfo#>
// PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
// PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
// PREFIX owl: <http://www.w3.org/2002/07/owl#>
// PREFIX ud: <http://kloud.one/rdfudedges#>
//
// SELECT *
// WHERE {
//     ?headId ontolex:writtenRep "открывались"@ru .
//     ?tailId ontolex:writtenRep "школы"@ru .
//     ?linkId owl:annotatedSource ?headId ;
//             owl:annotatedTarget ?tailId ;
//             rdf:type ?linkType .
// }
// `

let q = `
SELECT *
WHERE { ?s ?p ?o }
`

let terms = [
    'По',
    'балльной',
    'системе',
    'Германия',
    'получила',
    '12',
    'баллов',
    ',',
    'США',
    ',',
    'Швейцария',
    '-',
    '4',
    ',',
    'Англия',
    ',',
    'Китай',
    ',',
    'Швеция',
    '-',
    '3',
    ',',
    'Франция',
    ',',
    'Япония',
    '-',
    '2',
    'балла',
]

let fakeRules = [
    {
        // id: 1,
        rule: '(?s ?p ?o) ^ (?s ?p ?o) -> (_:UNIQUE owl:Source ?o) ^ (_:UNIQUE owl:pred ?p) ^ (_:UNIQUE owl:Target ?s)'
    },
    // {
    //     id: 2,
    //     rule: '(?s ?p ?o) -> (_:UNIQUE2 owl:Source ?o) ^ (_:UNIQUE2 owl:pred ?p) ^ (_:UNIQUE2 owl:Target ?s)'
    // }
]
let fakeTurtles = `
    @prefix : <http://ex.com#> .

    :a :p1 :b .
    :b :p2 :c .
`
// parseAndAddRules(fakeRules)
parseAndAddRules(require('../rules/root.json'))
// parseAndAddRules(require('../handMadeRules.json'))
// parseAndAddRules(false)
    .then((msg) => {
        console.log(msg);
        return getBase(terms)
    })
    .then((turtles) => {
        return h.load(turtles, 'text/turtle', false);
        // return h.load(fakeTurtles, 'text/turtle', false);
    })
    .then((loaded) => console.log('loaded:', loaded))
    .then(() => {
        return h.query(q);
    })
    .then((res) => {
        console.log('query results:');
        view(res);
        // res.forEach((r) => {
        //     console.log(r.s.value, r.p.value, r.o.value);
        // })
    })

function parseAndAddRules(rules) {
    return new Promise((resolve, reject) => {
        if (rules) {
            let l = rules.length;
            for(i = 0; i < l; i++) {
                let r = rules[i];
                r.rule = prefixedToFullUri(r.rule);
                h.parseAndAddRule(r.rule, r.id);
            }
            resolve(`parsed ${l} rules`);
        }
        else resolve('no rules')
    })
}
