const con = require("../db")    //db connection
const customerValidator = require("../validators/customerValidator")   // Joi Validation
const fs = require('fs');
const path = require('path');
const dirPath = path.join(__dirname,'../profileImages/');


exports.selectCustomers = async(req,res)=>{
    try {
        const qry = `select * from customer`
        const result = await con.promise().query(qry);        
        res.status(200).json(result[0])
    } catch (error) {
        res.send(error)
    }
}
exports.selectCustomerById = async(req, res)=>{
    try {
        const qry = `select cust.*,addr.* from customer as cust,address as addr where cust.customerId = ${req.params.id} and addr.customerId = cust.customerId`;
        const result = await con.promise().query(qry);
        res.status(200).json({data:result[0][0]})
    } catch (error) {
        res.send(error)
    }
}
exports.insertCustomer = async(req,res)=>{
    try {
        const userData = req.body;
        const url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
        var imgString = userData.image;
        if(imgString != '')
        {
            //Save img in profileImages Folder
            const date = new Date().getMilliseconds();
            let img = new Buffer.from(imgString, 'base64');
            var path = `${dirPath}${userData.userName}${date}.jpg`;
            fs.writeFileSync(path,img);            
            var imgUrl = `${url.origin}/profileImages/${userData.userName}${date}.jpg`;
        }
        else
        {
        var imgUrl = 'N/A'    
        }
        var insertCustomerQry = `INSERT INTO customer ( firstName, lastName, userName, email, phone, dob, gender, password, confirmPassword, image) VALUES ?`;
                        var values = [
                                      [
                                userData.firstName,
                                userData.lastName,
                                userData.userName,
                                userData.email,
                                userData.phone,
                                userData.dob,
                                userData.gender,
                                userData.password,
                                userData.confirmPassword,
                                imgUrl,
                              ],
                            ];
        const {error, value } = customerValidator.validateCustomer(userData); // Joi Validtion of user input
if(error){                                                               // If joi validation fails give error
            res.send(error.details)
        }
        else{               // else will make a api call
            var result = await con.promise().query(insertCustomerQry,[values]);
            if(result[0].affectedRows > 0)
            {
            const getUserId = `select customerId  from customer ORDER BY customerId DESC limit 1`;
            const custIdResult = await con.promise().query(getUserId);
            const custId = custIdResult[0][0].customerId
            if(custId)
            {
                var insertAddressQry = `INSERT INTO address( customerId, address,landmark, city, state, country, zipCode) VALUES ?`;
                var values = [
                              [
                        custId,
                        userData.address,
                        userData.landmark,
                        userData.city,
                        userData.state,
                        userData.country,
                        userData.zipCode,
                      ],
                    ];
                var result = await con.promise().query(insertAddressQry,[values]);
                if(result[0].affectedRows > 0)
                {
                    res.status(200).json({"status":1,"message":"Record INserted Successfully"})
                }
            }
            }            
        }         
    } catch (error) {
        res.send(error)
    }
}
exports.updateCustomer = async(req,res)=>{
    try {
        const userData = req.body;
        const url = new URL(`${req.protocol}://${req.get('host')}${req.originalUrl}`);
        var imgString = userData.image;
            if(imgString.includes("http"))
             {
                var imgUrl =  userData.image;
             }
            else if(imgString != '')
            {
                const date = new Date().getMilliseconds();
                let img = new Buffer.from(imgString, 'base64');
                var path = `${dirPath}${userData.userName}${date}.jpg`;
                fs.writeFileSync(path,img);
                var imgUrl = `${url.origin}/profileImages/${userData.userName}${date}.jpg`;                 
            }
            else
            {
            var imgUrl = 'N/A'    
            }
            const updateQry = `UPDATE customer SET firstName='${userData.firstName}',lastName='${userData.lastName}',userName='${userData.userName}',
            email='${userData.email}',phone='${userData.phone}',dob='${userData.dob}',gender='${userData.gender}',
            password='${userData.password}',confirmPassword='${userData.confirmPassword}',image='${imgUrl}' where customerId =${userData.customerId}`;
           
            const result = await con.promise().query(updateQry);
            if(result[0].affectedRows > 0)
            {
                const updateAddress = `UPDATE  address SET address='${userData.address}',landmark='${userData.landmark}',city='${userData.city}',
                state='${userData.state}',country='${userData.country}',zipCode='${userData.zipCode}' where customerId=${userData.customerId}`
                const result = await con.promise().query(updateAddress);
                if(result[0].affectedRows > 0)
                {
                    res.status(200).json({"status":1,"message":"Record Updated Successfully"})
                }
            }            
    } catch (error) {
        res.send(error)
    }
}
exports.deleteCustomer = async (req,res)=>{
    try {
        const qry = `DELETE FROM customer where customerId=${req.params.id}`
        const result = await con.promise().query(qry);
        if(result[0].affectedRows > 0)
        {
            const qry = `DELETE FROM address where customerId=${req.params.id}`
            const result = await con.promise().query(qry);
            if(result[0].affectedRows > 0)
            {
                res.status(200).json({"status":1,"message":"User Deleted Successfully"}) 
            }             
        }
    } catch (error) {
        res.send(error)
    }
}
