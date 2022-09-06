import { Card, Grid, IconButton } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react'
import { ITrack } from '../types/tracks';
import styles from '../styles/TrackItem.module.scss'
import { Delete, Pause, PlayArrow } from '@mui/icons-material'
import { useRouter } from 'next/router';
import { useActions } from '../hooks/useActions';
import axios from 'axios';
import { useTypeSelector } from '../hooks/useTypeSelector';
import { timePipe } from './TrackProgress';
import { GetServerSideProps } from 'next';


interface TrackItemProps {
  track: ITrack;
}

const TrackItem: React.FC<TrackItemProps> = ({ track }) => {
  const router = useRouter();
  const { playTrack, pauseTrack, setActiveTrack, setPreviousTrack, clickPlayPause } = useActions();
  const { pause, active, previous, currentTime, volume, click } = useTypeSelector(state => state.player);
  const [duration, setDuration] = useState(0);
  const [audio, setAudio] = useState(null);

  const durationMinutes = timePipe(`${Math.trunc(duration / 60)}`);
  const durationSeconds = timePipe(`${duration % 60}`);
  const currentMinutes = timePipe(`${Math.trunc(currentTime / 60)}`);
  const currentSeconds = timePipe(`${currentTime % 60}`);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    audioRef.current = new Audio('http://localhost:5000/' + track.audio);
    audioRef.current.onloadeddata = () => {
      setDuration(Math.ceil(audioRef.current.duration));
    };
  }, [])

  const play = (e) => {
    if (e) e.stopPropagation();
    setPreviousTrack(active);
    setActiveTrack(track);
    clickPlayPause(!click);
  }

  const deleteTrack = async (e) => {
    e.stopPropagation();
    console.log(track._id);

    const response = await axios.delete('http://localhost:5000/tracks/' + track._id);
  }

  return (
    <Card className={styles.track} onClick={() => router.push('/tracks/' + track._id)}>
      <IconButton onClick={(e) => play(e)}>
        {track === active && !pause
          ? <Pause />
          : <PlayArrow />
        }
      </IconButton>
      <img width={70} height={70} src={'http://localhost:5000/' + track.picture} alt={track.name + 'Picture'} />
      <Grid container direction="column" style={{ width: 200, margin: '0 20px' }}>
        <div>{track.name}</div>
        <div style={{ fontSize: 12, color: 'gray' }}>{track.artist}</div>
      </Grid>
      {(active === track
      ) ? (
        <div>{`${currentMinutes}:${currentSeconds} / ${durationMinutes}:${durationSeconds}`}</div>
      ) : (
        <div>{`00:00 / ${durationMinutes}:${durationSeconds}`}</div>
      )}
      <IconButton onClick={(e) => deleteTrack(e)} style={{ marginLeft: 'auto' }}>
        <Delete />
      </IconButton>
    </Card>
  )
}

export default TrackItem;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await axios.get('http://localhost:5000/tracks/' + params.id)
  console.log(params.id);


  return {
    props: {
      serverTrack: response.data
    }
  }
}