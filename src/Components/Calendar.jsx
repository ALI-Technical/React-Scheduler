import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import { ViewState, EditingState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  MonthView,
  Appointments,
  ViewSwitcher,
  Toolbar,
  DragDropProvider,
  EditRecurrenceMenu,
  AppointmentTooltip,
  AppointmentForm,
  DayView,
  DateNavigator,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import Appointment from "./Appointment";
import { formatISO } from "date-fns";
import { createTheme, ThemeProvider } from "@mui/material";
import { blue, orange } from "@mui/material/colors";

const appointments = [
  {
    title: "Meeting With Elon Musk",
    startDate: new Date(2022, 10, 15, 9, 35),
    endDate: new Date(2022, 10, 15, 11, 30),
    id: 0,
  },
  {
    title: "Meeting with Someone",
    startDate: new Date(2022, 10, 15, 12, 11),
    endDate: new Date(2022, 10, 15, 13, 0),
    id: 1,
  },
];
const Calendar = () => {
  const [appointmentData, setAppointmentData] = useState(appointments);

  // console.log(appointmentData);
  const date = new Date();
  const formatedDate = formatISO(date, { format: "extended" });

  const commitChanges = ({ added, changed, deleted }) => {
    setAppointmentData((appointmentData) => {
      let data = appointmentData;
      if (added) {
        console.log(added);
        console.log(data);
        const startingAddedId =
          data.length > 0 ? data[data.length - 1].id + 1 : 0;
        data = [...data, { id: startingAddedId, ...added }];
        console.log(data);
        console.log(startingAddedId);
      }
      if (changed) {
        // console.log(changed);
        // console.log(data);
        data = data.map((appointment) =>
          changed[appointment.id]
            ? { ...appointment, ...changed[appointment.id] }
            : appointment
        );
        // console.log(data);
      }
      if (deleted !== undefined) {
        // console.log(deleted);
        data = data.filter((appointment) => appointment.id !== deleted);
      }
      return data;
    });
  };

  const theme = createTheme({
    palette:{
      primary: orange,
      secondary: blue },
  });
  return (
    <ThemeProvider theme={theme}>
      <Paper>
        <Scheduler firstDayOfWeek={1} data={appointmentData} height={650}>
          <ViewState
            defaultCurrentDate={formatedDate}
            defaultCurrentViewName="Week"
          />
          <EditingState
            onCommitChanges={(editedData) => commitChanges(editedData)}
          />
          <EditRecurrenceMenu />
          <DayView startDayHour={8.5} endDayHour={17.5} />
          <WeekView startDayHour={8.5} endDayHour={17.5} />
          <MonthView />
          <Appointments />
          <AppointmentTooltip
            showDeleteButton={true}
            showCloseButton={true}
            showOpenButton={true}
          />
          <AppointmentForm />
          <Toolbar />
          <TodayButton />
          <DateNavigator />
          <ViewSwitcher />
        </Scheduler>
      </Paper>
    </ThemeProvider>
  );
};
export default Calendar;
