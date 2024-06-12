import React, { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "../../service/Storage.service";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
// const notify = () => toast("Wow so easy!");

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function Signup() {
  const [selectedRole, setSelectedRole] = useState("");
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Using fetch to get roles
    let timer;

    const fetchRoles = async () => {
      setLoading(true);
      setProgress(0);

      timer = setInterval(() => {
        setProgress((prevProgress) =>
          prevProgress >= 100 ? 100 : prevProgress + 10
        );
      }, 800);

      try {
        const response = await fetch("http://localhost:3018/roles_list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getToken()}`,
          },
        });
        const data = await response.json();
        if (!response.status === 200) {
          throw new Error("Role not found");
        }
        setTimeout(() => {
        setRoles(data.data);
      },1000);
        setLoading(false);
        clearInterval(timer);
        setProgress(100);
      } catch (error) {
        setError(error.message);
        setLoading(false);

        clearInterval(timer);
        setProgress(100);
      } finally {
        setLoading(false);
        clearInterval(timer);
        setProgress(100); // Ensure the progress is set to 100 when loading is complete
      }
    };

    fetchRoles();

    return () => {
      clearInterval(timer);
    };
  }, []);

  // console.log(roles, "roles");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    // console.log("value", value);
    setSelectedRole(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get("email"),
    //   password: data.get("password"),
    // });
    let email_id = data.get("email");
    let password = data.get("password");
    let name = data.get("name");
    let mobile_no = data.get("contact");
    let role_id = data.get("role_id");
    try {
      const response = await fetch("http://localhost:3018/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify({ email_id, password, name, mobile_no, role_id }),
      });
      // console.log(response, "data");
      const data = await response.json();
      // console.log("here before success", response.status);
      if (response.status === 201) {
        toast("Registration successfull.");
      } else {
        // console.log("here");
        toast(data.msg);
      }
    } catch (error) {
      toast("An error occurred. Please try again.");
      // setError("An error occurred. Please try again.");
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage:
              "url(https://source.unsplash.com/random?wallpapers)",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign Up
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required={true}
                fullWidth
                id="name"
                label="Full Name"
                name="name"
                autoComplete="name"
                autoFocus
                data-testid="name"
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="contact"
                label="Contact No."
                name="contact"
                autoComplete="contact"
                inputProps={{ minLength: 5, maxLength: 10 }}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <Select
                id="role_id"
                name="role_id"
                data-testid="selectbox"
                label="Select Role"
                value={selectedRole}
                onChange={handleChange}
                fullWidth
              >
                <MenuItem value=""  data-testid="selectoption"> 
                  <em>Select Role</em>
                </MenuItem>
                {roles.length &&
                  roles.map((role) => (
                    <MenuItem
                      data-testid="selectoption"
                      key={role.id}
                      value={role.id}
                    >
                      {role.name}
                    </MenuItem>
                  ))}
              </Select>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <ToastContainer />
              {loading && (
                <CircularProgress variant="determinate" value={progress} />
              )}

              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item xs>
                  <Link href="/signin" variant="body2">
                    {"Already have an account? Sign In"}
                  </Link>
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
