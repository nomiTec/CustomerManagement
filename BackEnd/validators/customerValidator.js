const joi = require("joi");

const validator = (schema) => (payload) => 
schema.validate(payload,{abortEarly:false});

const customerSchema = joi.object({
    firstName:joi.string().required(),
    lastName:joi.string().required(),
    userName:joi.string().required(),
    email:joi.string().email().required(),
    phone:joi.string().required(),
    dob:joi.string().required(),
    gender:joi.string().required(),
    password:joi.string().required(),
    confirmPassword:joi.ref("password"),
    image:joi.optional(),
    addressId:joi.number().optional(),    
    customerId:joi.number().optional(),
    address:joi.string().required(),
    landmark:joi.string().required(),
    city:joi.string().required(),
    state:joi.string().required(),
    country:joi.string().required(),
    zipCode:joi.string().required(),
})
exports.validateCustomer = validator(customerSchema)