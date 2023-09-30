let url = 'https://www.anapioficeandfire.com/api/books';
let root = document.querySelector('.root');
let character = document.querySelector('.character');
let loader = document.querySelector('.bouncing-loader');
let list = document.querySelector('.characterColor');
let header = document.querySelector('header');
let closeButton = document.querySelector('.closeButton');

closeButton.addEventListener('click', () => {
  list.style.display = 'none';
  header.style.display = 'block';
  root.style.display = 'flex';
  root.classList.add('.root');
});

function showAllCharacter(allData) {
  Promise.all(
    allData.map((url) => {
      return fetch(url).then((res) => res.json());
    })
  )
    .then((book) => {
      book.forEach((data) => {
        let li = document.createElement('li');
        li.innerText = `${data.name}(${data.aliases.join(' ')})`;
        character.append(li);
      });
    })
    .finally(() => (loader.style.display = 'none'));
}

function showUI(data) {
  data.forEach((dataInfo) => {
    let li = document.createElement('li');
    let h3 = document.createElement('h3');
    h3.innerText = dataInfo.name;
    let p = document.createElement('p');
    p.innerText = dataInfo.authors.join(' ');
    let button = document.createElement('button');
    button.innerText = `Show Character: ${dataInfo.characters.length}`;
    li.append(h3, p, button);
    root.append(li);
    button.addEventListener('click', () => {
      loader.style.display = 'flex';
      root.style.display = 'none';
      header.style.display = 'none';
      list.style.display = 'block';
      showAllCharacter(dataInfo.characters);
    });
  });
}

function init() {
  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error(`Error happened: ${res.status}`);
      }
    })
    .then((book) => showUI(book))
    .catch((error) => (root.innerText = error))
    .finally(() => (loader.style.display = 'none'));
}
if (!navigator.onLine) {
  loader.style.display = 'none';
  root.innerText = 'Check Your Internet Connection';
} else {
  init();
}
