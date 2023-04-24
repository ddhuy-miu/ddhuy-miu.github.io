Array.prototype.sortArray = function () {
    return this.sort(function (a, b) {
        if (a > b)
            return 1;
        if (a < b)
            return -1;
        return 0;
    });
};

const arr = [1, 3, 2, 1, 0, 7, 7, 2, 1, 9, 8, 9, 8].sortArray();
console.log(arr);