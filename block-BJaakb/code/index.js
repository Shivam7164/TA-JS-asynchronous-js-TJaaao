let url =
  'https://api.unsplash.com/photos/?client_id=ClFBDbTOYQQuHlcBGHLX77Y-xBbOJpnJGZOH3SSw_dA';
let searchImg = document.querySelector('input');
let root = document.querySelector('.root');
let error = document.querySelector('.error');
 
// **** Promise ****
function fetch(url) {
  return new Promise((resolve,reject)=>{
    let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload =()=>resolve(JSON.parse(xhr.response))
  xhr.onerror = ()=> reject('something went wrong')
  xhr.send();
  })
}

// **** Callback Pettern ****
// function fetch(url, access) {
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET', url);
//   xhr.onload = function () {
//     let res = JSON.parse(xhr.response);
//     if (xhr.status == 200 && !res.message) {
//       access(res);
//     } else {
//       access(res.message, xhr.status);
//     }
//   };
//   xhr.send();
// }

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

fetch(url).then(createUI);

function handleChange(event) {
  if (event.keyCode === 13 && event.target.value !== '') {
    let url = `https://api.unsplash.com/search/photos?query=${event.target.value}&client_id=ClFBDbTOYQQuHlcBGHLX77Y-xBbOJpnJGZOH3SSw_dA`;
    fetch(url).then((value)=>{
      createUI(value.results)
    })
    event.target.value = '';
  }
}

searchImg.addEventListener('keyup', handleChange);