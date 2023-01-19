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
      tagPositionList: ['top-right', 'top-left', 'bottom-right', 'bottom-left'],
      tagPositionListIcon: {
        'top-right': '↗',
        'top-left': '↖',
        'bottom-right': '↘',
        'bottom-left': '↙',
      },
      tagsTimer: null
    }
  },
  watch: {
    'db.localConfig.locale'() {
      this.$i18n.locale = this.db.localConfig.locale;
    },
    'db.localConfig.tags' () {
      clearTimeout(this.tagsTimer)

      this.tagsTimer = setTimeout(() => {
        let tags = db.localConfig.tags.trim()
        if (tags.startsWith('#') && tags.indexOf('\n') === -1) {
          db.localConfig.tags = tags.split('#')
            .map(t => t.trim())
            .filter(t => t !== '')
            .join(', ')
        }
      }, 1000)
    }
  },
  computed: {
    
  },
  mounted() {
    
  },
  methods: {
    save () {
      // window.alert('todo')
      this.$parent.$refs.PanelPreview.save()
    },
  }
}

export default app