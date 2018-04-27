let conllu = require('conllu');
let fs = require('fs');
let test = require('test');



let word1 = []; // первое слово, оно в подчинённых
let word2 = []; // второе слово, оно в head
// let remainderOfSentence = [];
let heads = [];
// let sentence = ['a', 'b', 'c', 'd'];

// let sentence = [];

// function tryLink (word1, word2) { // пытаемся соединить слова правилом

// };

function Main() {
    getTwoWords(sentence);
};

// function searchArc(w1, w2) {
//     if (w1 == 'a' && w2 == 'b') return 'ab'
//     else if (w1 == 'b' && w2 == 'd') return 'bd'
//     else if (w1 == 'c' && w2 == 'a') return 'ca'
//     else return false
// }

function getTwoWords(sentence) {
    for(let i = 0; i < sentence.length; i++) {
        word1 = sentence[i];
        word2 = sentence[i + 1];
        searchMorphSub(word1, word2);
    };
};

function searchMorphSub(word1, word2) { // ищем характеристики 1 слова на месте подчинённого в правилах
    let isSub = boolean;
    let rule = {}; // получить морфологию главного слова из этого руле, в котором нашли подчинённое слово
    if (word1[feats] == rule.object.feats) {
        isSub = true;
        rule = rule; // записать сюда текущий руле, который отработал
    } else {
        // получить следующий по счёту руле
        searchMorphSub(word1, word2);
    };
    searchMorphHead(word2, rule);
};

function searchMorphHead (word2, rule) { // ищем характеристики 2 слова на месте главного в правилах
    let isHead = boolean;
    let head;
    let counter = 0;
    if (word2[feats] == rule.subject.feats) {
        isHead = true;
        rule = rule; // записать сюда текущий руле, который отработал
        head = word2;
        push.heads(word2);
        getTwoWords(sentence);
    } else {
        // получить следующий по счёту руле
        searchMorphHead (word2, rule);
        if(isHead == false /* && rules закончились */) {
            counter = counter + 1;
            if(counter % 2 !== 0) {
                searchLeft(word2);
                searchMorphHead (word2, rule);
            } else if(counter % 2 == 0) {
                searchRight(word2);
                searchMorphHead (word2, rule);
            };
        };
    };
};
    // ищем характеристики 2 слова на месте главного в правиле, переданном предыдущей функцией и меняем isHead на тру или фолс

function searchLeft (word2) {
        for(let y = 1; y < sentence.length - 1; y = y - 1) { // ищем head слева
            word2 = sentence[y];
            searchMorphHead(word2);
        };
};

function searchRight (word2) {
        for(let j = 1; j < sentence.length - 1; j = j + 1) { // ищем head справа
            word2 = sentence[j];
            searchMorphHead(word2);
        };
};