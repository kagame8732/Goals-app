import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import goalService from './goalService'


const initialState = {
    goals: [],
    isLoading: false,
    isSuccess: false,
    isError: false,
    message: ''
}

export const addGoal = createAsyncThunk('/goals', async (goal, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token
        return await goalService.addGoal(goal, token)
    } catch (error) {
        const message = (error.response && error.response.data &&
            error.response.data.message) || error.message || error.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const goalSlice = createSlice({
    name: 'goal',
    initialState,
    reducers: {
        reset: (state) => initialState
    },
    extraReducers: (builder) => {
        builder.addCase(addGoal.pending, (state) => {
            state.isLoading = true
        })
            .addCase(addGoal.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.goals.push(action.payload)
            }).addCase(addGoal.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            })
    }
})

export const { reset } = goalSlice.actions

export default goalSlice.reducer