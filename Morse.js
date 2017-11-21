const inquirer = require('inquirer')

const title = `\nWelcome To Morse Converter\n`
const morseCode = {
  ' ': '     ',// 5 whitespace
  0: '−−−−−',
  1: '·−−−−',
  2: '··−−−',
  3: '···−−',
  4: '····−',
  5: '·····',
  6: '−····',
  7: '−−···',
  8: '−−−··',
  9: '−−−−·',
  "'": '·−−−−·',
  ',': '−−··−−',
  '.': '·−·−·−',
  '?': '··−−··',
  '!': '−·−·−−',
  '/': '−··−·',
  '(': '−·−−·',
  ')': '−·−−·−',
  '&': '·−···',
  ':': '−−−···',
  ';': '−·−·−·',
  '=': '−···−',
  '+': '·−·−·',
  '-': '−····−',
  _: '··−−·−',
  '"': '·−··−·',
  $: '···−··−',
  '@': '·−−·−·',
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
// medium gap 7 times = short gap 3 times * 2 + ' ' 1 time
morseCodeOnOff[' '] = '.'

let morseCodeOnOff10 = {}
for (val in morseCode) {
  morseCodeOnOff10[val] = morseCodeOnOff[val]
    .replace(/=/g, '1')
    .replace(/\./g, '0')
}

let morseCodeDiDah = {}
for (val in morseCode) {
  morseCodeDiDah[val] = morseCode[val]
    .split('')
    .join(' ')
    .replace(/−/g, 'dah')
    .replace(/·$/g, 'dit')
    .replace(/·/g, 'di')
    .replace(/\s/g, '-')
}
morseCodeDiDah[' '] = ','

questionPromisify = question =>
  new Promise((resolve, reject) => {
    inquirer
      .prompt(question)
      .then(answers => {
        resolve(answers)
      })
      .catch(err => {
        reject(err)
      })
  })

let encoderPrototype = (origin, morseCodetable, glue) => {
  let preOutput = []
  for (i of origin) {
    preOutput.push(morseCodetable[i])
  }
  return preOutput.join(glue)
}

const runEncoder = async () => {
  let output = ''
  let reg = /^[\d\s\w:.,=+-/'"?&$$@!]*$/
  console.log(title)
  let answers = await questionPromisify([
    {
      type: 'input',
      name: 'originalText',
      default: 'test',
      message: 'Input original text:'
    },
    {
      type: 'list',
      name: 'representation',
      default: 'normal',
      message: 'Representation:',
      choices: ['normal', 'spoken', 'onoff(=&.)', 'onoff(1&0)']
    }
  ])
  let origin = answers.originalText.toUpperCase().trim()
  let representation = answers.representation
  if (!reg.test(origin)) {
    console.log('Contain illegal characters')
    return runEncoder()
  }
  /*
   * representation
   *   normal : −·(default)
   *   spoken : di-dah
   *   onoff=.  : = representing "signal on", and . representing "signal off"
   *   onoff10  : 1 representing "signal on", and 0 representing "signal off"
   */
  if (representation === 'normal') {
    output = encoderPrototype(origin, morseCode, ' ')
  } else if (representation === 'spoken') {
    output = encoderPrototype(origin, morseCodeDiDah, ' ')
  } else if (representation === 'onoff(=&.)') {
    output = encoderPrototype(origin, morseCodeOnOff, '...')
  } else {
    output = encoderPrototype(origin, morseCodeOnOff10, '000')
  }
  console.log(output)
}

runEncoder()
