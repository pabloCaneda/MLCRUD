const fs = require('fs');
const path = require('path');

let productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));


const controller = {

	index: (req, res) => {
		res.render("products",{products})
	},


	detail: (req, res) => {
		let p =req.params.id
		let p2 = products.find((p3)=>{return p==p3.id});
		res.render("detail",{p4:p2})	},


	create: (req, res) => {
	res.render('product-create-form')
	},
	

	store: (req, res) => {

		const {name,price,discount,category,description} = req.body;

		const id= products[products.length - 1].id + 1;

		const newProduct= {
		 id: id,
		 name,
		 price,
		 discount,
		 category: category =="visited"? "visited": "in-sale",
		 description,
		 image: "img-bicicleta-fierce.jpg",
		}

	    products = [...products,newProduct];
	    products = JSON.stringify(products,null,3);
	 
	   fs.writeFileSync(productsFilePath,products,'utf-8');
 
	   return res.redirect("/products")
	
	},


	edit: (req, res) => {
		let p =req.params.id
		let pedit = products.find((p3)=>{return p==p3.id});
		res.render("product-edit-form",{p4:pedit})
	},
	// Update - Method to update
	update: (req, res) => {
		const { id } = req.params;
		const {name,price,discount,category,description} = req.body;
 const productsMap = products.map((p) => {
    if (p.id === +id) {
      const productEditado = {
        ...p,
        name: name.trim(),
        price: +price,
		discount: discount.trim(),
        description: description.trim(),
		category: category =="visited"? "visited": "in-sale",
      };

      return productEditado;
    }

    return p;
  });
  products = JSON.stringify(productsMap,null,3);
  fs.writeFileSync(productsFilePath,products,'utf-8');
  res.redirect("/products");

    
	},

	destroy : (req, res) => {
		const {id} = req.params

		const productLessOne = products.filter(p => p.id !== +id)
	  
		products = JSON.stringify(productLessOne,null,3);
		fs.writeFileSync(productsFilePath,products,'utf-8');
		res.redirect("/products");
	}
};

module.exports = controller;