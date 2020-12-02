<template>
  <div
    :style="[{'width': '100%'},
    {'height': fullscreen ? '100vh' : 'calc(100vh - 110px)'},
    {'display': extendStyle.display}]">
    <ExplorerComponent
      ref="ExplorerComponent"
      :maxNeighbours="maxNeighbours"
      :initialNodeDisplay="initialNodeDisplay"
      :graphStyleData="graphStyleData"
      :updateStyle="updateStyle"
      :getNeighbours="getNeighbours"
      :nodes="state.nodesAndRelationships.nodes"
      :relationships="state.nodesAndRelationships.relationships"
      :fullscreen="fullscreen"
      :frameHeight="frameHeight"
      :assignVisElement="assignVisElement"
      :getAutoCompleteCallback="(callback) => { this.autoCompleteCallback = callback }"
      :setGraph="setGraph"
      @clickNode="handleClickNode"
    ></ExplorerComponent>
  </div>
</template>
<script type="text/ecmascript-6">
  import bolt from './services/bolt/bolt'
  import ExplorerComponent from './components/Explorer'
  import { dim } from './constants'
  import Vue from 'vue'
  import { v1 as neo4j } from 'neo4j-driver/lib/browser/neo4j-web.min.js'
  import setting from '@/settings'

  export default{

    data(){
      return{
        dim: dim,
        state: {
          nodesAndRelationships: {
            nodes: [],
            relationships: []
          },
          justInitiated: true
        },
        graphStyleData: {},
        frameHeight: 500,
        graph: {}
      }
    },
    props: {
      clearAll: {
        type: Boolean,
        default: false
      },
      fullscreen: {
        type: Boolean,
        default: false
      },
      extendStyle: {
        type: Object,
        default() {
          return {}
        }
      },
      maxNeighbours: {
        type: Number,
        default: 1000
      },
      initialNodeDisplay: '',
      assignVisElement: Function,
      records: {
        type: Array,
        default() {
          return [];
        }
      }
    },
    components:{
      ExplorerComponent
    },
    created() {
    },
    mounted() {
      let me = this;
      this.frameHeight = $(this.$el).height() * 1.2;

      this.driver = neo4j.driver(setting.neo4jUrl, neo4j.auth.basic(setting.neo4jUserName, setting.neo4jPassword));

      me.componentWillMount();
    },
    methods: {
      handleClickNode(item) {
        this.$emit('clickNode', item);
      },
      updateStyle(graphStyleData) {
        if (JSON.stringify(graphStyleData) == JSON.stringify(this.graphStyleData)) return;

        let inlineGraphStyleData = {};
        for (let nodeKey in this.graphStyleData) {
          inlineGraphStyleData[nodeKey] = this.graphStyleData[nodeKey];
        }

        for (var nodeKey in graphStyleData) {
          let node = inlineGraphStyleData[nodeKey];
          if (!node) node = {};
          for (var propKey in graphStyleData[nodeKey]) {
            node[propKey] = graphStyleData[nodeKey][propKey];
          }

          inlineGraphStyleData[nodeKey] = node;
        }

        this.graphStyleData = inlineGraphStyleData;
        this.$refs.ExplorerComponent.reloadPanel();
      },
      componentWillMount () {
        if (this.records && this.records.length > 0) {
          this.populateDataToStateFromProps(this)
        }
      },

      shouldComponentUpdate (nextProps) {
        return nextProps.extendStyle !== this.extendStyle ||
          nextProps.records !== this.records ||
          nextProps.graphStyleData !== this.graphStyleData
      },

      populateDataToStateFromProps (props) {
        Vue.set(this.state, 'nodesAndRelationships', bolt.extractNodesAndRelationshipsFromRecordsForOldVis(props.records));
      },

      mergeToList (list1, list2) {
        return list1.concat(list2.filter(itemInList2 => list1.findIndex(itemInList1 => itemInList1.id === itemInList2.id) < 0))
      },

      autoCompleteRelationships (existingNodes, newNodes) {
        if (this.autoComplete) {
          const existingNodeIds = existingNodes.map(node => parseInt(node.id))
          const newNodeIds = newNodes.map(node => parseInt(node.id))

          this.getInternalRelationships(existingNodeIds, newNodeIds)
            .then((graph) => {
              this.autoCompleteCallback && this.autoCompleteCallback(graph.relationships)
            })
            .catch((e) => {})
        }
      },

      getNeighbours (id, currentNeighbourIds = []) {

        const query = `MATCH path = (a)--(o)
                   WHERE id(a) = ${id}
                   AND NOT (id(o) IN[${currentNeighbourIds.join(',')}])
                   RETURN path, size((a)--()) as c
                   ORDER BY id(o)
                   LIMIT ${this.maxNeighbours - currentNeighbourIds.length}`
        return new Promise((resolve, reject) => {

          var session = this.driver.session();

          session.run(query, {})
            .then((result) => {
              let count = result.records.length > 0 ? parseInt(result.records[0].get('c').toString()) : 0
              const resultGraph = bolt.extractNodesAndRelationshipsFromRecordsForOldVis(result.records, false)
              this.autoCompleteRelationships(this.graph._nodes, resultGraph.nodes)
              resolve({...resultGraph, count: count})
              session.close();
            }).catch((error) => {
              console.log(error);
            });
        })
      },

      getInternalRelationships (existingNodeIds, newNodeIds) {
        newNodeIds = newNodeIds.map(bolt.neo4j.int)
        existingNodeIds = existingNodeIds.map(bolt.neo4j.int)
        existingNodeIds = existingNodeIds.concat(newNodeIds)
        const query = 'MATCH (a)-[r]->(b) WHERE id(a) IN $existingNodeIds AND id(b) IN $newNodeIds RETURN r;'
        return new Promise((resolve, reject) => {

          var session = this.driver.session();

          session.run(query, {})
            .then((result) => {
              resolve({...bolt.extractNodesAndRelationshipsFromRecordsForOldVis(result.records, false)})
              session.close();
            }).catch((error) => {
              reject({nodes: [], rels: []})
            });
        })
      },

      setGraph (graph) {
        this.graph = graph
        this.autoCompleteRelationships([], this.graph._nodes)
      }
    },
    watch: {
      records: {
        handler: function(val, oldVal) {
          this.populateDataToStateFromProps(this);
        },
        deep: true
      },
      state: {
        handler: function(val, oldVal) {
        },
        deep: true
      },
      'extendStyle.display': {
        handler: function(val, oldVal) {
          Vue.set(this.state, 'justInitiated', false);
        },
        deep: true
      },
      clearAll: {
        handler: function(val, oldVal) {
          if (val) {
            this.$refs.ExplorerComponent.reloadPanel(true);
          }
        }
      }
    }
  }
