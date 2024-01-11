const asyncHandler = require('express-async-handler')
const Goal = require('../models/goalModel')
const User = require('../models/userModel')

const getGoals = asyncHandler(async (req, res) => {
    const goal = await Goal.find({ user: req.user.id })
    res.status(200).json(goal)
})

const addGoal = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please add some text')
    }
    const goal = await Goal.create({ text: req.body.text, user: req.user.id })
    res.status(200).json(goal)

})


const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById({ _id: req.params.id })
    if (!goal) {
        return res.status(404).json({ message: "Goal not found" })
    }
    if (req.body.text) {
        goal.text = req.body.text
    }

 
    if (!req.user) {
        res.status(401)
        throw new Error('User not found')
    }

    if (goal.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User not authorized')
    }

    await goal.save()
    res.status(200).json({ goal })
})

const deleteGoal = asyncHandler(async (req, res) => {
const goal = await Goal.findById(req.params.id)
if(!goal){
    res.status(401)
    throw new Error('Goal not found')
}

if (!req.user) {
    res.status(401)
    throw new Error('User not found')
}

if (goal.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('User not authorized')
}
await goal.deleteOne()
res.status(200).json({message:"Goal deleted successfully"})
})




module.exports = { getGoals, addGoal, updateGoal, deleteGoal }