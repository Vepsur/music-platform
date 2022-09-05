import { Button, Grid, TextField } from '@mui/material';
import axios from 'axios';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React from 'react'
import { useInput } from '../../hooks/useInput';
import MainLayout from '../../layouts/MainLayout';
import { ITrack } from '../../types/tracks'

const TrackPage = ({ serverTrack }) => {
  const router = useRouter();
  const [track, setTrack] = React.useState<ITrack>(serverTrack);
  const username = useInput('');
  const text = useInput('');

  const addComment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/tracks/comment', {
        username: username.value,
        text: text.value,
        trackId: track._id
      });
      setTrack({ ...track, comments: [...track.comments, response.data] })
    } catch (e) {
      console.log(e);

    }
  }

  return (
    <MainLayout
      title={'Music platform - ' + track.name + ' - ' + track.artist}
      keywords={'Music, artists, ' + track.name + ', ' + track.artist}
    >
      <Button
        variant="outlined"
        style={{ fontSize: 24 }}
        onClick={() => router.push('/tracks')}
      >
        To tracks list
      </Button>
      <Grid container style={{ margin: '20px 0' }}>
        <img src={'http://localhost:5000/' + track.picture} width={200} height={200} alt={track._id + 'Picture'} />
        <div style={{ margin: '20px 0' }}>
          <h1>Track name - {track.name}</h1>
          <h2>Artist - {track.artist}</h2>
          <h2>Listens - {track.listens}</h2>
        </div>
      </Grid>
      <h3>Description</h3>
      <p dangerouslySetInnerHTML={{ __html: track.text }}></p>
      <h2 style={{ marginTop: '60px' }}>Comments</h2>
      <Grid container>
        <TextField
          label="Your name"
          fullWidth
          {...username}
        />
        <TextField
          label="Comment"
          fullWidth
          {...text}
          multiline
          rows={4}
        />
        <Button onClick={addComment}>Leave a comment</Button>
      </Grid>
      <div>
        {track.comments.map(comment =>
          <div>
            <div>Author - {comment.username}</div>
            <div>Comment - {comment.text}</div>
          </div>
        )}
      </div>
    </MainLayout>
  )
}

export default TrackPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const response = await axios.get('http://localhost:5000/tracks/' + params.id)
  console.log(params.id);


  return {
    props: {
      serverTrack: response.data
    }
  }
}