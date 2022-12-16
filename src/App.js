import { Fragment } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Register from "./pages/Register";

function App() {
  return (
    <Router>
      <Fragment>
        <div className="main">
          <Route exact path="/" component={Register} />
        </div>
      </Fragment>
    </Router>
  );
}

export default App;
