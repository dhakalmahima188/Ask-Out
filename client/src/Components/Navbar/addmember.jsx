import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Add from "@material-ui/icons/Add";
import httpClient from "../../Utils/httpClient";

export default function AlertDialog(props) {
  const [open, setOpen] = useState(false);
  const [inputList, setInputList] = useState([{ email: "" }]);

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
    console.log(inputList);
  };
  const handleAddClick = () => {
    setInputList([...inputList, { email: "" }]);
  };

  const handleClickOpen = (e) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleSend = (e) => {
    e.preventDefault();
    httpClient
      .POST(
        "workspace/add",
        {
          email: inputList.map(({ email }) => email),
          name: props.workspace,
        },
        {}
      )
      .then((response) => {
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setOpen(false);
      });
  };
  return (
    <>
      <Button onClick={handleClickOpen}> Add Members</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <>
              <div className="workspace-email">
                <div className="workspace-inputs">
                  {inputList.map((x, i) => {
                    return (
                      <>
                        {" "}
                        <div className="login_inputField">
                          <input
                            name="email"
                            placeholder="Enter email"
                            variant="filled"
                            value={x.email}
                            onChange={(e) => handleInputChange(e, i)}
                            autocomplete="off"
                          />
                        </div>
                        {inputList.length - 1 === i && (
                          <button
                            className="workspace-add"
                            onClick={handleAddClick}
                          >
                            {" "}
                            Add
                            <Add />
                          </button>
                        )}
                      </>
                    );
                  })}
                </div>
              </div>
            </>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Cancel
          </Button>
          <Button onClick={handleSend} color="primary">
            Send Link
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
