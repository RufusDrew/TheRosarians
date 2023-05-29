<template>
    <div class="pagination">
      <button class="pagination__button" :disabled="currentPage === 1" @click="previousPage">Prev</button>
      <span class="pagination__page">{{ currentPage }} / {{ totalPages }}</span>
      <button class="pagination__button" :disabled="currentPage === totalPages" @click="nextPage">Next</button>
    </div>
  </template>
  
  <script>
  export default {
    name: "Pagination",
    props: {
      currentPage: {
        type: Number,
        required: true,
      },
      totalPages: {
        type: Number,
        required: true,
      },
    },
    methods: {
      previousPage() {
        this.$emit("previous-page");
      },
      nextPage() {
        this.$emit("next-page");
      },
    },
  };
  </script>
  
  <style>
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 30px;
    left: 0;
    right: 0;
  }
  
  .pagination__button {
    margin: 0 10px;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    background-color: #4caf50;
    color: white;
    cursor: pointer;
  }
  
  .pagination__button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
  
  .pagination__page {
    margin: 0 10px;
  }
  </style>
  