import {Appointments} from '@devexpress/dx-react-scheduler-material-ui'

const AppointmentComponent = ({ children, style, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}
    style={{
      ...style,
      backgroundColor: "#FFC107",
      borderRadius: "8px",
    }}
  >
    {children}
  </Appointments.Appointment>
);

export default AppointmentComponent