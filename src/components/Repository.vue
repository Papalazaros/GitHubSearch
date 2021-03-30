<template>
    <div class="container">
        <div class="row">
            <div class="col">
                <span class="property">
                    <a :href="item.html_url">{{ item.full_name }}</a>
                </span>
            </div>
        </div>
        <div v-if="item.description" class="description row">
            <div class="col">
                <span class="property">
                    {{ item.description }}
                </span>
            </div>
        </div>
        <div class="row">
            <div class="col">
                <span class="property">
                    {{ item.stargazers_count }} star(s)
                </span>
                <span v-if="item.language" class="property">
                    {{ item.language }}
                </span>
                <span class="property">
                    {{ item.updated_at | formatDate }}
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'Repository',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.description {
    font-weight: 500;
}
</style>
