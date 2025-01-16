const ToDoModel = require("../models/ToDoModal"); // Asegúrate de que el nombre del modelo sea correcto

// Get all ToDos
module.exports.getToDo = async (req, res) => {
    try {
        const todos = await ToDoModel.find({ user: req.user._id }); // Fetch ToDos for the authenticated user
        res.status(200).json(todos); // Send the ToDos as a JSON response
    } catch (error) {
        console.error('Error fetching ToDos:', error);
        res.status(500).json({ message: 'Error fetching ToDos' });
    }
};

// Save a new ToDo
module.exports.saveToDo = async (req, res) => {
    const { text } = req.body;

    try {
        const newToDo = await ToDoModel.create({ text, user: req.user._id }); // Associate the ToDo with the authenticated user
        res.status(201).json(newToDo); // Send the created ToDo as a JSON response
    } catch (error) {
        console.error('Error saving ToDo:', error);
        res.status(500).json({ message: 'Error saving ToDo' });
    }
};

// Delete a ToDo
module.exports.deleteToDo = async (req, res) => {
    const { _id } = req.body;

    try {
        await ToDoModel.findByIdAndDelete(_id);
        res.status(200).send("Deleted Successfully..."); // Send success message
    } catch (error) {
        console.error('Error deleting ToDo:', error);
        res.status(500).json({ message: 'Error deleting ToDo' });
    }
};

// Update a ToDo
module.exports.updateToDo = async (req, res) => {
    const { _id, text } = req.body;

    try {
        const updatedToDo = await ToDoModel.findByIdAndUpdate(_id, { text }, { new: true }); // Return the updated document
        res.status(200).json(updatedToDo); // Send the updated ToDo as a JSON response
    } catch (error) {
        console.error('Error updating ToDo:', error);
        res.status(500).json({ message: 'Error updating ToDo' });
    }
};