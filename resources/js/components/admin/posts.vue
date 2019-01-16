<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-12">
        <ul>
          <li v-for="(item, index) in itemxbc" :key="index">{{ item }}</li>
        </ul>
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
            <li class="page-item" :class="{'disabled': endpage>=items.length}">
              <a @click="next()" class="page-link" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>

        <a @click="prev()" :class="{'disabled': startpage<5}" class="btn btn-primary">prev</a>
        <img src="img/dashbord.svg" class="img-fluid">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "posts",
  data() {
    return {
      startpage: 0,
      endpage: 5,
      itemsx: []
    };
  },
  computed: {
    items: function() {
      return this.$store.getters.users;
    },
    nbrpage: function() {
      return Math.ceil(this.items.length / 5);
    },
    itemxbc: {
      get: function() {
        return this.sliceItems(this.startpage, this.endpage);
      },
      set: function(newValue) {
        this.itemsx = newValue;
      }
    }
  },
  methods: {
    curentpage(index) {
      console.log(index);
      index -= 1;
      this.startpage = 5 * index;
      this.endpage = 5 * index + 5;
      console.log("start page", this.startpage);

      console.log("end  page", 5 * index + 5);

      this.itemxbc = this.sliceItems(this.startpage, this.endpage);

      this.itemxbc;
    },
    next: function() {
      this.startpage = this.endpage;
      this.endpage += 5;
      this.itemxbc = this.sliceItems(this.startpage, this.endpage);

      this.itemxbc;
    },
    prev: function() {
      this.endpage = this.startpage;
      this.startpage -= 5;
      this.itemxbc = this.sliceItems(this.startpage, this.endpage);
      console.log(this.startpage);
      console.log(this.endpage);

      this.itemxbc;
    },

    sliceItems: function(start, end) {
      this.itemsx = this.items.slice(start, end);

      return this.itemsx;
    }
  }
};
</script>
