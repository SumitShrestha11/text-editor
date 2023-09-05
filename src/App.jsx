import { BrowserRouter, Link, Route, Switch } from "react-router-dom";
import ReactDraft from "./reactDraft";
import "./styles.css";

function App() {
  return (
    <>
      {" "}
      <BrowserRouter>
        <div className="App">
          <div className="nav">
            <div>
              <Link to="/reactdraft">React Draft</Link>
            </div>
            {/* <div>
      <Link to="/tinymce">Tinymce</Link>
    </div>
    <div>
      <Link to="/ckeditor">CkEditor</Link>
    </div> */}
          </div>
          <div className="main">
            <Switch>
              {/* <Route path="/ckeditor">
        <div> Work in Progress </div>
      </Route> */}
              {/* <Route path="/tinymce">
        <Tinymce></Tinymce>
      </Route> */}
              <Route path="/reactdraft">
                <ReactDraft></ReactDraft>
              </Route>
              <Route path="/">
                <ReactDraft></ReactDraft>
              </Route>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
      ;
    </>
  );
}

export default App;
