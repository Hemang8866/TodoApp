import React, { useState } from "react";
import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  List,
  Alert,
  Typography,
  Snackbar,
} from "@mui/material/";
import ItemList from "./ItemList";
import AddBoxIcon from "@mui/icons-material/AddBox";
import EditIcon from "@mui/icons-material/Edit";
import { blue } from "@mui/material/colors";

export default function Todo() {
  //5 states one for the textfield item, second empty array for adding item, boolean empty state, togglebtn state for toggling the edit and add button, isEditID for getting particular edit item id
  const [item, setItem] = useState("");
  const [list, setList] = useState([]); // we store the items in objects {id, name}
  const [empty, setEmpty] = useState();
  const [open, setOpen] = useState({
    show: false,
    vertical: "",
    horizontal: "",
  });
  const [toggleAddBtn, setToggleAddBtn] = useState(true);
  const [isEditID, setIsEditID] = useState(null);

  const { vertical, horizontal, show } = open;

  function handleClose(event, reason) {
    if (reason === "clickaway") {
      return;
    }
    setOpen({ show: false, vertical: "", horizontal: "" });
  }

  function addItem() {
    //on button click addItem function will check for empty field, if empty will return the alert
    if (!item) {
      setEmpty(true);
      setOpen({ show: true, vertical: "bottom", horizontal: "center" });

      //else if item is filled and toggle btn is currently set to edit, then it will map only those items where original item id and particular id is same
    } else if (item && !toggleAddBtn) {
      setList(
        list.map((elm) => {
          if (elm.id === isEditID) {
            return { ...elm, name: item };
          }
          return elm;
        })
      );

      //after edit button is clicked we reset the toggle to add button
      setToggleAddBtn(true);

      //texfield gets empty
      setItem("");

      //we don't need editID either
      setIsEditID(null);

      //else we will add the data by random id and with the fetched name
    } else {
      let data = { id: new Date().getTime().toString(), name: item };
      setList([...list, data]);
      setEmpty(false);
      setOpen({show: false, vertical: "", horizontal: ""});
      setItem("");
    }
  }
  function removeItem(id) {
    // console.log(id);
    //filtering the list by removing the selected id comparing with other list ids
    let updatedList = list.filter((elem) => {
      return id !== elem.id;
    });

    setList(updatedList);
  }

  function editItem(id) {
    // console.log(id);

    //firstly, find the item where selected id and original list id is same
    let newEditItem = list.find((elm) => {
      return elm.id === id;
    });

    // console.log(newEditItem);

    //making toggle add button falsy
    setToggleAddBtn(false);

    //set the textfield to selected item's name
    setItem(newEditItem.name);

    //set isEditID to selected edit id
    setIsEditID(id);
  }

  return (
    <div>
      <Container maxWidth="md">
        <Box sx={{ bgcolor: blue[100] }} p={3}>
          <Grid
            container
            spacing={3}
            columnSpacing={1}
            direction="row"
            justifyContent="space-around"
            alignItems="center"
            mx="auto"
          >
            <Typography
              variant="h3"
              sx={{ fontWeight: "bold", color: blue[700], mt: 2 }}
              flexGrow={1}
            >
              TodoList
            </Typography>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label="Enter item"
                type="text"
                fullWidth
                value={item}
                color="primary"
                id="fullWidth"
                size="small"
                onChange={(e) => setItem(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2}>
              {toggleAddBtn ? (
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={addItem}
                  disableElevation
                  startIcon={<AddBoxIcon />}
                  sx={{ mx: 3 }}
                >
                  Add
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  size="medium"
                  onClick={addItem}
                  disableElevation
                  startIcon={<EditIcon />}
                  sx={{ mx: 3 }}
                >
                  Edit
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      </Container>
      {empty && open.show && (
        <Box>
          <Snackbar
            open={open.show}
            anchorOrigin={{ vertical, horizontal }}
            key={open.vertical + open.horizontal}
            autoHideDuration={2000}
            onClose={handleClose}
          >
            <Alert
              severity="warning"
              sx={{ justifyContent: "center", width: "100%" }}
              onClose={handleClose}
            >
              Please enter a item!
            </Alert>
          </Snackbar>
        </Box>
      )}
      <Container maxWidth="xs">
        <List>
          {list.map((itm, k) => {
            return (
              <ItemList
                item={itm.name}
                listId={k}
                id={itm.id}
                removeItem={removeItem}
                editItem={editItem}
              />
            );
          })}
        </List>
      </Container>
    </div>
  );
}
