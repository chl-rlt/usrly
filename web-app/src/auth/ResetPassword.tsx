import {
  Avatar,
  Box,
  Card,
  FormControl,
  InputLabel,
  OutlinedInput,
  IconButton,
  InputAdornment,
  Button,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useParams } from "react-router-dom";

import React from "react";
import { httpClient } from "../dataProviders/httpClient";
import { jwtDecode } from "jwt-decode";
import { useNotify, useRedirect } from "react-admin";
import { validatePassword } from "../users/UserForm";
export default function ResetPassword() {
  const redirect = useRedirect();
  const [showPassword, setShowPassword] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const { token } = useParams();
  const { id } = jwtDecode(token || "") as { id: string };
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const notify = useNotify();
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleClick = async () => {
    await httpClient(`/v1/auth/reset-password`, {
      method: "POST",
      body: JSON.stringify({ id, password }),
    });
    notify(`Password changed`, { type: "success" });
    redirect("/login");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        height: "1px",
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundImage:
          "radial-gradient(circle at 50% 14em, #313264 0%, #00023b 60%, #00023b 100%)",
      }}
    >
      <Card sx={{ minWidth: 300, marginTop: "6em" }}>
        <div
          style={{ margin: "1em", display: "flex", justifyContent: "center" }}
        >
          <Avatar sx={{ bgcolor: "primary.main" }}>
            <LockIcon />
          </Avatar>
        </div>
        <div
          style={{
            margin: "1em",
            display: "flex",

            flexDirection: "column",
          }}
        >
          <FormControl sx={{ m: "1em", width: "90%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              New password
            </InputLabel>
            <OutlinedInput
              required
              value={password}
              error={validatePassword(password) !== undefined}
              onChange={(e) => setPassword(e.target.value)}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <p style={{ color: "red", fontSize: "0.8em", width: "20em" }}>
              {validatePassword(password)}
            </p>
          </FormControl>
          <FormControl sx={{ mx: "1em", width: "90%" }} variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">
              Confirm password
            </InputLabel>
            <OutlinedInput
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              required
              error={password !== confirmPassword}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label={
                      showPassword
                        ? "hide the password"
                        : "display the password"
                    }
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
              label="Password"
            />
            <p style={{ color: "red", fontSize: "0.8em", width: "20em" }}>
              {password !== confirmPassword && "Passwords do not match"}
            </p>
          </FormControl>
          <Button
            sx={{ width: "100%", marginTop: "2em" }}
            variant="contained"
            onClick={handleClick}
            disabled={
              password !== confirmPassword ||
              validatePassword(password) !== undefined
            }
          >
            Reset password
          </Button>
        </div>
      </Card>
    </Box>
  );
}
