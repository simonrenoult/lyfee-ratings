module.exports = (app, httpService) => {
  app.get('/ratings', httpService.findAll)
  app.get('/ratings/:id', httpService.find)
  app.put('/ratings/:id', httpService.update)
  app.post('/ratings', httpService.insert)
  app.delete('/ratings', httpService.removeAll)
  app.delete('/ratings/:id', httpService.remove)
}
