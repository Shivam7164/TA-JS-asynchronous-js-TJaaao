let loaded = document.querySelector('input');
let img1 = document.querySelector('img');
let userName = document.querySelector('h2');
let login = document.querySelector('p');
let showFollowers = document.querySelector('.follower');
let showFollowing = document.querySelector('.following');
let div = document.querySelector('.div');
let contentContainer = document.querySelector('.content-container');
let error = document.querySelector('.error');
let catImg = document.querySelector('.catImg');
let button = document.querySelector('button');

function fetch(url, access) {
  let xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = function () {
    let res = JSON.parse(xhr.response);
    if (xhr.status == 200 && !res.message) {
      access(res);
    } else {
      access(res.message, xhr.status);
    }
  };
  xhr.send();
}

// **** user ****

function createUI(user, statusCode = 200) {
  error.innerHTML = '';
  if (statusCode !== 200) {
    contentContainer.style.display = 'none';
    error.innerText = user;
  } else {
    contentContainer.style.display = 'block';
    img1.src = user.avatar_url;
    userName.innerText = user.name;
    login.innerText = `@${user.login}`;
    showBoth(
      `https://api.github.com/users/${user.login}/followers`,
      showFollowers
    );
    showBoth(
      `https://api.github.com/users/${user.login}/following`,
      showFollowing
    );
  }
}
// ***** following and followers *****

function showBoth(url, root) {
  root.innerHTML = '';
  fetch(url, function (followList) {
    let topFive = followList.slice(0, 5);
    for (let i = 0; i < topFive.length; i++) {
      let li = document.createElement('li');
      let img = document.createElement('img');
      img.src = topFive[i].avatar_url;
      li.append(img);
      root.append(li);
    }
  });
}

function handleChange(event) {
  if (event.keyCode === 13) {
    let userName = event.target.value;
    let url = 'https://api.github.com/users/';
    fetch(url + userName, createUI);

    event.target.value = '';
  }
}

loaded.addEventListener('keyup', handleChange);

/* Cat */

button.addEventListener('click', () => {
  fetch(
    'https://api.thecatapi.com/v1/images/search?limit=1&size=full',
    function (catData) {
      catData.forEach((ele) => {
        catImg.src = ele.url;
      });
    }
  );
});
