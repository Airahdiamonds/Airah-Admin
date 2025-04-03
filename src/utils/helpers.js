export const convertFormData = (data) => {
	const updatedData = { ...data }

	Object.keys(updatedData).forEach((key) => {
		if (
			key.includes('quantity') ||
			key.includes('price') ||
			key.includes('total') ||
			key.includes('cost')
		) {
			updatedData[key] =
				updatedData[key] === '' || updatedData[key] === null
					? null
					: parseFloat(updatedData[key])
		}
	})

	return updatedData
}

export const formatDate = (date) => {
	const newDate = new Date(date)
	const formattedDate = newDate.toLocaleDateString('en-GB')
	return formattedDate
}

export const productJson = {
	name: '',
	SKU: '',
	category: 'ring',
	segment: '',
	subCategory: 'Stackable Rings',
	description: '',
	image_URL: [],
	gold_quantity: '',
	gold_price: '',
	gold_total: '',
	round_quantity: '',
	round_price: '',
	round_total: '',
	oval_quantity: '',
	oval_price: '',
	oval_total: '',
	marquise_quantity: '',
	marquise_price: '',
	marquise_total: '',
	emerald_quantity: '',
	emerald_price: '',
	emerald_total: '',
	princess_quantity: '',
	princess_price: '',
	princess_total: '',
	pear_quantity: '',
	pear_price: '',
	pear_total: '',
	heart_quantity: '',
	heart_price: '',
	heart_total: '',
	other_diamond_quantity: '',
	other_diamond_price: '',
	other_diamond_total: '',
	gemstone_quantity: '',
	gemstone_price: '',
	gemstone_total: '',
	misc_cost: '',
	labour_cost: '',
	other_cost: '',
	total_cost: '',
}

export const diamondJson = {
	name: '',
	SKU: '',
	description: '',
	image_URL: [],
	size: '0.5',
	shape: 'round',
	cut: 'regular',
	color: 'D',
	clarity: 'IF',
	price: '',
}

export const stylesJson = {
	name: '',
	SKU: '',
	description: '',
	image_URL: [],
	head_style: 'Four Prong',
	head_style_price: '',
	head_metal: '14K White Gold',
	head_metal_price: '',
	shank_style: 'Solitaire',
	shank_style_price: '',
	shank_metal: '14K White Gold',
	shank_metal_price: '',
}

export const convertPrice = (price, country, INR_rate, GBP_rate) => {
	switch (country) {
		case 'INR':
			return price * INR_rate
		case 'GBP':
			return price * GBP_rate
		case 'USD':
			return price
		default:
			return price
	}
}

export const menuItems = [
	{
		name: 'Rings',
		submenu: [
			{
				heading: 'Design Your Own',
				items: [
					'Start with a Setting',
					'Start with a Diamond',
					'Start With A Lab Grown Diamond',
					'Start with a Gemstone',
				],
			},
			{
				heading: 'Ready-to-Ship',
				items: [
					'Ready to Ship Engagement Rings',
					'Preset Diamond Engagement Rings',
				],
			},
			{
				heading: 'Popular Styles',
				items: [
					'Round Cut Rings',
					'Princess Cut Rings',
					'Cushion Cut Rings',
					"Explore Men's Engagement Rings",
					'Top Engagement Rings',
					'Customize Your Engagement Ring',
					'The Ring Studio',
				],
			},
			{
				heading: 'Engagement Ring Styles',
				items: [
					'Solitaire',
					'Pavé',
					'Channel-Set',
					'Side-Stone',
					'Bezel',
					'Halo',
					'Hidden Halo',
					'Three-Stone',
				],
			},
			{
				heading: 'More Styles',
				items: [
					'Tension',
					'Floral',
					'Tiara',
					'Vintage',
					'Unique',
					'Cathedral',
					'Cluster',
				],
			},
			{
				heading: 'Shop by Metal',
				items: ['Rose Gold', 'White Gold', 'Yellow Gold', 'Platinum'],
			},
		],
	},
	{
		name: 'Fine Jewelry',
		submenu: [
			{
				heading: 'Earrings',
				items: [
					'Stud Earrings',
					'Hoop Earrings',
					'Drop Earrings',
					'Chandelier Earrings',
				],
			},
			{
				heading: 'Bracelets',
				items: [
					'Bangle Bracelets',
					'Tennis Bracelets',
					'Cuff Bracelets',
					'Charm Bracelets',
				],
			},
			{
				heading: 'Necklaces',
				items: [
					'Pendant Necklaces',
					'Choker Necklaces',
					'Lariat Necklaces',
					'Statement Necklaces',
				],
			},
			{
				heading: 'Rings',
				items: [
					'Stackable Rings',
					'Birthstone Rings',
					'Eternity Rings',
					'Fashion Rings',
				],
			},
		],
	},

	{
		name: 'FAQ',
		submenu: [
			{
				heading: 'Orders & Shipping',
				items: [
					'Track Your Order',
					'Shipping Policies',
					'International Shipping',
				],
			},
			{
				heading: 'Returns & Exchanges',
				items: [
					'Return Policy',
					'How to Return an Item',
					'Exchanges & Store Credit',
				],
			},
			{
				heading: 'Payment & Financing',
				items: ['Accepted Payment Methods', 'Financing Options', 'Gift Cards'],
			},
			{
				heading: 'Customization & Engraving',
				items: ['Custom Jewelry', 'Engraving Services', 'Special Orders'],
			},
		],
	},
]
