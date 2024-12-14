import request from 'supertest';
import app from '../../app.js';

describe('GET / (index.html)', () => {
    it('should load index.html and contain a div with id="root"', async () => {
        const response = await request(app).get('/');

        expect(response.status).toBe(200);
        expect(response.headers['content-type']).toMatch(/html/);
        expect(response.text).toContain('<div id="root">');
    });
});
