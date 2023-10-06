(function () {
  let basicUrl = 'https://basic-todo-api.vercel.app/api/todo';
  let root = document.querySelector('.root');
  let input = document.querySelector('.text');
  let internetError = document.querySelector('.internetError');

  // Delete Function
  function handleDelete(id) {
    fetch(basicUrl + `/${id}`, {
      method: 'DELETE',
      headers: {
        'content-Type': 'application/json',
      },
    })
      .then(() => displayTodos())
      .catch((error) => {
        root.innerText = error;
      });
  }

  // handleToggle
  function handleToggle(id, status) {
    let data = {
      todo: {
        isCompleted: !status,
      },
    };
    fetch(basicUrl + `/${id}`, {
      method: 'PUT',
      headers: {
        'content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then(() => displayTodos())
      .catch((error) => {
        root.innerText = error;
      });
  }

  //   handleEdit
  function handleEdit(e, id, info) {
    let elm = e.target;
    let input = document.createElement('input');
    input.type = 'text';
    input.value = info;
    let perentElm = e.target.parentElement;
    perentElm.replaceChild(input, elm);

    input.addEventListener('keyup', (e) => {
      if (e.keyCode === 13) {
        let update = e.target.value;
        let data = {
          todo: {
            title: update,
          },
        };
        fetch(basicUrl + `/${id}`, {
          method: 'PUT',
          headers: {
            'content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
          .then(() => displayTodos())
          .catch((error) => {
            root.innerText = error;
          });
      }
    });
  }

  function createUI(todoData) {
    root.innerHTML = '';
    todoData.todos.forEach((dataInfo) => {
      let li = document.createElement('li');
      let input = document.createElement('input');
      input.type = 'checkbox';
      input.checked = dataInfo.isCompleted;
      input.addEventListener('change', (event) =>
        handleToggle(dataInfo._id, dataInfo.isCompleted)
      );
      let p = document.createElement('p');
      p.innerText = dataInfo.title;
      p.addEventListener('dblclick', (event) =>
        handleEdit(event, dataInfo._id, dataInfo.title)
      );
      let span = document.createElement('span');
      span.innerText = '❌';
      span.addEventListener('click', () => handleDelete(dataInfo._id));
      li.append(input, p, span);
      root.append(li);
    });
  }

  // fetch function
  function displayTodos() {
    fetch(basicUrl)
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error(`${res.status}`);
        }
      })
      .then((data) => createUI(data))
      .catch((error) => {
        internetError.innerText = error;
      });
  }

  // Add data function
  function addTodo(event) {
    let value = event.target.value;
    if (event.keyCode === 13 && value !== '') {
      let data = {
        todo: {
          title: value,
          isCompleted: false,
        },
      };
      fetch(basicUrl, {
        method: 'POST',
        headers: {
          'content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
        .then(() => {
          event.target.value = '';
          displayTodos();
        })
        .catch((error) => {
          root.innerText = error;
        });
    }
  }
  input.addEventListener('keyup', addTodo);
  if (!navigator.onLine) {
    internetError.innerText = 'Check your Internet Connection';
  } else {
    displayTodos();
  }
})();
