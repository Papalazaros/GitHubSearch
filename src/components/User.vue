<template>
    <div class="container">
        <a :href="item.html_url">
            <div class="row">
                <div class="col">
                    <span class="property">
                        <img class="user-avatar" :src="item.avatar_url" alt="Avatar">
                    </span>
                    <span class="property">
                        {{ item.login }}
                    </span>
                </div>
            </div>
        </a>
    </div>
</template>

<script>
export default {
  name: 'User',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.user-avatar {
    width: 50px;
    height: 50px;
}
</style>
