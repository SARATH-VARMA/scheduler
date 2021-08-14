import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  // Set the states
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"), 
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prev => ({ ...prev, days: all[0].data, appointments: all[1].data, interviewers: all[2].data}));
    })
  }, [])
  // Books interview, Make put request to update state locally and on server
  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const selectedDay = state.days.filter(currentDay => { 
      return currentDay.name === state.day;
    })

    let edit = false;
    if(state.appointments[id].interview !== null) {
      edit = true;
    }

    return axios
   .put(`/api/appointments/${id}`, appointment)
   .then(() => {

    const spotCount = edit ? selectedDay[0].spots : selectedDay[0].spots - 1;

      const updatedDays = state.days.map(day => {
        if (day.name !== state.day) {
          return day;
        }
        return {
          ...day,
          spots: spotCount
         };
      });

      setState({
        ...state,
        appointments,
        days : updatedDays
      });      
    })
  }
  // Cancels interview, Make request to update state locally and on server
  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const selectedDay = state.days.filter(currentDay => { 
      return currentDay.name === state.day;
    })

    return axios
    .delete(`/api/appointments/${id}`)
    .then(() => {     
      const spotCount = selectedDay[0].spots + 1;
      const updatedDays = state.days.map(day => {
        if (day.name !== state.day) {
          return day;
        }
        return {
          ...day,
          spots: spotCount
         };
       });

      setState({
        ...state,
        appointments,
        days : updatedDays
      });      
    })

  }

  return {
    state, 
    setDay,
    bookInterview,
    cancelInterview
  };
}