const request = require("supertest");
const db = require("../db");
const app = require("../app");

const {BeforeAll, AfterAll, BeforeEach, AfterEach} = require("./commonSetup"); 

// beforeAll(BeforeAll);
// beforeEach(BeforeEach);
// afterEach(AfterEach)
// afterAll(AfterAll);

//////////////////////// Start TESTING /////////////////////

// Testing basic get id/username route
test("GET /login works", async function () {

        const resp = await request(app).get("/login")
        .send({ username : 'Comet123', password: 'password'});

        // expect(resp.body).toEqual({
        //     username: "TedWilliams",
        //     password: ' $2b$04$0wWmDNfe74V0ItrFUy0HjekYsJyRshFQkAecNlrgKL1y1Cmmo6Cs2'
        // })
        expect(resp.statusCode).toEqual(200);
    })
  
test("POST article on archive works", async function () {
    const newArchive = {
        username: 'TedWilliams',
        url: 'www.Jimmy.com',
        title: 'baseballLegend',
        description :'cooperstown',
        author: 'Babe Ruth'
    };
        const resp = await request(app)
            .post("/frontpage")
            .send(newArchive);
        expect(resp.statusCode).toEqual(201);
        expect(resp.body).toEqual({
            archive : newArchive
        });
    });




// Testing GET archives
test("GET /archives", async function () {
    const resp = await request(app).get("/archives");
    expect(resp.body).toEqual({
        archives : [{
            username: 'TedWilliams',
            url: "www.Jimmy.com",
            title: 'baseballLegend',
            description: 'cooperstown',
            author: 'Babe Ruth'
        }]
    })
})