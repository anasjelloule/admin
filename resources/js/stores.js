export const stores = {
    state: {
        users: []
    },
    getters: {
        users: state => {
            return state.users;
        }
    },
    mutations: {
        loadusers: (state, users) => {
            state.users = users;
        },
        putuser: (state, user) => {
            state.users.push(user);
        },
        destroyuser: (state, id) => {
            state.users = state.users.filter(_user => _user.id != id);
        }
    },
    actions: {
        destroyuser: (context, user) => {
            axios
                .delete("api/destroyuser/" + user.id)
                .then(res => {
                    // console.log(res.data.deleted);
                    // console.log("user", user);

                    context.commit("destroyuser", res.data.deleted);
                })
                .catch(err => {
                    console.log(err);
                });
        },
        putuser: (context, user) => {
            context.commit("putuser", user);
        },
        loadusers: context => {
            axios
                .get("api/getusers")

                .then(res => {
                    // console.log();
                    context.commit("loadusers", res.data.users);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
};
