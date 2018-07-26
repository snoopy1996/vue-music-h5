<template>
  <mu-dialog width="360" transition="slide-right" fullscreen :open="openSearchPage" @close="close">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button @click="close" icon slot="left">
        <mu-icon value="keyboard_arrow_left"></mu-icon>
      </mu-button>
      <mu-text-field v-model="value8" label="Full Width" full-width></mu-text-field>
    </mu-appbar>
  </mu-dialog>
</template>

<script>
export default {
  props: {
    openSearchPage: {
      type: Boolean
    }
  },
  methods: {
    close() {
      this.$emit('closeSearchPage');
    }
  }
};
</script>

<style>
</style>
