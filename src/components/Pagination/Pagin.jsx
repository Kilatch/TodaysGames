import React, { Component } from "react";
import Pagination from "@material-ui/lab/Pagination";
import { Cards } from "../index";
import { fetchData } from "../index";
class Pagin extends Component {
  state = {
    amount: 5,
    page: 1,
    count: 0,
    url: `https://api.rawg.io/api/games?`,
    currentDate: new Date().toISOString().substring(0, 10),
    games: [],
  };

  handleChange = (event, value) => {
    this.setState({ page: value }, async () => {
      let data = await fetchData(this.state.page, this.state.currentDate);
      if (data) {
        this.setState({ games: data.results });
      } else {
        this.setState({ games: [] });
      }
    });
  };

  async componentDidMount() {
    this.lookYesterdaysGames(this.state.currentDate, new Date());
  }

  async lookYesterdaysGames(date, todayI) {
    let data = await fetchData(this.state.page, date);

    if (data.count > 0) {
      this.setState({ games: data.results, currentDate: date });
      return;
    } else {
      let today = new Date(todayI);
      let yesterday = new Date(today);
      yesterday.setDate(yesterday.getDate() - 1);
      this.lookYesterdaysGames(
        yesterday.toISOString().substring(0, 10),
        yesterday
      );
    }
  }

  render() {
    const { games } = this.state;
    return (
      <div>
        {games.length > 0 ? <Cards games={games} /> : null}
        <div
          style={{
            position: "absolute",
            left: "50%",
            transform: "translate(-50%)",
          }}
        >
          <Pagination
            size="large"
            count={10}
            page={this.state.page}
            onChange={this.handleChange}
          />
        </div>
      </div>
    );
  }
}

export default Pagin;
