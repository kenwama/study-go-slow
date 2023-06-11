const container = document.querySelector(".container");
const stage = document.querySelector(".stage");
const goalIndex = 25;

const userStepSpeed = 600;
let turn = 0;

const a = {
  name: "a",
  current: 0,
  turn: 0,
};

const b = {
  name: "b",
  current: 0,
  turn: 0,
};

const c = {
  name: "c",
  current: 0,
  turn: 0,
};

const d = {
  name: "d",
  current: 0,
  turn: 0,
};

init();
function init() {
  // ステージ内のパネルを描画
  const start = {
    type: "start",
    index: 0,
  };
  displayPanelOfStage(start);

  load.map((vegetable, index) => {
    // スタートのIDを0から扱いたいので１を足す
    const vegetableIndex = index + 1;
    displayPanelOfStage(vegetable, vegetableIndex);
  });

  const goal = {
    type: "goal",
    index: goalIndex,
  };
  displayPanelOfStage(goal);

  // init
  displayUserInPanel(a);
  displayUserInPanel(b);
  displayUserInPanel(c);
  displayUserInPanel(d);

  const [a0, a1] = shffle(cards);
  const [b0, b1] = shffle(cards);
  const [c0, c1] = shffle(cards);
  const [d0, d1] = shffle(cards);

  displayUserCard(a, a0);
  displayUserCard(a, a1);
  displayUserCard(b, b0);
  displayUserCard(b, b1);
  displayUserCard(c, c0);
  displayUserCard(c, c1);
  displayUserCard(d, d0);
  displayUserCard(d, d1);

  indicateCurrentUser();
}

function displayPanelOfStage(panelState, vegetableIndex) {
  const panel = document.createElement("div");
  panel.classList.add("panel");

  if (panelState.type === "start" || panelState.type === "goal") {
    panel.classList.add(panelState.type);
    panel.id = panelState.index;
  }

  if (vegetableIndex) {
    const vegetableIcon = document.createElement("div");
    vegetableIcon.textContent = panelState.icon;
    vegetableIcon.classList.add("vegetable-icon");

    panel.id = vegetableIndex;
    panel.vegetable = panelState.name;
    panel.append(vegetableIcon);
  }

  stage.append(panel);
}

function indicateCurrentUser() {
  console.log("indicateCurrentUser");

  const userHands = Array.from(document.querySelectorAll(".user-hands"));
  userHands.forEach((hands) => (hands.style.background = ""));

  const nextUser = [a, b, c, d].filter((user) => {
    return user.turn === turn;
  })[0];

  if (nextUser.name === "a") userHands[0].style.background = "pink";
  if (nextUser.name === "b") userHands[1].style.background = "pink";
  if (nextUser.name === "c") userHands[2].style.background = "pink";
  if (nextUser.name === "d") userHands[3].style.background = "pink";

  if (nextUser.length === 0) {
  }
}

function displayUserCard(user, cardState, leftCardSelected) {
  const userHands = document.getElementById(`user-hands-${user.name}`);
  const card = document.createElement("div");
  const cardIcon = document.createElement("div");
  card.classList.add("card");
  card.state = cardState;
  cardIcon.textContent = cardState.icon;
  cardIcon.classList.add("card-icon");

  card.addEventListener("click", selectCardByClick);

  card.append(cardIcon);
  userHands.append(card);

  // 左側のカードが選ばれた場合
  if (leftCardSelected) {
    userHands.prepend(card);
  }
}

function selectCardByClick(e) {
  const target = e.currentTarget;
  const cardState = target.state;

  const currentUser = getCurrentUser();
  currentUser.turn++;

  const leftCardSelected = target.nextSibling;
  const nextCard = shffle(cards)[0];

  if (leftCardSelected) {
    displayUserCard(currentUser, nextCard, leftCardSelected);
    target.remove();
  } else {
    target.remove();
    displayUserCard(currentUser, nextCard);
  }

  if (cardState.type === "vegetable") {
    const vegetable = getNextVegetabel(cardState, currentUser);

    if (vegetable === "goal") {
      moveByVegetabelCard(currentUser, goalIndex);
    } else {
      const targetId = Number(vegetable.id);
      moveByVegetabelCard(currentUser, targetId);
    }
  }

  if (cardState.type === "arrow") {
    const moveCount = cardState.count;
    const targetId = currentUser.current + moveCount;
    moveByArrowCard(currentUser, targetId);
  }

  if (cardState.type === "arrowlast") {
    const lastUser = getLastUser();
    const moveCount = cardState.count;
    const targetId = lastUser.current + moveCount;

    if (!lastUser) {
      alert("users don't stay in same panel without start");
      indicateCurrentUser();
      return;
    }

    moveByArrowCard(lastUser, targetId);
  }
}

