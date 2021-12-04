const routes = [
  {
    path: ["/"],
    exact: true,
    component: "Landing",
  },
  {
    path: ["/login"],
    exact: true,
    component: "Login",
  },
  {
    path: ["/register"],
    exact: true,
    component: "Register",
  },
  {
    path: ["/mentordashboard"],
    exact: true,
    component: "MentorDashboard",
  },
  {
    path: ["/menteedashboard"],
    exact: true,
    component: "MenteeDashboard",
  },
  {
    path: ["/mentorqueries"],
    exact: true,
    component: "MentorQueries",
  },
  {
    path: ["/menteequeries"],
    exact: true,
    component: "MenteeQueries",
  },
  {
    path: ["/menteeinvitations"],
    exact: true,
    component: "Invitations",
  },
  {
    path: ["/mentorinvitations"],
    exact: true,
    component: "Invitations",
  },
  {
    path: ["/menteemeetings"],
    exact: true,
    component: "Meetings",
  },
  {
    path: ["/mentormeetings"],
    exact: true,
    component: "MentorMeetings",
  },
  {
    path: ["/mentorprofile"],
    exact: true,
    component: "MentorProfile",
  },
  {
    path: ["/menteeprofile"],
    exact: true,
    component: "MenteeProfile",
  },
];

export default routes;
