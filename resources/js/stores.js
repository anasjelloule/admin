export const stores = {
    state: {
        users: []
    },
    getters: {
        users: (state) => {
            return state.users
        }
    },
    mutations: {
        loadusers: (state, users) => {
            state.users = users;
        },
        putuser: (state, user) => {
            state.users.push(user);

        }
    },
    actions: {
        putuser: (context, user) => {

        },
        loadusers: (context) => {
            axios.get('api/getusers')

                .then(
                    res => {
                        // console.log();
                        context.commit('loadusers', res.data.users);
                    }
                ).catch(err => {
                    console.log(err);

                })
        }
    }
}