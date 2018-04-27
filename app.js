let conllu = require('conllu');
let fs = require('fs');
let conllTags2rdf = require('./conllTags2rdf');

let c = new conllu.Conllu()
// c.serial = fs.readFileSync('./syntagrus/ru_syntagrus-ud-train.conllu', 'utf8');
c.serial = fs.readFileSync('./syntagrus/ru_syntagrus-ud-test.conllu', 'utf8');
// c.serial = fs.readFileSync('./syntagrus/test.conllu', 'utf8');

function getFeats(str) {
    if (str) {
        let featsArray = str.split("|");
        featsArray = featsArray.sort((a,b) => {
            if (a < b)
              return -1;
            if (a > b)
              return 1;
            return 0;
        })
        let feats = {};
        featsArray.forEach((f) => {
            let oneFeat = f.split("=");
            feats[oneFeat[0]] = oneFeat[1];
        })
    return feats;
    }
};


function getLinkedWords(sentence) {
    let tokens = sentence.tokens;
    let sentenceText = sentence.comments[1];
    for(let i = 0; i < tokens.length; i++) {
        w1 = tokens[i];
        var headOfW1 = w1.head; // получить номер токена, который по отношению к текущему является главным
        var w2 = tokens[headOfW1 - 1]; // получить объект (токен), который по отношению к w1 является главным
        createRule([w1, w2], sentenceText);
    };
};

// { type:'amod', rule: '...', frequency: 1, weight: 1, id: type+uniqNumber }
let rules = [];

function createRule (words, sentenceText) {
    let w1 = words[0];
    let w2 = words[1];

    let rule = '';

    if (!w2) {
        rule = createRootRule(w1, sentenceText);
    }
    else {
        rule = createWordsRule(w1, w2, sentenceText);
    }
    if (rule) rules.push(rule);
};

// { "(s p o)": {arctype: {w1, w2}}
let compRules = {};
function countCompRules(prerequisites, rdfType, udType, sentenceText, w1, w2) {
    if(!compRules.hasOwnProperty(prerequisites)) compRules[prerequisites] = {};
    if(!Object.keys(compRules[prerequisites]).includes(rdfType)) {
        compRules[prerequisites][rdfType] = {
            sentence: sentenceText,
            udType: udType, 
            w1Form: w1.form,
            w2Form: (w2) ? w2.form : 'root',
        };
    }
};

function createTail(idOfNewEntry, dep, head, sub) {
    var firstTriple = "(" + idOfNewEntry + " http://www.w3.org/1999/02/22-rdf-syntax-ns#type " + dep + ") ^ ";
    var secondTriple = "(" + idOfNewEntry + " http://www.w3.org/2002/07/owl#annotatedProperty http://www.w3.org/2000/01/rdf-schema#subClassOf) ^ ";
    var thirdTriple = "(" + idOfNewEntry + " http://www.w3.org/2002/07/owl#annotatedSource " + sub + ") ^ ";
    var fourthTriple = "(" + idOfNewEntry + " http://www.w3.org/2002/07/owl#annotatedTarget " + head + ") .";
    var result = firstTriple + secondTriple + thirdTriple + fourthTriple; // вывод в правиле как строка
    return result
}

function createRdfFeats(feats) {
    let result = [];
    if(feats) {
        for(key in feats) {
            let rdfFeat = conllTags2rdf['feats'][key][feats[key]];
            if (rdfFeat != undefined) result.push(rdfFeat);
        };
    };
    return result;
}

function createPreTriples(pos, rdfFeats) {
    let preTriples = [];
    if (pos) preTriples.push(pos);
    if(rdfFeats.length != 0) {
        rdfFeats.forEach((f) => preTriples.push(f))
    };
    return preTriples;
}

function createWordsRule(w1, w2, sentenceText) {
    var dep = conllTags2rdf['links'][w1.deprel];
    if (dep == undefined) console.log(w1.deprel);
    
    //var dep = "http://kloud.one/rdfudedges#" + w1.deprel[0].toUpperCase() + w1.deprel.substring(1); // получить название связи в rdf

    var idOfNewEntry = ":id";
    var sub = "?O";
    var head = "?S";

    let conclusion = createTail(idOfNewEntry, dep, head, sub);

    var pos1 = conllTags2rdf['upostag'][w1.upostag]; // часть речи 1 слова в rdf
    var pos2 = conllTags2rdf['upostag'][w2.upostag]; // часть речи 2 слова в rdf

    var w1UdFeats = getFeats(w1.feats); // получаем морфологию 1 слова как объект
    var w1RdfFeats = createRdfFeats(w1UdFeats);

    var w1UdFeats = getFeats(w2.feats); // получаем морфологию 2 слова как объект
    var w2RdfFeats = createRdfFeats(w1UdFeats);

    var preTriples1 = createPreTriples(pos1, w1RdfFeats);

    var preTriples2 = createPreTriples(pos2, w2RdfFeats);

    var prerequisites = ""; // собираем предварительные условия для вывода правила

    let pre1 = '';
    for(let i = 0; i < preTriples1.length; i++) { // собираем по 1 слову
        pre1 += "(?O " + preTriples1[i] + ")";
        if ( i < preTriples1.length - 1 ) pre1 += ' ^ '; 
    };

    let pre2 = '';
    for(let i = 0; i < preTriples2.length; i++) { // собираем по 2 слову
        pre2 += "(?S " + preTriples2[i] + ")";
        if ( i < preTriples2.length - 1 ) pre2 += ' ^ ';
    };

    countCompRules(pre2 + ' ^ '+ pre1, dep, w1.deprel, sentenceText, w1, w2);

    prerequisites = pre2 + ' ^ '+ pre1 + " -> " + conclusion; // склеиваем предварительные условия и вывод (правило)
    
    return createRuleObject(w1.deprel, prerequisites, sentenceText, w1, w2);
};

