const mongoose = require('mongoose');

const {Schema}= mongoose;

const problemSchema = new Schema({
    title:{
        type:String,
        required:true
    }
    ,
    description:{
        type:String,
        required:true
    },

    difficulty:{
        type:String,
        enum:['easy', 'medium', 'hard'],
        required:true,
    },

    tags:{
        type:String,
        enum:['array','linkedList','graph','dp'],
        required:true
    },

    visibleTestCases:[
        {
            input:{
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            },
            explanation:{
                type:String,
                required:true
            }
        }
    ],

    HiddenTestCases:[
        {
            input:{
                type:String,
                required:true
            },
            output:{
                type:String,
                required:true
            },
            explanation:{
                type:String,
                required:true
            }
        }
    ],

    StartCode:[
        {
            language:{
                type:String,
                required:true
            },
            code:{
                type:String,
                required:true
            }
        }
    ],

    PoblemCreator:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    referenceSolution:[
        {
            language:{
                type:String,
                required:true

            },
            code:{
                type:String,
                required:true

            }
        }
    ]
})

const problem =mongoose.model('problem',problemSchema);

module.exports=problem;


