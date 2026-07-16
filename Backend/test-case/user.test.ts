import request from 'supertest'
import {server} from '../src/app'

describe("Users API", ()=>{

    test("Bad request", async ()=>{
      const res = await  request(server).get("/user/getDat")
       .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwidXNlcl9pZCI6NSwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE3NzgwNDM4NTksImV4cCI6MTc3ODY0ODY1OX0.bxIlbS5sOfIeP3VL5EYV0B1p0enDYGDaqdo_h8yn8m0");
      expect(res.statusCode).toBe(404);
    })

     test("GET /api/get-all-users", async () => {
        const res = await request(server).get("/api/get-all-users")
         .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwidXNlcl9pZCI6NSwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE3NzgwNDM4NTksImV4cCI6MTc3ODY0ODY1OX0.bxIlbS5sOfIeP3VL5EYV0B1p0enDYGDaqdo_h8yn8m0");
        expect(res.statusCode).toBe(200);
    });

     test("GET /api/get-one-user - should return single user", async () => {
        const res = await request(server).get("/api/get-one-user/1")
         .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwidXNlcl9pZCI6NSwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE3NzgwNDM4NTksImV4cCI6MTc3ODY0ODY1OX0.bxIlbS5sOfIeP3VL5EYV0B1p0enDYGDaqdo_h8yn8m0");
        expect(res.statusCode).toBe(200);
    });

     test("GET /api/get-my-info - should return my info", async () => {
        const res = await request(server).get("/api/get-my-info")
         .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwidXNlcl9pZCI6NSwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE3NzgwNDM4NTksImV4cCI6MTc3ODY0ODY1OX0.bxIlbS5sOfIeP3VL5EYV0B1p0enDYGDaqdo_h8yn8m0");
        expect(res.statusCode).toBe(200);
    });

    test("POST /api/post-one-user - should create user", async () => {
        const userData:{user_id:number, user_name:string, password:string} = {
            user_id:104,
            user_name: "vishal",
            password: "vishal@123"
        };

        const res = await request(server).post("/api/post-one-user").send(userData);
        expect(res.statusCode).toBe(201);
    });

    test("POST /api/post-one-user - should create user", async () => {
        const userData:{user_id:number, user_name:string, password:string} = {
            user_id:104,
            user_name: "vishal",
            password: "vishal@123"
        };

        const res = await request(server).post("/api/post-one-user").send(userData);
        expect(res.statusCode).toBe(500);
    });

    test("POST /api/post-one-user - should create user", async () => {
        const userData:{user_id:number, user_name:string}  = {
            user_id:105,
            user_name: "Ravi",
        };

        const res = await request(server).post("/api/post-one-user").send(userData);
        expect(res.statusCode).toBe(400);
    });


    test("Update /api/edit-one-user/:userID ", async () => {
      const updateUserName:{user_name:string} ={
        user_name:"Rohit sharma"
      }
      const res = await request(server).put("/api/edit-one-user/104").send(updateUserName)
       .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwidXNlcl9pZCI6NSwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE3NzgwNDM4NTksImV4cCI6MTc3ODY0ODY1OX0.bxIlbS5sOfIeP3VL5EYV0B1p0enDYGDaqdo_h8yn8m0");
      expect(res.statusCode).toBe(200) 
    });

    test("Update /api/edit-one-user/:userID ", async () => {
      const updateUserName:{ user_name:string} ={
        user_name:"abcd"
      }
      const res = await request(server).put("/api/edit-one-user/1000").send(updateUserName)
       .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwidXNlcl9pZCI6NSwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE3NzgwNDM4NTksImV4cCI6MTc3ODY0ODY1OX0.bxIlbS5sOfIeP3VL5EYV0B1p0enDYGDaqdo_h8yn8m0");
      expect(res.statusCode).toBe(404) 
    });

     test("Update /api/edit-one-user/1 ", async () => {
      const updateUserName:{ name:string} ={
        name:"abcd"
      }
      const res = await request(server).put("/api/edit-one-user/1").send(updateUserName)
       .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwidXNlcl9pZCI6NSwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE3NzgwNDM4NTksImV4cCI6MTc3ODY0ODY1OX0.bxIlbS5sOfIeP3VL5EYV0B1p0enDYGDaqdo_h8yn8m0");
      expect(res.statusCode).toBe(500) 
    });

    test("DELETE /delete-one-user/:userID - should delete user", async () => {
        const res = await request(server).delete("/api/delete-one-user/104")
         .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwidXNlcl9pZCI6NSwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE3NzgwNDM4NTksImV4cCI6MTc3ODY0ODY1OX0.bxIlbS5sOfIeP3VL5EYV0B1p0enDYGDaqdo_h8yn8m0");
        expect(res.statusCode).toBe(200);
    });

    
    test("DELETE /delete-one-user/:userID - should delete user", async () => {
        const res = await request(server).delete("/api/delete-one-user/1000")
         .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwidXNlcl9pZCI6NSwidXNlcl9yb2xlIjoiYWRtaW4iLCJpYXQiOjE3NzgwNDM4NTksImV4cCI6MTc3ODY0ODY1OX0.bxIlbS5sOfIeP3VL5EYV0B1p0enDYGDaqdo_h8yn8m0");
        expect(res.statusCode).toBe(404);
    }); 

})