<template>
  <div class="row">
    <modal :id="'popup'">
      <form @submit.prevent="login" slot="modal-form" @keydown="form.onKeydown($event)">
        <div class="modal-header">
          <h5 class="modal-title" id="popupTitle">Modal title</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>

        <div class="modal-body" slot="modal-body">
          <div :class="{'has-error': form.errors.has('name') }" class="form-group">
            <label>Name</label>

            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-eye"></i>
              </div>
              <input type="text" class="form-control" v-model="form.name" name="name">
            </div>

            <has-error :form="form" field="name"></has-error>
          </div>
          <div :class="{'has-error': form.errors.has('email') }" class="form-group">
            <label>Email</label>

            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-envelope"></i>
              </div>
              <input type="text" class="form-control" v-model="form.email" name="email">
            </div>

            <has-error :form="form" field="email"></has-error>
          </div>
          <div :class="{ 'has-error': form.errors.has('password') }" class="form-group">
            <label>Mot De Pass</label>

            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-key"></i>
              </div>
              <input v-model="form.password" class="form-control" type="password" name="password">
              <!-- <input v-model="confirmation" type="text" name="password_confirmation"> -->
            </div>

            <has-error :form="form" field="password"></has-error>
          </div>
          <div :class="{ 'has-error': form.errors.has('role') }" class="form-group">
            <label>Role</label>

            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-key"></i>
              </div>
              <select v-model="form.role" name="role">
                <option value="user">User</option>
                <option value="editeur">Editeur</option>
              </select>
              <!-- <input v-model="form.password" class="form-control" type="password" name="password"> -->
              <!-- <input v-model="confirmation" type="text" name="password_confirmation"> -->
            </div>

            <has-error :form="form" field="role"></has-error>
          </div>
          <div :class="{ 'has-error': form.errors.has('bio') }" class="form-group">
            <label>Description</label>

            <div class="input-group">
              <div class="input-group-addon">
                <i class="fa fa-align-left"></i>
              </div>
              <textarea class="form-control" v-model="form.bio" name="bio" rows="5"></textarea>
            </div>
            <has-error :form="form" field="bio"></has-error>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button type="submit" :disabled="form.busy" class="btn btn-primary">Ajouté</button>
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
              <tr v-for="(user, index) in userspagination" :key="index">
                <td>
                  <img class="rounded-circle img-sm" :src="'/img/'+user.photo" :alt="user.name">
                </td>
                <td>{{ user.id }}</td>
                <td>{{user.name}}</td>
                <td>{{user.email}}</td>
                <td>{{user.bio}}</td>
                <td>{{user.role}}</td>
                <td>
                  <router-link :to="{name:'edituser',params:{id:user.id}}">
                    <i class="fa fa-edit"/>
                  </router-link>
                  <a href="#" @click="destroyuser(user)">
                    <i class="fa fa-trash text-danger"/>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- /.box-body -->
        <!-- box-footer -->
        <div class="box-footer clearfix">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li class="page-item" :class="{'disabled': startpage<5}">
                <a class="page-link" @click="prev()" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item" v-for="(item, index) in nbrpage" :key="index">
                <a class="page-link" @click="curentpage(index+1)">{{ index+1 }}</a>
              </li>
              <li class="page-item" :class="{'disabled': endpage>=users.length}">
                <a @click="next()" class="page-link" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
        <!-- /.box-footer -->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "user",
  data() {
    return {
      startpage: 0,
      endpage: 5,
      itemsx: [],
      email: "",
      user: {},
      perpage: 5,
      confirmation: "",
      form: new Form({
        name: "",
        email: "",
        password: "",
        photo: "avatar2.png"
      })
    };
  },
  computed: {
    users: function() {
      return this.$store.getters.users;
    },
    nbrpage: function() {
      // console.log(Math.ceil(this.users.length / 5));

      return Math.ceil(this.users.length / this.perpage);
    },
    userspagination: {
      get: function() {
        return this.sliceItems(this.startpage, this.endpage);
      },
      set: function(newValue) {
        this.itemsx = newValue;
      }
    }
  },
  created() {
    this.$store.dispatch("loadusers");
    eventBus.$on("useradded", this.read);
  },
  methods: {
    destroyuser: function(user) {
      Swal({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then(result => {
        if (result.value) {
          // console.log(user);
          this.$store.dispatch("destroyuser", user);

          // Swal("Deleted!", "Your file has been deleted.", "success");
        }
      });
    },
    curentpage(index) {
      index -= 1;
      this.startpage = this.perpage * index;
      this.endpage = this.perpage * index + this.perpage;
      this.userspagination = this.sliceItems(this.startpage, this.endpage);

      this.userspagination;
    },
    next: function() {
      this.startpage = this.endpage;
      this.endpage += this.perpage;
      this.userspagination = this.sliceItems(this.startpage, this.endpage);

      this.userspagination;
    },
    prev: function() {
      this.endpage = this.startpage;
      this.startpage -= this.perpage;
      this.userspagination = this.sliceItems(this.startpage, this.endpage);

      this.userspagination;
    },

    sliceItems: function(start, end) {
      this.itemsx = this.users.slice(start, end);

      return this.itemsx;
    },
    login() {
      this.form.post("api/putuser").then(({ data }) => {
        this.add_user(data.user);
        // console.log(data.user);
      });
    },
    read: function(read) {
      console.log(read);
    },
    add_user(user) {
      this.$store.dispatch("putuser", user);

      $("#popup .close").click();
    }
  }
};
</script>
