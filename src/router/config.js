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
        path: ["/queries"],
        exact: true,
        component: "Queries",
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
        component: "Meetings",
    },
    {
        path: ["/mentorprofile"],
        exact: true,
        component: "Profile",
    },
    {
        path: ["/menteeprofile"],
        exact: true,
        component: "Profile",
    },
];

export default routes;
