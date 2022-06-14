import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { LongPuling, EventSourcing, WebSoket } from './components';

function App() {
  return (
    <div className="App">
      {/* <LongPuling/> */}
      {/* <EventSourcing/> */}
      <WebSoket/>
    </div>
  );
}

export default App;
