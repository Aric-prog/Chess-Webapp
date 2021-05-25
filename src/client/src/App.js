import { AuthProvider } from "./firebase/AuthContext";
import LoginModal from "./LoginModal";

const { default: Header } = require("./Header");
const { default: Home } = require("./Home");
const { default: Learn } = require("./Learn");
const { default: Play} = require("./Play")

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header></Header>
        {/* <Home></Home> */}
        <LoginModal></LoginModal>
        {/* <Learn></Learn> */}
        {/* <Play></Play> */}
        {/* <test></test> */}
      </div>
    </AuthProvider>
  );
}

export default App;

