const inquirer = require('inquirer')
const {
  morseCode,
  morseCodeOnOff,
  morseCodeOnOff10,
  morseCodeDiDah
} = require('./encoderTable')

const title = `\nWelcome To Morse Converter\n`

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
