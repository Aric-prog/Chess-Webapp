import { AuthProvider } from "./firebase/AuthContext";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const { default: Header } = require("./Header");
const { default: Home } = require("./Home");
const { default: Learn } = require("./Learn");
const { default: Play } = require("./Play")
const { default: About } = require("./About");
const { default: LoginModal } = require("./LoginModal");
const { default: SignUpModal } = require("./SignUpModal");

function App() {
  return (

    <Router>
      <div className="App">
        <Header></Header>
        <div className="main-content">
          <Switch>
            <Route path="/">
              <Home></Home>
            </Route>
            <Route exact path="/learn">
              <Learn></Learn>
            </Route>
            <Route exact path="/play">
              <Play></Play>
            </Route>
            {/* <Route exact path="/about">
                <About></About>
              </Route> */}
          </Switch>
          <Route path="/login">
            <LoginModal></LoginModal>
          </Route>
          {/* <SignUpModal></SignUpModal> */}
          {/* <AuthProvider>
            <LoginModal></LoginModal>
            </AuthProvider> */}
        </div>
      </div>
    </Router>
  );
}

export default App;

