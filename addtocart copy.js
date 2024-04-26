const products = [
    {
        id: 0,
        image: 'pictures/img1.jpg',
        title: 'Rose & Tulips',
        price: 999,
        category: 'flowers'
    },
    {
        id: 1,
        image: 'pictures/img2.jpg',
        title: 'Roses',
        price: 540,
        category: 'Roses'
    },
    {
        id: 2,
        image: 'pictures/img3.jpg',
        title: 'Lilies',
        price: 650,
        category: 'Daisy'
    },
    {
        id: 3,
        image: 'pictures/img4.jpg',
        title: 'Tulips',
        price: 720,
        category: 'Tulips'
    },
    {
        id: 4,
        image: 'pictures/img5.jpg',
        title: 'Tulips',
        price: 720,
        category: 'Tulips'
    }
    
];

const categories = ['All', 'Tulips', 'Roses', 'Daisy'];

document.getElementById('filter').innerHTML = categories.map(category => `
    <button onclick="filterProducts('${category}')">${category}</button>
`).join('');

document.getElementById('root').innerHTML = renderProducts(products);

let cart = [];

function renderProducts(products) {
    return products.map((item) => {
        const { id, image, title, price } = item;
        return `
            <div class='box'>
                <div class='img-box'>
                    <img class='images' src='${image}' alt='${title}'></img>
                </div>
                <div class='bottom'>
                    <p>${title}</p>
                    <h2>${price}.00</h2>
                </div>
            </div>
        `;
    }).join('');
}

function redirectToForm() {
    window.location.href = "https://docs.google.com/forms/d/e/1FAIpQLSfvz1FdQuCGttYJm21ciMkHhyW98LAnuJslqTafrip5nGbhRg/viewform";
}


function filterProducts(category) {
    const filteredProducts = category === 'All' ? products : products.filter(product => product.category === category);
    document.getElementById('root').innerHTML = renderProducts(filteredProducts);
}

function addtocart(id) {
    const product = products.find(item => item.id === id);
    if (product) {
        cart.push({...product});
        displayer();
    }
}

function delElement(index) {
    cart.splice(index, 1);
    displayer();
}

function displayer() {
    let total = 0;
    document.getElementById("count").innerHTML = cart.length;
    if (cart.length === 0) {
        document.getElementById('cartItem').innerHTML = "Your cart is empty";
        document.getElementById("total").innerHTML = "₱ 0.00";
        disableCheckout(); // Disable checkout when cart is empty
    } else {
        document.getElementById("cartItem").innerHTML = cart.map((item, index) => {
            const { image, title, price } = item;
            total += price;
            return `
                <div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowing' src='${image}' alt='${title}'></img>
                    </div>
                    <p style='font-size:12px;'>${title}</p>
                    <h2 style='font-size: 15px;'>₱ ${price}.00</h2>
                    <i class='fa-solid fa-trash' onclick='delElement(${index})'></i>
                </div>
            `;
        }).join('');
        document.getElementById("total").innerHTML = "₱ " + total + ".00";
        enableCheckout(); // Enable checkout when cart has items
    }
}

function disableCheckout() {
    const checkoutBtn = document.querySelector('.container2 .btn');
    checkoutBtn.disabled = true;
    checkoutBtn.removeAttribute('href'); // Remove the href attribute to prevent redirection
}

function enableCheckout() {
    const checkoutBtn = document.querySelector('.container2 .btn');
    checkoutBtn.disabled = false;
    checkoutBtn.setAttribute('href', 'payment.html'); // Restore the href attribute for redirection
}
