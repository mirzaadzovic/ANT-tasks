class Struct {
  constructor(id, value) {
    this.id = id;
    this.value = value;
  }
}

function getNewStruct(struct) {
  const uniqueId = getUniqueId(struct);
  const uniqueValue = getUniqueValue(struct);
  return new Struct(uniqueId, uniqueValue);
}

function getUniqueId(struct) {
  const ids = struct.map((s) => s.id);
  let max = Math.max(...ids);
  return ++max;
}

function getOneAppearingTwice() {
  let arr = this.map((s) => s.value);
  let counts = {};
  for (var num of arr) {
    const key = num.toString();
    if (counts[key] === undefined) counts[key] = 1;
    else counts[key]++;

    if (counts[key] > 1) return counts[key];
  }
}

function getUniqueValue(struct) {
  let i = getOneAppearingTwice.call(struct);
  let doesIdExist = true;

  while (doesIdExist) {
    i++;
    doesIdExist = struct.some((s) => s.value === i);
  }
  return i;
}

const a = [
  new Struct(1, 3),
  new Struct(2, 7),
  new Struct(3, 3),
  new Struct(4, 1),
  new Struct(5, 4),
];

console.log(getNewStruct(a));
