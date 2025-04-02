import { Provider } from 'react-redux';
import { store } from './store/store';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-100">
        <div className="container mx-auto py-8">
          <TaskList />
        </div>
      </div>
    </Provider>
  );
}

export default App;
