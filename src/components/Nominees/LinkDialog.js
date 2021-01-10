import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const options = [
  "None",
  "Atria",
  "Callisto",
  "Dione",
  "Ganymede",
  "Hangouts Call",
  "Luna",
  "Oberon",
  "Phobos",
  "Pyxis",
  "Sedna",
  "Titania",
  "Triton",
  "Umbriel",
];

function DialogRaw(props) {
  const { onClose, value, open } = props;

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    onClose(value);
  };

  return (
    <Dialog
      disableEscapeKeyDown
      maxWidth="xl"
      aria-labelledby="Shareable Link"
      open={open}
    >
      <DialogTitle id="Shareable Link">Shareable Link</DialogTitle>
      <DialogContent dividers>
        <p>{value}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button autoFocus onClick={handleOk} color="primary">
          Copy
        </Button>
      </DialogActions>
    </Dialog>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    // width: "100%",
    // maxWidth: 360,
    // backgroundColor: theme.palette.background.paper,
  },
  paper: {
    // width: "80%",
    // maxHeight: 435,
  },
}));

export default function LinkDialog(props) {
  const classes = useStyles();
  const { nominees } = props;
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("Dione");

  const generateLink = () => {
    console.log(nominees);
    return `${process.env.REACT_APP_URL}?shared=true&${nominees
      .map((nominee) => `nominees[]=${nominee.imdbID}&`)
      .join("")}`;
  };

  const handleOpen = () => {
    setValue(generateLink());
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <Button onClick={handleOpen}>Generate Shareable Link</Button>
      <DialogRaw
        classes={{
          paper: classes.paper,
        }}
        id="ringtone-menu"
        keepMounted
        open={open}
        onClose={handleClose}
        value={value}
        generateLink={generateLink}
      />
    </div>
  );
}
