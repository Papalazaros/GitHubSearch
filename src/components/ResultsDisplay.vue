<template>
    <div>
        <div class="search-results" v-if="items && items.length">
            <div v-if="resultsTitle" class="results-title row">
                <span>{{ resultsTitle }}</span>
            </div>
            <div v-for='(item, index) in items' :key='index' class="row">
                <slot name="item" v-bind:item="item" v-bind:index="index"></slot>
            </div>
        </div>
        <div class="no-results-message" v-else>
            No results found
        </div>
    </div>
</template>

<script>
export default {
  name: 'ResultsDisplay',
  props: {
    items: {
      type: Array,
      required: false,
      default: null,
    },
    resultsTitle: {
      type: String,
      required: false,
      default: null,
    },
  },
};
</script>
<style>
.search-results {
  margin: 15px;
}
.no-results-message {
  text-align: center;
}
.search-result {
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  border-top: 1px solid lightgrey;
  border-radius: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
}
.last-search-result {
  border-bottom: 1px solid lightgrey;
  border-radius: 5px;
}
.results-title {
  font-weight: 500;
}
</style>
