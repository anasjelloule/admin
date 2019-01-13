<template>
  <div class="row">
    <modal :id="'popup'">
      <form @submit.prevent="validateForm('form-1')" data-vv-scope="form-1" slot="modal-form">
        <div class="modal-header">
          <h5 class="modal-title" id="popupTitle">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body" slot="modal-body">
          <div :class="{'has-error': errors.has('form-1.name') }" class="form-group">
            <label>Name</label>

            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-eye"></i>
              </div>
              <input
                type="text"
                class="form-control"
                v-validate="'required|alpha'"
                v-model="user.name"
                name="name"
              >
            </div>

            <span
              v-show="errors.has('form-1.name')"
              class="help-block"
            >{{ errors.first('form-1.name') }}</span>
          </div>
          <div :class="{'has-error': errors.has('form-1.email') }" class="form-group">
            <label>Email</label>

            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-envelope"></i>
              </div>
              <input
                type="text"
                class="form-control"
                v-validate.continues="'required|email'"
                v-model="user.email"
                name="email"
              >
            </div>

            <span
              v-show="errors.has('form-1.email')"
              class="help-block"
            >{{ errors.first('form-1.email') }}</span>
          </div>
          <div :class="{'has-error': errors.has('form-1.password') }" class="form-group">
            <label>Mot De Pass</label>

            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-key"></i>
              </div>
              <input
                v-model="user.password"
                v-validate="'required'"
                class="form-control"
                type="password"
                name="password"
              >
              <!-- <input v-model="confirmation" type="text" name="password_confirmation"> -->
            </div>

            <span
              v-show="errors.has('form-1.password')"
              class="help-block"
            >{{ errors.first('form-1.password') }}</span>
          </div>

          <div :class="{'has-error': errors.has('form-1.bio') }" class="form-group">
            <label>Description</label>

            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-align-left"></i>
              </div>
              <textarea
                class="form-control"
                v-validate="'required'"
                v-model="user.bio"
                name="bio"
                rows="5"
              ></textarea>
            </div>

            <span
              v-show="errors.has('form-1.bio')"
              class="help-block"
            >{{ errors.first('form-1.bio') }}</span>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" class="btn btn-primary">Ajouté</button>
        </div>
      </form>
    </modal>
    <div class="col-md-12 p-5">
      <div class="box card">
        <div class="box-header">
          <button class="btn btn-success float-right mb-4" data-toggle="modal" data-target="#popup">
            <i class="fa fa-user-plus"></i>
            Add User
          </button>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive">
          <table class="table table-hover">
            <thead class="thead-dark">
              <tr>
                <th></th>
                <th>ID</th>
                <th>User</th>
                <th>Email</th>
                <th>Description</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" :key="user.id">
                <td>
                  <img class="rounded-circle img-sm" :src="'/img/'+user.photo" :alt="user.name">
                </td>
                <td>{{ user.id }}</td>
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td>{{user.bio}}</td>
                <td>{{user.role}}</td>
                <td>
                  <a href="#">
                    <i class="fa fa-edit"/>
                  </a>
                  <a href="#">
                    <i class="fa fa-trash text-danger"/>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      email: "",
      user: {},
      confirmation: ""
    };
  },
  computed: {
    users: function() {
      return this.$store.getters.users;
    }
  },
  created() {
    this.$store.dispatch("loadusers");
    eventBus.$on("useradded", this.read);
  },
  methods: {
    read: function(read) {
      console.log(read);
    },
    add_user() {
      // this.$store.dispatch("putuser", this.user);
      axios
        .post("api/putuser", this.user)
        .then(res => {
          // console.log(res.data.user);
          // eventBus.$emit('useradded', res.data.users)
          // context.commit('putuser', res.data.user);
        })
        .catch(err => {
          var ty = JSON.parse(err);
          console.log(ty);

          // console.log(JSON.stringify(err));
          // console.log(err.message);
        });
      // $("#popup .close").click();
    },
    validateForm(scope) {
      this.$validator.validateAll(scope).then(result => {
        if (result) {
          this.add_user();

          // eslint-disable-next-line
          // console.log("anasxx");
          // alert('Form Submitted!');
        }
      });
    }
  }
};
</script>
