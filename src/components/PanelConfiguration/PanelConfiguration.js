let app = {
  props: ['db'],
  components: {
    // DataTaskManager: () => import(/* webpackChunkName: "components/DataTaskManager" */ './DataTaskManager/DataTaskManager.vue')
  },
  data () {    
    this.$i18n.locale = this.db.localConfig.locale
    return {
      scaleList: [0.5, 1, 2],
      positionList: [0, 0.5, 1],
      tagPositionList: ['right', 'left']
    }
  },
  watch: {
    'db.localConfig.locale'() {
      this.$i18n.locale = this.db.localConfig.locale;
    },
  },
  computed: {
    
  },
  mounted() {
    
  },
  methods: {
    save () {
      // window.alert('todo')
      this.$parent.$refs.PanelPreview.save()
    }
  }
}

export default app