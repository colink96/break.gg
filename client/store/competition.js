import axios from 'axios'

//ACTION TYPES
const GET_ALL_COMPS = 'GET_ALL_COMPS'

//ACTION CREATORS
const getAllComps = comps => {
  return {
    comps,
    type: GET_ALL_COMPS
  }
}

//THUNKS
export const gotAllComps = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/api/competitions')
      dispatch(getAllComps(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//REDUCER
export default function(state = {allComps: []}, action) {
  switch (action.type) {
    case GET_ALL_COMPS:
      return {allComps: action.comps}
    default:
      return state
  }
}
