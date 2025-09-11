import request from 'supertest';
import express from 'express';

describe('Simple Backend Tests', () => {
  let app: express.Application;

  beforeAll(() => {
    app = express();
    app.use(express.json());
    
    // Simple test routes
    app.get('/health', (req, res) => {
      res.status(200).json({ status: 'ok', message: 'Backend is running' });
    });

    app.post('/test', (req, res) => {
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }
      res.status(200).json({ message: `Hello, ${name}!` });
    });
  });

  describe('Health Check', () => {
    it('should return 200 for health check', async () => {
      const response = await request(app)
        .get('/health');

      expect(response.status).toBe(200);
      expect(response.body.status).toBe('ok');
    });
  });

  describe('Test Route', () => {
    it('should return 400 for missing name', async () => {
      const response = await request(app)
        .post('/test')
        .send({});

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Name is required');
    });

    it('should return 200 with greeting', async () => {
      const response = await request(app)
        .post('/test')
        .send({ name: 'Jest' });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Hello, Jest!');
    });
  });

  describe('Express Middleware', () => {
    it('should parse JSON correctly', async () => {
      const testData = { test: 'data', number: 123 };
      
      const response = await request(app)
        .post('/test')
        .send({ name: 'Middleware Test', ...testData });

      expect(response.status).toBe(200);
    });

    it('should handle invalid JSON gracefully', async () => {
      const response = await request(app)
        .post('/test')
        .set('Content-Type', 'application/json')
        .send('invalid json');

      expect(response.status).toBe(400);
    });
  });
});