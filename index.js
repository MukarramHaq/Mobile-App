import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

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
    let groceriesArray = Object.entries(snapshot.val())
    clearShoppingListEl()
    for(let i = 0; i < groceriesArray.length; i++){
        let currentItem = groceriesArray[i]
        let currentItemID = groceriesArray[0]
        let currentItemValue = groceriesArray[1]
        appendItemShoppingListEl(currentItem)
    }
})

function clearShoppingListEl(){
    shoppingListEl.innerHTML = ""
}

function appendItemShoppingListEl(item){
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")

    newEl.textContent = itemValue

    newEl.addEventListener("click", function(){
        let locationOfItemToBeDeleted = ref(database, `shoppingList/${itemID}`)
        remove(locationOfItemToBeDeleted)
    })

    shoppingListEl.append(newEl)
}

function clearInputField(){
    inputFieldEl.value = ""
}