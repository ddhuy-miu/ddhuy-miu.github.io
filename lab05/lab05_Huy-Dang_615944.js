"use strict";

function max(x, y) {
    return x > y ? x : y;
}

function maxOfThree(x, y, z) {
    let m = x;
    if (y > m)
        m = y;
    if (z > m)
        m = z;
    return m;
}

function isVowel(s) {
    if (s === 'a' || s === 'e' || s === 'i' || s === 'o' || s === 'u')
        return true;
    return false;
}

function sum(arr) {
    let s = 0;
    for (let i of arr)
        s += i;
    return s;
}

function multiply(arr) {
    let m = 1;
    for (let i of arr)
        m *= i;
    return m;
}

function reverse(s) {
    const arr = s.split("");
    const r_arr = arr.reverse();
    return r_arr.join("");
}

function findLongestWord(arr) {
    return arr.reduce((s, m) => s.length > m.length ? s : m, "");
}

function filterLongWord(arr, l) {
    return arr.filter(s => s.length > l);
}

function computeSumOfSquaresOfEvensOnly(arr) {
    return arr.reduce((s, m) => (m % 2 === 0) ? (s + m * m) : s, 0);
}

function sum2(arr) {
    return arr.reduce((s, m) => s + m, 0);
}

function multiply2(arr) {
    return arr.reduce((s, m) => s * m, 1);
}

function findSecondBiggest(arr) {
    let max = arr[0];
    let max2 = arr[1];

    if (max2 > max) {
        max = arr[1];
        max2 = arr[0];
    }

    for (let i of arr) {
        if (i > max) {
            max2 = max;
            max = i;
        } else if (i > max2) {
            max2 = i;
        }
    }

    return max2;
}

function printFibo(n, a, b) {
    let fibo_arr = [a, b];

    for (let i = 2; i < n; ++i) {
        let c = a + b;
        a = b;
        b = c;
        fibo_arr.push(c);
    }

    return fibo_arr.slice(0, n).toString();
}


const sum3 = (arr) => {
    return arr.reduce((a, b) => b > 20 ? a + b : a, 0);
}

const getNewArray = function (arr) {
    return arr.filter(s => s.length >= 5 && s.includes('a'));
}
