const {
  OAUTH_V2_SA_CLIENT_ID,
  OAUTH_V2_SA_CLIENT_SECRET,
  OAUTH_V2_SA_ENDPOINT='https://iam.ebrains.eu/auth/realms/hbp/protocol/openid-connect',
  OAUTH_V2_SA_SCOPES='',
} = process.env

const request = require('request')

module.exports = {
  getAccessToken() {

    console.log(`getting access token from ${OAUTH_V2_SA_ENDPOINT}`)
    return new Promise((rs, rj) => {
      request({
        uri: `${OAUTH_V2_SA_ENDPOINT}/token`,
        method: 'POST',
        headers: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        form: {
          grant_type: 'client_credentials',
          client_id: OAUTH_V2_SA_CLIENT_ID,
          client_secret: OAUTH_V2_SA_CLIENT_SECRET,
          scope: OAUTH_V2_SA_SCOPES
        }
      }, (error, resp, body) => {
        if (error) return rj(error)
        if (resp.statusCode >= 400) {
          const {
            statusCode,
            statusMessage,
            body
          } = resp
          return rj({ statusCode, statusMessage, body })
        }
        const json = JSON.parse(body)
        rs(json['access_token'])
      })
    })
  }
}