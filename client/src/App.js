import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { LongPuling, EventSourcing } from './components';

function App() {
  console.log(1)
  return (
    <div className="App">
      {/* <LongPuling/> */}
      <EventSourcing/>
    </div>
  );
}

export default App;
