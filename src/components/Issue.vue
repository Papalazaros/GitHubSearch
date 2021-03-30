<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <span class="property">
                    {{ repositoryLink }}
                </span>
                <span class="property">
                    <a :href="item.html_url">#{{ item.number }}</a>
                </span>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <span class="property">
                    <a :href="item.url">{{ item.title }}</a>
                </span>
            </div>
        </div>
        <div v-if="item.body" class="row">
            <div class="col body">
                <span class="property">
                    {{ item.body | truncate(150, '...') }}
                </span>
            </div>
        </div>
        <div v-if="item.labels && item.labels.length" class="row">
            <div class="col body tag">
                <span v-for="label in item.labels" :key="label.id" :style="{'color': `#${label.color}`}" class="property">
                    <font-awesome-icon icon="tag" />
                    {{ label.name }}
                </span>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <span class="property">
                    <b>{{ item.user.login }}</b> opened {{ item.created_at | formatDate }}
                </span>
                <span v-if="item.comments" class="property">
                    {{ item.comments }} comment(s)
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Issue',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  computed: {
    repositoryLink() {
      return this.item.repository_url.replace('https://api.github.com/repos/', '');
    },
  },
};
</script>

<style scoped>
.body {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 100%;
}
.tag {
    text-transform: lowercase;
}
</style>
