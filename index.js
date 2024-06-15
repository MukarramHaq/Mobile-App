import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-cbc0b-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const shoppingListInDB = ref(database, "shoppingList")

const inputFieldEl = document.getElementById("input-field")
const addButtonEl = document.getElementById("add-button")
const shoppingListEl = document.getElementById("shopping-list")

addButtonEl.addEventListener("click", function() {
    let inputValue = inputFieldEl.value
    
    push(shoppingListInDB, inputValue)

    clearInputField()
})

/* Retrieve items from the database */
onValue(shoppingListInDB, function(snapshot){
    let groceriesArray = Object.values(snapshot.val())
    clearShoppingListEl()
    for(let i = 0; i < groceriesArray.length; i++){
        appendItemShoppingListEl(groceriesArray[i])
    }
})

function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}

function appendItemShoppingListEl(inputValue){
    shoppingListEl.innerHTML += `<li>${inputValue}</li>`
}

function clearInputField(){
    inputFieldEl.value = ""
}