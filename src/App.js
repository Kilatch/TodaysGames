import React from "react";
import { Header, Pagination } from "./components";

class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Pagination />
      </div>
    );
  }
}

export default App;
