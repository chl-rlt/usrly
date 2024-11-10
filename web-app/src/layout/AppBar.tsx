import { AppBar, Logout, UserMenu, useLogout, useUserMenu } from "react-admin";
import SettingsIcon from "@mui/icons-material/Settings";
import { currentUserId } from "../utils";
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const userId = currentUserId();
  // @ts-ignore
  const { onClose } = useUserMenu();
  const navigate = useNavigate();

  const goToProfilePage = () => {
    navigate(`/users/${userId}`);
    onClose();
  };
  return (
    <MenuItem onClick={goToProfilePage}>
      <ListItemIcon>
        <SettingsIcon fontSize="small" />
      </ListItemIcon>
      <ListItemText>Profile</ListItemText>
    </MenuItem>
  );
};

const CustomUserMenu = () => {
  const logout = useLogout();
  const handleClick = () => {
    void logout();
  };
  return (
    <UserMenu>
      <UserProfile />
      <Logout onClick={handleClick} />
    </UserMenu>
  );
};

const CustomAppBar = () => {
  return (
    <AppBar
      color="primary"
      elevation={1}
      userMenu={<CustomUserMenu />}
    ></AppBar>
  );
};

export default CustomAppBar;
