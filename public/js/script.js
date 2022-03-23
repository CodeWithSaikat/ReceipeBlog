let addIngredientsBtn = document.getElementById('addIngredientsBtn')
let IngredientList = document.querySelector('.IngredientList')
let IngredientDiv = document.querySelectorAll('.IngredientDiv')[0];


addIngredientsBtn.addEventListener('click', ()=>{
    let newIngredients = IngredientDiv.cloneNode(true)
    let input = newIngredients.getElementsByTagName('input')[0]
    input.value = ''
    IngredientList.appendChild(newIngredients)
})
