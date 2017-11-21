const morseCode = {
  ' ': '     ', // 5 whitespace
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

module.exports = {
  morseCode,
  morseCodeOnOff,
  morseCodeOnOff10,
  morseCodeDiDah
}
