const Joi = require('joi');

const patchInvoiceSchema = Joi.object({
    // id:Joi.string().min(8).max(8),
    client: Joi.string().max(250).min(0),
    detail: Joi.string().max(250).min(0),
    amount:Joi.number(),
    discount:Joi.number().min(0),
    paid:Joi.number()
});

module.exports = {
    patchInvoiceSchema
}