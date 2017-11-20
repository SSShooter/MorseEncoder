// import decoder from './decodeTable.js'
const decoders = require('./decodeTable.js')
let input1 = '− · ··· −'
let input2 = 'dah-dah dit di-dah-dah , dah-dah dit di-dah-dah di-di-dah-dah-di-dit di-di-dah-dah-di-dit'
let input3 = '=.=.=.=...=...=.===.=.=...=.===.=.=...===.===.=.=.===.===.......=.=...===...=.===.===.===.===.=...=.=.=.......===.===...='
let input4 = '111000100010101000111000000010111011100010101010001010001110001000101010001011101110100010111000111010111010001'
decoder = (input, decodeTable, separator) => {
  let array = input.trim().split(separator)
  let preOutput = array.map(val => {
    return decodeTable[val]
  })
  return preOutput
}

// console.log(decoder(input1, decoders.normal, ' '))

// console.log(decoder(input2, decoders.diDah, ' '))

console.log(decoder(input3, decoders.onoff, '...'))

// console.log(decoder(input4, decoders.onoff10, '000'))