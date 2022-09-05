import { Dispatch } from "react"
import { TrackAction, TrackActionTypes } from "../../types/tracks";
import axios from "axios";

export const fetchTracks = async () => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get('http://localhost:5000/tracks');
      dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: 'Error on download track'
      })
    }
  }
}

export const searchTracks = async (query: string) => {
  return async (dispatch: Dispatch<TrackAction>) => {
    try {
      const response = await axios.get('http://localhost:5000/tracks/search?query='+ query);
      dispatch({type: TrackActionTypes.FETCH_TRACKS, payload: response.data})
    } catch (e) {
      dispatch({
        type: TrackActionTypes.FETCH_TRACKS_ERROR,
        payload: 'Error on download track'
      })
    }
  }
}