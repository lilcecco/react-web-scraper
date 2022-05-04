import ProcessesHistory from './ProcessesHistory';
import Suggestions from './Suggestions';
import './Home.css';

const Home = () => {
  return (
    <main className='home'>
        <ProcessesHistory />
        <Suggestions />
    </main>
  );
}

export default Home;