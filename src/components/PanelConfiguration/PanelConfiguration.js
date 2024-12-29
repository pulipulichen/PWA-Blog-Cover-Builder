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
      tagsTimer: null,
      tools: {
        'Remove Object': 'https://cleanup.pictures/',
        'Remove Background': 'https://zyro.com/tools/image-background-remover',
        'Editor': 'https://pixlr.com/x/',
        'Pixabay': 'https://pixabay.com/',
        'Google Picture': 'https://www.google.com/search'
      },
      onlyImageVerticalAlignList: ['top', 'middle', 'bottom'],
      onlyImageVerticalAlignListIcon: {
        'top': '↑', 
        'middle': '↕', 
        'bottom': '↓'
      },
      onlyImageDirectionList: ['landscape', 'portrait'],
      onlyImageDirectionListIcon: {
        'landscape': '↔', 
        'portrait': '↕'
      }
    }
  },
  watch: {
    'db.localConfig.locale'() {
      this.$i18n.locale = this.db.localConfig.locale;
    },
    'db.localConfig.tags' () {
      clearTimeout(this.tagsTimer)

      this.tagsTimer = setTimeout(() => {
        let tags = this.db.localConfig.tags.trim()
        // console.log(tags)
        if (tags.startsWith('#') && tags.indexOf('\n') === -1) {
          this.db.localConfig.tags = tags.split('#')
            .map(t => t.trim())
            .filter(t => t !== '')
            .join(', ')
        }
      }, 1000)
    }
  },
  computed: {
    computedPixabayURL () {
      let tagsList = this.tags
      // https://pixabay.com/images/search/kvm%20multi-viewer%20monitor/
      return `https://pixabay.com/images/search/${encodeURIComponent(tagsList.join(' || '))}/`
    },
    computedGooglePictureURL () {
      let tagsList = this.tags
      // https://www.google.com/search?q=SecondMonitor%20Linux%20Android&tbm=isch&tbs=il:cl&hl=zh-TW&sa=X&ved=0CAAQ1vwEahcKEwjA8ZeIvNP8AhUAAAAAHQAAAAAQBQ&biw=1732&bih=854
      return `https://www.google.com/search?q=${encodeURIComponent(tagsList.join(' '))}&tbm=isch&tbs=il:cl&hl=zh-TW&sa=X`
    },
    tags () {
      let tags = this.db.localConfig.tags

      if (tags.indexOf('#') > -1) {
        tags = tags.split('#').map(t => t.trim()).filter(t => t !== '')
      }
      else if (tags.indexOf(',') > -1) {
        tags = tags.split(',').map(t => t.trim()).filter(t => t !== '')
      }
      else {
        tags = tags.split('\n').map(t => t.trim()).filter(t => t !== '')
      }
      return tags
    },
  },
  mounted() {
    
  },
  methods: {
    save () {
      // window.alert('todo')
      this.$parent.$refs.PanelPreview.save()
    },
    popup (url) {
      this.db.utils.PopupUtils.openURLFullscreen(url)
    }
  }
}

export default app