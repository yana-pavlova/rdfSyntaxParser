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
        //     "Act" :	"lexinfo:voice lexinfo:activeVoice", // нет у глаголов
        //     "Pass" : "lexinfo:voice lexinfo:passiveVoice", // нет у глаголов
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
        
        //"PART" :	"lexinfo:partOfSpeech lexinfo:participle", это в feats
        //"PRTS" :	"lexinfo:partOfSpeech lexinfo:shortParticiple",
        //"GRND" :	"lexinfo:partOfSpeech lexinfo:gerund",
        "NUM" :	"lexinfo:partOfSpeech lexinfo:numeral",
        "ADV" :	"lexinfo:partOfSpeech lexinfo:adverb",
        "PRON" :	"lexinfo:partOfSpeech lexinfo:pronoun",
        "ADP" :	"lexinfo:partOfSpeech lexinfo:preposition",
        
        // "CCONJ" :	"lexinfo:partOfSpeech lexinfo:coordinatingConjunction", // в OpenCorpora отсутствует
        // "SCONJ" :	"lexinfo:partOfSpeech lexinfo:subordinatingConjunction", // в OpenCorpora отсутствует
        "CCONJ": "lexinfo:partOfSpeech lexinfo:conjunction",
        "SCONJ": "lexinfo:partOfSpeech lexinfo:conjunction",
        
        "PART" :	"lexinfo:partOfSpeech lexinfo:particle",
        "INTJ" : "lexinfo:partOfSpeech lexinfo:interjection",

        //"Coll" : "lexinfo:partOfSpeech lexinfo:collectiveNumeral",

        //"INFN" :	"lexinfo:partOfSpeech lexinfo:verb",
        //"Impe" : "lexinfo:partOfSpeech lexinfo:impersonalVerb",
        // "AUX" : "lexinfo:partOfSpeech lexinfo:mainVerb", // в OpenCorpora отсутствует
        "AUX" : "lexinfo:partOfSpeech lexinfo:verb",

        // "PROPN" : "lexinfo:partOfSpeech lexinfo:properNoun", // в OpenCorpora отсутствует
        "PROPN" : "lexinfo:partOfSpeech lexinfo:noun",

        // "DET" : "lexinfo:partOfSpeech lexinfo:article", // в OpenCorpora отсутствует (надо подумать!!!)
        "DET" : "lexinfo:partOfSpeech lexinfo:adjective",

        "SYM" : "lexinfo:termType lexinfo:symbol", // в OpenCorpora отсутствует
        "PUNCT" : "lexinfo:partOfSpeech lexinfo:punctuation", // в OpenCorpora отсутствует
    },
    "links": {
        "nsubj" : "ud:Nsubj" ,
        "nsubj:pass" : "ud:Nsubj_pass" ,
        "obj" : "ud:Obj" ,
        "iobj" : "ud:Iobj" ,
        "obl" : "ud:Obl" ,
        "vocative" : "ud:Vocative" ,
        "expl" : "ud:Expl" ,
        "nmod" : "ud:Nmod" ,
        "appos" : "ud:Appos" ,
        "nummod" : "ud:Nummod" ,
        "nummod:gov" : "ud:Nummod_gov" ,
        "nummod:entity" : "ud:Nummod_entity" , //???
        "csubj" : "ud:Csubj" ,
        "csubj:pass" : "ud:Csubj_pass" ,
        "ccomp" : "ud:Ccomp" ,
        "xcomp" : "ud:Xcomp" ,
        "advcl" : "ud:Advcl" ,
        "acl" : "ud:Amod" ,
        "acl:relcl" : "ud:Acl_relcl" ,
        "advmod" : "ud:Advmod" ,
        "discourse" : "ud:Discourse" ,
        "amod" : "ud:Amod" ,
        "aux" : "ud:Aux" ,
        "aux:pass" : "ud:Aux_pass" ,
        "cop" : "ud:Cop" ,
        "mark" : "ud:Mark" ,
        "det" : "ud:Det" ,
        "case" : "ud:Case" ,
        "conj" : "ud:Conj" ,
        "cc" : "ud:Cc" ,
        "fixed" : "ud:Fixed" ,
        "flat" : "ud:Flat" ,
        "flat:name" : "ud:Flat_name" ,
        "flat:foreign" : "ud:Flat_foreign" , // ???
        "compound" : "ud:Compound" ,
        "parataxis" : "ud:Amod" ,
        "orphan" : "ud:Orphan" ,
        "punct" : "ud:Punct" ,
        "root" : "ud:Root" ,
        "root" : "ud:Root" ,
        "dep" : "ud:Dep" ,    
    },
};