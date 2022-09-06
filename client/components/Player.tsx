import { Pause, PlayArrow, VolumeUp } from '@mui/icons-material'
import { Grid, IconButton } from '@mui/material'
import styles from '../styles/Player.module.scss'
import React, { useEffect } from 'react'
import { ITrack } from '../types/tracks'
import TrackProgress from './TrackProgress'
import { useTypeSelector } from '../hooks/useTypeSelector'
import { useActions } from '../hooks/useActions'
import { setPreviousTrack } from '../store/actions-creators/player'

let audio;

const Player = () => {
  const { pauseTrack, playTrack, setVolume, setCurrentTime, setDuration, setActiveTrack, setPreviousTrack } = useActions();
  const { pause, volume, active, previous, duration, currentTime, click } = useTypeSelector(state => state.player);

  useEffect(() => {
    if (!audio || !active) {
      audio = new Audio();
    } else {
      setAudio();
      play();
    }
  }, [active, previous, click])

  const setAudio = () => {
    console.log(active);
    console.log(previous);
    console.log(active !== previous);
    
    if (active && active !== previous) {
      audio.src = 'http://localhost:5000/' + active.audio;
      audio.volume = volume / 100;
      audio.onloadedmetadata = () => {
        setDuration(Math.ceil(audio.duration));
      }
      audio.ontimeupdate = () => {
        setCurrentTime(Math.ceil(audio.currentTime));
      }
    }
  }

  const play = (clickOnPlayer = false) => {
    if (pause || (active !== previous && !clickOnPlayer)) {
      playTrack();
      audio.play();
    } else {
      pauseTrack();
      audio.pause();
    }
  }

  const changeVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.volume = Number(e.target.value) / 100;
    setVolume(Number(e.target.value))
  }

  const changeCurrentTime = (e: React.ChangeEvent<HTMLInputElement>) => {
    audio.currentTime = Number(e.target.value);
    setCurrentTime(Number(e.target.value))
  }

  if (!active) {
    return null;
  }

  return (
    <div className={styles.player}>
      <IconButton onClick={() => play(true)}>
        {!pause
          ? <Pause />
          : <PlayArrow />
        }
      </IconButton>
      <Grid container direction="column" style={{ width: 200, margin: '0 20px' }}>
        <div>{active?.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>{active?.artist}</div>
      </Grid>
      <TrackProgress left={currentTime} right={duration} onChange={changeCurrentTime} />
      <VolumeUp style={{ marginLeft: 'auto' }} />
      <TrackProgress left={volume} right={100} type={'volume'} onChange={changeVolume} />
    </div>
  )
}

export default Player;