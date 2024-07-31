import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 1,
  p: 4,
};

export default function CreatePost() {
  const [open, setOpen] = React.useState(false);
  const [heading, setHeading] = React.useState("");
  const [content, setContent] = React.useState("");

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let docRef;
    try {
      docRef = await addDoc(collection(db, "blogs"), {
        heading: heading,
        content: content,
        likes: 0,
      }).then((res) => {
        console.log("data added successfully: " + res + " --- " + docRef.id);
      });
    } catch (error) {
      console.log("error adding blog: " + error);
    }
    setHeading("");
    setContent("");
    handleClose();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Create Blog
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a New Blog
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Heading"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              margin="normal"
              multiline
              rows={4}
              required
            />
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
