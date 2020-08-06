let addToy = false;
url = "http://localhost:3000/toys/"

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");

  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });

  const toyForm = document.getElementsByClassName('add-toy-form')[0]
  toyForm.addEventListener("submit", (e) => {
    e.preventDefault()
    formSubmit(toyForm)
    toyForm.reset()
  })
  
  fetchToys()
});



function fetchToys() {
  fetch(url) 
  .then(function(response){
    return response.json(); 
  })
  .then(function(toys){
    renderToys(toys)
  })
}

function renderToys(toys){
  toys.forEach(toy => {
    renderToy(toy)
  })
}

function renderToy(toy){
   let toyCollect = document.getElementById('toy-collection')

      let div = document.createElement('div')
      div.className = 'card'

      let h2 = document.createElement('h2')
      h2.innerText = toy.name
      div.append(h2)

      let image = document.createElement('img')
      image.className = 'toy-avatar'
      image.src = toy.image
      div.append(image)

      let ptag = document.createElement('p')
      ptag.innerText = `${toy.likes} Likes`
      div.append(ptag)

      let likeButton = document.createElement('button')
      likeButton.className = 'like-btn'
      likeButton.innerText = 'like'
      div.append(likeButton)
      likeButton.addEventListener("click", (e) => {
         increaseLikes(toy, ptag)
      })
            
      toyCollect.append(div)
}

function increaseLikes(toy, ptag) {
   console.log(toy)
  fetch(url +`${toy.id}`, {
    method: 'put',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toy.name,
      image: toy.image,
      likes: toy.likes += 1
    })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(toy) {
    ptag.innerText = `${toy.likes} Likes`}
)}

function formSubmit(toyForm){
  fetch(url, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: toyForm.name.value,
      image: toyForm.image.value,
      likes: 0  
    })
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(toy) {
   renderToy(toy)}
  )}