function createRootRule(w1, sentenceText) {
    var dep = conllTags2rdf['links'][w1.deprel];
    // var dep = "http://kloud.one/rdfudedges#" + w1.deprel; // получить название связи в rdf
    //var dep = dep[0].toUpperCase() + dep.substring(1);
    var idOfNewEntry = ":id";
    var sub = "?O";
    var head = "http://kloud.one/rdfudedges#root_node";

    let conclusion = createTail(idOfNewEntry, dep, head, sub);

    var pos1 = conllTags2rdf['upostag'][w1.upostag]; // часть речи 1 слова в rdf

    var w1UdFeats = getFeats(w1.feats); // получаем морфологию 1 слова как объект
    var w1RdfFeats = createRdfFeats(w1UdFeats);

    var preTriples1 = createPreTriples(pos1, w1RdfFeats);

    var prerequisites = ""; // собираем предварительные условия для вывода правила
    
    for(let i = 0; i < preTriples1.length; i++) { // собираем по 1 слову
        prerequisites += "(?O " + preTriples1[i] + ")";
        if (i < preTriples1.length - 1) prerequisites += ' ^ ';
    };

    countCompRules(prerequisites, dep, w1.deprel, sentenceText, w1, false);

    prerequisites = prerequisites + " -> " + conclusion; // склеиваем предварительные условия и вывод (правило)
    
    return createRuleObject(w1.deprel, prerequisites, sentenceText, w1, false);
};

let typesCount = {};
let wordCount = 0;
function createRuleObject(type, rule, sentenceText, w1, w2) {
    if(w1) wordCount++;
    if(w2) wordCount++;
    let ruleObj = false;
    let found = false;
    let l = rules.length;
    if(!type) {
        return;
    };
    for (let i = 0; i < l; i++) {
        let r = rules[i];
        if (r.rule == rule && r.type == type) {
            r.frequency += 1;
            found = true;
            break;
        }
    }
    if (!found) {
        if (!typesCount.hasOwnProperty(type)) typesCount[type] = 1;
        else typesCount[type] += 1;
        let w1Pos = w1.upostag;
        let w2Pos = '';
        let w1Feats = (w1.feats) ? w1.feats : '';
        let w2Feats = '';
        if (w2) {
            if (w2.feats) w2Feats = w2.feats;
            if (w2.upostag) w2Pos = w2.upostag; 
        }
        else {w2Pos = 'root'}
        ruleObj = {
            text: sentenceText,
            w1Form: w1.form,
            w2Form: (w2) ? w2.form : 'root',
            w1Morph: `POS=${w1Pos}|${w1Feats}`,
            w2Morph: `POS=${w2Pos}|${w2Feats}`,
            id: `${type}_${typesCount[type]}`,
            type: type,
            rule: rule,
            frequency: 1,
            weight: 1,
        }
    }

    return ruleObj;
}



function parseRules(cb) {
    c.sentences.forEach((s) => {
        // var sentence = s.tokens;
        // console.log(s.comments);
        
        getLinkedWords(s);
    })
    cb()
}

// {'amod': [{},{}]}
let splittedRules = {};
function splitRules(cb) {
    rules.forEach((r) => {
        if (!splittedRules.hasOwnProperty(r.type)) splittedRules[r.type] = [];
        splittedRules[r.type].push(r);
    })
    cb();
}

function saveAll() {
    for (let type in splittedRules) {
        let rules = splittedRules[type];
        let fileName = `${type}.json`;
        save(fileName, JSON.stringify(rules, null, 4));
    }
    console.log('done!');
}


function save(fileName, content) {    
    let path = 'rules_all'
    fileName = path + '/' + fileName;
    fs.exists(fileName, (exist) => {
        if (exist) {
            fs.unlinkSync(fileName);
        }
        fs.appendFile(fileName, content, (error) => {
            if(error) console.log(error);
            else console.log('saved', fileName);
        });
    });
}


// main
function main(){
    parseRules(() => {
        splitRules(() => {
            saveAll();
            let stats = `предложений в корпусе: ${c.sentences.length} \n`
            stats += `всего слов: ${wordCount} \n`;
            stats += `всего правил: ${rules.length} \n`;
            stats += JSON.stringify(typesCount, null, 2);
            let compRulesSorted = {};
            // { "(s p o)": {arctype: {w1, w2}}
            for (let pre in compRules) {
                if (Object.keys(compRules[pre]).length > 1) compRulesSorted[pre] = compRules[pre];
            };
            stats += '\n'
            stats += `всего конкурирующих правил: ${Object.keys(compRulesSorted).length}`
            stats += '\n'
            stats += JSON.stringify(compRulesSorted, null, 2);
            // console.log(stats);
            save('stats.txt', stats);
            save('all_rules.json', JSON.stringify(rules, null, 2));
        })
    });
}

main();