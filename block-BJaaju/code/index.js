let url =
  'https://api.unsplash.com/photos/?client_id=ClFBDbTOYQQuHlcBGHLX77Y-xBbOJpnJGZOH3SSw_dA';
let searchImg = document.querySelector('input');
let root = document.querySelector('.root');
let error = document.querySelector('.error');

function fetch(url, access) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function () {
    let imgData = JSON.parse(xhr.response);
    access(imgData);
  };
  xhr.send();
}

function createUI(dataInfo) {
  root.innerHTML = '';
  if (dataInfo.length === 0) {
    error.innerText = 'data not found';
  } else {
    error.innerHTML = '';
    dataInfo.forEach((data) => {
      let li = document.createElement('li');
      let img = document.createElement('img');
      img.src = data.urls.small;
      li.append(img);
      root.append(li);
    });
  }
}

fetch(url, createUI);

function handleChange(event) {
  if (event.keyCode === 13 && event.target.value !== '') {
    let url = `https://api.unsplash.com/search/photos?query=${event.target.value}&client_id=ClFBDbTOYQQuHlcBGHLX77Y-xBbOJpnJGZOH3SSw_dA`;
    fetch(url, (searchResult) => {
      createUI(searchResult.results);
    });
    event.target.value = '';
  }
}

searchImg.addEventListener('keyup', handleChange);
