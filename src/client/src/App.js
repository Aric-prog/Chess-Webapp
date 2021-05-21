import LoginModal from "./LoginModal";

const { default: Header } = require("./Header");
const { default: Home } = require("./Home");
const { default: Learn } = require("./Learn");
const { default: Play} = require("./Play")
const { default: test} = require("./testSocket")

function App() {
  return (
    <div className="App">
      {/* <Header></Header> */}
      {/* <Home></Home> */}
      {/* <LoginModal></LoginModal> */}
      {/* <Learn></Learn> */}
      {/* <Play></Play> */}
      <test></test>
    </div>
  );
}

export default App;

