import { AuthProvider } from "./firebase/AuthContext";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const { default: Header } = require("./Header");
const { default: Home } = require("./Home");
const { default: Learn } = require("./Learn");
const { default: Play } = require("./Play")
const { default: About } = require("./About");
const { default: History } = require("./History");
const { default: Footer} = require("./Footer");
const { default: LearnList} = require("./LearnList")

function App() {

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header></Header>
          <div className="main-content">
            <Switch>
              <Route exact path="/">
                <Home></Home>
              </Route>
              <Route exact path="/learn">
                <LearnList></LearnList>
              </Route>
              <Route exact path="/play">
                <Play></Play>
              </Route>
              <Route exact path="/about">
                <About></About>
              </Route>
              <Route exact path="/history">
                <History></History>
              </Route>
            </Switch>
            {/* <SignUpModal></SignUpModal> */}
            {/* <LoginModal></LoginModal> */}
          </div>
          <Footer></Footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

