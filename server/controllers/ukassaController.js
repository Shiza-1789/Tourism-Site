const { Order, Tour } = require('../models/models')
const ApiError = require('../error/ApiError')
const axios = require('axios');
const {v4: uuidv4} = require('uuid')

class UkassaController {
    async pay(req, res){
        try {
            const {userId, tourId} = req.body

            const url = "https://api.yookassa.ru/v3/payments"
            const initial_payment_msg = "Списываем оплату за заказ"
            
            const idempotenceKey = uuidv4()

            const tour = await Tour.findOne({tourId})
            let orderId = 0
            
            var params = await {
                "amount": {
                    "value": `${tour.price}`,
                    "currency": "RUB"
                },
                "payment_method_data": {
                    "type": "bank_card"
                },
                "confirmation": {
                    "type": "redirect",
                    "return_url": "http://localhost:3000/shop"
                },
                "description": initial_payment_msg,
                "save_payment_method": "false"
            };

            axios.post(url, params, {
                auth: {
                    username: "217420",
                    password: process.env.PAYMENT_SECRET_KEY,
                },
                headers: { 
                    'Idempotence-Key': idempotenceKey 
                },
            }).then((response) => {
                console.log(response.data)
                return response.data;
            }).then(async (response) => {
                if (response.status == "pending") {                    
                    const order = await Order.create({userId, tourId, paymentId: response.payment_method.id , status: 'WAITING'})
                    orderId = order.id
                    console.log(idempotenceKey)
                    res.send({"url": response.confirmation.confirmation_url})
                }
            })
            .catch(async e => {
                await Order.update(                    
                    {
                        "status": "ERROR"
                    }, 
                    {
                        where: {id: orderId}
                    }                    
                )
                ApiError.badRequest(e)
            })
        } catch (e) {
            ApiError.badRequest(e)
        }
    }
    
    async confirmation(req, res){
        if (req.body.event == "payment.waiting_for_capture") {
            console.log(req)
            let payment_id = req.body.object.id;
            let status = req.body.object.status;
            if (status == "waiting_for_capture") {
                await confirmPayment(payment_id)
                await getPayment(payment_id)
            }
        }
    }
}

const confirmPayment = async (payment_id) => {
    await Order.update(
        {
            "status": "CONFIRMED"
        }, 
        {
            where: {paymentId: payment_id}
        }     
    )
    return
}

const getPayment = async (payment_id) => {
    const url = `https://api.yookassa.ru/v3/payments/${payment_id}/capture`

    return await axios.post(url, {}, {
        auth: {
            username: "217420",
            password: process.env.PAYMENT_SECRET_KEY,
        },
        headers: { 
            'Idempotence-Key': uuidv4().toString() 
        }
    }).then((res) => res.data)
    .then(async (res) => {
        return true
    }).catch((e) => {
        return false
    })
}


module.exports = new UkassaController()