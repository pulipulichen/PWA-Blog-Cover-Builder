/* global Node */

let Index = {
  props: ['db', 'view', 'search'],
  components: {
    DataManager: () => import(/* webpackChunkName: "components/DataManager" */ './DataManager/DataManager.vue'),
    PanelConfiguration: () => import(/* webpackChunkName: "components/PanelConfiguration" */ './PanelConfiguration/PanelConfiguration.vue'),
    PanelPreview: () => import(/* webpackChunkName: "components/PanelPreview" */ './PanelPreview/PanelPreview.vue'),
    DropZone: () => import(/* webpackChunkName: "components/DropZone" */ './DropZone/DropZone.vue'),
  },
  data() {
    this.$i18n.locale = this.db.config.localConfig
    return {
    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
    setTimeout(() => {
      this.db.localConfig.previewDebug = true
    }, 1000)
  },
  methods: {
    onPaste (e) {
      let tagName = e.target.tagName.toLowerCase();
      if (tagName === 'input' || tagName === 'textarea') {
        return false
      }

      if (e.clipboardData.files[0]) {
        let data = e.clipboardData.items[0].getAsFile();
        let fr = new FileReader();
        
        fr.onloadend = () => {
          this.db.localConfig.coverImageBase64 = fr.result
        }
        fr.readAsDataURL(data)
      }
      else {
        this.db.localConfig.title = e.clipboardData.getData('text')
      }
    },
    onDropString (str) {
      this.db.localConfig.title = str
    },
    onDropFiles: async function (files) {
      this.db.localConfig.coverImageBase64 = await this.db.utils.FileUtils.readBase64(files[0])
    }
  }
}
// import IndexMethodsPostMessage from './IndexMethodsPostMessage.js'
// IndexMethodsPostMessage(Index)

//import IndexMethodsTest from './IndexMethodsTest.js'
//IndexMethodsTest(Index)

// import IndexMethodsTask from './IndexMethodsTask.js'
// IndexMethodsTask(Index)

export default Index