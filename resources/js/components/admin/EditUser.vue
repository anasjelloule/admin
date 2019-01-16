<template>
  <div class="row">
    <div class="col-md-3">
      <!-- Profile Image -->
      <div class="box box-primary">
        <div class="box-body box-profile text-center">
          <img
            :src="'/img/'+user.photo"
            class="profile-user-img rounded-circle img-fluid"
            alt="User profile picture"
          >

          <h3 class="profile-username text-center">{{ user.name }}</h3>

          <p class="text-muted text-center">{{ user.role }}</p>
        </div>
        <!-- /.box-body -->
      </div>
      <!-- /.box -->
      <!-- About Me Box -->
      <div class="box box-primary">
        <div class="box-header with-border">
          <h3 class="box-title">About Me</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body">
          <p class="text-muted">{{ user.bio }}</p>
        </div>
        <!-- /.box-body -->
      </div>
      <!-- /.box -->
    </div>
    <!-- /.col -->
  </div>
</template>
<script>
export default {
  name: "edit-user",
  props: ["id"],
  computed: {
    user() {
      return this.$store.getters.users.find(user => user.id == this.id);
    }
  },
  created() {
    if (this.$store.getters.users.length == 0)
      this.$router.push({ name: "users" });
    // this.$store.dispatch("loadusers");
  }
};
</script>