import React, { Component, useState } from "react";
import PropTypes from "prop-types";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import Dialog from "@material-ui/core/Dialog";
import FlatButton from "@material-ui/core/Button";
import DialogActions from "@material-ui/core/DialogActions";
import Card from "./Card";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  image: {
    left: "50%",
    position: "relative",
    // width: "300%",
    height: "100%",
    transform: "translate(-50%)",
  },
});

const Task = (props) => {
  const [blur, setBlur] = useState(2);

  function onMouseOver() {
    setBlur(0);
  }

  function onMouseOut() {
    setBlur(2);
  }

  const { game } = props;
  const classes = useStyles();
  return (
    <div style={{ filter: `blur(${blur}px)` }}>
      <img
        className={classes.image}
        // className="MuiGridListTile-imgFullHeight"
        src={game.background_image}
        alt={game.slug}
        onMouseOver={onMouseOver.bind(this)}
        onMouseOut={onMouseOut.bind(this)}
      />
    </div>
  );
};

class Cards extends Component {
  state = {
    open: false,
    currentImg: "",
  };
  handleOpen = (img) => {
    this.setState({ open: true, currentImg: img });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    let gamesListContent;
    const { games } = this.props;

    if (games) {
      let col = 4;
      if (games.length >= 4) {
        col = 4;
      } else {
        col = games.length;
      }
      gamesListContent = (
        <GridList cellHeight={600} cols={col} spacing={1}>
          {games.map((game) => (
            <GridListTile key={game.id} title={game.slug}>
              <img src={game.background_image} alt={game.slug} />
              {/* {<Task game={game} />} */}
              <Card handleOpen={this.handleOpen.bind(this)} game={game} />
            </GridListTile>
          ))}
        </GridList>
      );
    } else {
      gamesListContent = null;
    }
    return (
      <div>
        {gamesListContent}
        <Dialog maxWidth="md" open={this.state.open} onClose={this.handleClose}>
          <img src={this.state.currentImg} alt="" style={{ width: "100%" }} />
          <DialogActions>
            <FlatButton autoFocus color="primary" onClick={this.handleClose}>
              Close
            </FlatButton>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

Cards.propTypes = {
  games: PropTypes.array.isRequired,
};
export default Cards;
