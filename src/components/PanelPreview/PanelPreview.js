import localConfig from './../../local-config.js'

import domtoimage from "dom-to-image-more";
import FitText from './FitText.vue'
import dayjs from "dayjs"

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
      previeImageDelay: 3000,
      isPreviewRendering: false,
      isCoverImageLandscape: false
    }
  }, 
  watch: {
    'db.localConfig.coverImageBase64' () {
      this.updatePreviewImage()
    }
  },
  computed: {
    computedCanvasStyle () {
      let style = {}

      let localConfig = this.db.localConfig

      style['background-image'] = `url(${localConfig.backgroundImage})`
      
      let size = localConfig.canvasSize + 'px'
      style['width'] = size
      style['height'] = size

      if (localConfig.previewDebug) {
        let debugZoom = Number(localConfig.debugZoom)
        let debugZoomMargin = (debugZoom - 1) / 2 * 100
        style['transform'] = `translateX(${debugZoomMargin}%) translateY(${debugZoomMargin}%) scale(${debugZoom})`
      }

      // console.log(Number(localConfig.coverBackgroundPosition) * 100 + '%')
      // style['background-position'] = Number(localConfig.coverBackgroundPosition) * 100 + '%'
      

      return style
    },
    computedCoverImageSrc () {
      if (this.db.localConfig.coverImageBase64) {
        return this.db.localConfig.coverImageBase64
      }
      else {
        return './assets/cover/white-faced-heron-7469267_960_720.jpg'
      }
    },
    computedCoverImageStyle () {
      let style = {}
      let localConfig = this.db.localConfig
      style['background-image'] = `url(${this.computedCoverImageSrc})`

      style['background-color'] = localConfig.coverBackgroundColor

      // console.log(Number(localConfig.coverBackgroundPosition) * 100 + '%')
      let position = Number(localConfig.coverBackgroundPosition) * 100 + '%'
      if (this.isCoverImageLandscape) {
        style['background-position'] = `${position} center`
      }
      else {
        style['background-position'] = `center ${position}`
      }

      if (this.db.localConfig.tagPosition === 'right') {
        style['text-align'] = 'right'
        // text-align: right;
      }
      
      return style
    },
    computedCoverTitleStyle () {
      let style = {}
      let localConfig = this.db.localConfig

      style['font-family'] = localConfig.titleFont

      return style
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
        tags = tags.split('\n').map(t => t.trim())
      }
      return tags
    },
    computedTagStyle () {
      let style = {}
      let localConfig = this.db.localConfig

      style['font-family'] = localConfig.tagFont

      return style
    },
    computedFittyOptions() {
      return {
        minSize: 16,
        maxSize: 100,
        multiLine: false
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.updatePreviewImage()
    }, 1000)
  },
  methods: {
    updatePreviewImage () {
      if (this.db.localConfig.previewDebug) {
        return false
      }

      clearTimeout(this.previeImageTimer)
      this.isPreviewRendering = true

      this.previeImageTimer = setTimeout(() => {
        domtoimage
          .toPng(this.$refs.Canvas)
          .then((dataUrl) => {
            // var img = new Image();
            // img.src = dataUrl;
            // document.body.appendChild(img);
            this.$refs.PreviewImage.src= dataUrl
            this.isPreviewRendering = false
          })
          .catch(function (error) {
            console.error("oops, something went wrong!", error);
            this.isPreviewRendering = false
          });
      }, this.previeImageDelay)
    },
    save () {
      let dataUrl = this.$refs.PreviewImage.src
      let time = dayjs().format('YYYYMMDD-HHmm')
      let title = this.db.localConfig.title.trim()
      if (title.length > 10) {
        title = title.slice(0, 10).trim()
      }
      let filename = time + '-' + title + '.png'

      let link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    detectCoverImageSize(e) {
      // console.log(e.target)
      let w = e.target.width
      let h = e.target.height

      this.isCoverImageLandscape = (w > h)
    }
  }
}

for (let name in localConfig) {
  app.watch['db.localConfig.' + name] = function () {
    this.updatePreviewImage()
  }
}

export default app