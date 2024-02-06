const request = require("supertest");
const db = require("../db");
const app = require("../app");

const {BeforeAll, AfterAll, BeforeEach, AfterEach} = require("./commonSetup"); 

// beforeAll(BeforeAll);
beforeEach(BeforeEach);
afterEach(AfterEach)
afterAll(AfterAll);

//////////////////////// Start TESTING /////////////////////

// Testing basic get id/username route
test("GET / works", async function () {
        const resp = await request(app).get("/");
        expect(resp.body).toEqual({
            users: [{
                id: '1'
            }]
        })
    })
  
test(" POST article on archive works", async function () {
    const newArchive = {
        username: 'TedWilliams',
        url: 'www.Jimmy.com',
        title: 'baseballLegend',
        description :'cooperstown',
        author: 'Babe Ruth'
    };
        const resp = await request(app)
            .post("/preferences")
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