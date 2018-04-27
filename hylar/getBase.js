let {Query} = require('./Query');

let results = {};
let counter = 0;

function getBase(terms) {
    return new Promise((resolve, reject) => {
        terms.forEach((t) => {
            let query = new Query();
            query.get(t);
            counter ++;
    
            query.on('data', (data) => {
                results[t] = data;
                counter --;
                if (!counter) {
                    cleanUpHash(results)
                        .then((triples) => {
                            return createTurtle(triples);
                        })
                        .then((turtle) => {
                            resolve(turtle)
                        })
                        .catch((e) => console.log(e))
                }
            })
        })
    })
}

function cleanUpHash(obj){
    return new Promise((resolve, reject) => {
        let triples = [];
        for(let word in obj) {
            for(let hash in obj[word]) {
                triples.push(obj[word][hash])
            }
        }
        resolve(triples);
    })
}

function createTurtle(triples){    
    return new Promise((resolve, reject) => {
        let turtle = ''
        triples.forEach((t) => {
            let subj = escape(t.subject);
            let pred = escape(t.predicate);
            let obj = escape(t.object);
            turtle += `${subj} ${pred} ${obj} .\n`
        })
        resolve(turtle)
    })
}

function escape(str) {
    if (str.includes('http://') || str.includes('https://')) str = `<${str}>`;
    return (str)
}

module.exports = getBase;