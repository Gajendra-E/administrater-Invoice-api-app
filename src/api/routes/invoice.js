
var express = require('express');
var router = express.Router();
var invoiceController =require('../../controllers/invoice') 

router.get('/',invoiceController.fetch_all_invoices)
router.post('/',invoiceController.create_invoice)
router.put('/:id',invoiceController.update_invoice)
router.delete('/:id',invoiceController.delete_invoice)

// module.exports = router;




module.exports = router;