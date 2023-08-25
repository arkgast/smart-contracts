import { Button, Container, Content, Footer, Header } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import { Link } from './components';
import { Outlet } from 'react-router-dom';

function App() {
  return (
    <Container>
      <Header>Header</Header>
      <Content>
        <Button appearance='link' as={Link} href='/'>Home</Button>
        <Button appearance='link' as={Link} href='/simple-storage'>Simple storage</Button>
        <Outlet />
      </Content>
      <Footer>Footer</Footer>
    </Container>
  )
}

export default App
