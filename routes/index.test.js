var app = require("../app")
var request = require("supertest")
const UserModel = require("../models/users")
const { connection, Mongoose } = require("mongoose")

describe('Tests de connection', () => {

    router.post('/products', (req, res) => {
    let name = req.body.name;

    res.json({ name: name });
    });

    test("compte inconnu", async (done) => {
        await request(app).get('/products')
          .send({ 
              name: 'cactus',
           })
          .expect(200)
          .expect({ 
              error: ['email inexistant']
           })
           done();
        })


   
   

    // beforeAll(() => {
    //     connection();
    // })

    // beforeEach(async () => {
    //     await UserModel.deleteMany()

    //     var userTest = new UserModel({
    //         firstname: 'jean',
    //         lastname: 'paul',
    //         email: 'adresse@domaine.fr',
    //         password: 'azerty',
    //         token: 'jscjshoer',
    //         status: 'client'
    //     });

    //     return userTest.save()
    // })

    // afterAll((done) => {
    //     Mongoose.disconnect(done);
    // })

    // test("compte inconnu", async (done) => {
    //     await request(app).post('/sign-in')
    //       .send({ 
    //           'email': 'adresse@domaine.fr',
    //            'password': 'test'
    //        })
    //       .expect(200)
    //       .expect({ 
    //           result: false,
    //           data: {token: null},
    //           error: ['email inexistant']
    //        })
       
    //     done();
    //    });
       
    //    test("mauvais mot de passe", async (done) => {
    //        await request(app).post('/sign-in')
    //          .send({ 
    //              'email': 'adresse@domaine.fr',
    //               'password': 'test'
    //           })
    //          .expect(200)
    //          .expect({ 
    //              result: false,
    //              data: {token: null},
    //              error: ['mauvais mot de passe']
    //           })
          
    //        done();
    //       });
  })

