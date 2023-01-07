/* global Node */

let Index = {
  props: ['db', 'view', 'search'],
  components: {
    DataManager: () => import(/* webpackChunkName: "components/DataManager" */ './DataManager/DataManager.vue'),
    PanelConfiguration: () => import(/* webpackChunkName: "components/PanelConfiguration" */ './PanelConfiguration/PanelConfiguration.vue'),
    PanelPreview: () => import(/* webpackChunkName: "components/PanelPreview" */ './PanelPreview/PanelPreview.vue'),
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
  },
  methods: {
  }
}
// import IndexMethodsPostMessage from './IndexMethodsPostMessage.js'
// IndexMethodsPostMessage(Index)

//import IndexMethodsTest from './IndexMethodsTest.js'
//IndexMethodsTest(Index)

// import IndexMethodsTask from './IndexMethodsTask.js'
// IndexMethodsTask(Index)

export default Index