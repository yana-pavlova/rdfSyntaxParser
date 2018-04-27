module.exports = {
    "feats": {
        "Case": {
            "Nom" :	"lexinfo:case lexinfo:nominativeCase",
            "Gen" :	"lexinfo:case lexinfo:genitiveCase",
            "Dat" :	"lexinfo:case lexinfo:dativeCase",
            "Acc" :	"lexinfo:case lexinfo:accusativeCase",
            "Ins" :	"lexinfo:case lexinfo:instrumentalCase",
            "Loc" :	"lexinfo:case lexinfo:locativeCase",
            "Voc" : "lexinfo:case lexinfo:vocativeCase",
            "Par" : "lexinfo:case lexinfo:partitiveCase",
        },
        "Number": {
            "Sing" :	"lexinfo:number lexinfo:singular",
            "Plur" :	"lexinfo:number lexinfo:plural",
            "Coll" :	"lexinfo:number lexinfo:singulariaTantum",
            "Ptan" :	"lexinfo:number lexinfo:pluraliaTantum",
            //"Fixd" : "lexinfo:number lexinfo:fixedNumber",
        },
        "Gender": {
            "Masc" :	"lexinfo:gender lexinfo:masculine",
            "Fem" :	"lexinfo:gender lexinfo:feminine",
            "Neut" :	"lexinfo:gender lexinfo:neuter",
            //"Ms-f" : "lexinfo:gender lexinfo:commonGender",
        },
        "Animacy": {
            "Anim" : "lexinfo:animacy lexinfo:animate",
            "Inan" : "lexinfo:animacy lexinfo:inanimate",
        },
        "Degree": {
            "Cmp" : "lexinfo:degree lexinfo:comparative",
            "Sup" : "lexinfo:degree lexinfo:superlative",
            // "Pos" : "lexinfo:degree lexinfo:positiveDegreeForm", // в OpenCorpora отсутствует
        },
        "VerbForm": {
            "Part" :	"lexinfo:partOfSpeech lexinfo:participle",
            "Inf" : "lexinfo:verbFormMood lexinfo:infinitive",
            // "Impe" : "lexinfo:partOfSpeech lexinfo:impersonalVerb",
            // "Fin" : "lexinfo:finiteness lexinfo:finite", // в OpenCorpora отсутствует
            "Conv" : "lexinfo:verbFormMood lexinfo:gerundive",
        },
        "Mood": {
            "Ind" : "lexinfo:mood lexinfo:indicative",
            "Imp" : "lexinfo:mood lexinfo:imperative",
            // "Cnd" : "lexinfo:mood lexinfo:subjunctive", // в OpenCorpora отсутствует
        },
        "Tense": {
            "Pres" :	"lexinfo:tense lexinfo:present",
            "Past" :	"lexinfo:tense lexinfo:past",
            "Fut" : "lexinfo:tense lexinfo:future",
        },
        "Aspect": {
            "Perf" :	"lexinfo:aspect lexinfo:perfective",
            "Imp" : "lexinfo:aspect lexinfo:imperfective",
        },
        "Voice": {
            "Act" :	"lexinfo:voice lexinfo:activeVoice",
            "Pass" : "lexinfo:voice lexinfo:passiveVoice",
            // "Mid" : "lexinfo:voice lexinfo:middleVoice", // в OpenCorpora отсутствует
        },
        "Polarity": {
            // "Neg" : "lexinfo:negative lexinfo:no", // в OpenCorpora отсутствует
        },
        "Person": {
            "1" :	"lexinfo:person lexinfo:firstPerson",
            "2" :	"lexinfo:person lexinfo:secondPerson",
            "3" : "lexinfo:person lexinfo:thirdPerson",
        },
        "Variant": {
            "Short" :	"lexinfo:partOfSpeech lexinfo:shortParticiple",
        },
        "Foreign": {
            "Yes" : "lexinfo:termType lexinfo:internationalism",
        },
    },
    "upostag": {
        "NOUN" :	"lexinfo:partOfSpeech lexinfo:noun",
        "ADJ" :	"lexinfo:partOfSpeech lexinfo:adjective",
        //"ADJS" :	"lexinfo:partOfSpeech lexinfo:shortAdjective",
        //"COMP" : "lexinfo:partOfSpeech lexinfo:adjective",
        "VERB" : "lexinfo:partOfSpeech lexinfo:verb",
        //"INFN" :	"lexinfo:partOfSpeech lexinfo:verb",
        //"PART" :	"lexinfo:partOfSpeech lexinfo:participle", это в feats
        //"PRTS" :	"lexinfo:partOfSpeech lexinfo:shortParticiple",
        //"GRND" :	"lexinfo:partOfSpeech lexinfo:gerund",
        "NUM" :	"lexinfo:partOfSpeech lexinfo:numeral",
        "ADV" :	"lexinfo:partOfSpeech lexinfo:adverb",
        "PRON" :	"lexinfo:partOfSpeech lexinfo:pronoun",
        "ADP" :	"lexinfo:partOfSpeech lexinfo:preposition",
        // "CCONJ" :	"lexinfo:partOfSpeech lexinfo:coordinatingConjunction", // в OpenCorpora отсутствует
        // "SCONJ" :	"lexinfo:partOfSpeech lexinfo:subordinatingConjunction", // в OpenCorpora отсутствует
        "PART" :	"lexinfo:partOfSpeech lexinfo:particle",
        "INTJ" : "lexinfo:partOfSpeech lexinfo:interjection",
        //"Impe" : "lexinfo:partOfSpeech lexinfo:impersonalVerb",
        //"Coll" : "lexinfo:partOfSpeech lexinfo:collectiveNumeral",
        // "AUX" : "lexinfo:partOfSpeech lexinfo:mainVerb", // в OpenCorpora отсутствует
        // "PUNCT" : "lexinfo:partOfSpeech lexinfo:punctuation", // в OpenCorpora отсутствует
        // "PROPN" : "lexinfo:partOfSpeech lexinfo:properNoun", // в OpenCorpora отсутствует
        // "DET" : "lexinfo:partOfSpeech lexinfo:article", // в OpenCorpora отсутствует (надо подумать!!!)
        // "SYM" : "lexinfo:termType lexinfo:symbol", // в OpenCorpora отсутствует
    },
    "links": {
        "nsubj" : "http://kloud.one/rdfudedges#Nsubj" ,
        "nsubj:pass" : "http://kloud.one/rdfudedges#Nsubj_pass" ,
        "obj" : "http://kloud.one/rdfudedges#Obj" ,
        "iobj" : "http://kloud.one/rdfudedges#Iobj" ,
        "obl" : "http://kloud.one/rdfudedges#Obl" ,
        "vocative" : "http://kloud.one/rdfudedges#Vocative" ,
        "expl" : "http://kloud.one/rdfudedges#Expl" ,
        "nmod" : "http://kloud.one/rdfudedges#Nmod" ,
        "appos" : "http://kloud.one/rdfudedges#Appos" ,
        "nummod" : "http://kloud.one/rdfudedges#Nummod" ,
        "nummod:gov" : "http://kloud.one/rdfudedges#Nummod_gov" ,
        "nummod:entity" : "http://kloud.one/rdfudedges#Nummod_entity" , //???
        "csubj" : "http://kloud.one/rdfudedges#Csubj" ,
        "csubj:pass" : "http://kloud.one/rdfudedges#Csubj_pass" ,
        "ccomp" : "http://kloud.one/rdfudedges#Ccomp" ,
        "xcomp" : "http://kloud.one/rdfudedges#Xcomp" ,
        "advcl" : "http://kloud.one/rdfudedges#Advcl" ,
        "acl" : "http://kloud.one/rdfudedges#Amod" ,
        "acl:relcl" : "http://kloud.one/rdfudedges#Acl_relcl" ,
        "advmod" : "http://kloud.one/rdfudedges#Advmod" ,
        "discourse" : "http://kloud.one/rdfudedges#Discourse" ,
        "amod" : "http://kloud.one/rdfudedges#Amod" ,
        "aux" : "http://kloud.one/rdfudedges#Aux" ,
        "aux:pass" : "http://kloud.one/rdfudedges#Aux_pass" ,
        "cop" : "http://kloud.one/rdfudedges#Cop" ,
        "mark" : "http://kloud.one/rdfudedges#Mark" ,
        "det" : "http://kloud.one/rdfudedges#Det" ,
        "case" : "http://kloud.one/rdfudedges#Case" ,
        "conj" : "http://kloud.one/rdfudedges#Conj" ,
        "cc" : "http://kloud.one/rdfudedges#Cc" ,
        "fixed" : "http://kloud.one/rdfudedges#Fixed" ,
        "flat" : "http://kloud.one/rdfudedges#Flat" ,
        "flat:name" : "http://kloud.one/rdfudedges#Flat_name" ,
        "flat:foreign" : "http://kloud.one/rdfudedges#Flat_foreign" , // ???
        "compound" : "http://kloud.one/rdfudedges#Compound" ,
        "parataxis" : "http://kloud.one/rdfudedges#Amod" ,
        "orphan" : "http://kloud.one/rdfudedges#Orphan" ,
        "punct" : "http://kloud.one/rdfudedges#Punct" ,
        "root" : "http://kloud.one/rdfudedges#Root" ,
        "root" : "http://kloud.one/rdfudedges#Root" ,
        "dep" : "http://kloud.one/rdfudedges#Dep" ,    
    },
};