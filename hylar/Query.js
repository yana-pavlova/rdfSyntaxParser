var ldf = require('ldf-client');

class MyEventEmitter {
    constructor() {
        this.events = {};
    }

    on(type, cb) {
        this.events['_on' + type] = this.events['_on' + type] || [];
        this.events['_on' + type].push(cb);
    }

    emit(type, args) {
        this.events['_on' + type] && this.events['_on' + type].forEach((cb) => cb(args));
    }

    unsubscribe() {
        this.events = {};
    }
}

class Query extends MyEventEmitter {
    constructor() {
        super();
        ldf.Logger.setLevel('error');
    }

    get(term) {
        term = term.toLowerCase();
        let fragmentsClient = new ldf.FragmentsClient('http://ldf.kloud.one/ontorugrammaform');

        let q =  
        `
        PREFIX ontolex: <http://www.w3.org/ns/lemon/ontolex#>
        PREFIX lexinfo: <http://www.lexinfo.net/ontology/2.0/lexinfo#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        
        SELECT ?formId ?formP ?formO ?lemmaId ?lemmaP ?lemmaO
        WHERE {
            ?formId ontolex:writtenRep "${term}"@ru .
            ?formId ?formP ?formO .
            
            ?wordId ontolex:otherForm ?formId ;
                    ontolex:canonicalForm ?lemmaId .

            ?lemmaId ?lemmaP ?lemmaO .
        }
        `;
        let r;
        try {
            r = new ldf.SparqlIterator(q, { fragmentsClient: fragmentsClient });
        }
        catch (error) {
            this.emit('error', error);
        }
        if (r) {
            let results = {};
            
            r.on('data', (res) => {
                function addResult(triple) {
                    if (triple.predicate != 'http://www.w3.org/ns/lemon/ontolex#phoneticRep') {
                        let tripleHASH = hashCode(JSON.stringify(triple))
                        if (!results.hasOwnProperty(tripleHASH)) results[tripleHASH] = triple;
                    }
                }
                
                let formTriple = {
                    subject: res['?formId'],
                    predicate: res['?formP'],
                    object: res['?formO']
                }
                let lemmaTriple = {
                    subject: res['?formId'],
                    predicate: res['?lemmaP'],
                    object: res['?lemmaO']
                }
                addResult(formTriple);
                addResult(lemmaTriple);
            });
    
            r.on('end', () => {
                this.emit('data', results);
            });
        }

    }
}

function hashCode(s) {
  var h = 0, l = s.length, i = 0;
  if ( l > 0 )
    while (i < l)
      h = (h << 5) - h + s.charCodeAt(i++) | 0;
  return h;
};

module.exports.Query = Query;
