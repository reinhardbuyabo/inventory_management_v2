const bcryptjs = require("bcryptjs");
const connectDB = require("../config/db");

const pool = connectDB();

const hashPassword = async (pass) => {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(pass, salt);
    console.log(`From fn: ${hashedPassword}`)
    return hashedPassword;
}

let hashedPassword;
hashPassword("1234").then(res => {
    console.log(`From then: ${res}`)
    hashedPassword = res;
});
console.log(typeof hashedPassword);



const query = () => {
    console.log(typeof hashedPassword);
    pool.query(
        'INSERT INTO admin(adm_name, adm_email, adm_pass) VALUES($1, $2, $3)',
        ['admin1', 'admin1@example.com', hashedPassword],
        (err, response) => {
            if (err) {
                // console.log(hashPassword("1234"));
                console.log(err);
            } else {
                console.log(response);
            }
        }
    )
}

setTimeout(query, 3000);