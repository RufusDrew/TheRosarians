<template>
  <div class="blog-card-wrap">
    <div class="blog-cards container">
      <div v-if="user" class="toggle-edit">
        <span>Toggle Editing Prayers</span>
        <input type="checkbox" v-model="editPost" />
      </div>
      <BlogCard :post="post" v-for="(post, index) in paginatedBlogPosts" :key="index" />
    </div>
    <pagination :current-page="currentPage" :total-pages="totalPages" @previous-page="previousPage" @next-page="nextPage" />
  </div>
</template>

<script>
import BlogCard from "../components/BlogCard";
import Pagination from "../components/Pagination";

export default {
  name: "prayers",
  components: { BlogCard, Pagination },
  data() {
    return {
      currentPage: 1,
      itemsPerPage: 12
    };
  },
  computed: {
    blogPosts() {
      return this.$store.state.blogPosts;
    },
    user() {
      return this.$store.state.user;
    },
    editPost: {
      get() {
        return this.$store.state.editPost;
      },
      set(payload) {
        this.$store.commit("toggleEditPost", payload);
      },
    },
    totalPages() {
      return Math.ceil(this.blogPosts.length / this.itemsPerPage);
    },
    paginatedBlogPosts() {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.blogPosts.slice(startIndex, endIndex);
    },
  },
  beforeDestroy() {
    this.$store.commit("toggleEditPost", false);
  },
  methods: {
    previousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.blog-cards {
  position: relative;
  .toggle-edit {
    display: flex;
    align-items: center;
    position: absolute;
    top: -70px;
    right: 0;
    span {
      margin-right: 16px;
    }
    input[type="checkbox"] {
      position: relative;
      border: none;
      -webkit-appearance: none;
      background: #fff;
      outline: none;
      width: 80px;
      height: 30px;
      border-radius: 20px;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    input[type="checkbox"]:before {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 20px;
      top: 0;
      left: 0;
      background: #303030;
      transform: scale(1.1);
      transition: 750ms ease all;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
    input:checked[type="checkbox"]:before {
      background: #fff;
      left: 52px;
    }
  }
}
</style>