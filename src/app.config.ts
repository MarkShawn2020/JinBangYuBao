export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/mock/index',
    'pages/ai/index', 
    'pages/volunteer/index',
    'pages/profile/index',
    'pages/invite/index'
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: '金榜豫报',
    navigationBarTextStyle: 'black'
  },
  tabBar: {
    color: '#999999',
    selectedColor: '#ff6b3d',
    backgroundColor: '#ffffff',
    borderStyle: 'black',
    list: [
      {
        pagePath: 'pages/index/index',
        text: '首页',
        iconPath: 'assets/icons/home.png',
        selectedIconPath: 'assets/icons/home-active.png'
      },
      {
        pagePath: 'pages/mock/index', 
        text: '模拟填报',
        iconPath: 'assets/icons/mock.png',
        selectedIconPath: 'assets/icons/mock-active.png'
      },
      {
        pagePath: 'pages/ai/index',
        text: 'AI',
        iconPath: 'assets/icons/ai.png',
        selectedIconPath: 'assets/icons/ai-active.png'
      },
      {
        pagePath: 'pages/volunteer/index',
        text: '志愿表', 
        iconPath: 'assets/icons/volunteer.png',
        selectedIconPath: 'assets/icons/volunteer-active.png'
      },
      {
        pagePath: 'pages/profile/index',
        text: '我的',
        iconPath: 'assets/icons/profile.png', 
        selectedIconPath: 'assets/icons/profile-active.png'
      }
    ]
  }
})

