/*
# text = В городах открывались школы, появлялись промышленные предприятия.
# sent_id = 11
1	В	в	ADP	_	_	2	case	2:case	_
2	городах	город	NOUN	_	Animacy=Inan|Case=Loc|Gender=Masc|Number=Plur	3	obl	3:obl	_
3	открывались	открываться	VERB	_	Aspect=Imp|Mood=Ind|Number=Plur|Tense=Past|VerbForm=Fin|Voice=Mid	0	root	0:root	_
4	школы	школа	NOUN	_	Animacy=Inan|Case=Nom|Gender=Fem|Number=Plur	3	nsubj	3:nsubj	SpaceAfter=No
5	,	,	PUNCT	_	_	4	punct	4:punct	_
6	появлялись	появляться	VERB	_	Aspect=Imp|Mood=Ind|Number=Plur|Tense=Past|VerbForm=Fin|Voice=Mid	3	conj	3:conj	_
7	промышленные	промышленный	ADJ	_	Case=Nom|Degree=Pos|Number=Plur	8	amod	8:amod	_
8	предприятия	предприятие	NOUN	_	Animacy=Inan|Case=Nom|Gender=Neut|Number=Plur	6	nsubj	6:nsubj	SpaceAfter=No
9	.	.	PUNCT	_	_	8	punct	8:punct	_
*/

let  Hylar = require('hylar');
let h = new Hylar();
let getBase = require('./getBase');

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
    // 'В',
    // 'городах',
    'открывались',
    'школы',
    // ',',
    // 'появлялись',
    // 'промышленные',
    // 'предприятия',
]

parseAndAddRules(require('../rules/nsubj.json'))
// parseAndAddRules(false)
// parseAndAddRules(fakeRules)
    .then((msg) => {
        console.log(msg);
        return getBase(terms)
    })
    .then((turtles) => {
        return h.load(turtles, 'text/turtle', false)
        // return h.load(fakeTriples, 'text/turtle', false)
        
    })
    .then((loaded) => console.log('loaded:', loaded))
    .then(() => {
        return h.query(q);
    })
    .then((res) => {
        console.log('query results:');
        res.forEach((r) => {
            console.log(r.s.value, r.p.value, r.o.value);
        })
    })

function parseAndAddRules(rules) {
    return new Promise((resolve, reject) => {
        if (rules) {
            let l = rules.length;
            for(i = 0; i < l; i++) {
                let r = rules[i];
                r.rule = r.rule.replace(/lexinfo:/g, 'http://www.lexinfo.net/ontology/2.0/lexinfo#');
                h.parseAndAddRule(r.rule, r.id);
            }
            resolve(`parsed ${l} rules`);
        }
        else resolve('no rules')
    })
}
