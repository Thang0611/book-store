export const formatPrice = (number) => {
  // Convert the number to a string and remove any decimal places
  var numberStr = String(Math.floor(number))

  // Reverse the string to insert commas from right to left
  var reversedStr = numberStr.split('').reverse().join('')

  // Insert commas every three digits
  var formattedStr = reversedStr.match(/.{1,3}/g).join('.')

  // Reverse the string back and add a dollar sign
  var price = formattedStr.split('').reverse().join('')

  return price
}
