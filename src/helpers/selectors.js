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
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  }
  const result = {
    ...interview,
    interviewer: {...state.interviewers[interview.interviewer] }
  }
  return result;
}

export function getInterviewersForDay(state, day) {
  // finding the object in state.days who's name matches the provided day
  const selectedDay = state.days.filter(currentDay => { 
    return currentDay.name === day;
  })

  // validation
  if (selectedDay.length === 0) {
    return [];
  }

  // From state.interviewers, return interviewers for the provided day 
  const result = selectedDay[0].interviewers.map(interviewer => {
    return state.interviewers[interviewer];
  })
  
  return result;
} 