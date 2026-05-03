import request from 'supertest'
import app from '../src/index'

describe('Health Check', () => {
  it('should return 200 and server status', async () => {
    const response = await request(app)
      .get('/health')
      .expect(200)

    expect(response.body).toHaveProperty('status', 'OK')
    expect(response.body).toHaveProperty('timestamp')
    expect(response.body).toHaveProperty('uptime')
    expect(response.body).toHaveProperty('environment')
    expect(response.body).toHaveProperty('database')
  })

  it('should return API information at base endpoint', async () => {
    const response = await request(app)
      .get('/api/v1')
      .expect(200)

    expect(response.body).toHaveProperty('message')
    expect(response.body).toHaveProperty('version', 'v1')
    expect(response.body).toHaveProperty('endpoints')
    expect(response.body.endpoints).toHaveProperty('auth')
    expect(response.body.endpoints).toHaveProperty('universities')
  })
})