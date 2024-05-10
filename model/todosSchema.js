const mongoose = require('mongoose')



const todosSchema = new mongoose.Schema({

    name: {
        type: String,
        required:true
    },
    dueDate: {
        type:Date,
        required: true
    },
    desc: {
        type:String,
        required:false
    },
    createdAt: {
        type: Date,
        default:Date.now()
    },
    status: {
        type:Boolean,
        default:false
    },
    userId : {
        type:String,
        requird:true
    }
},{
    timestamps:true
}

)

const Todos = mongoose.model('Todos',todosSchema) 

module.exports = Todos