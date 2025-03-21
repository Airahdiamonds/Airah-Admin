import express from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import { getAllUsers } from './drizzle/features/users.js'
import cors from 'cors'
import {
	addProduct,
	getAllProducts,
	getAllRings,
	getProduct,
	updateProduct,
} from './drizzle/features/products.js'
import {
	addCouponEntry,
	addMasterEntry,
	getCouponList,
	getMasterList,
} from './drizzle/features/master.js'
import {
	addDiamond,
	getAllDiamonds,
	getDiamond,
	updateDiamond,
} from './drizzle/features/diamonds.js'
import {
	addStyle,
	getAllStyles,
	getStyle,
	updateStyle,
} from './drizzle/features/styles.js'

dotenv.config()

const app = express()
const port = process.env.PORT || 4001
app.use(bodyParser.json())
app.use(cors())

app.post('/api/admin/addProduct', async (req, res) => {
	try {
		const data = req.body
		await addProduct(data)
		res.json({ success: true })
	} catch (err) {
		console.log('addProduct Error:', err)
		res.status(500).json({ error: 'Failed to add product' })
	}
})

app.get('/api/admin/getAllProducts/:clerk_user_id?', async (req, res) => {
	try {
		let { clerk_user_id } = req.params

		if (
			!clerk_user_id ||
			clerk_user_id === 'null' ||
			clerk_user_id === 'undefined'
		) {
			clerk_user_id = null
		}

		const data = await getAllProducts(clerk_user_id)
		res.json(data)
	} catch (err) {
		console.error('getAllProducts Error:', err)
		res.status(500).json({ error: 'Failed to get all products' })
	}
})

app.put('/api/admin/updateProduct/:product_id', async (req, res) => {
	try {
		const updatedProduct = await updateProduct(req.params.product_id, req.body)
		res.json(updatedProduct)
	} catch (err) {
		console.log('updateProduct Error: ' + err)
		res.status(500).json({ error: 'Failed to update product' })
	}
})

app.get('/api/admin/getAllProductsByCategory/:category', async (req, res) => {
	try {
		const { category } = req.params
		let data

		const categoryHandlers = {
			diamond: getAllDiamonds,
			ring: getAllRings,
		}

		if (categoryHandlers[category]) {
			data = await categoryHandlers[category]()
		} else {
			return res.status(400).json({ error: `Invalid category: ${category}` })
		}

		res.json(data)
	} catch (err) {
		console.error(
			`Error fetching products for category "${req.params.category}":`,
			err
		)
		res.status(500).json({ error: 'Failed to fetch products' })
	}
})

app.get('/api/admin/getAllUsers', async (req, res) => {
	try {
		const data = await getAllUsers()
		res.json(data)
	} catch (err) {
		console.log('getAllUsers Error: ' + err)
		res.status(500).json({ error: 'Failed to get all users' })
	}
})

app.get('/api/getProduct/:product_id', async (req, res) => {
	try {
		const { product_id } = req.params
		const data = await getProduct(product_id)
		res.json(data)
	} catch (err) {
		console.log('getProduct Error: ' + err)
		res.status(500).json({ error: 'Failed to get product' })
	}
})

app.get('/api/getDiamond/:product_id', async (req, res) => {
	try {
		const { product_id } = req.params
		const data = await getDiamond(product_id)
		res.json(data)
	} catch (err) {
		console.log('getDiamond Error: ' + err)
		res.status(500).json({ error: 'Failed to get diamond' })
	}
})

app.get('/api/getStyle/:product_id', async (req, res) => {
	try {
		const { product_id } = req.params
		const data = await getStyle(product_id)
		res.json(data)
	} catch (err) {
		console.log('getStyle Error: ' + err)
		res.status(500).json({ error: 'Failed to get style' })
	}
})

app.get('/api/admin/getMasterList', async (req, res) => {
	try {
		const data = await getMasterList()
		res.json(data)
	} catch (err) {
		console.log('getMasterList Error: ' + err)
		res.status(500).json({ error: 'Failed to get master list' })
	}
})

app.post('/api/admin/addMasterEntry', async (req, res) => {
	try {
		const data = req.body
		await addMasterEntry(data)
		res.json({ success: true })
	} catch (err) {
		console.log('addMasterEntry Error:', err)
		res.status(500).json({ error: 'Failed to add master entry' })
	}
})

app.post('/api/admin/addDiamond', async (req, res) => {
	try {
		const data = req.body
		await addDiamond(data)
		res.json({ success: true })
	} catch (err) {
		console.log('addDiamond Error:', err)
		res.status(500).json({ error: 'Failed to add diamond' })
	}
})

app.get('/api/admin/getAllDiamonds/:clerk_user_id?', async (req, res) => {
	try {
		let { clerk_user_id } = req.params

		if (
			!clerk_user_id ||
			clerk_user_id === 'null' ||
			clerk_user_id === 'undefined'
		) {
			clerk_user_id = null
		}
		const data = await getAllDiamonds(clerk_user_id)
		res.json(data)
	} catch (err) {
		console.log('getAllDiamonds Error: ' + err)
		res.status(500).json({ error: 'Failed to get all diamonds' })
	}
})

app.put('/api/admin/updateDiamond/:product_id', async (req, res) => {
	try {
		const updatedProduct = await updateDiamond(req.params.product_id, req.body)
		res.json(updatedProduct)
	} catch (err) {
		console.log('updateDiamond Error: ' + err)
		res.status(500).json({ error: 'Failed to update diamond' })
	}
})

app.post('/api/admin/addStyle', async (req, res) => {
	try {
		const data = req.body
		await addStyle(data)
		res.json({ success: true })
	} catch (err) {
		console.log('addStyle Error:', err)
		res.status(500).json({ error: 'Failed to add style' })
	}
})

app.get('/api/admin/getAllStyles/:clerk_user_id?', async (req, res) => {
	try {
		let { clerk_user_id } = req.params

		if (
			!clerk_user_id ||
			clerk_user_id === 'null' ||
			clerk_user_id === 'undefined'
		) {
			clerk_user_id = null
		}
		const data = await getAllStyles(clerk_user_id)
		res.json(data)
	} catch (err) {
		console.log('getAllStyles Error: ' + err)
		res.status(500).json({ error: 'Failed to get all styles' })
	}
})

app.put('/api/admin/updateStyle/:product_id', async (req, res) => {
	try {
		const updatedProduct = await updateStyle(req.params.product_id, req.body)
		res.json(updatedProduct)
	} catch (err) {
		console.log('updateStyle Error: ' + err)
		res.status(500).json({ error: 'Failed to update style' })
	}
})

app.get('/api/admin/getCouponList', async (req, res) => {
	try {
		const data = await getCouponList()
		res.json(data)
	} catch (err) {
		console.log('getCouponList Error: ' + err)
		res.status(500).json({ error: 'Failed to get coupon list' })
	}
})

app.post('/api/admin/addCouponEntry', async (req, res) => {
	try {
		const data = req.body
		await addCouponEntry(data)
		res.json({ success: true })
	} catch (err) {
		console.log('addCouponEntry Error:', err)
		res.status(500).json({ error: 'Failed to add coupon entry' })
	}
})

app.listen(port, () => {
	console.log(`Server running on port ${port}`)
})
