import { ChromePicker } from "@hello-pangea/color-picker";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled, useTheme } from "@mui/material/styles";
import * as React from "react";
import { useState } from "react";
import DraggableColorBox from "./DraggableColorBox";

const drawerWidth = 400;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
	({ theme, open }) => ({
		flexGrow: 1,
		height: "calc(100vh - 64px)",
		padding: theme.spacing(3),
		transition: theme.transitions.create("margin", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		marginLeft: `-${drawerWidth}px`,
		...(open && {
			transition: theme.transitions.create("margin", {
				easing: theme.transitions.easing.easeOut,
				duration: theme.transitions.duration.enteringScreen,
			}),
			marginLeft: 0,
		}),
	})
);

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
	transition: theme.transitions.create(["margin", "width"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: `${drawerWidth}px`,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
	display: "flex",
	alignItems: "center",
	padding: theme.spacing(0, 1),
	// necessary for content to be below app bar
	...theme.mixins.toolbar,
	justifyContent: "flex-end",
}));

export default function NewPaletteForm() {
	const theme = useTheme();
	const [open, setOpen] = React.useState(false);

	const [currentColor, setCurrentColor] = useState("tomato");
	const [colors, setColors] = useState(["teal", "#ece324"]);

	const handleDrawerOpen = () => {
		setOpen(true);
	};

	const handleDrawerClose = () => {
		setOpen(false);
	};

	const updateCurrentColor = (newColor) => {
		setCurrentColor(newColor.hex);
	};

	const addNewColor = () => {
		setColors((Colors) => [...Colors, currentColor]);
		console.log(colors);
	};

	return (
		<Box sx={{ display: "flex" }}>
			<CssBaseline />
			<AppBar position="fixed" open={open}>
				<Toolbar>
					<IconButton
						color="inherit"
						aria-label="open drawer"
						onClick={handleDrawerOpen}
						edge="start"
						sx={{ mr: 2, ...(open && { display: "none" }) }}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap component="div">
						Persistent drawer
					</Typography>
				</Toolbar>
			</AppBar>
			<Drawer
				sx={{
					width: drawerWidth,
					flexShrink: 0,
					"& .MuiDrawer-paper": {
						width: drawerWidth,
						boxSizing: "border-box",
					},
				}}
				variant="persistent"
				anchor="left"
				open={open}
			>
				<DrawerHeader>
					<IconButton onClick={handleDrawerClose}>
						{theme.direction === "ltr" ? (
							<ChevronLeftIcon />
						) : (
							<ChevronRightIcon />
						)}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<Typography variant="h4">Design Your Palette</Typography>
				<div>
					<Button variant="contained" color="secondary">
						Clear Palette
					</Button>
					<Button variant="contained" color="primary">
						Random Color
					</Button>
				</div>
				<ChromePicker
					color={currentColor}
					onChangeComplete={(color) => updateCurrentColor(color)}
				/>
				<Button
					variant="contained"
					sx={{ bgcolor: currentColor }}
					onClick={addNewColor}
				>
					Add Color
				</Button>
			</Drawer>
			<Main open={open}>
				<DrawerHeader />

				{colors.map((color) => {
					return <DraggableColorBox color={color} />;
				})}
			</Main>
		</Box>
	);
}
