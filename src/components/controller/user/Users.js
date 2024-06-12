import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { getToken } from "../../service/Storage.service";
import { ToastContainer, toast } from "react-toastify";
import Grid from "@mui/material/Grid";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const columns = [
  { id: "id", label: "S.no.", minWidth: 170 },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 100 },
  {
    id: "mobile",
    label: "Mobile No.",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "address",
    label: "Address",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "gender",
    label: "Gender",
    minWidth: 170,
    align: "right",
    // format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: "status",
    label: "Status",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "assign_to",
    label: "Assigned User",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
];
const defaultTheme = createTheme();

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

// const rows = [
//   createData("India", "IN", 1324171354, 3287263),
//   createData("China", "CN", 1403500365, 9596961),
//   createData("Italy", "IT", 60483973, 301340),
//   createData("United States", "US", 327167434, 9833520),
//   createData("Canada", "CA", 37602103, 9984670),
//   createData("Australia", "AU", 25475400, 7692024),
//   createData("Germany", "DE", 83019200, 357578),
//   createData("Ireland", "IE", 4857000, 70273),
//   createData("Mexico", "MX", 126577691, 1972550),
//   createData("Japan", "JP", 126317000, 377973),
//   createData("France", "FR", 67022000, 640679),
//   createData("United Kingdom", "GB", 67545757, 242495),
//   createData("Russia", "RU", 146793744, 17098246),
//   createData("Nigeria", "NG", 200962417, 923768),
//   createData("Brazil", "BR", 210147125, 8515767),
// ];

export default function Users() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [users, setUsers] = React.useState([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await fetch(
          `http://localhost:3018/user_list?limit=${rowsPerPage}&page=${page}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        const data = await response.json();
        if (!response.status === 200) {
          toast(data.msg);
        }
        let count = 1;
        const customArray = data.data.map((user, index) => ({
          id: index + 1,
          name: user.name,
          email: user.email_id,
          mobile: user.mobile_no,
          address: user.address,
          gender: user.gender ? "Male" : "Female",
          status: user.status ? "Active" : "Inactive",
          assign_to: user.assignToUser?.name,
        }));

        setUsers(customArray);
      } catch (error) {
        toast("Error fetching in user.");
      } finally {
        // toast("Error fetching in user1."); // Ensure the progress is set to 100 when loading is complete
      }
    };

    fetchRoles();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {users
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={row.code}
                      >
                        {columns.map((column) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === "number"
                                ? column.format(value)
                                : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <ToastContainer />
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 100]}
            component="div"
            count={users.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Grid>
    </ThemeProvider>
  );
}
