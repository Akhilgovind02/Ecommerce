import {Api} from '../../utils/Api'
import * as actionTypes from '../constants/userContants'

export const setUserDeatils = () => async dispatch => {
  const {statusCode, data} = await Api.getRequest(`/api/user/me`)
  if (statusCode === 400 || statusCode === 500) {
    dispatch({
      type: actionTypes.SET_INITIAL_STATE,
    })
    return
  }
  console.log(data)
  const {user} = JSON.parse(data) 
  const player = JSON.parse(data)
  // console.log(player.Playeris);
  dispatch({
    type: actionTypes.SET_USER,
    payload: {
      isLogin: true,
      details: {...user},
      playerDetails :player.Playeris ,
    },
  })
}

export const setInitialState = () => async dispatch => {
  dispatch({
    type: actionTypes.SET_INITIAL_STATE,
  })
}
