import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Paper,
  TextField,
  Grid,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  DialogTitle,
  Slide,
  InputAdornment,
  FormControl,
  FormControlLabel,
  Input,
  Select,
  ListItemText,
  MenuItem,
  InputLabel,
  Typography,
  Divider,
  Checkbox,
  Container,
  CssBaseline,
} from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import {
  Today,
  Phone,
  Email,
  Person,
  ChildCare,
  ChildFriendly,
  PermIdentity,
} from "@material-ui/icons";
import DateFnsUtils from "@date-io/date-fns";
//import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import dayjs from "dayjs";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  form: {
    [theme.breakpoints.up("md")]: {
      width: "50%",
      padding: "2%",
      margin: "10%",
    },
    [theme.breakpoints.down("md")]: {
      width: "90%",
      padding: 5,
    },
    alignItems: "center",
    justifyContent: "center",
  },
  field: {
    marginTop: theme.spacing(2),
  },
  oneWayGrid: {
    alignItems: "center",
    justifyContent: "center",
  },
  oneWayButton: {
    textTransform: "none",
  },
  enabledText: {
    color: "#2193b0",
    fontWeight: 600,
  },
  disabledText: {
    color: "#808080",
  },
  switch: {
    color: "#2193b0",
  },
  icon: {
    color: "#2193b0",
    marginRight: theme.spacing(2),
  },
  passengerIcons: {
    color: "#2193b0",
  },
  dialog: {
    [theme.breakpoints.up("md")]: {
      width: "100%",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  textField: {
    "& label.Mui-focused": {
      color: "#2193b0",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "#2193b0",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#2193b0",
      },
      "&:hover fieldset": {
        borderColor: "#6dd5ed",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#2193b0",
      },
    },
  },
  appBar: {
    position: "relative",
    background: "#2193b0",
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  paper: {
    //width: "90%",
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
    textAlign: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  checkBox: {
    //width: "90%",
    marginTop: theme.spacing(3),
  },
  logo: {
    position: "absolute",
    width: "100px",
    top: "3px",

    [theme.breakpoints.up("md")]: {
      left: "45.25%",
    },
    [theme.breakpoints.down("md")]: {
      left: "32.25%",
    },
  },
  option: {
    fontSize: 15,
    "& > span": {
      marginRight: 10,
      fontSize: 18,
    },
  },
  root: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

function Update(props) {
  const classes = useStyles();

  const [index, setIndex] = useState(0);
  const [firstName, setFirstName] = useState(props.employee.firstName);
  const [lastName, setLastName] = useState(props.employee.lastName);
  const [nationalId, setNationalId] = useState(props.employee.nationalId);
  const [email, setEmail] = useState(props.employee.email);
  const [phone, setPhone] = useState(props.employee.phone);
  const [address, setAddress] = useState(props.employee.address);
  const [gender, setGender] = useState(props.employee.gender);
  const [status, setStatus] = useState(props.employee.status);
  const [dateOfBirth, setDateOfBirth] = useState(new Date(props.employee.dateOfBirth));
  const [contractStart, setContractStart] = useState(new Date(props.employee.contractStartDate));
  const [endOfService, setEndOfService] = useState(new Date(props.employee.endServiceDate));
  const [nationalIdScanName, setNationalIdScanName] = useState(props.employee.fileNames[0]);
  const [nationalIdScan, setNationalIdScan] = useState("");
  const [militaryStatusScanName, setMilitaryStatusScanName] = useState(props.employee.fileNames[1]);
  const [militaryStatusScan, setMilitaryStatusScan] = useState("");
  const [insuranceNumberScanName, setInsuranceNumberScanName] = useState(props.employee.fileNames[2]);
  const [insuranceNumberScan, setInsuranceNumberScan] = useState("");
  const [qualification, setQualification] = useState(props.employee.qualification.qualification);
  const [university, setUniversity] = useState(props.employee.qualification.university);
  const [college, setCollege] = useState(props.employee.qualification.college);
  const [country, setCountry] = useState(props.employee.qualification.country);
  const [graduation, setGraduation] = useState(new Date(props.employee.qualification.graduation));
  const [grade, setGrade] = useState(props.employee.qualification.grade);
  const [certificateScanName, setCertificateScanName] = useState(props.employee.fileNames[3]);
  const [specialization, setSpecialization] = useState(props.employee.qualification.specialization);
  const [certificateScan, setCertificateScan] = useState("");
  const [school, setSchool] = useState(props.employee.qualification.school);
  const [type, setType] = useState(props.employee.qualification.type);
  const [job, setJob] = useState(props.employee.qualification.job);
  const [center, setCenter] = useState(props.employee.center);
  const [management, setManagement] = useState(props.employee.management);
  const [salaryRange, setSalaryRange] = useState(props.employee.salaryRange);
  const [faculty, setFaculty] = useState(props.employee.faculty);
  const [careerLadder, setCareerLadder] = useState(props.employee.careerLadder);
  const [training, setTraining] = useState(props.employee.training);
  const [trainingAuthority, setTrainingAuthority] = useState(props.employee.trainingAuthority);
  const [trainingEnd, setTrainingEnd] = useState(props.employee.trainingEnd);
  const [trainingStart, setTrainingStart] = useState(props.employee.trainingStart);
  const [trainingScan, setTrainingScan] = useState("");
  const [trainingScanName, setTrainingScanName] = useState(props.employee.trainingScanName);
  const [assignSecondScanName, setAssignSecondScanName] = useState(props.employee.assignSecondScanName);
  const [assignSecondScan, setAssignSecondScan] = useState("");
  const [employmentStatus, setEmploymentStatus] = useState(props.employee.employmentStatus);
  const [assignSecondDate, setAssignSecondDate] = useState(props.employee.assignSecondDate);
  const [assignSecondAuthority, setAssignSecondAuthority] = useState(props.employee.assignSecondAuthority);
  const [confirm, setConfirm] = useState(false);
  const [message, setMessage] = useState("");
  const [messageDialog, setMessageDialog] = useState(false);
  const [messageLevel, setMessageLevel] = useState("");
  const [render, setRender] = useState(false);

  return (
    <Grid container direction={"column"} spacing={1}>
      <Grid
        container
        direction={"row"}
        spacing={3}
        className={classes.oneWayGrid}
      >
        <Grid item xs={"auto"}></Grid>
        <Grid item xs={"auto"}>
          <IconButton
            onClick={(value) => {
              setIndex(0);
            }}
          >
            <Person
              className={classes.passengerIcons}
              fontSize={index === 0 ? "large" : ""}
            />{" "}
          </IconButton>
          <IconButton
            onClick={(value) => {
              setIndex(1);
            }}
          >
            <Person
              className={classes.passengerIcons}
              fontSize={index === 1 ? "large" : ""}
            />{" "}
          </IconButton>
          <IconButton
            onClick={(value) => {
              setIndex(2);
            }}
          >
            <Person
              className={classes.passengerIcons}
              fontSize={index === 2 ? "large" : ""}
            />{" "}
          </IconButton>
        </Grid>
        <Grid item xs={"auto"}></Grid>
      </Grid>

      {index === 0 && (
        <Grid container direction={"column"}>
          <Grid item>
            <TextField
              //variant="outlined"
              classes={{ root: classes.textField }}
              margin="normal"
              fullWidth
              id="firstName"
              label="First Name"
              name="firstName"
              value={firstName}
              //placeholder="From where?"
              onChange={(value) => {
                setFirstName(value.target.value);
              }}
            />
          </Grid>

          <Grid item>
            <TextField
              //variant="outlined"
              classes={{ root: classes.textField }}
              margin="normal"
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              //placeholder="From where?"
              value={lastName}
              onChange={(value) => {
                setLastName(value.target.value);
              }}
              onFocus={() => {
                //setSelectedDepartureAirport("");
              }}
            />
          </Grid>

          <Grid item>
            <TextField
              //variant="outlined"
              classes={{ root: classes.textField }}
              margin="normal"
              fullWidth
              id="nationalId"
              label="National ID"
              name="nationalId"
              //placeholder="From where?"
              value={nationalId}
              onChange={(value) => {
                setNationalId(value.target.value);
              }}
            />
          </Grid>

          <Grid item>
            <TextField
              //variant="outlined"
              classes={{ root: classes.textField }}
              margin="normal"
              fullWidth
              id="email"
              label="Email"
              name="email"
              //placeholder="From where?"
              value={email}
              onChange={(value) => {
                setEmail(value.target.value);
              }}
            />
          </Grid>

          <Grid item>
            <TextField
              //variant="outlined"
              classes={{ root: classes.textField }}
              margin="normal"
              fullWidth
              id="phone"
              label="Phone"
              name="phone"
              //placeholder="From where?"
              value={phone}
              onChange={(value) => {
                setPhone(value.target.value);
              }}
            />
          </Grid>

          <Grid item>
            <TextField
              //variant="outlined"
              classes={{ root: classes.textField }}
              margin="normal"
              fullWidth
              id="address"
              label="Address"
              name="address"
              //placeholder="From where?"
              value={address}
              onChange={(value) => {
                setAddress(value.target.value);
              }}
            />
          </Grid>

          <Grid item>
            <Autocomplete
              id="combo-box-demo"
              fullWidth
              disableClearable
              options={["Male", "Female"]}
              filterOptions={(x) => x}
              getOptionLabel={(option) => option}
              value={gender}
              onChange={(event, newValue) => {
                setGender(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  //variant="outlined"
                  classes={{ root: classes.textField }}
                  {...params}
                  margin="normal"
                  fullWidth
                  id="gender"
                  label="Gender"
                  name="gender"
                />
              )}
            />
          </Grid>

          <Grid item>
            <Autocomplete
              id="combo-box-demo"
              fullWidth
              disableClearable
              options={["Single", "Married", "Divorced", "Widow"]}
              filterOptions={(x) => x}
              getOptionLabel={(option) => option}
              value={status}
              onChange={(event, newValue) => {
                setStatus(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  //variant="outlined"
                  classes={{ root: classes.textField }}
                  {...params}
                  margin="normal"
                  fullWidth
                  id="status"
                  label="Marital Status"
                  name="status"
                />
              )}
            />
          </Grid>

          <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                classes={{ root: classes.textField }}
                fullWidth
                variant="outlined"
                margin="normal"
                id="date"
                label="Date of Birth"
                disableFuture
                autoOk
                openTo="year"
                views={["year", "month", "date"]}
                format="dd/MM/yyyy"
                value={dateOfBirth}
                onChange={(value) => {
                  setDateOfBirth(value);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item>
            <Grid
              container
              direction={"row"}
              spacing={1}
              className={classes.dflex}
            >
              <Grid item xs={9}>
                <TextField
                  value={nationalIdScanName}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  disabled
                  id="nationalIdScan"
                  label="National ID Scan"
                  name="nationalIdScan"
                />
              </Grid>
              <Grid item xs={3}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    setNationalIdScan(event.target.files[0]);
                    setNationalIdScanName(event.target.files[0].name);
                  }}
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    fullWidth
                  >
                    Browse
                  </Button>
                </label>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              direction={"row"}
              spacing={1}
              className={classes.dflex}
            >
              <Grid item xs={9}>
                <TextField
                  value={militaryStatusScanName}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  disabled
                  id="militaryStatusScan"
                  label="Military Status Scan"
                  name="militaryStatusScan"
                />
              </Grid>
              <Grid item xs={3}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    setMilitaryStatusScan(event.target.files[0]);
                    setMilitaryStatusScanName(event.target.files[0].name);
                  }}
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    fullWidth
                  >
                    Browse
                  </Button>
                </label>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              direction={"row"}
              spacing={1}
              className={classes.dflex}
            >
              <Grid item xs={9}>
                <TextField
                  value={insuranceNumberScanName}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  disabled
                  id="insuranceNumber"
                  label="Insurance Number Scan"
                  name="insuranceNumber"
                />
              </Grid>
              <Grid item xs={3}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    setInsuranceNumberScan(event.target.files[0]);
                    setInsuranceNumberScanName(event.target.files[0].name);
                  }}
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    fullWidth
                  >
                    Browse
                  </Button>
                </label>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      {index === 1 && (
        <Grid container direction={"column"}>
          <Grid item>
            <Autocomplete
              id="combo-box-demo"
              fullWidth
              disableClearable
              options={[
                "Illiterate",
                "Preparatory",
                "Diplomat",
                "Bachelor",
                "Master",
                "PhD",
              ]}
              filterOptions={(x) => x}
              getOptionLabel={(option) => option}
              value={qualification}
              onChange={(event, newValue) => {
                setQualification(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  //variant="outlined"
                  classes={{ root: classes.textField }}
                  {...params}
                  margin="normal"
                  fullWidth
                  id="qualification"
                  label="Qualification"
                  name="qualification"
                />
              )}
            />
          </Grid>

          <Grid>
            {qualification === "Bachelor" && (
              <React.Fragment>
                <Grid item>
                  <TextField
                    //variant="outlined"
                    classes={{ root: classes.textField }}
                    margin="normal"
                    fullWidth
                    id="university"
                    label="University"
                    name="university"
                    //placeholder="From where?"
                    value={university}
                    onChange={(value) => {
                      setUniversity(value.target.value);
                    }}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    //variant="outlined"
                    classes={{ root: classes.textField }}
                    margin="normal"
                    fullWidth
                    id="college"
                    label="College"
                    name="college"
                    //placeholder="From where?"
                    value={college}
                    onChange={(value) => {
                      setCollege(value.target.value);
                    }}
                  />
                </Grid>

                <Grid item>
                  <Autocomplete
                    id="combo-box-demo"
                    fullWidth
                    disableClearable
                    options={countryList}
                    filterOptions={(x) => x}
                    getOptionLabel={(option) => option}
                    value={country}
                    onChange={(value) => {
                      setCountry(value.target.value);
                    }}
                    renderInput={(params) => (
                      <TextField
                        //variant="outlined"
                        classes={{ root: classes.textField }}
                        margin="normal"
                        fullWidth
                        id="country"
                        label="Country"
                        name="country"
                        //placeholder="From where?"
                      />
                    )}
                  />
                </Grid>

                <Grid item>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      classes={{ root: classes.textField }}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      id="date"
                      label="Graduation"
                      disableFuture
                      autoOk
                      openTo="year"
                      views={["year", "month", "date"]}
                      format="dd/MM/yyyy"
                      value={graduation}
                      onChange={(value) => {
                        setGraduation(value);
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>

                <Grid item>
                  <TextField
                    //variant="outlined"
                    classes={{ root: classes.textField }}
                    margin="normal"
                    fullWidth
                    id="grade"
                    label="Grade"
                    name="grade"
                    //placeholder="From where?"
                    value={grade}
                    onChange={(value) => {
                      setGrade(value.target.value);
                    }}
                  />
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction={"row"}
                    spacing={1}
                    className={classes.dflex}
                  >
                    <Grid item xs={9}>
                      <TextField
                        value={certificateScanName}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        disabled
                        id="certificateScan"
                        label="Certificate Scan"
                        name="certificateScan"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          setCertificateScan(event.target.files[0]);
                          setCertificateScanName(event.target.files[0].name);
                        }}
                      />
                      <label htmlFor="contained-button-file">
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                          fullWidth
                        >
                          Browse
                        </Button>
                      </label>
                    </Grid>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}

            {(qualification === "Master" || qualification === "PhD") && (
              <React.Fragment>
                <Grid item>
                  <TextField
                    //variant="outlined"
                    classes={{ root: classes.textField }}
                    margin="normal"
                    fullWidth
                    id="university"
                    label="University"
                    name="university"
                    //placeholder="From where?"
                    value={university}
                    onChange={(value) => {
                      setUniversity(value.target.value);
                    }}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    //variant="outlined"
                    classes={{ root: classes.textField }}
                    margin="normal"
                    fullWidth
                    id="specialization"
                    label="Specialization"
                    name="specialization"
                    //placeholder="From where?"
                    value={specialization}
                    onChange={(value) => {
                      setSpecialization(value.target.value);
                    }}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    //variant="outlined"
                    classes={{ root: classes.textField }}
                    margin="normal"
                    fullWidth
                    id="country"
                    label="Country"
                    name="country"
                    //placeholder="From where?"
                    value={country}
                    onChange={(value) => {
                      setCountry(value.target.value);
                    }}
                  />
                </Grid>

                <Grid item>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      classes={{ root: classes.textField }}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      id="date"
                      label="Graduation"
                      disableFuture
                      autoOk
                      openTo="year"
                      views={["year", "month", "date"]}
                      format="dd/MM/yyyy"
                      value={graduation}
                      onChange={(value) => {
                        setGraduation(value);
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>

                <Grid item>
                  <TextField
                    //variant="outlined"
                    classes={{ root: classes.textField }}
                    margin="normal"
                    fullWidth
                    id="grade"
                    label="Grade"
                    name="grade"
                    //placeholder="From where?"
                    value={grade}
                    onChange={(value) => {
                      setGrade(value.target.value);
                    }}
                  />
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction={"row"}
                    spacing={1}
                    className={classes.dflex}
                  >
                    <Grid item xs={9}>
                      <TextField
                        value={certificateScanName}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        disabled
                        id="certificateScan"
                        label="Certificate Scan"
                        name="certificateScan"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          setCertificateScan(event.target.files[0]);
                          setCertificateScanName(event.target.files[0].name);
                        }}
                      />
                      <label htmlFor="contained-button-file">
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                          fullWidth
                        >
                          Browse
                        </Button>
                      </label>
                    </Grid>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}

            {qualification === "Diplomat" && (
              <React.Fragment>
                <Grid item>
                  <TextField
                    //variant="outlined"
                    classes={{ root: classes.textField }}
                    margin="normal"
                    fullWidth
                    id="school"
                    label="School"
                    name="school"
                    //placeholder="From where?"
                    value={school}
                    onChange={(value) => {
                      setSchool(value.target.value);
                    }}
                  />
                </Grid>

                <Grid item>
                  <TextField
                    //variant="outlined"
                    classes={{ root: classes.textField }}
                    margin="normal"
                    fullWidth
                    id="type"
                    label="Type"
                    name="type"
                    //placeholder="From where?"
                    value={type}
                    onChange={(value) => {
                      setType(value.target.value);
                    }}
                  />
                </Grid>

                <Grid item>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      classes={{ root: classes.textField }}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      id="date"
                      label="Graduation"
                      disableFuture
                      autoOk
                      openTo="year"
                      views={["year", "month", "date"]}
                      format="dd/MM/yyyy"
                      value={graduation}
                      onChange={(value) => {
                        setGraduation(value);
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction={"row"}
                    spacing={1}
                    className={classes.dflex}
                  >
                    <Grid item xs={9}>
                      <TextField
                        value={certificateScanName}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        disabled
                        id="certificateScan"
                        label="Certificate Scan"
                        name="certificateScan"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          setCertificateScan(event.target.files[0]);
                          setCertificateScanName(event.target.files[0].name);
                        }}
                      />
                      <label htmlFor="contained-button-file">
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                          fullWidth
                        >
                          Browse
                        </Button>
                      </label>
                    </Grid>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}

            {qualification === "Preparatory" && (
              <React.Fragment>
                <Grid item>
                  <TextField
                    //variant="outlined"
                    classes={{ root: classes.textField }}
                    margin="normal"
                    fullWidth
                    id="school"
                    label="School"
                    name="school"
                    //placeholder="From where?"
                    value={school}
                    onChange={(value) => {
                      setSchool(value.target.value);
                    }}
                  />
                </Grid>

                <Grid item>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <DatePicker
                      classes={{ root: classes.textField }}
                      fullWidth
                      variant="outlined"
                      margin="normal"
                      id="date"
                      label="Graduation"
                      disableFuture
                      autoOk
                      openTo="year"
                      views={["year", "month", "date"]}
                      format="dd/MM/yyyy"
                      value={graduation}
                      onChange={(value) => {
                        setGraduation(value);
                      }}
                      KeyboardButtonProps={{
                        "aria-label": "change date",
                      }}
                    />
                  </MuiPickersUtilsProvider>
                </Grid>

                <Grid item>
                  <Grid
                    container
                    direction={"row"}
                    spacing={1}
                    className={classes.dflex}
                  >
                    <Grid item xs={9}>
                      <TextField
                        value={certificateScanName}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        disabled
                        id="certificateScan"
                        label="Certificate Scan"
                        name="certificateScan"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          setCertificateScan(event.target.files[0]);
                          setCertificateScanName(event.target.files[0].name);
                        }}
                      />
                      <label htmlFor="contained-button-file">
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                          fullWidth
                        >
                          Browse
                        </Button>
                      </label>
                    </Grid>
                  </Grid>
                </Grid>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      )}

      {index === 2 && (
        <Grid container direction={"column"}>
          <Grid item>
            <Autocomplete
              id="combo-box-demo"
              fullWidth
              disableClearable
              options={["Hired", "Assigned", "Seconded"]}
              filterOptions={(x) => x}
              getOptionLabel={(option) => option}
              value={employmentStatus}
              onChange={(event, newValue) => {
                setEmploymentStatus(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  //variant="outlined"
                  classes={{ root: classes.textField }}
                  {...params}
                  margin="normal"
                  fullWidth
                  id="employmentStatus"
                  label="Employment Status"
                  name="employmentStatus"
                />
              )}
            />
          </Grid>

          <Grid item>
            <TextField
              //variant="outlined"
              classes={{ root: classes.textField }}
              margin="normal"
              fullWidth
              id="job"
              label="Job"
              name="job"
              //placeholder="From where?"
              value={job}
              onChange={(value) => {
                setJob(value.target.value);
              }}
            />
          </Grid>

          <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                classes={{ root: classes.textField }}
                fullWidth
                variant="outlined"
                margin="normal"
                id="date"
                label="Contract Start Date"
                disableFuture
                autoOk
                openTo="year"
                views={["year", "month", "date"]}
                format="dd/MM/yyyy"
                value={contractStart}
                onChange={(value) => {
                  setContractStart(value);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                classes={{ root: classes.textField }}
                fullWidth
                variant="outlined"
                margin="normal"
                id="date"
                label="End Service Date"
                disableFuture
                autoOk
                openTo="year"
                views={["year", "month", "date"]}
                format="dd/MM/yyyy"
                value={endOfService}
                onChange={(value) => {
                  setEndOfService(value);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item>
            <Autocomplete
              id="combo-box-demo"
              fullWidth
              disableClearable
              options={[
                "AinShams",
                "Alexandria",
                "AlSadat",
                "Aswan",
                "Asyut",
                "BeniSuef",
                "Dokki",
                "Fayoum",
                "Hurghada",
                "Ismailia",
                "Menoufia",
                "Qena",
              ]}
              filterOptions={(x) => x}
              getOptionLabel={(option) => option}
              value={center}
              onChange={(event, newValue) => {
                setCenter(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  //variant="outlined"
                  classes={{ root: classes.textField }}
                  {...params}
                  margin="normal"
                  fullWidth
                  id="center"
                  label="Center"
                  name="center"
                />
              )}
            />
          </Grid>

          <Grid item>
            <Autocomplete
              id="combo-box-demo"
              fullWidth
              disableClearable
              options={[
                "Management",
                "Teaching Staff",
                "Continuous",
                "Corporate legal",
                "Finance and Administration Office",
                "Information Bureu",
                "Student Services",
                "Technology and Education Center",
                "Information Technology and Communications Center",
                "Office of the Director",
              ]}
              filterOptions={(x) => x}
              getOptionLabel={(option) => option}
              value={management}
              onChange={(event, newValue) => {
                setManagement(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  //variant="outlined"
                  classes={{ root: classes.textField }}
                  {...params}
                  margin="normal"
                  fullWidth
                  id="management"
                  label="Administration"
                  name="management"
                />
              )}
            />
          </Grid>

          {management === "Teaching Staff" && (
            <Grid item>
              <Autocomplete
                id="combo-box-demo"
                fullWidth
                disableClearable
                options={[
                  "Business Administration",
                  "Computers and Information Technology",
                  "Educational Studies",
                ]}
                filterOptions={(x) => x}
                getOptionLabel={(option) => option}
                value={faculty}
                onChange={(event, newValue) => {
                  setFaculty(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    //variant="outlined"
                    classes={{ root: classes.textField }}
                    {...params}
                    margin="normal"
                    fullWidth
                    id="center"
                    label="Faculty"
                    name="faculty"
                  />
                )}
              />
            </Grid>
          )}

          <Grid item>
            <TextField
              //variant="outlined"
              classes={{ root: classes.textField }}
              margin="normal"
              fullWidth
              id="salaryRange"
              label="Salary Range"
              name="salaryRange"
              //placeholder="From where?"
              value={salaryRange}
              onChange={(value) => {
                setSalaryRange(value.target.value);
              }}
            />
          </Grid>

          {management === "Teaching Staff" && (
            <Grid item>
              <TextField
                //variant="outlined"
                classes={{ root: classes.textField }}
                margin="normal"
                fullWidth
                id="careerLadder"
                label="Career Ladder"
                name="careerLadder"
                //placeholder="From where?"
                value={careerLadder}
                onChange={(value) => {
                  setCareerLadder(value.target.value);
                }}
              />
            </Grid>
          )}

          {(employmentStatus === "Seconded" ||
            employmentStatus === "Assigned") && (
            <React.Fragment>
              <Grid item>
                <TextField
                  //variant="outlined"
                  classes={{ root: classes.textField }}
                  margin="normal"
                  fullWidth
                  id="job"
                  label="Assigning/Seconding Authority"
                  name="assignSecondAuthority"
                  //placeholder="From where?"
                  value={assignSecondAuthority}
                  onChange={(value) => {
                    setAssignSecondAuthority(value.target.value);
                  }}
                />
              </Grid>

              <Grid item>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <DatePicker
                    classes={{ root: classes.textField }}
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    id="date"
                    label="Assigning/Seconding Date"
                    disableFuture
                    autoOk
                    openTo="year"
                    views={["year", "month", "date"]}
                    format="dd/MM/yyyy"
                    value={assignSecondDate}
                    onChange={(value) => {
                      setAssignSecondDate(value);
                    }}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>

              <Grid item>
                  <Grid
                    container
                    direction={"row"}
                    spacing={1}
                    className={classes.dflex}
                  >
                    <Grid item xs={9}>
                      <TextField
                        value={assignSecondScanName}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        disabled
                        id="certificateScan"
                        label="Assigning/Seconding Letter of Approval"
                        name="certificateScan"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <input
                        accept="image/*"
                        className={classes.input}
                        id="contained-button-file"
                        type="file"
                        style={{ display: "none" }}
                        onChange={(event) => {
                          setAssignSecondScan(event.target.files[0]);
                          setAssignSecondScanName(event.target.files[0].name);
                        }}
                      />
                      <label htmlFor="contained-button-file">
                        <Button
                          variant="contained"
                          color="primary"
                          component="span"
                          fullWidth
                        >
                          Browse
                        </Button>
                      </label>
                    </Grid>
                  </Grid>
                </Grid>
            </React.Fragment>
          )}
        </Grid>
      )}

      {index === 2 && (
        <Grid container direction={"column"}>
          <Grid item>
            <TextField
              //variant="outlined"
              classes={{ root: classes.textField }}
              margin="normal"
              fullWidth
              id="training"
              label="Training Program Name"
              name="training"
              //placeholder="From where?"
              value={training}
              onChange={(value) => {
                setTraining(value.target.value);
              }}
            />
          </Grid>

          <Grid item>
            <TextField
              //variant="outlined"
              classes={{ root: classes.textField }}
              margin="normal"
              fullWidth
              id="trainingAuthority"
              label="Training Authority"
              name="trainingAuthority"
              //placeholder="From where?"
              value={trainingAuthority}
              onChange={(value) => {
                setTrainingAuthority(value.target.value);
              }}
            />
          </Grid>

          <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                classes={{ root: classes.textField }}
                fullWidth
                variant="outlined"
                margin="normal"
                id="date"
                label="Training Start Date"
                disableFuture
                autoOk
                openTo="year"
                views={["year", "month", "date"]}
                format="dd/MM/yyyy"
                value={trainingStart}
                onChange={(value) => {
                  setTrainingStart(value);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                classes={{ root: classes.textField }}
                fullWidth
                variant="outlined"
                margin="normal"
                id="date"
                label="Training End Date"
                disableFuture
                autoOk
                openTo="year"
                views={["year", "month", "date"]}
                format="dd/MM/yyyy"
                value={trainingEnd}
                onChange={(value) => {
                  setTrainingEnd(value);
                }}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>

          <Grid item>
            <Grid
              container
              direction={"row"}
              spacing={1}
              className={classes.dflex}
            >
              <Grid item xs={9}>
                <TextField
                  value={trainingScanName}
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  disabled
                  id="trainingScan"
                  label="Training Certificate Scan"
                  name="trainingScan"
                />
              </Grid>
              <Grid item xs={3}>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  type="file"
                  style={{ display: "none" }}
                  onChange={(event) => {
                    setTrainingScan(event.target.files[0]);
                    setTrainingScanName(event.target.files[0].name);
                  }}
                />
                <label htmlFor="contained-button-file">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    fullWidth
                  >
                    Browse
                  </Button>
                </label>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      )}

      <Grid item className={classes.field}>
        <Grid
          container
          direction={"row"}
          spacing={3}
          className={classes.oneWayGrid}
        >
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              component="span"
              fullWidth
              onClick={async (event) => {
                if (index === 0) {
                  props.setBoardDialog(false);
                } else {
                  setIndex(index - 1);
                }
              }}
            >
              {index === 0 ? "Cancel" : "Back"}
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button
              variant="contained"
              color="primary"
              component="span"
              fullWidth
              onClick={async (event) => {
                if (index === 2) {
                  var formData = new FormData();

                  formData.append("file", [
                    nationalIdScan,
                    militaryStatusScan,
                    insuranceNumberScan,
                    certificateScan,
                    trainingScan,
                    assignSecondScan
                  ]);
                  formData.append("email", email);
                  formData.append("firstName", firstName);
                  formData.append("lastName", lastName);
                  formData.append("nationalId", nationalId);
                  formData.append("phone", phone);
                  formData.append("address", address);
                  formData.append("gender", gender);
                  formData.append("status", status);
                  formData.append("dateOfBirth", dateOfBirth);
                  formData.append("job", job);
                  formData.append("contractStartDate", contractStart);
                  formData.append("endServiceDate", endOfService);
                  formData.append("center", center);
                  formData.append("management", management);
                  formData.append("salaryRange", salaryRange);
                  formData.append("faculty", faculty);
                  formData.append("careerLadder", careerLadder);
                  formData.append("employmentStatus", employmentStatus);
                  formData.append("assignSecondDate", assignSecondDate);
                  formData.append("assignSecondAuthority", assignSecondAuthority);
                  formData.append("fileNames", [
                    nationalIdScanName,
                    militaryStatusScanName,
                    insuranceNumberScanName,
                    certificateScanName,
                    trainingScanName,
                    assignSecondScanName
                  ]);
                  formData.append(
                    "qualification",
                    JSON.stringify({
                      qualification: qualification,
                      university: university,
                      college: college,
                      country: country,
                      graduation: graduation,
                      grade: grade,
                      specialization: specialization,
                      school: school,
                      type: type,
                    })
                  );
                  formData.append(
                    "training",
                    JSON.stringify({
                      training: training,
                      trainingAuthority: trainingAuthority,
                      trainingEnd: trainingEnd,
                      trainingStart: trainingStart,
                    })
                  );

                  axios.create({ baseURL: window.location.origin });
                  axios
                    .post("/api/upload_employees/new", formData)
                    .then(function (response) {
                      props.setBoardDialog(false);
                    })
                    .catch(function (error) {
                      console.log(error);
                      if (error) {
                        props.setBoardDialog(false);
                        props.setErrorMessage(
                          "An error occured. Please try again."
                        );
                        props.setAuthError(true);
                      }
                    });
                } else {
                  setIndex(index + 1);
                }
              }}
            >
              Next
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const countryList = [
  "Afghanistan",
  "Åland Islands",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas (the)",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia (Plurinational State of)",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory (the)",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands (the)",
  "Central African Republic (the)",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands (the)",
  "Colombia",
  "Comoros (the)",
  "Congo (the Democratic Republic of the)",
  "Congo (the)",
  "Cook Islands (the)",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czechia",
  "Côte d'Ivoire",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic (the)",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Falkland Islands (the) [Malvinas]",
  "Faroe Islands (the)",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories (the)",
  "Gabon",
  "Gambia (the)",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See (the)",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran (Islamic Republic of)",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea (the Democratic People's Republic of)",
  "Korea (the Republic of)",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic (the)",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands (the)",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia (Federated States of)",
  "Moldova (the Republic of)",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands (the)",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger (the)",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands (the)",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine, State of",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines (the)",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Republic of North Macedonia",
  "Romania",
  "Russian Federation (the)",
  "Rwanda",
  "Réunion",
  "Saint Barthélemy",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin (French part)",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten (Dutch part)",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan (the)",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan (Province of China)",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands (the)",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates (the)",
  "United Kingdom of Great Britain and Northern Ireland (the)",
  "United States Minor Outlying Islands (the)",
  "United States of America (the)",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela (Bolivarian Republic of)",
  "Viet Nam",
  "Virgin Islands (British)",
  "Virgin Islands (U.S.)",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
];

export default Update;
