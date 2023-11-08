const express = require('express')
const bodyparser = require('body-parser')
const path = require('path')
const app = express()

var Publishable_Key = '';
var Secret_Key = '';

const stripe = require('stripe')(Secret_Key)

const port = process.env.PORT || 3000

app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

// View Engine Setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.get('/', function(req, res){
	res.render('Home', {
	key: Publishable_Key
	})
})

app.post('/payment', function(req, res){
	stripe.customers.create({
		email: req.body.stripeEmail,
		source: req.body.stripeToken,
		name: 'Indhu Vijay',
		address: {
			line1: 'TC 9/4 Old MES colony',
			postal_code: '452331',
			city: 'BAngalore',
			state: 'Karnataka',
			country: 'India',
		}
	})
	.then((customer) => {
		return stripe.charges.create({
			amount: 8000,	 
			description: 'Web Development Product',
			currency: 'INR',
			customer: customer.id
		});
	})
	.then((charge) => {
		res.send("Success") 
	})
	.catch((err) => {
		res.send(err)	 
	});
})

app.listen(port, function(error){
	if(error) throw error
	console.log("Server created Successfully")
})
