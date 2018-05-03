let prefixes = {
    'ontolex': 'http://www.w3.org/ns/lemon/ontolex',
    'lexinfo': 'http://www.lexinfo.net/ontology/2.0/lexinfo',
    'rdfs': 'http://www.w3.org/2000/01/rdf-schema',
    'rdf': 'http://www.w3.org/1999/02/22-rdf-syntax-ns',
    'owl': 'http://www.w3.org/2002/07/owl',
    'ud': 'http://kloud.one/ud2rdf',
    'orgf': 'http://ldf.kloud.one/ontorugrammaform',
}

function prefixedToFullUri(uri) {
    for(let pref in prefixes) {
        let full = prefixes[pref]
        let prefRegex = new RegExp(` ${pref}:`, 'g')
        uri = uri.replace(prefRegex, ` ${full}#`)
    }
    return uri;
}

function fullUriToPrefixed(uri){
    for(let pref in prefixes) {
        let full = prefixes[pref]
        uri = uri.replace(`${full}#`, `${pref}:`)
    }
    return uri;
}

module.exports = {
    prefixedToFullUri: prefixedToFullUri,
    fullUriToPrefixed: fullUriToPrefixed,
}