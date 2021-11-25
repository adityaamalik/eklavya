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
        path: ["/menteeclasses"],
        exact: true,
        component: "MenteeClasses",
    },
    {
        path: ["/menteeinvitations"],
        exact: true,
        component: "MenteeInvitations",
    },
    {
        path: ["/menteestatistics"],
        exact: true,
        component: "MenteeStatistics",
    },
    {
        path: ["/mentorclasses"],
        exact: true,
        component: "MentorClasses",
    },
    {
        path: ["/mentorcreateclass"],
        exact: true,
        component: "MentorCreateClass",
    },
    {
        path: ["/mentorstatistics"],
        exact: true,
        component: "MentorStatistics",
    },
];

export default routes;
