import axios from 'axios'

//ACTION TYPES
const GET_ALL_COMPS = 'GET_ALL_COMPS'
const GET_SINGLE_COMP = 'GET_SINGLE_COMP'

//ACTION CREATORS
const getAllComps = comps => {
  return {
    comps,
    type: GET_ALL_COMPS
  }
}

const getSingleComp = comp => {
  return {
    comp,
    type: GET_SINGLE_COMP
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

export const gotSingleComp = id => {
  return async dispatch => {
    try {
      const {data} = await axios.get(`/api/competitions/${id}`)
      dispatch(getSingleComp(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//REDUCER
export default function(state = {allComps: [], singleComp: {}}, action) {
  switch (action.type) {
    case GET_ALL_COMPS:
      return {...state, allComps: action.comps}
    case GET_SINGLE_COMP:
      return {...state, singleComp: action.comp}
    default:
      return state
  }
}
