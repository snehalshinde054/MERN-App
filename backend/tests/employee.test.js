const request = require('supertest');

const app = require('../index');

let token = '';

beforeAll(async () => {
    // register and login
    await request(app).post('/api/auth/register').send({
        name: 'test admin',
        email: 'admin@example.com',
        password: 'admin123',
        role : 'admin'
    });

    const res = await request(app).post('/api/auth/login').send({
        email: 'admin@example.com',
        password: 'admin123'
    });

    token = res.body.data.token;
});


describe('Emplyee API', ()=>{
    it('should return 401 unauthorized without token', async ()=>{
        const res = await request(app).get('/api/employee');
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Not Authorized, no token');
    } );

// Employee List when authorized token
      it('Should return employee list when authorized', async()=>{
        const res = await request(app).get('/api/employee').set('Authorization',`Bearer ${token}`);

        expect(res.statusCode).toBe(200);
      });
  
  // create employee admin only
    it('Should Create an employee with admin only', async() =>{
        const res = await request(app).post('/api/employee').set('Authorization',`Bearer ${token}`).send({
            name : 'test employee',
            position : 'developer',
            dept : 'IT'
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.data).toHaveProperty('_id');

    });


});

