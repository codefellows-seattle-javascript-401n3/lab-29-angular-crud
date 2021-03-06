/* global __API_URL__ */

'use strict'

module.exports = ['$q', '$log', '$http', 'authService', galleryService]

function galleryService($q, $log, $http, authService) {
  $log.debug('galleryService()')

  let service = {}
  service.galleries = []

  service.createGallery = function(gallery) {
    $log.debug('galleryService.createGallery()')

    return authService.getToken()
      .then( token => {
        let url = `${__API_URL__}/api/gallery`
        let config = {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        return $http.post(url, gallery, config)
      })
      .then( res => {
        $log.log(res)
        let gallery = res.data
        service.galleries.unshift(gallery)
        return gallery
      })
      .catch( err => {
        $log.error(err.message)
        return $q.reject(err)
      })
  }

  service.fetchGalleries = function() {
    $log.debug('galleryService.fetchGalleries()')

    return authService.getToken()
      .then( token => {
        let url = `${__API_URL__}/api/gallery`
        let config = {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        return $http.get(url, config)
      })
      .then( res => {
        service.galleries = res.data
        return service.galleries
      })
      .catch( err => {
        $log.error(err.message)
        return $q.reject(err)
      })
  }

  service.deleteGallery = function(id) {
    $log.debug('galleryService.deleteGallery()')

    return authService.getToken()
      .then( token => {
        let url = `${__API_URL__}/api/gallery/${id}`
        let config = {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        return $http.delete(url, config)
      })
      .catch( err => {
        $log.error(err.message)
        return $q.reject(err)
      })
  }

  service.updateGallery = function(id, data) {
    $log.debug('galleryService.updateGallery()')

    return authService.getToken()
      .then( token => {
        let url = `${__API_URL__}/api/gallery/${id}`
        let config = {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        }
        return $http.put(url, data, config)
      })
      .then(updated => {
        for (var i = 0; i < service.galleries.length; i++) {
          if (service.galleries[i]._id === updated._id) {
            service.galleries[i] === updated
          }
        }
        return updated
      })
      .catch( err => {
        $log.error(err.message)
        return $q.reject(err)
      })
  }
  return service
}
