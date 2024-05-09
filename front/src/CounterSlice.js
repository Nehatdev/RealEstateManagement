import { createSlice } from '@reduxjs/toolkit'

const initialState = {

  data:''
}

export const counterslice = createSlice({
    name: 'userdata',
    initialState,
    reducers: {
        adddata:(state,action)=>{
        state.data=action.payload
      }
    },
  })
  export const {adddata,postdata } = counterslice.actions
  
  export default counterslice.reducer
