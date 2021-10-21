var db = require("../models");

exports.fetch_all_invoices = async (req, res, next) => {
    try {
        let fetchAllInvoices = await db.Invoice.findAll();
        res.status(200).json({
            status: 'success',
            payload: fetchAllInvoices,
            message: 'Invoices fetched successfully'
        })

    }
    catch (error) {
        console.log("Error ==> " + error)
        res.status(500).json({
            status: 'failed',
            payload: {},
            message: 'Error while fetching invoices'
        });
    }
}

exports.create_invoice = async (req, res, next) => {
    try {
        let { recipient, amount, paymentDueDate, alreadyPaid } = req.body
        let newInvoice = await db.Invoice.create({
            recipient,
            amount,
            paymentDueDate,
            alreadyPaid
        });
        res.status(200).json({
            'status': 'success',
            'payload': newInvoice,
            'message': 'Invoice created successfully'
        })


    }
    catch (error) {
        console.log("Error=========>" + error)
        res.status(500).json({
            'status': 'failed',
            'payload': {},
            'message': 'Invoice failed to create'
        })

    }
}

exports.update_invoice = async (req, res, next) => {
    try {
        let { id } = req.params;
        let { recipient, amount, paymentDueDate, alreadyPaid } = req.body;


        let fetchInvoice = await db.Invoice.findOne({
            where: {
                id: id
            }
        });

        if (fetchInvoice === null) {
            res.json({
                "status": "failed",
                "message": "fetchInvoice failed"
            })
        }
        let updateInvoice = await db.Invoice.update({
            recipient: recipient ? recipient : fetchInvoice.recipient,
            amount: amount ? amount : fetchInvoice.amount,
            paymentDueDate: paymentDueDate ? paymentDueDate : fetchInvoice.paymentDueDate,
            alreadyPaid: alreadyPaid ? alreadyPaid : fetchInvoice.alreadyPaid
        }, {
            where: {
                id: id
            },
            returning: true
        }
        )
        let fetchUpdatedInvoice = updateInvoice[1].length > 0 ? (updateInvoice[1])[0] : null;
        res.status(200).json({
            'status': 'success',
            'payload': fetchUpdatedInvoice,
            'message': 'Invoice updated successfully'
        })

    } catch (error) {
        console.log("Error=====>" + error)
        res.status(500).json({
            'status': 'failed',
            'payload': {},
            'message': 'Invoice failed to update'
        })
    }
}

exports.delete_invoice = async (req, res, next) => {
    let { id } = req.params;
    try {
        let fetchInvoice = await db.Invoice.findOne({
            where: {
                id: id
            }
        })
        if (fetchInvoice === null) {
            res.json({
                "status": "failed",
                "message": "fetchInvoice failed"
            })
        }

        await db.Invoice.destroy({
            where: {
                id: id
            }
        })
        res.status(200).json({
            'status': 'success',
            'message': 'Invoice deleted successfully'
        })


    } catch (error) {
        console.log("Error----->" + error)
        res.status(500).json({
            'status': 'failed',
            'payload': {},
            'message': 'Invoice failed to delete'
        })
    }
}