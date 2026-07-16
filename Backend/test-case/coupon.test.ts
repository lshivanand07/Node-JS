import request from "supertest";
import {server} from '../src/app'

describe("Coupons API", ()=>{

   test( "GET Coupons: /api/get-all-coupons", async ()=>{
   const res = await request(server).get('/api/get-all-coupons')
   .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
   expect(res.statusCode).toBe(200);
   })

   test( "GET Coupons: /api/get-one-coupons/:couponID", async ()=>{
   const res = await request(server).get('/api/get-one-coupons/1')
   .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
   expect(res.statusCode).toBe(200);
   })

    test( "GET Coupons: /api/get-user-coupons/:userID", async ()=>{
   const res = await request(server).get('/api/get-user-coupons/1')
   .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
   expect(res.statusCode).toBe(200);
   })

   // 404

      test( "GET Coupons: /api/get-all-coupons", async ()=>{
   const res = await request(server).get('/api/get-coupons')
   .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
   expect(res.statusCode).toBe(404);
   })

   test( "GET Coupons: /api/get-one-coupons/:couponID", async ()=>{
   const res = await request(server).get('/api/get-one-coupons/50')
   .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
   expect(res.statusCode).toBe(404);
   })

    test( "GET Coupons: /api/get-user-coupons/:userID", async ()=>{
   const res = await request(server).get('/api/get-user-coupons/50')
   .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
   expect(res.statusCode).toBe(404);
   })


    test("POST coupons: /api/post-coupons ", async()=>{
          const couponData:{ coupon_code:string, discount:number, expiry_date:string, min_purchase_amount:number, max_discount:number, user_limit:number} = {
          coupon_code:"shivu360",
          discount:40,
          expiry_date:"2026-05-01",
            min_purchase_amount:1500, 
            max_discount:400, 
            user_limit:2
          }
        const res = await request(server).post("/api/post-coupons").send(couponData)
        .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(201);
       })


     test("POST coupons: /api/post-user-coupons ", async()=>{
          const couponData:{couponCode:string, used:boolean, user_id:number, usage_count:number} = {
            couponCode:"bigsale",
           used:true,
          user_id:5,
          usage_count:1,
          }
        const res = await request(server).post("/api/post-user-coupons").send(couponData)
        .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(201);
       })

        test("POST coupons: /api/post-user-coupons ", async()=>{
          const couponData:{couponCode:string, used:boolean, user_id:number, usage_count:number} = {
            // don't have 'megasale' coupon code
            couponCode:"megasale",
           used:true,
          user_id:5,
          usage_count:1,
          }
        const res = await request(server).post("/api/post-user-coupons").send(couponData)
        .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(404);
       })

    test("Update coupons: /api/edit-coupons/:couponID", async()=>{
          const couponData:{ coupon_code:string} = {
           coupon_code:"alpha404"
          }
        const res = await request(server).put("/api/edit-coupons/102").send(couponData)
        .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(200);
       })
    
         test("Update coupons: /api/edit-coupons/:couponID", async()=>{
          const couponData:{ coupon_code:string} = {
           coupon_code:"alpha404"
          }
        const res = await request(server).put("/api/edit-coupons/1000").send(couponData)
        .set("Authorization", "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2VtYWlsIjoiYW5hbmRAZ21haWwuY29tIiwidXNlcl9pZCI6MTUyLCJ1c2VyX3JvbGUiOiJjdXN0b21lciIsImlhdCI6MTc3ODA0Mzk0MywiZXhwIjoxNzc4NjQ4NzQzfQ.KGWYNVotEZx9iJQHdQ2NJa52SkHL-wjDuMiWRu3lAgI");
        expect(res.statusCode).toBe(404);
       })
       
})
