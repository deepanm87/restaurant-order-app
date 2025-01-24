import { menuItems } from "./data.js"

const menuEl = document.getElementById("menu")
const orderContainer = document.getElementById("order-container")
const orders = document.getElementById("orders")
const paymentModal = document.getElementById("payment-modal")
const modalCloseBtn = document.getElementById("close-btn")
const form = document.getElementById("form")
const thankYouMsg = document.getElementById("thank-you-msg")

const cartItems = []

menuEl.innerHTML = displayMenu(menuItems)

document.addEventListener("click", function(e) {
    if(e.target.dataset.id) {
        const id = e.target.dataset.id
        const updateIndex = cartItems.findIndex( item => item.id === id)
        if(updateIndex > -1) {
            cartItems[updateIndex].quantity += 1
        } else {
            cartItems.push({...menuItems[id], quantity: 1})
        }
        orders.innerHTML = displayCart(cartItems)
        orderContainer.classList.remove("hidden")
        orders.classList.remove("hidden")
    }
})

document.addEventListener("click", e => {
    if(e.target.dataset.remove) {
        const removeId = e.target.dataset.remove
        const removeIndex = cartItems.findIndex( item => item.id === removeId)
        if(removeIndex > -1) {
            if(cartItems[removeIndex].quantity > 1) {
                cartItems[removeIndex].quantity =- 1
            } else {
                cartItems.splice(removeIndex, 1)
            }
        }
        if(cartItems.length === 0) {
            orderContainer.classList.add("hidden")
        }
    }
    orders.innerHTML = displayCart(cartItems)
})

document.addEventListener("click", e => {
    if(e.target.id === "complete-order-btn") {
        paymentModal.classList.remove('hidden')
    }
})


function displayMenu(menu) {
    let menuHtml = ''
    menu.forEach( function(item) {
        menuHtml += `
            <div class="menu-item" id=${item.id}>
                <div class="menu-item-details">
                    <span class="menu-item-emoji">${item.emoji}</span>
                    <div>
                        <h2 class="menu-item-name" data-name=${item.name}>${item.name}</h2>
                        <p class="menu-item-ingredients">${item.ingredients.join(", ")}</p>
                        <p class="menu-item-price" data-price=${item.price}>$${item.price}</p>
                    </div>
                </div>
                <button class="add-btn" data-id=${item.id}>+</button>
            </div>
        `
    })
    return menuHtml
}

function displayCart(cart) {
    let cartHtml = ''
    let totalPrice = 0
    cart.forEach(function(item) {
        const itemTotal = item.price * item.quantity
        cartHtml += `
            <div class="all-items" id=${item.id}>
                <p class="order-name">${item.name}(${item.quantity}) </p>
                <button class="remove-btn" data-remove=${item.id}>remove</button>
                <p class="order-price">$${itemTotal}</p>
            </div>
        `
        totalPrice += itemTotal
    })
    document.getElementById("order-price").innerHTML = `$${totalPrice}`
    return cartHtml
}
displayCart(cartItems)

modalCloseBtn.addEventListener("click", function() {
    paymentModal.classList.add("hidden")
})

form.addEventListener("submit", function(e) {
    e.preventDefault()
    const formData = new FormData(form)
    const userName = formData.get('customer-name')

    let thankYou = ''
    thankYou = `
        <p>Thank you, ${userName}! Your order is on it's way!</p>
    `
    thankYouMsg.innerHTML = thankYou
    thankYouMsg.classList.remove('hidden')
    paymentModal.classList.add("hidden")
    orderContainer.classList.add("hidden")
})
