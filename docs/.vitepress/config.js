const version =
  process.env.TARGET_VERSION || require('../../package.json').version

export default {
  themeConfig: {
    siteTitle: `Vue Listview 3`,
    repo: 'laomao800/vue-listview',
    repoLabel: '仓库地址',
    nav: [
      {
        text: 'Changelog',
        link: 'https://github.com/laomao800/vue-listview3/blob/master/CHANGELOG.md',
      },
    ],
    sidebar: [
      {
        text: 'Listview',
        items: [
          { text: '使用', link: '/' },
          { text: 'Props', link: '/props' },
          { text: 'Prop: filterButtons', link: '/prop-filter-buttons' },
          { text: 'Prop: filterFields', link: '/prop-filter-fields' },
          { text: 'Prop: tableColumns', link: '/prop-table-columns' },
          { text: 'Slots', link: '/slots' },
          { text: 'Methods & Events', link: '/methods-and-events' },
        ],
      },
      {
        text: 'Listview Container',
        items: [{ text: 'Props', link: '/listview-container' }],
      },
    ],
  },
}
