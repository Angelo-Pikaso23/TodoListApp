const mongoose = require('mongoose');

const ToDoSchema = new mongoose.Schema({
    text: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true }, // Referencia al modelo de usuario
}, { timestamps: true });

const ToDoModel = mongoose.model('ToDo', ToDoSchema);
module.exports = ToDoModel;