<template>
    <div class="pagination">
        <button class="property" @click="changePage(currentPage - 1)" v-if="currentPage > 1">&lt;</button>

        <template v-if="this.currentPage - (this.lookAhead + 1) >= 1">
          <button class="property"  @click="changePage(1)">1</button>
          <span class="property">...</span>
        </template>

        <template v-for="index in lookAhead">
            <button v-if="currentPage - (lookAhead + 1 - index) > 0" :key="(lookAhead - index) + '_previous'" class="property" @click="changePage(currentPage - (lookAhead + 1 - index))">{{ currentPage - (lookAhead + 1 - index) }}</button>
        </template>

        <button class="property" disabled>{{ currentPage }}</button>

        <template v-if="hasMoreResults">
          <template v-for="index in lookAhead">
              <button class="property"
              v-if="(currentPage + index) < lastPage"
              :key="index + '_next'"
              @click="changePage(currentPage + index)">{{ currentPage + index }}</button>
          </template>
          <span v-if="this.currentPage < this.lastPage - (this.lookAhead + 1)" class="property">...</span>
          <button class="property" @click="changePage(lastPage)">{{ lastPage }}</button>
          <button @click="changePage(currentPage + 1)">&gt;</button>
        </template>
    </div>
</template>

<script>
export default {
  name: 'Pagination',
  computed: {
    lastPage() {
      return Math.min(this.maxPages, Math.ceil(this.totalItemsCount / this.itemsPerPage));
    },
    hasMoreResults() {
      return this.totalItemsCount > this.currentPage * this.itemsPerPage
                && this.currentPage !== this.lastPage;
    },
  },
  methods: {
    changePage(pageNumber) {
      this.$emit('change', pageNumber);
    },
  },
  props: {
    items: {
      type: Array,
      required: true,
    },
    totalItemsCount: {
      type: Number,
      required: true,
    },
    currentPage: {
      type: Number,
      required: false,
      default: 1,
    },
    itemsPerPage: {
      type: Number,
      required: false,
      default: 10,
    },
    maxPages: {
      type: Number,
      required: false,
      default: 100,
    },
    lookAhead: {
      type: Number,
      required: false,
      default: 2,
    },
  },
};
</script>
<style scoped>
.pagination {
  justify-content: center;
  padding: 0px;
}
</style>
