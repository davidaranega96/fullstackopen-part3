const validatePhoneNUmber = (v) => {
  return /^(\d{2,3})-(\d{6,})$/.test(v)
}

module.exports = {
  validatePhoneNUmber
}