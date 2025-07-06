import { alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";

export { ThemeProvider };

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    paddingLeft: "8px",
    // padding: theme.spacing(1, 1, 1, 0),
    // paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "60%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: "auto",
  color: theme.palette.text.secondary,
  height: 25,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  // lineHeight: "5px",
  marginTop: "10px",
}));

export const darkTheme = createTheme({ palette: { mode: "dark" } });
export const lightTheme = createTheme({ palette: { mode: "light" } });
