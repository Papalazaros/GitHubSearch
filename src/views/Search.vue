<template>
    <div v-if="query" class="search container-fluid">
      <div class="loading-message row" v-show="isLoading">
        Loading...
      </div>
      <div class="row" v-show="!isLoading">
        <ResultsTypeSwitcher class="col-12 col-md-3"
          @change="(source) => searchType = source"
          :search-sources="searchSources"
          :search-results="searchResults"
        />
        <ResultsDisplay class="col"
          :results-title="`Showing ${resultsCount} available ${searchType}`"
          :items="visibleSearchResults.items"
        >
          <template v-slot:item="{ item, index }">
            <component class="search-result"
              :class="{'last-search-result': index === visibleSearchResults.items.length - 1}"
              :is='searchSources[searchType].component'
              :key='item.id'
              :item='item'
            />
          </template>
        </ResultsDisplay>
        <Pagination
          v-if="resultsCount && visibleSearchResults.total_count > itemsPerPage"
          class="col-12"
          @change="(pageNumber) => currentPage = pageNumber"
          :items-per-page="itemsPerPage" :current-page="currentPage"
          :page-number="currentPage"
          :items="visibleSearchResults.items"
          :total-items-count="visibleSearchResults.total_count"
        />
      </div>
    </div>
</template>

<script>
import debounce from 'lodash.debounce';
import { getPaginatedResponse } from '../services/GitHubService';

const Repository = () => import('../components/Repository.vue');
const Issue = () => import('../components/Issue.vue');
const User = () => import('../components/User.vue');

export default {
  name: 'Search',
  components: {
    Repository,
    Issue,
    User,
    Pagination: () => import('../components/Pagination.vue'),
    ResultsDisplay: () => import('../components/ResultsDisplay.vue'),
    ResultsTypeSwitcher: () => import('../components/ResultsTypeSwitcher.vue'),
  },
  computed: {
    searchSourceKeys() {
      return Object.keys(this.searchSources);
    },
    visibleSearchResults() {
      return this.searchResults[this.searchType] || {};
    },
    resultsCount() {
      return this.visibleSearchResults?.items?.length;
    },
  },
  methods: {
    async updateResults(forceUpdate) {
      if (!this.query) return;
      this.isLoading = true;
      const promises = [];

      for (let i = 0; i < this.searchSourceKeys.length; i++) {
        const objectName = this.searchSourceKeys[i];
        if (this.searchType !== objectName && this.searchResults[objectName] && !forceUpdate) continue;
        const promise = getPaginatedResponse(objectName, this.query, this.currentPage, this.itemsPerPage)
          .then((response) => {
            if (response && !response.isAxiosError) {
              this.$set(this.searchResults, objectName, response.data);
            }
          });

        promises.push(promise);
      }

      await Promise.all(promises);
      this.isLoading = false;
    },
  },
  props: {
    query: {
      type: String,
      required: false,
      default: null,
    },
  },
  watch: {
    currentPage() {
      this.updateResults();
    },
    searchType() {
      this.currentPage = 1;
      this.updateResults();
    },
    query: {
      handler: debounce(function () {
        this.updateResults(true);
      }, 500),
    },
  },
  data() {
    return {
      searchResults: {},
      searchType: null,
      currentPage: 1,
      itemsPerPage: 10,
      isLoading: true,
      searchSources: {
        repositories: {
          component: Repository,
          icon: 'book',
        },
        issues: {
          component: Issue,
          icon: 'exclamation-circle',
        },
        users: {
          component: User,
          icon: 'users',
        },
      },
    };
  },
};
</script>
<style>
.property {
  margin: 0px 5px 0px 0px;
}
.search {
  margin: 15px 0px;
}
.loading-message {
  justify-content: center;
  font-weight: bold;
  font-size: xx-large;
}
</style>
