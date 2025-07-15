const request = require('supertest');

const app = require('../index');

const Employee = require('../models/employee');

let adminToken = '';
let userToken = '';

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

    adminToken = res.body.data.token;

    // register user
    const userRes = await request(app).post('/api/auth/register').send({
        name : 'test user role',
        email : 'testuserrole@gmail.com',
        password : 'testuser123',
        role : 'user'
    });

    userToken = userRes.body.data.token;


});


describe('Emplyee API', ()=>{
    it('should return 401 unauthorized without token', async ()=>{
        const res = await request(app).get('/api/employee');
        expect(res.statusCode).toBe(401);
        expect(res.body.message).toBe('Not Authorized, no token');
    } );

// Employee List when authorized token
      it('Should return employee list when authorized', async()=>{
        const res = await request(app).get('/api/employee').set('Authorization',`Bearer ${adminToken}`);

        expect(res.statusCode).toBe(200);
      });
  
  // create employee admin only
    it('Should Create an employee with admin only', async() =>{
        const res = await request(app).post('/api/employee').set('Authorization',`Bearer ${adminToken}`).send({
            name : 'test employee',
            position : 'developer',
            dept : 'IT'
        });

        expect(res.statusCode).toBe(201);
        expect(res.body.data).toHaveProperty('_id');
    });
   
    // Update an employee
    it('Should update an employee when authorized as admin', async()=>{
        const employee = await Employee.create({ name: 'old_user' , position : 'Senior Engineer', dept: 'IT' });

        const res = await request(app).put(`/api/employee/${employee._id}`).set('Authorization',`Bearer ${adminToken}`).send({name:'new name'});

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toHaveProperty('name');
    });

    // update employee when un-authorized user
    it('Should failed update an employee when un-authorized admin', async() => {
        const employee = await Employee.create({ name : 'new userupdate', position : 'dev', dept : 'admintask'});

        const res = await request(app).put(`/api/employee/${employee._id}`).set('Authorization',`Bearer ${userToken}`).send({name: 'upadted name1'});
        
        expect(res.statusCode).toBe(403);
    });

    // Delete employee
    it('Should delete an employee when authorized as admin', async() =>{
        const employee = await Employee.create({name:'user1', position : 'developer', dept : 'IT'});

        const res = await request(app).delete(`/api/employee/${employee._id}`).set('Authorization',`Bearer ${adminToken}`).send();

        expect(res.statusCode).toBe(200);
        expect(res.body.data).toHaveProperty('_id');
    });

    // Delete employee when un-authorized user
    it('Should failed to delete an employee when un-authorized as admin', async()=>{
        const employee = await Employee.create({name: 'user3', position:'devops',dept:'devopsteam'});

        const res = await request(app).delete(`/api/employee/${employee._id}`).set('Authorized',`Bearer ${userToken}`).send();

        expect(res.statusCode).toBe(401);
    });

});

