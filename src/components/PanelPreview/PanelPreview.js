import localConfig from './../../local-config.js'

import domtoimage from "dom-to-image-more";
import FitText from './FitText.vue'

let app = {
  props: ['db'],
  components: {
    // DataTaskManager: () => import(/* webpackChunkName: "components/DataTaskManager" */ './DataTaskManager/DataTaskManager.vue')
    FitText
  },
  data () {    
    this.$i18n.locale = this.db.localConfig.locale
    return {
      previeImageTimer: null,
      previeImageDelay: 100,
    }
  }, 
  watch: {
  },
  computed: {
    computedStyle () {
      let style = {}

      let localConfig = this.db.localConfig

      style['background-image'] = `url(${localConfig.backgroundImage})`
      
      let size = localConfig.canvasSize + 'px'
      style['width'] = size
      style['height'] = size

      return style
    },
    computedCoverImageStyle () {
      let style = {}
      let localConfig = this.db.localConfig

      // style['background-image'] = `url(${localConfig.coverImage})`
      style['background-image'] = `url(./assets/cover/white-faced-heron-7469267_960_720.jpg)`

      return style
    },
    computedCoverTitleStyle () {
      let style = {}
      let localConfig = this.db.localConfig

      style['font-family'] = localConfig.titleFont

      return style
    },
    tags () {
      return this.db.localConfig.tags.split('\n').map(t => t.trim())
    },
    computedTagStyle () {
      let style = {}
      let localConfig = this.db.localConfig

      style['font-family'] = localConfig.tagFont

      return style
    }
  },
  mounted() {
    setTimeout(() => {
      this.updatePreviewImage()
    }, 1000)
  },
  methods: {
    updatePreviewImage () {
      clearTimeout(this.previeImageTimer)

      this.previeImageTimer = setTimeout(() => {
        domtoimage
          .toPng(this.$refs.Canvas)
          .then((dataUrl) => {
            // var img = new Image();
            // img.src = dataUrl;
            // document.body.appendChild(img);
            this.$refs.PreviewImage.src= dataUrl
          })
          .catch(function (error) {
            console.error("oops, something went wrong!", error);
          });
      }, this.previeImageDelay)
    }
  }
}

for (let name in localConfig) {
  app.watch['db.localConfig.' + name] = function () {
    this.updatePreviewImage()
  }
}

export default app