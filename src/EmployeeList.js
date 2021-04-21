import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: "100vh",
  },
});

const getUsers = (page, rowsPerPage, setUsers) => {
  axios.get("/get_user_list", { params: { page, rowsPerPage } }).then((res) => {
    setUsers(res.data.results);
  });
};

export default function EmployeeList({ setSelectedUser }) {
  const [users, setUsers] = useState([]);
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    getUsers(page + 1, rowsPerPage, setUsers);
  }, [page, rowsPerPage]);
  //I don't remember why we have setUsers above.  Is this evoking the setUsers and setting what getUsers retrieves and puts it as
  // the users.  Also why did we need the [page, rowsPerPage] there again?

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align={"left"} style={{ minWidth: 170 }}>
                Name
              </TableCell>
              <TableCell align={"left"} style={{ minWidth: 170 }}>
                Email
              </TableCell>
              <TableCell align={"left"} style={{ minWidth: 170 }}>
                City
              </TableCell>
              <TableCell align={"left"} style={{ minWidth: 170 }}>
                Country
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => {
              return (
                <TableRow
                  hover
                  role="checkbox"
                  tabIndex={-1}
                  key={user.email}
                  onClick={() => setSelectedUser(user)}
                >
                  <TableCell align={"left"} style={{ minWidth: 170 }}>
                    {user.name.first} {user.name.last}
                  </TableCell>
                  <TableCell align={"left"} style={{ minWidth: 170 }}>
                    {user.email}
                  </TableCell>
                  <TableCell align={"left"} style={{ minWidth: 170 }}>
                    {user.location.city}
                  </TableCell>
                  <TableCell align={"left"} style={{ minWidth: 170 }}>
                    {user.location.country}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={7000}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
