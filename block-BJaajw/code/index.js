let url = 'https://api.spaceflightnewsapi.net/v3/articles?_limit=30';
let root = document.querySelector('.root');
let select = document.querySelector('select');
let loader = document.querySelector('.bouncing-loader');
let allNews = [];

function creatUI(dataInfo) {
  root.innerHTML = '';
  dataInfo.forEach((ele) => {
    let li = document.createElement('li');
    let figure = document.createElement('figure');
    let img = document.createElement('img');
    img.src =
      ele.newsSite === 'NASASpaceflight'
        ? 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bmFzYXxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=500&q=60'
        : ele.imageUrl;
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
  .then((res) => {
    if (!res.ok) {
      throw new Error(`Error happened: ${res.status}`);
    }
    return res.json();
  })
  .then((data) => {
    allNews = data;
    creatUI(data);
    let allSource = Array.from(new Set(data.map((ele) => ele.newsSite)));
    showData(allSource);
  })
  .catch((error) => {
    if (!navigator.onLine) {
      root.innerText = 'check your internet';
    } else {
      root.innerText = error;
    }
  })
  .finally(() => {
    loader.style.display = 'none';
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
