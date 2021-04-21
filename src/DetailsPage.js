import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 800,
    margin: 50,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },

  avatar: {
    backgroundColor: red[500],
    width: 60,
    height: 60,
  },
}));

export default function DetailPage({ selectedUser, goBack }) {
  console.log("selected user", selectedUser);

  const classes = useStyles();
  const { name, location, email, dob, phone, picture } = selectedUser;
  const { city, country, street, postcode, state } = location;

  const date = new Date(dob.date);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();

  return (
    <Card className={classes.root}>
      <IconButton onClick={goBack}>
        <ArrowBackIcon fontSize="medium" />
      </IconButton>

      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={picture.medium}
          ></Avatar>
        }
        title={name.title + " " + name.first + " " + name.last}
        subheader={email}
      />

      <CardContent>
        <div>
          <List>
            <ListItem>
              <ListItemText secondary="Phone:" />
              <ListItemText secondary={phone} />
            </ListItem>
            <ListItem>
              <ListItemText secondary="Location:" />
              <ListItemText
                secondary={
                  street.number +
                  " " +
                  street.name +
                  " " +
                  city +
                  " " +
                  state +
                  " " +
                  country +
                  " " +
                  postcode
                }
              />
            </ListItem>
            <ListItem>
              <ListItemText secondary="Date of Birth:" />
              <ListItemText secondary={month + "/" + day + "/" + year} />
            </ListItem>
          </List>
        </div>
      </CardContent>
    </Card>
  );
}
