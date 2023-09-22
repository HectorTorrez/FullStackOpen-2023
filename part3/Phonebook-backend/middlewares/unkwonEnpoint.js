const unkownEnpoint = (req, res) => {
  res.status(404).send({ error: 'unkown enpoint' })
}

module.exports = {
  unkownEnpoint
}
