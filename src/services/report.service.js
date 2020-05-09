import ApiService from './api.service'

class ReportError extends Error {
  constructor(errorCode, message, errorFields) {
    super(message)
    this.name = this.constructor.name
    this.errorCode = errorCode
    this.message = message
    this.fields = errorFields
  }
}

const ReportService = {
  getReport: async function() {
    try {
      const response = await ApiService.get('/api/report')
      return response.data
    } catch (e) {
      throw new ReportError(e.response.status, e.response.data.error)
    }
  },

  createReport: async function(account) {
    try {
      const response = await ApiService.post('/api/report', account)
      return response.data
    } catch (e) {
      throw new ReportError(
        e.response.status,
        e.response.data.error,
        e.response.data.errors
      )
    }
  },
  // JWT Token
  updateToken: async function(token) {
    try {
      const response = await ApiService.put(
        `/api/account/token/${token.id}`,
        token
      )
      return response.data
    } catch (e) {
      throw new ReportError(e.response.status, e.response.data.error)
    }
  },

  deleteToken: async function(id) {
    try {
      const response = await ApiService.delete(`/api/account/token/${id}`)
      return response.data
    } catch (e) {
      throw new ReportError(e.response.status, e.response.data.error)
    }
  }
}

export default ReportService

export { ReportService, ReportError }
