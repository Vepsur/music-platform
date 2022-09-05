import { Container } from '@mui/system';
import Head from 'next/head';
import React from 'react'
import Navbar from '../components/Navbar';
import Player from '../components/Player';

interface MainLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
  keywords?: string;
}

export const MainLayout: React.FC<MainLayoutProps> = ({
   children,
   title,
   description,
   keywords
  }) => {
  return (
    <>
      <Head>
        <title>{title || 'Music platform'}</title>
        <meta name='description' content={'Music platform. Everyone can leave their track and become famous. ' + description}></meta>
        <meta name='robots' content='index, follow' />
        <meta name='keywords' content={keywords || 'Music, artists, tracks'} />
        <meta name='viewport' content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />
      <Container>
        {children}
      </Container>
      <Player/>
    </>
  )
}

export default MainLayout;