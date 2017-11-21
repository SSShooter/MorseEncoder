const inquirer = require('inquirer')
const { normal, onoff10, diDah } = require('./decodeTable.js')

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

let decoder = (input, decodeTable, separator) => {
  let array = input.trim().split(separator)
  let preOutput = array.map(val => {
    return decodeTable[val]
  })
  return preOutput.join('')
}

let onoffDecoder = (input, decodeTable) => {
  input = input
    .trim()
    .replace(/\./g, '0')
    .replace(/=/g, '1')
  let array = input.replace(/0000000/g, '000 000').split('000')
  let preOutput = array.map(val => {
    return decodeTable[val]
  })
  return preOutput.join('')
}

let runDecoder = async () => {
  let output = ''
  let answers = await questionPromisify([
    {
      type: 'input',
      name: 'originalText',
      message: 'Input original text:'
    },
    {
      type: 'list',
      name: 'representation',
      default: 'normal',
      message: 'Representation:',
      choices: ['normal', 'spoken', 'onoff']
    }
  ])
  let origin = answers.originalText
  let representation = answers.representation
  if (representation === 'normal') {
    output = decoder(origin, normal, ' ')
  } else if (representation === 'spoken') {
    output = decoder(origin, diDah, ' ')
  } else if (representation === 'onoff') {
    output = onoffDecoder(origin, onoff10)
  }
  console.log(output)
}

runDecoder()
