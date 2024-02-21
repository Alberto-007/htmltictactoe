const STATE = initialState();
fazerLinhas(STATE);

function resetar(state) {
  while (state.length > 1) {
    state.pop();
  }
  fazerLinhas(state);
}

document.querySelector('body').addEventListener('click', clicaNaCaixa);

function fazerLinhas(state) {
  const currentState = getCurrent(state);
  const board = `
    <div class="parent">
      <h2>Jogo da Velha</h2>
      <div class="children">
        ${praCaixaHTML(currentState)}
      </div>
    </div>`;
  document.getElementById('board').innerHTML = board;
}

function praCaixa(value, id) {
  return `<div id="box_${id}" class="box">${value}</div>`;
}

function praCaixaHTML(array) {
  return array.map((value, id) => praCaixa(value, id)).join('');
}

function initialState() {
  const SIZE = 3 * 3;
  const board = Array(SIZE).fill(' ');
  return [board];
}

function getCurrent(state) {
  return state[state.length - 1];
}

function seXehProx(state) {
  return state.length % 2 === 1;
}

function clicaNaCaixa(evt) {
  if (evt.target.className === 'box' && calcularVencedor(getCurrent(STATE)) === false) {
    const id = parseInt(evt.target.id.slice(4));
    const board = getCurrent(STATE);
    if (board[id] === ' ') {
      const next = seXehProx(STATE) ? 'X' : 'O';
      const nextBoard = [...board];
      nextBoard[id] = next;
      STATE.push(nextBoard);
      document.getElementById(evt.target.id).innerText = next;
      placar(nextBoard);
    }
  }
}

function calcularVencedor(squares) {
  const lines = linhaGen(Math.sqrt(squares.length));
  let vencedor = false;
  lines.forEach(line => {
    if (line.every(e => squares[e] === 'O')) vencedor = 'O';
    if (line.every(e => squares[e] === 'X')) vencedor = 'X';
  });
  return vencedor;
}

function placar(board) {
  const vencedor = calcularVencedor(board);
  if (vencedor === 'X' || vencedor === 'O') {
    document.querySelector('h2').innerText = `${vencedor} venceu`;
  }
}

function linhaGen(n) {
  const result = [...linhaDiagonalGen(n), ...linhaVerticalGen(n), ...linhaHorizontalGen(n)];
  return result;
}

function linhaHorizontalGen(N) {
  const result = [];
  for (let i = 0; i < N * N; i += N) {
    const line = [];
    for (let j = i; j < i + N; j++) {
      line.push(j);
    }
    result.push(line);
  }
  return result;
}

function linhaVerticalGen(N) {
  const result = [];
  for (let i = 0; i < N; i++) {
    const line = [];
    for (let j = i; j < N * N; j += N) {
      line.push(j);
    }
    result.push(line);
  }
  return result;
}

function linhaDiagonalGen(N) {
  const left = [];
  for (let i = 0; i < N * N; i += 1 + N) {
    left.push(i);
  }
  const right = [];
  for (let i = N - 1; i < N * N - 1; i += N - 1) {
    right.push(i);
  }
  return [left, right];
}
