import bcrypt from 'bcryptjs';

const data = {
    users:[
        {
            name: "shakil",
            email:"shakil@gmail.com",
            password:bcrypt.hashSync('123456'),
            isAdmin:true,
            role:"admin"
        },
        {
            name: "shoab",
            email:"shoab@gmail.com",
            password:bcrypt.hashSync('123456'),
            isAdmin:false,
            role:"user"
            
        },
        {
            name: "shoab",
            email:"shoab@gmail.com",
            password:bcrypt.hashSync('123456'),
            isAdmin:false,
            role:"seller"
            
        }
    ],
    products: [
        {
            //_id:'1',
            name:"nike T-shart",
            slug:"nike T-shart",
            category:"sharts",
            image:"/images/p1.png",
            price: 120,
            countInStock: 10,
            brand: "nike",
            rating: 3.5,
            numReviews: 10,
            description: "high quality product",
        },
        {
            //_id:'2',
            name:"nike full-shart",
            slug:"nike full-shart",
            category:"sharts",
            image:"/images/p2.jpg",
            price: 189,
            countInStock: 10,
            brand: "nike",
            rating: 4.5,
            numReviews: 7,
            description: "high quality product"
        },
        {
            //_id:'3',
            name:"addidas T-shart",
            slug:"addidas T-shart",
            category:"sharts",
            image:"/images/p3.jpg   ",
            price: 110,
            countInStock: 0,
            brand: "nike",
            rating: 2.5,
            numReviews: 11,
            description: "high quality product"
        },
        {
            //_id:'4',
            name:"addidas full-shart",
            slug:"addidas full-shart",
            category:"sharts",
            image:"/images/p1.png",
            price: 115,
            countInStock: 10,
            brand: "nike",
            rating: 4.5,
            numReviews: 23,
            description: "high quality product"
        },
        
    ]
}

export default data;