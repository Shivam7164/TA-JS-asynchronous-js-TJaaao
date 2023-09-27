let url = 'https://api.spaceflightnewsapi.net/v3/articles?_limit=30';
let root = document.querySelector('.root');
let select = document.querySelector('select');
let allNews = [];

function creatUI(dataInfo) {
  root.innerHTML = '';
  dataInfo.forEach((ele) => {
    let li = document.createElement('li');
    let figure = document.createElement('figure');
    let img = document.createElement('img');
    img.src = ele.imageUrl;
    let div = document.createElement('div');
    let span = document.createElement('span');
    span.innerText = ele.newsSite;
    let h3 = document.createElement('h3');
    h3.innerText = ele.title;
    let button = document.createElement('button');
    let achor = document.createElement('a');
    achor.href = ele.url;
    achor.innerText = 'Read More';
    figure.append(img);
    button.append(achor);
    div.append(span, h3, button);
    li.append(figure, div);
    root.append(li);
  });
}

function showData(sourceData) {
  sourceData.forEach((value) => {
    let option = document.createElement('option');
    option.value = value;
    option.innerText = value;
    select.append(option);
  });
}

fetch(url)
  .then((res) => res.json())
  .then((data) => {
    allNews = data;
    creatUI(data);
    let allSource = Array.from(new Set(data.map((ele) => ele.newsSite)));
    showData(allSource);
  });

select.addEventListener('change', (e) => {
  let source = e.target.value;
  let filterData;
  if (source == 'Select a news source') {
    filterData = allNews;
  } else {
    filterData = allNews.filter((ele) => ele.newsSite == source);
  }
  creatUI(filterData);
});
