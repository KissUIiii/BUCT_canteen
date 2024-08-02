Page({
  data: {
    searchText: '',
    canteenTags: [
      { id: 1, name: '紫竹第一食堂', selected: false },
      { id: 2, name: '紫竹第二食堂', selected: false },
      { id: 3, name: '紫竹第三食堂', selected: false },
      { id: 4, name: '紫竹第四食堂', selected: false },
      { id: 5, name: '民族食堂', selected: false },
      { id: 6, name: '玉兰餐厅', selected: false },
    ],
    cuisineTags: [
      { id: 7, name: '东北菜', selected: false },
      { id: 8, name: '粤菜', selected: false },
      { id: 9, name: '川菜', selected: false },
      { id: 10, name: '湘菜', selected: false }
    ],
    flavorTags: [
      { id: 11, name: '轻食', selected: false },
      { id: 12, name: '油炸', selected: false },
      { id: 13, name: '清淡', selected: false },
      { id: 14, name: '香辣', selected: false }
    ]
  },
  onInputChange: function(e) {
    this.setData({
      searchText: e.detail.value
    });
  },
  onTagClick: function(e) {
    const { id, type } = e.currentTarget.dataset;
    let updatedTags;
    
    if (type === 'canteen') {
      updatedTags = this.data.canteenTags.map(tag => {
        if (tag.id === id) {
          tag.selected = !tag.selected;
        }
        return tag;
      });
      this.setData({ canteenTags: updatedTags });
    } else if (type === 'cuisine') {
      updatedTags = this.data.cuisineTags.map(tag => {
        if (tag.id === id) {
          tag.selected = !tag.selected;
        }
        return tag;
      });
      this.setData({ cuisineTags: updatedTags });
    } else if (type === 'flavor') {
      updatedTags = this.data.flavorTags.map(tag => {
        if (tag.id === id) {
          tag.selected = !tag.selected;
        }
        return tag;
      });
      this.setData({ flavorTags: updatedTags });
    }
  },
  onSearch: function() {
    const selectedCanteenTags = this.data.canteenTags.filter(tag => tag.selected).map(tag => tag.name);
    const selectedCuisineTags = this.data.cuisineTags.filter(tag => tag.selected).map(tag => tag.name);
    const selectedFlavorTags = this.data.flavorTags.filter(tag => tag.selected).map(tag => tag.name);

    wx.showToast({
      title: `搜索条件:\n食堂: ${selectedCanteenTags.join(', ')}\n菜系: ${selectedCuisineTags.join(', ')}\n口味: ${selectedFlavorTags.join(', ')}\n菜品: ${this.data.searchText}`,
      icon: 'none'
    });
  }
});
