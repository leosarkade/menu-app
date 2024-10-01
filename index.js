import {menuArray} from './data.js'

const main = document.getElementById('main')
const menuSection = document.getElementById('menu-section')
const orderSection = document.getElementById('order-section')
const orderCompleteSection = document.getElementById('order-complete-section')
const orderItems = document.getElementById('order-items')
const orderTotal = document.getElementById('order-total')
const cardDetailsContainer = document.getElementById('card-details-container')
const orderForm = document.getElementById('order-form')
const completeBtn = document.getElementById('complete-btn')
let orderFormData
let orderItemsArr = []
let newId = 0
let orderSum = 0
let orderComplete = false

//* Event Listeners *//

menuSection.addEventListener('click',function(e){

    if(e.target.classList[0] === ('add-item-btn') && !orderComplete && cardDetailsContainer.classList.contains('hidden')){
        addItem(e.target.name)
        if(orderSection.classList.contains('hidden')){
        orderSection.classList.toggle('hidden') 
        }
    }

})

orderSection.addEventListener('click',function(e){

    if(e.target.classList[0] === 'remove-item-btn' && !orderComplete && cardDetailsContainer.classList.contains('hidden')){
        removeItem(e.target.parentElement.id)
        if(orderItemsArr.length === 0){
            orderSection.classList.toggle('hidden')    
        }
    } 
    else if(e.target.id === 'complete-btn' && !orderComplete && cardDetailsContainer.classList.contains('hidden')){
        cardDetailsContainer.classList.toggle('hidden') 
    }
})

cardDetailsContainer.addEventListener('click', function(e){
    if(e.target.id === 'card-details-escape-btn'){
        cardDetailsContainer.classList.toggle('hidden') 
        orderSection.classList.toggle('disabled') 
        main.classList.toggle('disabled') 
    }   
})

orderForm.addEventListener('submit', function(e){

    e.preventDefault()
    if(e.target.id === 'order-form'){
        cardDetailsContainer.classList.toggle('hidden') 
        orderSection.classList.toggle('disabled') 
        orderCompleteSection.classList.toggle('hidden')
        completeBtn.classList.toggle('hidden')
        orderComplete = true
        orderFormData = new FormData(orderForm)
        render()
    }
})

//* Add/Remove items *//

function addItem(name){
    
    const matchingMenuItem = menuArray.filter(menuItem => menuItem.name === name)[0]
    
    orderItemsArr.push({ name: matchingMenuItem.name, price: matchingMenuItem.price, orderId: newId })
    
    orderSum += matchingMenuItem.price
    newId++
    render()
}

function removeItem(itemId){

    const matchingOrderItem = orderItemsArr.findIndex(orderItem => orderItem.orderId == itemId)
    orderSum -= orderItemsArr[matchingOrderItem].price
    orderItemsArr.splice(matchingOrderItem,1)
    render()
}

//* DOM Rendering *//

const getMenuHtml = () =>{
    

    let menuSectionHtml = ``
    let orderItemsHtml = ``
    let orderCompleteSectionHtml = ``

    //console.log(formData.get('customerName'))
    
    // get available items
    menuArray.forEach(function(item){
        menuSectionHtml += 
        `
        <li class="menu-item divider">
            <div class='menu-item-details'>
                <div class="menu-item-graphic">
                    <p>${item.emoji}</p>
                </div>
                <div class='menu-item-text'>
                    <h2>${item.name}</h2>
                    <p>${item.ingredients.join(', ')}</p>
                    <h3>$${item.price}</h3>
                </div>
            </div>
            <input type='button' value="+" class="add-item-btn" name="${item.name}"></input>
        </li>
        `
    })
    
    orderItemsArr.forEach(function(item){
        orderItemsHtml += 
            `
            <li class="order-row">
                <div class="selected-item" id="${item.orderId}">
                    <h2>${item.name}</h2>
                    <input type="button" class="remove-item-btn" value="remove"></input>
                </div>
                <h3>${item.price}</h3>
            </li>
            `
    })
    
    if(orderComplete){
        orderCompleteSectionHtml += `<h2 class="order-complete-section">Thanks, ${orderFormData.get('customerName')}! Your order is on it's way!</h2>`
    }
    
    menuSection.innerHTML = menuSectionHtml
    orderCompleteSection.innerHTML = orderCompleteSectionHtml
    orderItems.innerHTML = orderItemsHtml
    orderTotal.textContent = `$${orderSum}`
}

function render(){
    getMenuHtml()
}

render()