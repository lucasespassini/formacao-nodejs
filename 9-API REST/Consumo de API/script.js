var axiosConfig = {
   headers: {
      Authorization: 'Bearer ' + localStorage.getItem('token')
   }
}

function login() {
   var emailField = document.querySelector('#email')
   var passwordField = document.querySelector('#password')

   var email = emailField.value
   var password = passwordField.value

   axios.post('http://localhost:9000/auth', {
      email,
      password
   }).then((res) => {
      var token = res.data.token
      localStorage.setItem('token', token)
      axiosConfig.headers.Authorization = 'Bearer ' + localStorage.getItem('token')
   }).catch((err) => {
      alert(err)
   })
}

function createGame() {
   var titleInput = document.querySelector('#title')
   var yearInput = document.querySelector('#year')
   var priceInput = document.querySelector('#price')

   var game = {
      title: titleInput.value,
      year: yearInput.value,
      price: priceInput.value
   }

   axios.post('http://localhost:9000/game', game, axiosConfig).then((response) => {
      if (response.status == 200) {
         alert('Game cadastrado!')
      }
      location.reload()
   }).catch((err) => {
      alert(err)
   })
}

function deleteGame(listItem) {
   var id = listItem.getAttribute('data-id')
   
   axios.delete('http://localhost:9000/game/'+id, axiosConfig).then((response) => {
      if (response.status == 200) {
         alert('Game deletado!')
      }
      location.reload()
   }).catch((err) => {
      alert(err)
   })
}

function loadForm(listItem) {
   var id = listItem.getAttribute('data-id')
   var title = listItem.getAttribute('data-title')
   var year = listItem.getAttribute('data-year')
   var price = listItem.getAttribute('data-price')

   document.querySelector('#idEdit').value = id
   document.querySelector('#titleEdit').value = title
   document.querySelector('#yearEdit').value = year
   document.querySelector('#priceEdit').value = price
}

function updateGame() {
   var idInput = document.querySelector('#idEdit')
   var titleInput = document.querySelector('#titleEdit')
   var yearInput = document.querySelector('#yearEdit')
   var priceInput = document.querySelector('#priceEdit')

   var game = {
      title: titleInput.value,
      year: yearInput.value,
      price: priceInput.value
   }

   var id = idInput.value

   axios.put('http://localhost:9000/game/'+id, game, axiosConfig).then((response) => {
      if (response.status == 200) {
         alert('Game atualizado!')
      }
      location.reload()
   }).catch((err) => {
      alert(err)
   })
}

axios.get('http://localhost:9000/games', axiosConfig).then(response => {
   var games = response.data
   var list = document.getElementById('games')

   games.forEach(game => {
      var item = document.createElement('li')

      item.setAttribute('data-id', game.id)
      item.setAttribute('data-title', game.title)
      item.setAttribute('data-year', game.year)
      item.setAttribute('data-price', game.price)

      item.innerHTML = `${game.id} - ${game.title} - $${game.price}`

      var deleteBtn = document.createElement('button')
      deleteBtn.innerHTML = 'Deletar'
      deleteBtn.addEventListener('click', () => {
         deleteGame(item)
      })
      var editBtn = document.createElement('button')
      editBtn.innerHTML = 'Editar'
      editBtn.addEventListener('click', () => {
         loadForm(item)
      })

      item.appendChild(deleteBtn)
      item.appendChild(editBtn)
      list.appendChild(item)
   })

}).catch((err) => {
   console.log(err)
})