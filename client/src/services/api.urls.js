export const API_URLS = {
  saveSentEmail : {
    endpoint: 'save',
    method: 'POST'
  },
  getEmailFromType: {
    endpoint: 'emails',
    method: 'GET'
  },
  saveDraftEmail : {
    endpoint: 'draft',
    method: 'POST'
  },
  moveEmailsToBin : {
    endpoint: 'bin',
    method: 'POST'
  },
  toggleStarredMails :{
    endpoint: 'starred',
    method: 'POST'
  },
  deleteMails : {
    endpoint: 'delete',
    method: 'DELETE'
  }
}