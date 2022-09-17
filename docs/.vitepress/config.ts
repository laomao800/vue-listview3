import { defineConfig } from 'vitepress'

export default defineConfig({
  themeConfig: {
    siteTitle: `Vue Listview 3`,
    socialLinks: [
      { icon: 'github', link: 'https://github.com/laomao800/vue-listview3' },
    ],
    nav: [
      {
        text: 'Changelog',
        link: 'https://github.com/laomao800/vue-listview3/blob/master/CHANGELOG.md',
      },
    ],
    sidebar: [
      {
        text: 'Listview',
        collapsible: true,
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
        collapsible: true,
        items: [{ text: '使用', link: '/listview-container' }],
      },
      {
        text: '定制',
        collapsible: true,
        items: [
          { text: 'create', link: '/create' },
          { text: 'lvStore', link: '/lv-store' },
        ],
      },
    ],
  },
})
