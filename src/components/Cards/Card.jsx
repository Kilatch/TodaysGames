import React, { Component } from "react";
import ZoomIn from "@material-ui/icons/ZoomIn";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  title: {
    fontSize: "20px",
  },
});

class Card extends Component {
  state = {
    blur: "blur(2px)",
  };

  onMouseOver() {
    this.setState({ blur: "blur(0px)" });
  }

  onMouseOut() {
    this.setState({ blur: "blur(2px)" });
  }

  render() {
    const { game, classes } = this.props;
    return (
      <GridListTileBar
        onMouseOver={this.onMouseOver.bind(this)}
        onMouseOut={this.onMouseOut.bind(this)}
        style={{ filter: this.state.blur }}
        classes={{
          title: classes.title,
        }}
        title={game.name}
        actionIcon={
          <IconButton
            onClick={() => this.props.handleOpen(game.background_image)}
          >
            <ZoomIn color="primary" />
          </IconButton>
        }
      />
    );
  }
}
export default withStyles(styles, { withTheme: true })(Card);
