const { default: Header } = require("./Header");
const { default: Home } = require("./Home");
const { default: Learn } = require("./Learn");

function App() {
  return (
    <div className="App">
      <Header></Header>
      {/* <Home></Home> */}
      <Learn></Learn>
    </div>
  );
}

export default App;

