// import chai from 'chai';
// import chaiHttp from 'chai-http';
// import { app } from '../app'; // Assuming you have an Express app defined in app.js

// chai.use(chaiHttp);
// const { expect } = chai;

// describe('API Tests', () => {
//     describe('GET /getArchive', () => {
//         it('should return all archive data', (done) => {
//             chai
//                 .request(app)
//                 .get('/getArchive')
//                 .end((err, res) => {
//                     expect(res).to.have.status(200);
//                     expect(res.body).to.be.an('array');
//                     // Add more assertions to validate the retrieved data
//                     done();
//                 });
//         });
//     });

//     describe('GET /getChains', () => {
//         it('should return all chains', (done) => {
//             chai
//                 .request(app)
//                 .get('/getChains')
//                 .end((err, res) => {
//                     expect(res).to.have.status(200);
//                     expect(res.body).to.be.an('array');
//                     // Add more assertions to validate the retrieved data
//                     done();
//                 });
//         });
//     });

//     // Add more test cases for other API endpoints

// });