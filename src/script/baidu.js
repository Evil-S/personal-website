import router from '../router'

const code = 'dfba022b8288c0e453bd2794a50d9795'
// eslint-disable-next-line no-use-before-define
let _hmt = _hmt || [];
(function() {
  let hm = document.createElement('script')
  hm.src = 'https://hm.baidu.com/hm.js?' + code
  hm.id = 'baidu_tj'
  let s = document.getElementsByTagName('script')[0]
  s.parentNode.insertBefore(hm, s)
})()
router.afterEach((to, from) => {
  // eslint-disable-next-line no-use-before-define
  let _hmt = _hmt || [];
  (function() {
    document.getElementById('baidu_tj') &&
      document.getElementById('baidu_tj').remove()
    let hm = document.createElement('script')
    hm.src = 'https://hm.baidu.com/hm.js?' + code
    hm.id = 'baidu_tj'
    let s = document.getElementsByTagName('script')[0]
    s.parentNode.insertBefore(hm, s)
  })()
})
