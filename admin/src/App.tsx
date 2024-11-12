import { BrowserRouter } from 'react-router-dom';

import Routes from './routes/index';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
};

export default App;
