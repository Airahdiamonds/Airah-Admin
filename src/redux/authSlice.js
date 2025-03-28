// store/authSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { loginAdmin } from '../utils/api'

export const loginUser = createAsyncThunk(
	'auth/loginUser',
	async ({ email, password }, { rejectWithValue }) => {
		try {
			return await loginAdmin(email, password)
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)

const authSlice = createSlice({
	name: 'auth',
	initialState: {
		isAuthenticated: false, // Default to false
		user: null,
	},
	reducers: {
		login: (state, action) => {
			state.isAuthenticated = true
			state.user = action.payload
		},
		logout: (state) => {
			state.isAuthenticated = false
			state.user = null
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isAuthenticated = true
				state.user = action.payload
				state.error = null
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isAuthenticated = false
				state.user = null
				state.error = action.payload // Store error message
			})
	},
})

export const { login, logout } = authSlice.actions
export default authSlice.reducer
