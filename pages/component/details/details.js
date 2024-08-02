Page({
  data: {
    dish: {
      id: 1,
      name: '烧乳鸽',
      price: 16,
      image: 'https://th.bing.com/th/id/OIP.GoTf0kMVqL1U57bKdO6TzQAAAA?rs=1&pid=ImgDetMain',
      tags: ['粤菜', '烧菜', '甜咸'],
      description: '烧乳鸽的需要的原料有乳鸽、银芽、酱油、盐、蔗糖、生、干辣椒丝、花生油、米醋、花椒油、料酒、香蒜、白醋等。',
      location: '北京化工大学(东校区)',
      window: '东校第三食堂粤菜窗口'
    }
  },
  onLoad: function (options) {
    // 根据传递的菜品ID加载菜品详情
    const dishId = options.id;
    // 模拟加载菜品详情
    // 实际开发中可以通过请求服务器获取数据
    // this.loadDishDetail(dishId);
  },
  loadDishDetail: function (dishId) {
    // 模拟请求数据
    // 这里可以进行实际的数据请求
    console.log('加载菜品详情:', dishId);
  },
  shareDish: function () {
    wx.showToast({
      title: '分享功能暂未实现',
      icon: 'none'
    });
  },
  navigateToRestaurant: function () {
    wx.showToast({
      title: '导航功能暂未实现',
      icon: 'none'
    });
  },
  reviewDish: function () {
    wx.showToast({
      title: '评价投诉功能暂未实现',
      icon: 'none'
    });
  }
});
