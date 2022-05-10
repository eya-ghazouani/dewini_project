const mongoose = require('mongoose');

const produitSchema = new mongoose.Schema({
    title:{type: String, required: true},
    qte:{type: String, required: true},
    type:{type: String, required: true},
    forme:{type: String, required: true},
    category :{ type: mongoose.Types.ObjectId, required: true, ref: "categorie" },
    deadline:{type: String, required: true},
    userid:{ type: mongoose.Types.ObjectId, required: true, ref: "user" },
    image:{type: String},
    etat:{type:Boolean},
    qte_initial:{type: String},

})

module.exports = mongoose.model('produit', produitSchema);