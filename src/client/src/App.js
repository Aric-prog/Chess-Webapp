const { default: Header } = require("./Header");
const { default: Home } = require("./Home");
const { default: Learn } = require("./Learn");
const { default: Play} = require("./Play")

function App() {
  return (
    <div className="App">
      <Header></Header>
      {/* <Home></Home> */}
      <Play></Play>
    </div>
  );
}

export default App;

