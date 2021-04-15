import './App.css';
import TableComponent from './Components/Table/Table';
import Typography from '@material-ui/core/Typography';


const App = () => {
  return (
    <div className="App">
      <div className="container">
        <div className="headerContainer">
          <Typography variant="h6">Purshase Orders</Typography>
        </div>
        <TableComponent></TableComponent>
      </div>
    </div>
  );
}

export default App;
