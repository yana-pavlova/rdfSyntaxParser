let sentence = ['a', 'b', 'c', 'd', 'e', 'f', 'g'];

function searchArc(w1, w2) {
    if (w1 == 'a' && w2 == 'b') return 'ab'
    else if (w1 == 'b' && w2 == 'd') return 'bd'
    else if (w1 == 'c' && w2 == 'a') return 'ca'
    else if (w1 == 'd' && w2 == 'f') return 'df'
    else if (w1 == 'g' && w2 == 'a') return 'ga'
    else if (w1 == 'f' && w2 == 'e') return 'fe'
    else return false
}

let found = false;

for(i = 0; i < sentence.length - 1; i++) {
    w1 = sentence[i];
    console.log(w1);
    for(j = 1; j < sentence.length; j++) {
        w2 = sentence[j];
        if(w1 != w2) {
            found = searchArc(w1, w2);
            console.log("Между ", w1, " и ", w2, " связь : ", found);
            if(found) {
                break;
            };
        };
    };
};

console.log("ПОШЛИ СВЯЗИ ВЛЕВО");

for(i = sentence.length - 1; i > 0; i--) {
    w1 = sentence[i];
    console.log(w1);
    for(j = i; j > -1; j--) {
            w2 = sentence[j];
        if(w1 != w2) {
            found = searchArc(w1, w2);
            console.log("Между ", w1, " и ", w2, " связь : ", found);
            if(found) {
                break;
            };
        };
    };
};