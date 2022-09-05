import Button from '@mui/material/Button';
import Navbar from "../components/Navbar"
import MainLayout from "../layouts/MainLayout"


export const Index = () => {
  return (
    <>
      <MainLayout>
        <div className='center'>
          <h1>Wellcome</h1>
          <h3>Here we collected the best tracks!</h3>
          <Button>Button</Button>
        </div>
      </MainLayout>
      <style jsx>
        {`
          .center {
            margin-top: 150px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center; 
          }
        `}
      </style>

    </>

  )
}

export default Index;