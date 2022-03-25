const router = require("express").Router();
const Room = require("../models/Room.model");

// Require necessary (isLoggedOut and isLiggedIn) middleware in order to control access to specific routes
const isLoggedOut = require("../middleware/isLoggedOut");
const isLoggedIn = require("../middleware/isLoggedIn");
const isCorrectUser = require("../middleware/isCorrectUser");
const { findByIdAndUpdate } = require("../models/Room.model");

router.get("/", async (req, res, next) => {
    const rooms = await Room.find().populate('owner')
    console.log('rooms: ', rooms)
    res.render("rooms/list", {rooms});
});


router.get("/create",isLoggedIn, (req, res, next) => {
    const data = {user : req.session.user}
    res.render("rooms/create", data)
});

router.post("/create", async (req, res, next) => {
    console.log('-----------------------------post create')
    const roomToCreate = req.body
    console.log('roomToCreate: ', roomToCreate)
    const roomCreated = await Room.create(roomToCreate)
    console.log('roomCreated: ', roomCreated)
    res.send("room created!")
});

router.get("/:id/edit",isLoggedIn,isCorrectUser, async (req, res, next) => {
    const {id} = req.params
    const room = await Room.findById(id)
    console.log('room: ', room)
    res.render("rooms/edit", {room})
});

router.post("/:id/edit",isLoggedIn, async (req, res, next) => {
    const {name, description, imageUrl, _id} = req.body
    const roomToEdit = {
        name,
        description,
        imageUrl,
    }
    console.log('roomToEdit: ', roomToEdit)
    console.log('_id :', _id)
    const roomEdited = await Room.findByIdAndUpdate(_id, roomToEdit, {new: true})
    res.send(roomEdited)
});


router.post("/:id/delete",isLoggedIn, async (req, res, next) => {
    res.send('delete')
});

module.exports = router;
