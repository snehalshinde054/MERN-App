const request = require('supertest');

const app = require('../index');

const mongoose = require('mongoose');

const User = require('../models/User');

// clear DB before each test
beforeEach( async () => {
    await User.deleteMany();
});

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

//close DB after all tests
afterAll( async () =>{
    await mongoose.connection.close();
});

jest.setTimeout(15000); // at the top, before describe() to Increase the test timeout explicitly:

describe('Auth Apis', () => {
    let token = '';

    it('should register a new user',async()=>{
        const res = await request(app).post('/api/auth/register').send({
            name : 'user test ',
            email : 'testuser@gmail.com',
            password : 'test123'
        });

        expect(res.statusCode).toBe(201);

        const login = await request(app).post('/api/auth/login').send({
                email : 'testuser@gmail.com',
                password : 'test123'
            });

            expect(login.statusCode).toBe(200);
            expect(login.body.data).toHaveProperty('token');


    });

    // Duplicate registration
    it('should fail after duplicate registration', async()=>{
         await request(app).post('/api/auth/register').send({
            name : 'user test',
            email : 'testuser@gmail.com',
            password : 'test123' 
         });

         const register = await request(app).post('/api/auth/register').send({
            name : 'user test',
            email : 'testuser@gmail.com',
            password : 'test123' 
         });
            expect(register.statusCode).toBe(400);
            expect(register.body.message).toBe('User already Exist!');
         
    });

    // Invalid Login/Wrong Credentials
    it('Should fail login with invalid credentials',async()=>{
        const res = await request(app).post('/api/auth/login').send({
            email : 'wrong@gmail.com',
            password : 'wrong123'
        });

        expect(res.statusCode).toBe(400);
        expect(res.body.message).toBe('Invalid Credentials');
    });

    // Missing Field
    it('Should fail login with missing feild', async()=>{
        const res = await request(app).post('/api/auth/login').send({
            email : ''
        });

        expect(res.statusCode).toBe(400);
        
    });

});