import { Button, Card, Grid, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useRouter } from "next/router";
import React from "react";
import MainLayout from "../../layouts/MainLayout";
import TrackList from "../../components/TrackList"
import { useTypeSelector } from "../../hooks/useTypeSelector";
import { NextThunkDispatch, wrapper } from "../../store";
import { fetchTracks, searchTracks } from "../../store/actions-creators/track";
import { useDispatch } from "react-redux";

export const Tracks = () => {
  const router = useRouter();
  const { tracks, error } = useTypeSelector(state => state.track)
  const [query, setQuery] = React.useState<string>('');
  const dispatch = useDispatch() as NextThunkDispatch;
  const [timer, setTimer] = React.useState(null)

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    if (timer) {
      clearTimeout(timer);
    }
    setTimer(
      setTimeout(async () => {
        await dispatch(await searchTracks(e.target.value))
      }, 250)
    )
    
  }


  if (error) {
    return (
      <MainLayout>
        <h1>{error}</h1>
      </MainLayout>
    )
  }

  return (
    <MainLayout title="Track list - music platform">
      <Grid container justifyContent='center'>
        <Card style={{ width: 900 }}>
          <Box p={3}>
            <Grid container justifyContent='space-between'>
              <h1>Tracks</h1>
              <Button onClick={() => router.push('/tracks/create')}>
                Download
              </Button>
            </Grid>
            <TextField 
              fullWidth
              value={query}
              onChange={search}
            />
            <TrackList tracks={tracks} />
          </Box>
        </Card>
      </Grid>
    </MainLayout>
  )
}

export default Tracks;


export const getServerSideProps = wrapper.getServerSideProps(store => async ({}) => {
  const dispatch = store.dispatch as NextThunkDispatch;
  await dispatch(await fetchTracks());
})