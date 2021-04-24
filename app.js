'use strict';

// Name of the product
// File path of image
// Times the image has been shown

let userAttemptsCounter = 0;
let maxAttempts = 5;

function Product(productName, source) {
    this.productName = productName,
        this.source = source,
        this.shown = 0,
        this.clicked = 0,

        Product.allProducts.push(this);
}
Product.allProducts = [];

new Product('bag', 'img/bag.jpg');
new Product('banana', 'img/banana.jpg');
new Product('bathroom', 'img/bathroom.jpg');
new Product('boots', 'img/boots.jpg');
new Product('breakfast', 'img/breakfast.jpg');
new Product('bubblegum', 'img/bubblegum.jpg');
new Product('chair', 'img/chair.jpg');
new Product('cthulhu', 'img/cthulhu.jpg');
new Product('dog-duck', 'img/dog-duck.jpg');
new Product('dragon', 'img/dragon.jpg');
new Product('pen', 'img/pen.jpg');
new Product('pet-sweep', 'img/pet-sweep.jpg');
new Product('scissors', 'img/scissors.jpg');
new Product('shark', 'img/shark.jpg');
new Product('sweep', 'img/sweep.png');
new Product('tauntaun', 'img/tauntaun.jpg');
new Product('unicorn', 'img/unicorn.jpg');
new Product('usb', 'img/usb.gif');
new Product('water-can', 'img/water-can.jpg');
new Product('wine-glass', 'img/wine-glass.jpg');


let container = document.getElementById('container')
let firstImageElement = document.getElementById('first-image');
let secondImageElement = document.getElementById('second-image');
let thirdImageElement = document.getElementById('third-image');


let firstImageIndex;
let secondImageIndex;
let thirdImageIndex;

function randomIndex() {
    return Math.floor(Math.random() * Product.allProducts.length);
}
// console.log(randomIndex());


function render3Images() {

    firstImageIndex = randomIndex();
    secondImageIndex = randomIndex();
    thirdImageIndex = randomIndex();

    while (firstImageIndex === secondImageIndex || firstImageIndex === thirdImageIndex || secondImageIndex === thirdImageIndex) {

        firstImageIndex = randomIndex();
        secondImageIndex = randomIndex();
        thirdImageIndex = randomIndex();
    }


    firstImageElement.src = Product.allProducts[firstImageIndex].source;
    Product.allProducts[firstImageIndex].shown++;
    firstImageElement.title = Product.allProducts[firstImageIndex].productName;
    firstImageElement.alt = Product.allProducts[firstImageIndex].productName;

    
    secondImageElement.src = Product.allProducts[secondImageIndex].source;
    Product.allProducts[secondImageIndex].shown++;
    secondImageElement.title = Product.allProducts[secondImageIndex].productName;
    secondImageElement.alt = Product.allProducts[secondImageIndex].productName;

    thirdImageElement.src = Product.allProducts[thirdImageIndex].source;
    Product.allProducts[thirdImageIndex].shown++;
    thirdImageElement.title = Product.allProducts[thirdImageIndex].productName;
    thirdImageElement.alt = Product.allProducts[thirdImageIndex].productName;
}



render3Images();


container.addEventListener('click', clicking);

function clicking(event) {
    render3Images();

    userAttemptsCounter++;
    
    if (userAttemptsCounter <= maxAttempts) {
        if (event.target.id === 'first-image' || event.target.id === 'second-image' || event.target.id === 'third-image') {

            for (let i = 0; i < Product.allProducts.length; i++) {
                if(Product.allProducts[i].productName === event.target.title){
                    Product.allProducts[i].clicked++;
                }
                
            }
        }





    } else if (userAttemptsCounter > maxAttempts) {
        let results = document.getElementById('results');

        let button = document.createElement('button');

        results.appendChild(button);
        button.textContent = 'Show Results'
        container.removeEventListener('click', clicking);

        button.addEventListener('click', showResults);
        localStorage.setItem('product', JSON.stringify(Product.allProducts));
        function showResults() {

            for (let i = 0; i < Product.allProducts.length; i++) {
                let list = document.createElement('li');
                results.appendChild(list)
                list.textContent = `${Product.allProducts[i].productName} has been shown ${Product.allProducts[i].shown} times`;

            }
            button.removeEventListener('click', showResults);
        }

    }
}



