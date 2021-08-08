export function getAppointmentsForDay(state, day) {
  // finding the object in state.days who's name matches the provided day
  const selectedDay = state.days.filter(currentDay => { 
    return currentDay.name === day;
  })

  // validation
  if (selectedDay.length === 0) {
    return [];
  }

  // From state.appointments, return appointments for the provided day 
  const result = selectedDay[0].appointments.map(appointment => {
    return state.appointments[appointment];
  })

  return result;
} 