var inquirer = require('inquirer')
const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

const title = `\nWelcome To Morse Converter\n`
const morseCode = {
  ' ': '     ',
  0: '−−−−−',
  1: '·−−−−',
  2: '··−−−',
  3: '···−−',
  4: '····−',
  5: '·····',
  6: '−····',
  7: '−−···',
  8: '−−−··',
  9: '−−−-·',
  "'": '·−−−−·',
  ',': '−−··−−',
  '.': '·−·−·−',
  ':': '−−−···',
  '?': '··−−··',
  A: '·−',
  B: '−···',
  C: '−·−·',
  D: '−··',
  E: '·',
  F: '··−·',
  G: '−−·',
  H: '····',
  I: '··',
  J: '·−−−',
  K: '−·−',
  L: '·−··',
  M: '−−',
  N: '−·',
  O: '−−−',
  P: '·−−·',
  Q: '−−·−',
  R: '·−·',
  S: '···',
  T: '−',
  U: '··−',
  V: '···−',
  W: '·−−',
  X: '−··−',
  Y: '−·−−',
  Z: '−−··'
}
let morseCodeOnOff = {}
for (val in morseCode) {
  morseCodeOnOff[val] = morseCode[val]
    .split('')
    .join(' ')
    .replace(/−/g, '===')
    .replace(/·/g, '=')
    .replace(/\s/g, '.')
}
morseCodeOnOff[' '] = '.'
let preOutput = []
let reg = /^[\d\s\w:.,?]*$/

// plan1 sync
// rl.question('input origin ', answer => {
//   answer = answer.toUpperCase()
//   if (!reg.test(answer)) {
//     console.log('含有非法字符')
//     rl.close()
//     return false
//   }
//   for (i in answer) {
//     preOutput.push(morseCode[answer.charAt(i)])
//   }
//   console.log(preOutput.join('/'))
//   rl.close()
// })

questionPromisify = question =>
  new Promise((resolve, reject) => {
    rl.question(question, answer => {
      resolve(answer)
    })
  })

// plan2 promise
// questionPromisify('请输入原文:')
//   .then(answer => {
//     if (!reg.test(answer)) {
//       console.log('含有非法字符')
//       return false
//       rl.close()
//     }
//     answer = answer.toUpperCase()
//     for (i in answer) {
//       preOutput.push(morseCode[answer.charAt(i)])
//     }
//     return questionPromisify('请输入分割符（推荐/或空格）:')
//   })
//   .then(answer => {
//     console.log(preOutput.join(answer))
//     rl.close()
//   })

// plan3 async await
asyncAwaitPlan = async () => {
  console.log(title)
  let origin = await questionPromisify('请输入原文:')
  if (!reg.test(origin)) {
    console.log('含有非法字符')
    return asyncAwaitPlan()
  }
  origin = origin.toUpperCase()
  let representation = await questionPromisify('representation:')
  if (representation === 'normal') {
    let separator = (await questionPromisify('请输入分割符（默认空格）:')) || ' '
    for (i of origin) {
      preOutput.push(morseCode[i])
      var output = preOutput.join(' ')
    }
  } else {
    for (i of origin) {
      preOutput.push(morseCodeOnOff[i])
      var output = preOutput.join('...')
    }
  }

  console.log(output)
  rl.close()
}

asyncAwaitPlan()
