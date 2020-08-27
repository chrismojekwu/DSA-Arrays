const Memo = require("./memory");
const memory = new Memo();

class Array {
  constructor() {
    this.length = 0;
    this._capacity = 0;
    this.ptr = memory.allocate(this.length);
  }

  push(value) {
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.set(this.ptr + this.length, value);
    this.length++;
  }

  _resize(size) {
    const oldPtr = this.ptr;
    this.ptr = memory.allocate(size);
    if (this.ptr === null) {
      throw new Error("Out of memory");
    }
    memory.copy(this.ptr, oldPtr, this.length);
    memory.free(oldPtr);
    this._capacity = size;
  }

  get(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    return memory.get(this.ptr + index);
  }

  pop() {
    if (this.length == 0) {
      throw new Error("Index error");
    }
    const value = memory.get(this.ptr + this.length - 1);
    this.legnth--;
    return value;
  }

  insert(index, value) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    if (this.length >= this._capacity) {
      this._resize((this.length + 1) * Array.SIZE_RATIO);
    }

    memory.copy(this.ptr + index + 1, this.ptr + index, this.length - index);
    memory.set(this.ptr + index, value);
    this.length++;
  }

  remove(index) {
    if (index < 0 || index >= this.length) {
      throw new Error("Index error");
    }
    memory.copy(
      this.ptr + index,
      this.ptr + index + 1,
      this.length - index - 1
    );
    this.length--;
  }
}

Array.SIZE_RATIO = 3;

function main() {
  Array.SIZE_RATIO = 3;

  let arr = new Array();

  arr.push(3);
  arr.push(5);
  arr.push(15);
  arr.push(19);
  arr.push(45);
  arr.push(10);

  console.log(arr);
}

main();

const url = (str) => {
  let input = str.split("");
  return input.map((x) => (x === " " ? (x = "%20") : x)).join("");
};

console.log(url("tauhida parveen"));

const filter5 = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] < 5) {
      arr.splice(i, 1);
    }
  }
  return arr;
};

console.log(filter5([4, 5, 5]));

//not doing the right thing - incomplete
const largeSum = (arr, array = []) => {
  if (arr.length == 0) {
    return 1;
  }
  let total = 0;
  for (let i = 0; i < arr.length; i++) {
    total = total += arr[i];
  }
  array.push(total);
  largeSum(arr.slice(1));
  return array;
};

console.log(largeSum([4, 6, -3, 5, -2, 1]));

const mergeArrs = (arr1, arr2) => {
  arr1.push(...arr2);
  return arr1.sort((a, b) => {
    return a - b;
  });
};

console.log(mergeArrs([1, 3, 6, 8, 11], [2, 3, 5, 8, 9, 10]));

const stripChars = (str, charStr) => {
  let array = str.split("");
  let control = charStr.split("");
  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < control.length; j++) {
      if (array[i] === control[j]) {
        array.splice(i, 1);
      }
    }
  }
  return array.join("");
};

console.log(stripChars("Battle of the Vowels: Hawaii vs. Grozny", "aeiou"));

const product = (arr) => {
  let newArr = [];
  let arrCopy = arr.slice();
  for (let i = 0; i < arrCopy.length; i++) {
    let loopArr = arr.slice();
    loopArr.splice(i, 1);
    newArr.push(loopArr.reduce((x, y) => x * y));
  }
  return newArr;
};

console.log(product([1, 3, 9, 4]));

//incomplete
const twoDArr = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[i][j] === 0) {
        arr[i][j] === 0;
      }
    }
  }
  return arr;
};

console.log(
  twoDArr([
    [1, 0, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [1, 1, 1, 1, 1],
    [1, 0, 1, 1, 1],
    [1, 1, 1, 1, 1],
  ])
);
