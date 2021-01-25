/* eslint-disable */

// 房号字母
const indexToWord = [
  'A', 'B', 'C', 'D', 'E',
  'F', 'G', 'H', 'I', 'J',
  'K', 'L', 'M', 'N', 'O',
  'P', 'Q', 'R', 'S', 'T',
  'U', 'V', 'W', 'X', 'Y',
  'Z'
]
// 房号数字
function getIndexToNumber(length) {
  return Array.from({length: length}, function() {
    return arguments[1] + 1
  })
}

const dictionary = {
  room_type: [{
    code: '0',
    id: 0,
    name: '空置'
  }]
},
tagColor = {
  'blue': {
    color: '#00CCFF',
    bgColor: '#00CCFF'
  },
  'orange': {
    color: '#EB7347',
    bgColor: '#EB7347'
  },
  'red': {
    color: '#D24D57',
    bgColor: '#D24D57'
  },
  'green': {
    color: '#26A65B',
    bgColor: '#26A65B'
  },
  'gary': {
    color: '#D0D0D0',
    bgColor: '#D0D0D0'
  },
}
export {
  indexToWord,
  getIndexToNumber,
  dictionary,
  tagColor
}
