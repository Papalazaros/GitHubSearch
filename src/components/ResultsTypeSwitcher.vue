<template>
    <div>
      <a class="row no-gutters search-source"
        :class="{'last-search-source': index === searchSourceKeys.length - 1, 'active-search': source === searchType}"
        :key="source"
        @click="searchType = source"
        v-for='(source, index) in searchSourceKeys'
      >
        <div class="col-2">
            <font-awesome-icon :icon="searchSources[source].icon" />
        </div>
        <div class="col-6">
            {{ source }}
        </div>
        <div v-if="searchResults[source]" class="col-4">
            <div class="search-result-count">{{ searchResults[source].total_count | prettify }}</div>
        </div>
      </a>
    </div>
</template>

<script>
export default {
  name: 'ResultsTypeSwitcher',
  created() {
    [this.searchType] = this.searchSourceKeys;
  },
  computed: {
    searchSourceKeys() {
      return Object.keys(this.searchSources);
    },
  },
  watch: {
    searchType: {
      handler() {
        if (this.searchType) {
          this.$emit('change', this.searchType);
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      searchType: null,
    };
  },
  props: {
    searchSources: {
      type: Object,
      required: true,
    },
    searchResults: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style>
.search-source {
  border-left: 1px solid lightgrey;
  border-right: 1px solid lightgrey;
  border-top: 1px solid lightgrey;
  border-radius: 5px;
  padding-top: 5px;
  padding-bottom: 5px;
  text-align: center;
  align-items: center;
  text-transform: capitalize;
  margin-left: -5px;
}
.search-source:hover {
  cursor: pointer;
}
.last-search-source {
  border-bottom: 1px solid lightgrey;
  border-radius: 5px;
}
.active-search {
  border-left: solid orange 5px;
}
.search-result-count {
  background-color: grey;
  border-radius: 15px;
  text-align: center;
  color: white;
  width: 50px;
  margin: 0px 25px;
}
</style>
