module.exports = {
  title: '中原招采网数据分析平台-控制台',

  /**
   * @type {boolean} true | false
   * @description Whether show the settings right-panel
   */
  showSettings: false,

  /**
   * @type {boolean} true | false
   * @description Whether need tagsView
   */
  tagsView: true,

  /**
   * @type {boolean} true | false
   * @description Whether fix the header
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description Whether show the logo in sidebar
   */
  sidebarLogo: true,

  /**
   * @type {string | array} 'production' | ['production', 'development']
   * @description Need show err logs component.
   * The default is only used in the production env
   * If you want to also use it in dev, you can pass ['production', 'development']
   */
  errorLog: 'development',

  // neo4jUrl: 'bolt://sjfxpt.zybtp.com:7687',
  neo4jUrl: 'bolt://ws.zybtp.com:80',
  neo4jUserName: 'neo4j',
  neo4jPassword: 'f35e038dbb5f4ecc8ca8cd0c60e0bc76'
}

