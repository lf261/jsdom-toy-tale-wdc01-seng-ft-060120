let addToy = false;





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
  fetchToys()

});

function fetchToys() {
  fetch("http://localhost:3000/toys") 
  .then(function(response){
    return response.json(); 
  })
  .then(function(toys){
    console.log(toys)
    let toyCollect = document.getElementById('toy-collection')
    console.log(toyCollect)

    
    //  buttonClass.value = 'like-btn'
    // button.setAttributeNode(buttonClass)
    
    

    toys.forEach(toy => {
      let div = document.createElement('div')
      div.className = 'card'
      let h2 = document.createElement('h2')
      let image = document.createElement('img')
        image.className = 'toy-avatar'
      let ptag = document.createElement('p')
      let button = document.createElement('button')
      button.className = 'like-btn'
            h2.innerText = toy.name
            div.append(h2)
            image.src = toy.image
            console.log(toy.image)
            div.append(image)
            ptag.innerText = toy.likes
            div.append(ptag)
            button.innerText = 'like'
            div.append(button)

            toyCollect.append(div)

      });
     
  })
}
