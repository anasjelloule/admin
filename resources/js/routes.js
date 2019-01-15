import Home from "./components/admin/Home";
import Users from "./components/admin/Users";
import EditUser from "./components/admin/EditUser";
import ExampleComponent from "./components/ExampleComponent.vue";
import err404 from "./components/err404";
import posts from "./components/admin/posts";

export const routes = [
    {
        path: "/home",
        component: Home,
        children: [{ path: "/anas", component: Home }],
        name: "admin"
    },
    { path: "/users", component: Users, name: "users" },
    {
        path: "/edituser/:id",
        component: EditUser,
        name: "edituser",
        props: true
    },
    { path: "/posts", component: posts, name: "posts" },
    { path: "*", component: err404, name: "err404" }
];
