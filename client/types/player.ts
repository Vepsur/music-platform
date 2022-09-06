import { ITrack } from "./tracks";

export interface PlayerState {
  active: null | ITrack;
  previous: null | ITrack;
  volume: number;
  duration: number;
  currentTime: number;
  pause: boolean;
  click: boolean;
}

export enum PlayerActionTypes {
  PLAY = "PLAY",
  PAUSE = "PAUSE",
  SET_ACTIVE = "SET_ACTIVE",
  SET_DURATION = "SET_DURATION",
  SET_CURRENT_TIME = "SET_CURRENT_TIME",
  SET_VOLUME = "SET_VOLUME",
  SET_PREVIOUS = "SET_PREVIOUS",
  SET_CLICK_PLAY_PAUSE = "SET_CLICK_PLAY_PAUSE"
}

interface PlayAction {
  type: PlayerActionTypes.PLAY,
}

interface PauseAction {
  type: PlayerActionTypes.PAUSE,
}

interface SetActiveAction {
  type: PlayerActionTypes.SET_ACTIVE,
  payload: ITrack
}

interface SetPreviousAction {
  type: PlayerActionTypes.SET_PREVIOUS,
  payload: ITrack
}

interface SetDurationAction {
  type: PlayerActionTypes.SET_DURATION,
  payload: number
}

interface SetCurrentTimeAction {
  type: PlayerActionTypes.SET_CURRENT_TIME,
  payload: number
}

interface SetVolumeAction {
  type: PlayerActionTypes.SET_VOLUME,
  payload: number
}

interface SetClickPlayPause {
  type: PlayerActionTypes.SET_CLICK_PLAY_PAUSE,
  payload: boolean
}

export type PlayerAction = 
  PlayAction
  | PauseAction
  | SetActiveAction
  | SetPreviousAction
  | SetDurationAction
  | SetVolumeAction
  | SetCurrentTimeAction
  | SetClickPlayPause