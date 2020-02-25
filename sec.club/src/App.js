import React, { Suspense, lazy } from "react"
import "./App.scss"
import { createMuiTheme, ThemeProvider } from "@material-ui/core"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import { red, cyan } from "@material-ui/core/colors";
import Loader from "./components/Loader/Loader.js";

import SecStyle from "./variables.scss";

const Header = lazy(() => import(/* webpackChunkName: "components" */"./components/Header/Header"));
const Footer = lazy(() => import(/* webpackChunkName: "components" */"./components/Footer/Footer.jsx"));
const HomeView = lazy(() => import(/* webpackChunkName: "home" */"./views/Home/Home.js"));
const NotFoundView = lazy(() => import(/* webpackChunkName: "not-found" */"./views/NotFound/NotFound.jsx"));
// This snippet makes the home view take longer to load intentionally. Increase the timeout to increase the load time.
// Useful for testing the loader.
// const HomeView = lazy(() => {
//   return Promise.all([
//     import(/* webpackChunkName: "home" */"./views/Home/Home.js"),
//     new Promise(resolve => setTimeout(resolve, 300))
//   ])
//   .then(([moduleExports]) => moduleExports);
// });
const ArticleView = lazy(() => import(/* webpackChunkName: "article" */"./views/Article/Article.js"));
const ComponentsDemoView = lazy(() => import(/* webpackChunkName: "demo" */"./views/ComponentsDemo/ComponentsDemo.js"));

function App() {
  const theme = createMuiTheme({
    palette: {
      type: 'dark',
      primary: red,
      secondary: cyan,
      background: {
        default: SecStyle.backgroundColor,
        paper: SecStyle.backgroundColor,
      },
    },
    text: {
      //change these to values in variables.scss when webpack is set up
      primary: "black",
      secondary: "red",
      tertiary: "cyan",
      quaternary: "white"
    },
  })
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <div className="App">
        <Suspense fallback={<div>Loading...</div>}>
          <Header></Header>
          <Suspense fallback={<Loader/>}>
            <Switch>
              <Route exact path="/">
                <HomeView />
              </Route>
              <Route path="/slp">
                <ArticleView source="slp.md" title="Semester Long Project" />
              </Route>
              <Route path="/about">
                <ArticleView source="about.md" title="About" />
              </Route>
              <Route path="/team">
                <ArticleView source="team.md" title="Team" />
              </Route>
              <Route path="/contact">
                <ArticleView source="contact.md" title="Contact" />
              </Route>
              <Route path="/resources">
                <ArticleView source="resources.md" title="Resources" />
              </Route>
              <Route path="/git-cheatsheet">
                <ArticleView source="git-cheatsheet.md" title="Git Cheatsheet"/>
              </Route>
              <Route path="/event/pair-programming-2020">
                <ArticleView source="events/2020-pair-programming.md" title="Pair Programming 2020"/>
              </Route>
              <Route path="/dev-readme">
                <ArticleView source="README.md" title="README"/>
              </Route>
              <Route path="/dev/components">
                <ComponentsDemoView />
              </Route>
              <Route>
                <NotFoundView/>
              </Route>
            </Switch>
          </Suspense>
          <Footer/>
        </Suspense>
        </div>
      </ThemeProvider>
    </Router>
  )
}
export default App
