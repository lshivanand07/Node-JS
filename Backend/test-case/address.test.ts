import request from "supertest";
import {server} from '../src/app'

describe("Address API", ()=>{
 
   test( "GET : /api/get-all-address", async ()=>{
   const res = await request(server).get('/api/get-all-address')
    .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
   expect(res.statusCode).toBe(200);
   })

   test( "GET : /api/get-user-address", async ()=>{
   const res = await request(server).get('/api/get-user-address')
    .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
   expect(res.statusCode).toBe(200);
   })

    test("POST address: /api/post-user-address ", async()=>{
    const addressData:{ country:string, state:string, districts:string, city:string, street:string, landmark:string, pincode:number, user_address_status:string, is_default:boolean} = {
            country: "India",
            state: "Karnataka",
            districts: "Bagalkot",
            city: "Mudhol",
            street: "Petluru Main Road",
            landmark: "Near Hanuman Temple",
            pincode: 587313,
            user_address_status: "office",
            is_default: true
          }

        const res = await request(server).post("/api/post-user-address").send(addressData)
         .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(201);
       })
    
      test("POST address: office ", async()=>{
    const addressData:{ state:string, city:string, street:string, landmark:string, pincode:number, user_address_status:string, is_default:boolean} = {
            state: "Karnataka",
            city: "Mudhol",
            street: "Petluru Main Road",
            landmark: "Near Hanuman Temple",
            pincode: 587313,
            user_address_status: "office",
            is_default: true
          }

        const res = await request(server).post("/api/post-user-address").send(addressData)
         .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(400);
       })
    
    test("Update address: /api/edit-user-address/:userAddressStatus", async()=>{
          const updateAddressData:{landmark:string}= {
             landmark: "Near bhavan Temple"
          }
        const res = await request(server).put("/api/edit-user-address/office").send(updateAddressData)
         .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(200);
       })
    
      test("Update address: /api/edit-user-address/:userAddressStatus", async()=>{
          const updateAddressData:{landmark:string}= {
             landmark: "Near bhavan Temple", 
          }
        const res = await request(server).put("/api/edit-user-address/collage").send(updateAddressData)
         .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(404);
       })
    
       test("Update address: /api/edit-user-address/:userAddressStatus", async()=>{
          const updateAddressData:{landmark_address:string}= {
             landmark_address: "Near bhavan Temple", 
          }
        const res = await request(server).put("/api/edit-user-address/collage").send(updateAddressData)
         .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(500);
       })

        test("Delete address: /api/delete-user-address/:userAddressStatus", async()=>{
           const res = await request(server).delete("/api/delete-user-address/'office'")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
           expect(res.statusCode).toBe(200);
          })
       
            test("Delete address: /api/delete-user-address/:userAddressStatus", async()=>{
           const res = await request(server).delete("/api/delete-user-address/'collage'")
            .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
           expect(res.statusCode).toBe(404);
          })
       
})
