<template>
  <div class="ui segments base_box">
    <div class="ui segment">
      <span class="base_text_500"><i class="tags icon"/>标签列表</span>
    </div>
    <div class="ui blue segment">
      <div class="ui label base_margin_b_small base_margin_r_small base_text_point"
           v-for="(tag , index) in tags"
           :key="index"
           @click="tagRoute(tag.id)"
           :style="{'background-color': tag.color, 'color': 'white'}" >{{ tag.name }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagList',

  props: {
    tags: Array
  },

  data() {
    return {}
  },

  methods: {
    tagRoute(id) {
      this.$router.push(`/articles/tag/${id}`)
    }
  }
}
</script>

<style>
</style>
