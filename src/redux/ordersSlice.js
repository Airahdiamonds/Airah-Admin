import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchUserOrders, updateOrderStatus } from '../utils/api'

// Fetch orders from backend
export const fetchOrders = createAsyncThunk(
	'orders/fetchOrders',
	async ({ rejectWithValue }) => {
		try {
			return await fetchUserOrders()
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

export const updateStatus = createAsyncThunk(
	'orders/updateStatus',
	async ({ orderId, status }, { rejectWithValue }) => {
		try {
			return await updateOrderStatus(orderId, status)
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

// // Cancel an order
// export const cancelOrder = createAsyncThunk(
// 	'orders/cancelOrder',
// 	async (orderId, { rejectWithValue }) => {
// 		try {
// 			return await cancelUserOrder(orderId)
// 		} catch (error) {
// 			return rejectWithValue(error.message)
// 		}
// 	}
// )

// export const createOrder = createAsyncThunk(
// 	'orders/createOrder',
// 	async ({ dbId, cartItems, totalPrice }, { rejectWithValue }) => {
// 		try {
// 			return await createUserOrder({ dbId, cartItems, totalPrice })
// 		} catch (error) {
// 			return rejectWithValue(error.message)
// 		}
// 	}
// )

const ordersSlice = createSlice({
	name: 'orders',
	initialState: {
		orders: [],
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchOrders.pending, (state) => {
				state.status = 'loading'
			})
			.addCase(fetchOrders.fulfilled, (state, action) => {
				state.status = 'succeeded'
				state.orders = action.payload
			})
			.addCase(fetchOrders.rejected, (state, action) => {
				state.status = 'failed'
				state.error = action.error.message
			})
		// .addCase(cancelOrder.fulfilled, (state, action) => {
		// 	state.orders = state.orders.map((order) =>
		// 		order.id === action.payload
		// 			? { ...order, status: 'Cancelled' }
		// 			: order
		// 	)
		// })
		// .addCase(createOrder.fulfilled, (state, action) => {
		// 	state.orders.push(action.payload)
		// })
	},
})

export default ordersSlice.reducer
