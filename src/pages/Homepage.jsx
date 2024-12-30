import { Link } from 'react-router-dom';
import PageNav from '../components/PageNav';

function Homepage() {
  return (
    <div>
      <PageNav />
      <h1>Homepage</h1>

      <Link to='app'>Go to the app</Link>
    </div>
  );
}

export default Homepage;
