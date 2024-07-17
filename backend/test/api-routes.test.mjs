import { expect } from "chai";
import { config } from "dotenv";

config();

describe("API Endpoints", () => {
    describe("GET /api/shoes", () => {
        it("it should GET all the shoes", async () => {
            const response = await fetch(`${process.env.BASE_URL}/shoes`);
            const data = await response.json();

            expect(response.status).to.equal(200);
            expect(data).to.be.an("array");
        });
    });

    describe("GET /api/employee", () => {
        it("it should GET employee details", async () => {
            const response = await fetch(`${process.env.BASE_URL}/employee`);
            const data = await response.json();

            expect(response.status).to.equal(200);
            expect(data).to.be.an("array");
        });
    });

    // ROUTE NEEDS TO BE IMPLEMENTED
    describe("GET /api/employee/:id", () => {
        it("it should GET employee details by id", async () => {
            const response = await fetch(`${process.env.BASE_URL}/employee/1`);
            const data = await response.json();

            console.log(data);
            //   expect(response.status).to.equal(200);
            //   expect(data).to.be.an("object");
        });
    });

    // describe("POST /api/employee", () => {
    //     it("it should POST employee details", async () => {
    //         const response = await fetch(`${process.env.BASE_URL}/employee`, {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 name: "John Doe",
    //                 email: "johndoe@gmail.com",
    //                 password: "password",
    //             }),
    //         });
    //         const data = await response.json();

    //         console.log(data);
    //         //   expect(response.status).to.equal(200);
    //         //   expect(data).to.be.an("object");
    //     });
    // });

    describe("POST /api/shoes", () => {
        it("it should POST shoe details", async () => {
            const formData = new FormData();
            formData.append('shoe_name', shoeName);
            formData.append('shoe_color', shoeColor);
            formData.append('num_of_shoes', numOfShoes);
            formData.append('stall_id', stallId);
            formData.append('file', {
                name: `${shoeName}_${shoeColor}_${new Date()}`,
                uri: shoe_uri,
                type: 'image/jpg',
            });

            const response = await fetch(`${process.env.BASE_URL}/shoes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Bearer Token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MjEsImlhdCI6MTcxOTIzMjE2OSwiZXhwIjoxNzIxODI0MTY5fQ.5i0VwmdowPGdE2JTPtrqkd0O4Y89_o6JPQ16_z_6_oY",
                },
                body: JSON.stringify({
                    shoe_name: 'Nike Air Max 90',
                    shoe_color: 'White',
                    stall_id: 1,
                    num_of_shoes: 20
                }),
            });
            const data = await response.json();

            console.log(data);
            expect(response.status).to.equal(200);
            expect(data).to.be.an("array");
        });
    });

});
