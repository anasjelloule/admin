<template>
  <ul class="sidebar-menu tree" data-widget="tree">
    <li class="header">MAIN NAVIGATION</li>
    <router-link exact-active-class="active" class="treeview" :to="{name:'admin'}" tag="li">
      <a>
        <i class="fa fa-tachometer-alt"></i> Dashboard
      </a>
    </router-link>
    <router-link exact-active-class="active" class="treeview" :to="{name:'users'}" tag="li">
      <a>
        <i class="fa fa-users"></i> Users
      </a>
    </router-link>
    <router-link exact-active-class="active" class="treeview" :to="{name:'posts'}" tag="li">
      <a>
        <i class="fa fa-edit"></i> Posts
      </a>
    </router-link>
    <li class="treeview">
      <a
        href="#"
        onclick="event.preventDefault();
document.getElementById('logout-form').submit();"
      >
        <i class="fa fa-sign-out-alt"></i>
        Log Out
      </a>
    </li>
    <li class="treeview d-none">
      <a href="#">
        <i class="fa fa-dashboard"></i>
        <span>Dashboard</span>
        <span class="float-right-container">
          <i class="fa fa-angle-left float-right"></i>
        </span>
      </a>
      <ul class="treeview-menu" style="display: none;">
        <li>
          <a href="index2.html">
            <i class="fa fa-circle-o"></i> Dashboard v2
          </a>
        </li>
      </ul>
    </li>
  </ul>
</template>

<script>
export default {
  name: "admin-app"
};
</script>
