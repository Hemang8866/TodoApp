import React, { useState } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteOutlineTwoToneIcon from "@mui/icons-material/DeleteOutlineTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import Avatar from "@mui/material/Avatar";
import { blue } from "@mui/material/colors";

export default function ItemList({ item, id, listId, removeItem, editItem }) {
  return (
    <>
      <ListItem
        key={id}
        secondaryAction={
          <>
            <IconButton
              edge="end"
              sx={{ mx: 1 }}
              onClick={() => {
                editItem(id);
              }}
            >
              <EditTwoToneIcon sx={{ color: blue[800] }} />
            </IconButton>
            <IconButton
              edge="end"
              sx={{ mx: 1 }}
              onClick={() => {
                removeItem(id);
              }}
            >
              <DeleteOutlineTwoToneIcon sx={{ color: blue[800] }} />
            </IconButton>
          </>
        }
        sx={{ bgcolor: blue[100], my: 2, p: 2 }}
      >
        <Avatar sx={{ bgcolor: blue[800], mx: 2 }}>{listId + 1}</Avatar>

        <ListItemText primary={item} sx={{ color: blue[800] }} />
      </ListItem>
    </>
  );
}
