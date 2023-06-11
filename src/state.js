const tomato = {
  name: "tomato",
  icon: "🍅",
  type: "vegetable",
};

const carrot = {
  name: "carrot",
  icon: "🥕",
  type: "vegetable",
};

const onion = {
  name: "onion",
  icon: "🧅",
  type: "vegetable",
};

const aubergine = {
  name: "aubergine",
  icon: "🍆",
  type: "vegetable",
};

const corn = {
  name: "corn",
  icon: "🌽",
  type: "vegetable",
};

const avocado = {
  name: "avocado",
  icon: "🥑",
  type: "vegetable",
};

const loadA = [tomato, carrot, onion, aubergine, corn, avocado];
const loadB = [tomato, carrot, onion, aubergine, corn, avocado];
const loadC = [tomato, carrot, onion, aubergine, corn, avocado];
const loadD = [tomato, carrot, onion, aubergine, corn, avocado];

const load = [...loadA, ...loadB, ...loadC, ...loadD];

// カードの種類は４種類
// 野菜、進む、一番進んでいないユーザーだけ進む、パス

const arrowBy1 = {
  count: 1,
  icon: "➡︎1",
  type: "arrow",
};

const arrowBy2 = {
  count: 2,
  icon: "➡︎2",
  type: "arrow",
};

const arrowBy3 = {
  count: 3,
  icon: "➡︎3",
  type: "arrow",
};

const arrowLastUserBy1 = {
  count: 1,
  icon: "小➡︎1",
  type: "arrowlast",
};

const arrowLastUserBy2 = {
  count: 2,
  icon: "小➡︎2",
  type: "arrowlast",
};

const arrowLastUserBy3 = {
  count: 3,
  icon: "小➡︎3",
  type: "arrowlast",
};

const cards = [
  tomato,
  tomato,
  tomato,
  tomato,
  carrot,
  carrot,
  carrot,
  carrot,
  onion,
  onion,
  onion,
  onion,
  aubergine,
  aubergine,
  aubergine,
  aubergine,
  corn,
  corn,
  corn,
  corn,
  avocado,
  avocado,
  avocado,
  avocado,
  arrowBy1,
  arrowBy1,
  arrowBy2,
  arrowBy2,
  arrowBy3,
  arrowBy3,
  arrowLastUserBy1,
  arrowLastUserBy1,
  arrowLastUserBy2,
  arrowLastUserBy2,
  arrowLastUserBy3,
  arrowLastUserBy3,
];
