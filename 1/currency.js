const cd = 0.91;
function roundTwo(amount) {
  return Math.round(amount * 100)/100;
}
exports.caToUs = ca => roundTwo(ca * cd);
exports.UsToCa = us => roundTwo(us/ cd);