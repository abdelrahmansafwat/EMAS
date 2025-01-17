import React, { useState } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Brightness6Icon from "@material-ui/icons/Brightness6";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import DataGrid from "mui-datatables";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import RefreshIcon from "@material-ui/icons/Refresh";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Chip from "@material-ui/core/Chip";
import Checkbox from "@material-ui/core/Checkbox";
import history from "./history";
import Add from "./Add";
import Update from "./Update";
import CloseIcon from "@material-ui/icons/Close";
import GavelIcon from "@material-ui/icons/Gavel";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/core";
import { createMuiTheme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useForm, Controller } from "react-hook-form";
const axios = require("axios");

const light = {
  palette: {
    type: "light",
  },
};

const dark = {
  palette: {
    type: "dark",
  },
};

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="http://www.eelu.edu.eg/">
        National Egyptian E-Learning University
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const drawerWidth = 250;

export default function Dashboard() {
  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    toolbar: {
      paddingRight: 24,
    },
    toolbarIcon: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: "0 8px",
      ...theme.mixins.toolbar,
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    menuButtonHidden: {
      display: "none",
    },
    title: {
      flexGrow: 1,
    },
    drawerPaper: {
      position: "relative",
      whiteSpace: "nowrap",
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerPaperClose: {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    },
    appBarSpacer: theme.mixins.toolbar,
    viewDialog: {
      top: "10%",
    },
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
    },
    container: {
      paddingTop: theme.spacing(4),
      paddingBottom: theme.spacing(4),
    },
    paper: {
      padding: theme.spacing(2),
      display: "flex",
      overflow: "hidden",
      flexDirection: "column",
      height: "75vh",
    },
    fixedHeight: {
      height: 240,
    },
    dflex: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    paperChips: {
      display: "flex",
      justifyContent: "center",
      flexWrap: "wrap",
      listStyle: "none",
      padding: theme.spacing(0.5),
      margin: 0,
    },
    chip: {
      margin: theme.spacing(0.5),
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [privilege, setPrivilege] = useState(5);
  const [errorMessage, setErrorMessage] = useState("");
  const [decisions, setDecisions] = useState([]);
  const [authError, setAuthError] = useState(false);
  const [viewDialog, setViewDialog] = useState(false);
  const [updateDialog, setUpdateDialog] = useState(false);
  const [varsDialog, setVarsDialog] = useState(false);
  const [constructorHasRun, setConstructorHasRun] = useState(false);
  const [currentDecision, setCurrentDecision] = useState({});
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [issuedBy, setIssuedBy] = useState("");
  const [date, setDate] = useState(new Date());
  const [tags, setTags] = useState([]);
  const [issuers, setIssuers] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedIssuers, setSelectedIssuers] = useState([]);
  const [titleError, setTitleError] = useState(false);
  const [summaryError, setSummaryError] = useState(false);
  const [issuedByError, setIssuedByError] = useState(false);
  const [tagsError, setTagsError] = useState(false);
  const [addOrUpdate, setAddOrUpdate] = useState("Add");
  const [image, setImage] = useState({});
  const [imageName, setImageName] = useState("");
  const [imageError, setImageError] = useState(false);
  const [lightTheme, setLightTheme] = useState(true);
  const [newTagOrIssuer, setNewTagOrIssuer] = useState("");
  const [selectedNewTagOrIssuer, setSelectedNewTagOrIssuer] = useState("");
  const [ready, setReady] = useState(true);
  const [updateProgress, setUpdateProgress] = useState(false);
  const [administration, setAdministration] = useState(false);
  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState("First");
  const [lastName, setLastName] = useState("Last");
  const [email, setEmail] = useState("Email");
  const [userPrivilege, setUserPrivilege] = useState("");
  const [userDialog, setUserDialog] = useState(false);
  const [userId, setUserId] = useState("");
  const [decisionId, setDecisionId] = useState("");
  const [boardDialog, setBoardDialog] = useState("");
  const [boardSubject, setBoardSubject] = useState("");
  const [boardDecision, setBoardDecision] = useState("");
  const [boardDepartment, setBoardDepartment] = useState("");
  const [boardStatus, setBoardStatus] = useState("");
  const [boardDate, setBoardDate] = useState("");
  const [board, setBoard] = useState(false);
  const [boardDecisions, setBoardDecisions] = useState(false);
  const [currentBoardDecision, setCurrentBoardDecision] = useState([]);
  const [boardDecisionId, setBoardDecisionId] = useState("");
  const [boardViewDialog, setBoardViewDialog] = useState(false);
  const [selectedRemoveTagOrIssuer, setSelectedRemoveTagOrIssuer] = useState(
    ""
  );
  const [varsDeleteDialog, setVarsDeleteDialog] = useState(false);
  const [updateBoardDialog, setUpdateBoardDialog] = useState(false);
  const { control } = useForm();

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };

  const appliedTheme = createMuiTheme(lightTheme ? light : dark);

  const filterModel = {
    items: [{ columnField: "title", operatorValue: "contains", value: "" }],
  };

  const baordDecisionsColumns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: false,
      },
    },
    {
      name: "firstName",
      label: "First Name",
      options: {
        filter: false,
      },
    },
    {
      name: "lastName",
      label: "Last Name",
      options: {
        filter: false,
      },
    },
    {
      name: "job",
      label: "Job",
    },
    {
      name: "management",
      label: "Management",
    },
    {
      name: "center",
      label: "Center",
    },
    {
      name: "contractStartDate",
      label: "Contract Start Date",
    },
    {
      name: "endServiceDate",
      label: "Contract End Date",
    },
    {
      name: "updateButton",
      label: "Update",
      options: {
        sort: false,
        searchable: false,
        filter: false,
        display: privilege > 1,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          //console.log(params.row.viewButton);

          const onClick = async () => {
            setCurrentDecision(decisions[dataIndex]);
            //setTitleError(false);
            //setSummaryError(false);
            //setTagsError(false);
            //setIssuedByError(false);
            setUpdateBoardDialog(true);
          };

          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() => onClick()}
              disabled={privilege < 2}
            >
              Update
            </Button>
          );
        },
      },
    },
    {
      name: "deleteButton",
      label: "Delete",
      options: {
        sort: false,
        searchable: false,
        filter: false,
        display: privilege > 1,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          //console.log(params.row.viewButton);
          //var index = params.row.id;

          const onClick = async () => {
            console.log("Viewing decision #" + dataIndex);
            var decision = decisions[dataIndex];
            var alldecisions = decisions;
            axios
              .post("/api/upload_employees/delete", {
                _id: decision._id,
              })
              .then(function (response) {
                console.log(response);
                console.log(alldecisions.length);
                alldecisions.splice(dataIndex, 1);
                console.log(alldecisions.length);
                setDecisions(alldecisions);
                //history.push("/dashboard");
              })
              .catch(function (error) {
                console.log(error);
                if (error) {
                  setErrorMessage("An error occured. Please try again.");
                  setAuthError(true);
                }
              });
          };

          return (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => onClick()}
              disabled={privilege < 2}
            >
              Delete
            </Button>
          );
        },
      },
    },
    {
      name: "viewButton",
      label: "View",
      options: {
        sort: false,
        searchable: false,
        filter: false,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          //console.log(params.row.viewButton);
          //var index = params.row.id;
          const onClick = async () => {
            setCurrentDecision(decisions[dataIndex]);
            //setTitleError(false);
            //setSummaryError(false);
            //setTagsError(false);
            //setIssuedByError(false);
            setUpdateBoardDialog(true);
          };

          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() => onClick()}
              disabled={privilege < 2}
            >
              Update
            </Button>
          );
        },
      },
    },
  ];

  const usersColumns = [
    {
      name: "id",
      label: "ID",
      options: {
        filter: false,
      },
    },
    {
      name: "firstName",
      label: "First Name",
      options: {
        filter: false,
      },
    },
    {
      name: "lastName",
      label: "Last Name",
      options: {
        filter: false,
      },
    },
    {
      name: "privilege",
      label: "Privilege",
    },
    {
      name: "updateButton",
      label: "Update",
      options: {
        sort: false,
        searchable: false,
        filter: false,
        display: privilege > 1,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          //console.log(params.row.viewButton);
          const onClick = async () => {
            setUserId(users[dataIndex]._id);
            setFirstName(users[dataIndex].firstName);
            setLastName(users[dataIndex].lastName);
            setEmail(users[dataIndex].email);
            setUserPrivilege(users[dataIndex].privilege);
            console.log(users[dataIndex]._id);
            setUserDialog(true);
          };

          return (
            <Button
              variant="contained"
              color="primary"
              onClick={() => onClick()}
              disabled={privilege < 2}
            >
              Update
            </Button>
          );
        },
      },
    },
    {
      name: "deleteButton",
      label: "Delete",
      options: {
        sort: false,
        searchable: false,
        filter: false,
        display: privilege > 1,
        customBodyRenderLite: (dataIndex, rowIndex) => {
          //console.log(params.row.viewButton);

          const onClick = async () => {
            console.log("Viewing decision #" + dataIndex);
            var user = users[dataIndex];
            var allusers = users;
            axios
              .post("/api/user/delete", {
                _id: user._id,
              })
              .then(function (response) {
                console.log(response);
                console.log(allusers.length);
                allusers.splice(dataIndex, 1);
                console.log(allusers.length);
                setUsers(allusers);
                //history.push("/dashboard");
              })
              .catch(function (error) {
                console.log(error);
                if (error) {
                  setErrorMessage("An error occured. Please try again.");
                  setAuthError(true);
                }
              });
          };

          return (
            <Button
              variant="contained"
              color="secondary"
              onClick={() => onClick()}
              disabled={privilege < 2}
            >
              Delete
            </Button>
          );
        },
      },
    },
  ];

  const getAllDecisions = async () => {
    //console.log(history.location.state.privilege);
    setReady(false);
    if (privilege > 0) {
      axios.create({ baseURL: window.location.origin });
      await axios
        .get("/api/retrieve_employees/all")
        .then(function (response) {
          var patt = new RegExp("^999+$");
          var decisions = response.data.employees;
          decisions.forEach((value, index) => {
            if (patt.test(decisions.length.toString())) {
              decisions[index].id = (index + 1)
                .toString()
                .padStart((index + 1).toString().length + 1, "0");
            } else {
              decisions[index].id = (index + 1).toString().padStart(3, "0");
            }
            decisions[index].dateOfBirth = new Date(
              decisions[index].dateOfBirth
            ).toLocaleDateString();
            decisions[index].contractStartDate = new Date(
              decisions[index].contractStartDate
            ).toLocaleDateString();
            decisions[index].endServiceDate = new Date(
              decisions[index].endServiceDate
            ).toLocaleDateString();

            decisions[index].updateButton = (
              <Button variant="contained" color="primary">
                Update
              </Button>
            );
          });
          console.log(decisions);
          setDecisions(decisions);
        })
        .catch(function (error) {
          console.log(error);
          setAuthError(true);
          setErrorMessage("An error occured. Please try again.");
        });
    }
    setReady(true);
  };

  const getAllUsers = async () => {
    //console.log(history.location.state.privilege);
    setReady(false);
    await axios
      .get("/api/user/all")
      .then(function (response) {
        var users = response.data.users;
        users.forEach((value, index) => {
          users[index].id = index + 1;
          if (users[index].privilege === 0) {
            users[index].privilege = "None";
          } else if (users[index].privilege === 1) {
            users[index].privilege = "View";
          } else if (users[index].privilege === 2) {
            users[index].privilege = "View/Update";
          } else if (users[index].privilege === 3) {
            users[index].privilege = "Admin";
          }
        });
        console.log(users);
        setUsers(users);
      })
      .catch(function (error) {
        console.log(error);
        setAuthError(true);
        setErrorMessage("An error occured. Please try again.");
      });
    setReady(true);
  };

  const constructor = async () => {
    if (constructorHasRun) return;
    setConstructorHasRun(true);
    await getAllDecisions();
  };

  constructor();

  const handleTagsDelete = (chipToDelete) => () => {
    setSelectedTags((chips) => chips.filter((chip) => chip !== chipToDelete));
  };

  const handleIssuersDelete = (chipToDelete) => () => {
    setSelectedIssuers((chips) =>
      chips.filter((chip) => chip !== chipToDelete)
    );
  };

  return (
    <ThemeProvider theme={appliedTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="absolute"
          className={clsx(classes.appBar, open && classes.appBarShift)}
        >
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              className={clsx(
                classes.menuButton,
                open && classes.menuButtonHidden
              )}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              className={classes.title}
            >
              Dashboard
            </Typography>
            <IconButton
              color="inherit"
              onClick={() => setLightTheme(!lightTheme)}
            >
              <Brightness6Icon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          classes={{
            paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
          }}
          open={open}
        >
          <div className={classes.toolbarIcon}>
            <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <Divider />
          <List>
            <div>
              <ListItem
                button
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  if (administration) {
                    getAllUsers();
                  } else {
                    getAllDecisions();
                  }
                }}
              >
                <ListItemIcon>
                  <RefreshIcon />
                </ListItemIcon>
                <ListItemText primary="Refresh" />
              </ListItem>

              {privilege > 1 && (
                <ListItem
                  button
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    setBoardDialog(true);
                  }}
                >
                  <ListItemIcon>
                    <AddCircleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Add Employee" />
                </ListItem>
              )}
            </div>
          </List>
          <Divider />
          <List>
            <div>
              <ListItem
                button
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  var privilegeLevel = "";
                  if (history.location.state.privilege === 0) {
                    privilegeLevel = "None";
                  } else if (history.location.state.privilege === 1) {
                    privilegeLevel = "View";
                  } else if (history.location.state.privilege === 2) {
                    privilegeLevel = "View/Update";
                  } else if (history.location.state.privilege === 3) {
                    privilegeLevel = "Admin";
                  }
                  setFirstName(history.location.state.firstName);
                  setLastName(history.location.state.lastName);
                  setEmail(history.location.state.email);
                  setUserPrivilege(privilegeLevel);
                  setUserDialog(true);
                }}
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                </ListItemIcon>
                <ListItemText primary="User" />
              </ListItem>
              {privilege > 1 && (
                <ListItem
                  button
                  onClick={(event) => {
                    setAdministration(!administration);
                    if (administration) {
                      getAllUsers();
                    } else {
                      getAllDecisions();
                    }
                  }}
                >
                  <ListItemIcon>
                    <SupervisorAccountIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={administration ? "Employees" : "Admin"}
                  />
                </ListItem>
              )}

              <ListItem
                button
                onClick={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  history.push("/login");
                }}
              >
                <ListItemIcon>
                  <MeetingRoomIcon />
                </ListItemIcon>
                <ListItemText primary="Logout" />
              </ListItem>
            </div>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Container maxWidth="lg" className={classes.container}>
            <Paper className={classes.paper}>
              {!ready && (
                <CircularProgress
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                  }}
                />
              )}

              {ready && !administration && (
                <DataGrid
                  title={"Employees"}
                  data={decisions}
                  columns={baordDecisionsColumns}
                  options={{
                    selectableRows: privilege > 1 ? "multiple" : "none",
                    selectableRowsHeader: privilege > 1,
                    onCellClick: (rowData, cellMeta) => {
                      if (cellMeta.colIndex <= 4) {
                        console.log(cellMeta.rowIndex);
                        console.log(cellMeta.dataIndex);
                        console.log(rowData);
                        console.log(decisions[cellMeta.dataIndex]);
                        setCurrentDecision(decisions[cellMeta.dataIndex]);
                        //setTitleError(false);
                        //setSummaryError(false);
                        //setTagsError(false);
                        //setIssuedByError(false);
                        //setUpdateBoardDialog(true);
                        //setDecisionViewDialog(true);
                      }
                    },
                    onRowsDelete: (rowsDeleted, data, newTableData) => {
                      console.log(rowsDeleted);
                      rowsDeleted.data.map(async (data) => {
                        console.log("Viewing decision #" + data.dataIndex);
                        var decision = decisions[data.dataIndex];
                        var alldecisions = decisions;

                        axios
                          .post("/api/upload_employees/delete", {
                            _id: decision._id,
                          })
                          .then(function (response) {
                            console.log(response);
                            console.log(alldecisions.length);
                            alldecisions.splice(data.dataIndex, 1);
                            console.log(alldecisions.length);
                            setDecisions(alldecisions);
                            //history.push("/dashboard");
                          })
                          .catch(function (error) {
                            console.log(error);
                            if (error) {
                              setErrorMessage(
                                "An error occured. Please try again."
                              );
                              setAuthError(true);
                            }
                          });
                      });
                    },
                  }}
                />
              )}

              {ready && administration && (
                <DataGrid
                  title={"Users"}
                  data={users}
                  columns={usersColumns}
                  options={{
                    selectableRows: privilege > 1 ? "multiple" : "none",
                    selectableRowsHeader: privilege > 1,
                    onCellClick: (rowData, cellMeta) => {
                      if (cellMeta.colIndex <= 4) {
                        console.log(cellMeta.rowIndex);
                        console.log(cellMeta.dataIndex);
                        console.log(rowData);
                        console.log(decisions[cellMeta.dataIndex]);
                        setCurrentDecision(decisions[cellMeta.dataIndex]);
                        //setTitleError(false);
                        //setSummaryError(false);
                        //setTagsError(false);
                        //setIssuedByError(false);
                        //setUpdateBoardDialog(true);
                        //setDecisionViewDialog(true);
                      }
                    },
                    onRowsDelete: (rowsDeleted, data, newTableData) => {
                      console.log(rowsDeleted);
                      rowsDeleted.data.map(async (data) => {
                        console.log("Viewing decision #" + data.dataIndex);
                        var user = users[data.dataIndex];
                        var allusers = users;
                        axios
                          .post("/api/user/delete", {
                            _id: user._id,
                          })
                          .then(function (response) {
                            console.log(response);
                            console.log(allusers.length);
                            allusers.splice(data.dataIndex, 1);
                            console.log(allusers.length);
                            setUsers(allusers);
                            //history.push("/dashboard");
                          })
                          .catch(function (error) {
                            console.log(error);
                            if (error) {
                              setErrorMessage(
                                "An error occured. Please try again."
                              );
                              setAuthError(true);
                            }
                          });
                      });
                    },
                  }}
                />
              )}
            </Paper>
            <Box pt={4}>
              <Copyright />
            </Box>
          </Container>

          <Dialog
            open={userDialog}
            onClose={() => setUserDialog(false)}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Update User</DialogTitle>
            <DialogContent>
              <Controller
                name="firstName"
                defaultValue={firstName}
                as={
                  <TextField
                    //error={titleError}
                    value={firstName}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    autoComplete="firstName"
                    //helperText={titleError ? "Required" : ""}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        //setTitleError(true);
                        //setTitle(e.target.value);
                      } else {
                        //setTitleError(false);
                        setFirstName(e.target.value);
                      }
                    }}
                    onBlur={() => {
                      if (firstName === "") {
                        //setTitleError(true);
                      }
                    }}
                    autoFocus
                  />
                }
                control={control}
              />

              <Controller
                name="lastName"
                defaultValue={lastName}
                as={
                  <TextField
                    //error={titleError}
                    value={lastName}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lastName"
                    //helperText={titleError ? "Required" : ""}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        //setTitleError(true);
                        //setTitle(e.target.value);
                      } else {
                        //setTitleError(false);
                        setLastName(e.target.value);
                      }
                    }}
                    onBlur={() => {
                      if (lastName === "") {
                        //setTitleError(true);
                      }
                    }}
                  />
                }
                control={control}
              />

              <Controller
                name="email"
                defaultValue={email}
                as={
                  <TextField
                    //error={titleError}
                    value={email}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email"
                    name="email"
                    autoComplete="email"
                    //helperText={titleError ? "Required" : ""}
                    onChange={(e) => {
                      if (e.target.value === "") {
                        //setTitleError(true);
                        //setTitle(e.target.value);
                      } else {
                        //setTitleError(false);
                        setEmail(e.target.value);
                      }
                    }}
                    onBlur={() => {
                      if (email === "") {
                        //setTitleError(true);
                      }
                    }}
                  />
                }
                control={control}
              />

              <FormControl variant="outlined" fullWidth>
                <InputLabel id="demo-simple-select-outlined-label">
                  Privilege
                </InputLabel>
                <Select
                  labelId="demo-mutiple-chip-label"
                  id="demo-mutiple-chip"
                  value={userPrivilege}
                  defaultValue={userPrivilege}
                  disabled={privilege < 2}
                  onChange={(selected) => {
                    //var newSelectedTags = tags;
                    //newSelectedTags.push(selected.target.value);
                    setUserPrivilege(selected.target.value);
                  }}
                  input={<Input id="select-multiple-chip" />}
                  MenuProps={MenuProps}
                >
                  <MenuItem key={"None"} value={"None"}>
                    <ListItemText primary={"None"} />
                  </MenuItem>
                  <MenuItem key={"View"} value={"View"}>
                    <ListItemText primary={"View"} />
                  </MenuItem>
                  <MenuItem key={"View/Update"} value={"View/Update"}>
                    <ListItemText primary={"View/Update"} />
                  </MenuItem>
                  <MenuItem key={"Admin"} value={"Admin"}>
                    <ListItemText primary={"Admin"} />
                  </MenuItem>
                </Select>
              </FormControl>
              <DialogActions>
                <Button
                  onClick={() => setUserDialog(false)}
                  variant="contained"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    var privilegeLevel = 0;
                    if (userPrivilege === "Add") {
                      privilegeLevel = 1;
                    } else if (userPrivilege === "Add/Update") {
                      privilegeLevel = 2;
                    } else if (userPrivilege === "Admin") {
                      privilegeLevel = 3;
                    }
                    axios.create({ baseURL: window.location.origin });
                    axios
                      .post("/api/user/update", {
                        firstName: control.getValues().firstName,
                        lastName: control.getValues().lastName,
                        email: control.getValues().email,
                        privilege: privilegeLevel,
                        _id: userId,
                      })
                      .then(function (response) {
                        console.log(response);
                        setUpdateProgress(false);
                        setUserDialog(false);
                      })
                      .catch(function (error) {
                        console.log(error);
                        if (error) {
                          setUpdateProgress(false);
                          setUserDialog(false);
                          setErrorMessage(
                            "An error occured. Please try again."
                          );
                          setAuthError(true);
                        }
                      });
                  }}
                  color="primary"
                  variant="contained"
                >
                  {!updateProgress && "Update"}
                  {updateProgress && (
                    <CircularProgress color="secondary" size={20} />
                  )}
                </Button>
              </DialogActions>
            </DialogContent>
          </Dialog>

          <Dialog
            open={boardDialog}
            TransitionComponent={Transition}
            keepMounted
            fullWidth
            maxWidth="md"
            onClose={() => setBoardDialog(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">
              {"Add Employee"}
            </DialogTitle>
            <DialogContent>
              <Add
                setBoardDialog={setBoardDialog}
                setErrorMessage={setErrorMessage}
                setAuthError={setAuthError}
              />
            </DialogContent>
          </Dialog>

          {updateBoardDialog && (
            <Dialog
              open={updateBoardDialog}
              TransitionComponent={Transition}
              keepMounted
              fullWidth
              maxWidth="md"
              onClose={() => setUpdateBoardDialog(false)}
              aria-labelledby="alert-dialog-slide-title"
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle id="alert-dialog-slide-title">
                {"Update Employee"}
              </DialogTitle>
              <DialogContent>
                <Update
                  setBoardDialog={setUpdateBoardDialog}
                  setErrorMessage={setErrorMessage}
                  setAuthError={setAuthError}
                  employee={currentDecision}
                />
              </DialogContent>
            </Dialog>
          )}

          <Dialog
            open={authError}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setAuthError(false)}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
          >
            <DialogTitle id="alert-dialog-slide-title">{"Error"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-slide-description">
                {errorMessage}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setAuthError(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </main>
      </div>
    </ThemeProvider>
  );
}