function displayUserInPanel(user) {
  const exitUserIcon = document.getElementById(`user-${user.name}`);
  if (exitUserIcon) exitUserIcon.remove();

  const targetPanel = document.getElementById(user.current);
  const userIcon = document.createElement("div");
  userIcon.textContent = user.name;
  userIcon.classList.add("user-icon");
  userIcon.classList.add(user.name);
  userIcon.id = `user-${user.name}`;
  targetPanel.append(userIcon);
}

function displayUserByPushed(currentUser) {
  const users = [a, b, c, d];

  const isNotCurrentUser = (user) => user.name !== currentUser.name;
  const isUserInSamePanel = (user) => user.current === currentUser.current;
  const filterd = users.filter(
    (user) => isNotCurrentUser(user) && isUserInSamePanel(user)
  );

  if (filterd.length === 0) return;

  const targetUser = filterd[0];

  if (targetUser.current !== goalIndex) {
    targetUser.current++;
    displayUserInPanel(targetUser);
    displayUserByPushed(targetUser);
    isGameEnd(targetUser);
  }
}

function getCurrentUser() {
  const users = [a, b, c, d];

  // まだゴールしていない、このターンまだ行動していないユーザーを取得
  const isNotGoal = (user) => user.current !== goalIndex;
  const isTurn = (user) => user.turn === turn;
  const playableUsers = users.filter((user) => isNotGoal(user) && isTurn(user));

  if (playableUsers.length === 1) turn++;
  if (playableUsers.length === 0) return;

  return playableUsers[0];
}

function getNextVegetabel(state, user) {
  const vegetable = state.name;
  const vegetablePanels = Array.from(document.querySelectorAll(".panel"));

  // ターゲットの野菜のパネルを全て取得
  // DOMプロパティと野菜の値を比較
  const sameVegtables = vegetablePanels.filter(
    // vegはDOMプロパティ
    (veg) => vegetable === veg.vegetable
  );

  const filterd = sameVegtables.filter((veg) => {
    return Number(veg.id) > user.current;
  });

  const moveableVetables = filterd.filter((veg) => {
    // 野菜パネルの子要素が２個の場合はユーザーの要素が存在することになる
    if (veg.children.length === 1) {
      return veg;
    }
  });

  // 次の野菜がないのでゴール
  if (moveableVetables.length === 0) {
    return "goal";
  }

  const targetVegetable = moveableVetables[0];
  return targetVegetable;
}

function getLastUser() {
  const usersCurrent = [a.current, b.current, c.current, d.current];
  const min = Math.min(...usersCurrent);
  const filterd = [a, b, c, d].filter((user) => {
    if (user.current === min) return user;
  });

  if (filterd.length > 1) {
    return false;
  }

  return filterd[0];
}

// ユーザーが進む関数
// 野菜の場合は他ユーザーをプッシュしない
function moveByVegetabelCard(user, targetId) {
  user.current++;
  displayUserInPanel(user);

  const step = () => moveByVegetabelCard(user, targetId);
  const timerId = setTimeout(step, userStepSpeed);

  if (targetId === user.current) {
    indicateCurrentUser();
    clearTimeout(timerId);
  }
}

function moveByArrowCard(user, targetId) {
  user.current++;
  displayUserInPanel(user);
  displayUserByPushed(user);

  const move = () => moveByArrowCard(user, targetId);
  const timerId = setTimeout(move, userStepSpeed);

  if (targetId === user.current) {
    clearTimeout(timerId);
  }

  if (user.current >= goalIndex) {
    clearTimeout(timerId);
    indicateCurrentUser();
    isGameEnd(user);
  }
}

function isGameEnd() {
  const users = [a, b, c, d];
  const isGoal = (user) => user.current >= goalIndex;
  const filterd = users.filter(isGoal);

  // ゴールしていないユーザーが１人になったらゲーム終了
  if (filterd.length === 3) {
    console.log("game end");
  }
}

function shffle(array) {
  for (let i = array.length - 1; 0 < i; i--) {
    // 0〜(i+1)の範囲で値を取得
    let r = Math.floor(Math.random() * (i + 1));

    // 要素の並び替えを実行
    let tmp = array[i];
    array[i] = array[r];
    array[r] = tmp;
  }
  return array;
}
