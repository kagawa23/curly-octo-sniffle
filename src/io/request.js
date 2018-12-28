const HOST_NAME = 'https://api.homestyler.com';

export function fetchDesigns(offset = 0, limit = 5) {
  // return fetch().then(resp => resp.json())
  return new Promise(resolve => {
    wx.request({
      url: `${HOST_NAME}/search-design/api/v1/search/design/case/3d/bySearchTerm?sort=sort asc,updateDate desc&brilliant=&offset=${offset}&limit=${limit}&filterQuery=&searchTerm=`,
      success: resolve,
      fail: err => {
        console.log(err);
      },
    });
  }).catch(err => console.log(err));
}

export function fetchDesignDetail(assetId) {
  return new Promise(resolve => {
    wx.request({
      url: `${HOST_NAME}/search-design/api/v1/search/design/case/3d/byId/${assetId}`,
      success: data => resolve([null, data]),
      fail: err => resolve([err]),
    });
  });
}
