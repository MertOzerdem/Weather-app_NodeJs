// object property shorthand
const name = 'mert'

const userAge = 26

const user = {
    name,
    age : userAge,
    location: 'Ankara'
}

console.log(user);

// object destructure

const product = {
    label : 'this is label',
    price : 3,
    stock : 201,
    salePrice : undefined
}

const {label: productLabel, salePrice = 5, stock, empty} = product
console.log(productLabel);
console.log(stock);
console.log(empty);
console.log(salePrice);

const transaction = (type, {label, stock}) =>{
    console.log(type, label, stock);
}

transaction('order', product);