</script>
<style  lang="css" src="@/assets/css/common.css" scoped>

.kgWidget {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0
  }

  .kgWidget div,
  .kgWidget li,
  .kgWidget span,
  .kgWidget ul {
    font-size: 13px
  }

  .kgWidget .fontIcon {
    color: #b0b0b0
  }

  .kgWidget .fontIcon:hover {
    color: #424242
  }

  .kgWidget .borderTop {
    border-top: 1px solid #ccc
  }

  .kgWidget .fullHeight {
    height: 100%
  }

  .kgWidget .bold {
    font-weight: 600
  }

  .kgWidget .canDragEl {
    cursor: -webkit-grab;
    cursor: grab
  }

  .kgWidget.cursorGrabbing,
  .kgWidget.cursorGrabbing * {
    cursor: -webkit-grabbing!important;
    cursor: grabbing!important
  }

  .kgWidget input[type=text],
  .kgWidget textarea {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
    resize: none;
    height: 32px;
    line-height: 32px
  }

  .kgWidget textarea {
    height: 30px;
    line-height: 30px
  }

  .kgWidget .confirmMsg {
    text-align: center;
    padding-bottom: 20px;
    padding-top: 20px;
    font-size: 14px;
    font-weight: 700
  }

  .kgWidget .kgWidget {
    height: 100%;
    width: 100%
  }

  .kgWidget .kgWidget:before {
    content: "";
    display: table
  }

  .kgWidget .kgHead {
    position: absolute;
    top: 0;
    left: 0;
    right: 0
  }

  .kgWidget .kgContent,
  .kgWidget .kgHead,
  .kgWidget .kgLeftMenu,
  .kgWidget .kgSettings {
    background: #fff
  }

  .kgWidget .kgLeftMenu {
    height: 100%
  }

  .kgWidget .kgContent,
  .kgWidget .kgContent input,
  .kgWidget .kgLeftMenu,
  .kgWidget .kgLeftMenu input {
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
  }

  .kgWidget .kgContent,
  .kgWidget .kgSettings {
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column
  }

  .kgWidget .kgContent {
    overflow: hidden
  }

  .kgWidget .kgHead {
    box-shadow: 0 2px 4px rgba(0, 0, 0, .15)
  }

  .kgWidget .kgLeftMenu,
  .kgWidget .handleArea {
    box-shadow: 0 0 6px 1px rgba(0, 0, 0, .15)
  }

  .kgWidget .kgHeadBox,
  .kgWidget .kgWidgetContainer {
    width: 100%;
    /*min-width: 1280px;*/
    margin: 0 auto;
    height: 100%
  }

  .kgWidget .kgHeadBox .goback {
    display: inline-block;
    font-size: 0;
    padding: 0 10px;
    color: #757575;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
  }

  .kgWidget .kgHeadBox .goback:hover {
    color: #333
  }

  .kgWidget .kgHeadBox .goback i.icon {
    font-size: 20px;
    line-height: 50px
  }

  .kgWidget .kgWidgetContainer {
    box-sizing: border-box;
    padding-top: 60px;
    font-size: 12px
  }

  .kgWidget .kgHead {
    height: 50px;
    line-height: 50px
  }

  .kgWidget .kgHead .kgCancel,
  .kgWidget .kgHead .kgSave {
    display: inline-block;
    margin-left: 10px;
    height: 34px;
    line-height: 34px;
    vertical-align: middle;
    margin-top: 8px;
    width: 88px;
    text-align: center
  }

  .kgWidget .kgHead .kgCancel:not(:hover) {
    color: #ccc!important
  }

  .kgWidget .kgHead .kgSave {
    color: #fff;
    border-radius: 3px
  }

  .kgWidget .kgLeftMenu {
    width: 180px
  }

  .kgWidget .kgContent {
    width: 640px;
    border-right: 1px solid #ccc
  }

  .kgWidget .kgSettings {
    width: 464px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
  }

  .kgWidget .kgTitle {
    font-size: 14px;
    color: #333;
    height: 40px;
    line-height: 40px;
    box-sizing: border-box
  }

  .kgWidget .flexBox {
    display: -webkit-box;
    display: flex
  }

  .kgWidget .dragPreview {
    position: absolute;
    top: 8px;
    left: 16px
  }

  .limitTxt {
    display: inline-block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    vertical-align: top;
    max-width: 86px
  }

  .confirmSave .noHeader {
    height: 0
  }

  .confirmSave .dialogContent {
    text-align: center;
    padding: 14px 0;
    padding-right: 20px;
    height: 36px
  }

  .confirmSave .savePrompt {
    display: inline-block;
    vertical-align: middle;
    margin-top: 5px;
    color: #9e9e9e
  }

  .confirmSave .saveLoader {
    display: inline-block;
    vertical-align: middle;
    margin-right: 22px
  }

  .pointerEvents {
    pointer-events: none
  }

  .kgWidget .widgetBox {
    color: #333;
    font-size: 12px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    height: 100%;
    display: -webkit-box;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column
  }

  .kgWidget .editBoxItem {
    padding: 12px 0;
    padding-left: 10px;
    box-sizing: border-box
  }

  .kgWidget .dragHint {
    opacity: .3;
    padding: 0 0 6px 10px
  }

  .kgWidget .dragTitle {
    font-weight: 700;
    padding: 6px 0 6px 10px
  }

  .kgWidget .widgetList {
    -webkit-box-flex: 1;
    flex: 1
  }

  .kgWidget .widgetListLi {
    width: 180px;
    list-style: none;
    position: relative;
    background: #f4f5f7
  }

  .kgWidget .widgetListLi:not(.active) {
    color: #333!important
  }

  .kgWidget .widgetListLi:not(:hover) {
    background: #fff!important
  }

  .kgWidget .widgetListLi:not(:hover) .addBottomWidget {
    display: none
  }

  .kgWidget .widgetListLi .addBottomWidget {
    position: absolute;
    top: 10px;
    right: 16px;
    cursor: pointer
  }

  .kgWidget .widgetListLi .addBottomWidget .iconMenu {
    color: #ddd;
    font-size: 22px
  }

  .kgWidget .widgetListLi .addBottomWidget .iconMenu:hover {
    color: #999
  }

  .kgWidget .widgetListItem {
    padding: 12px 0 12px 10px;
    box-sizing: border-box;
    width: 100%
  }

  .kgWidget .widgetListItem i {
    font-size: 16px;
    color: #9e9e9e;
    width: 25px;
    display: inline-block
  }

  .editBox {
    font-size: 12px;
    color: #333;
    width: 100%;
    -webkit-box-flex: 1;
    flex: 1;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none
  }

  .editBox .bottomLocation {
    -webkit-box-flex: 1;
    flex: 1;
    min-height: 40px
  }

  .editBox .editArea {
    min-height: 361px;
    display: -webkit-box;
    display: flex;
    width: 100%;
    position: relative;
    background: #fff;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column
  }

  .editBox .editWidgetContainer {
    width: 100%;
    padding: 0 14px;
    box-sizing: border-box;
    padding-top: 10px
  }

  .editBox .editWidgetList {
    width: 100%;
    display: -webkit-box;
    display: flex
  }

  .kgWidget .settingsBox {
    font-size: 13px;
    color: #333;
    -webkit-box-flex: 1;
    flex: 1;
  }

  .kgWidget .settingsBox .widgetSettingsBox {
    padding-top: 24px;
    padding-left: 20px
  }

  .kgWidget .settingsBox .widgetSettingsTitle {
    padding-bottom: 22px
  }

  .kgWidget .settingsBox .widgetSettingsTitle .wsLf>span {
    opacity: 1
  }

  .kgWidget .settingsBox .radioGroup {
    display: inline-block;
    vertical-align: middle
  }

  .kgWidget .extraSettings {
    width: 100%;
    border-bottom: 1px solid #ccc
  }

  .kgWidget .extraSettings .filterSettingsTip {
    color: #b0b0b0;
    vertical-align: middle;
    margin-top: -7px;
    font-weight: 400
  }

  .kgWidget .extraSettings .filterSettingsTip:after {
    white-space: normal;
    width: 299px
  }

  .kgWidget .extraSettings .defaultSettings {
    padding-top: 12px
  }

  .kgWidget .extraSettings .extraSettingsTitle {
    font-size: 14px;
    height: 40px;
    margin-left: 20px;
    line-height: 40px
  }

  .kgWidget .extraSettings .filterSettingsBox {
    max-height: 180px;
    min-height: 88px;
    padding-bottom: 7px
  }

  .kgWidget .extraSettings .filterSettingsItem {
    float: left;
    width: 50%;
    margin-bottom: 4px;
    padding-left: 24px;
    box-sizing: border-box
  }

  .kgWidget .icon-dialpad {
    font-size: 18px
  }

  .kgWidget input[type=text],
  .kgWidget textarea {
    padding: 0 10px;
    width: 320px;
    border-radius: 3px;
    border: 1px solid
  }

  .kgWidget input[type=text]:not(.active):not(:hover),
  .kgWidget textarea:not(.active):not(:hover) {
    border-color: #ccc!important
  }

  .kgWidget input[type=text].halfInput,
  .kgWidget textarea.halfInput {
    width: 90px
  }

  .kgWidget textarea.multipleLine {
    height: auto!important;
    padding: 5px 10px;
    line-height: 20px;
    vertical-align: middle
  }

  .kgWidget input[type=radio] {
    margin-right: 10px
  }

  .kgWidget .addOption {
    display: block;
    margin-left: 40px;
    margin-top: 14px;
    cursor: pointer
  }

  .kgWidget .defaultSettings {
    padding-top: 60px;
    text-align: center;
    color: #333;
    opacity: .3;
    font-size: 14px
  }

  .kgWidget .OAOptionsBox {
    padding-left: 20px;
    margin-top: 28px
  }

  .kgWidget .OAOptionsBox .checkboxLabel {
    margin-bottom: 16px;
    display: block
  }

  .kgWidget .iconDelete {
    margin-top: -12px;
    vertical-align: middle;
    font-size: 18px
  }
</style>
