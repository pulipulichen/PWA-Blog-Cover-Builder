<template>
  <div class="fit-container"><div class="fit" ref="fit">{{ text }}</div></div>
</template>

<script>
import fitty from "fitty";

export default {
  name: "FitText",
  props: {
    text: {
      type: String,
    },
    options: {
      type: Object,
      required: false,
      default() {
        return {
          minSize: 16,
          maxSize: 512,
          multiLine: true
        };
      }
    }
  },
  data() {
    return {
      $_fitty: undefined
    };
  },
  watch: {
    text () {
      this.$_fitty.fit()
    }
  },
  destroyed() {
    this.$_fitty.unsubscribe();
  },
  mounted() {
    this.init()
  },
  methods: {
    init () {
      try {
        if (this.$el.clientWidth === 0) {
          throw new Error('wait')
        }
        this.$_fitty = fitty(this.$refs.fit, this.options);

        setTimeout(() => {
          this.$_fitty.fit()
        }, 100)
      }
      catch (e) {
        setTimeout(() => {
          this.init()
        }, 500)
      }
    }
  }
};
</script>

<style scoped>
.fit {
  display: inline-block;
  white-space: nowrap;
  line-height: 100%;
}

.fit-container {
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
