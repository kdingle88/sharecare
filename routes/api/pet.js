const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Pet = require("../../models/Pet");
const User = require("../../models/User");

// @route     POST api/pet
// @desc      Create or update a pet
// @access    Private
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty(),
      check("age", "Age is required")
        .not()
        .isEmpty(),
      check("species", "Species is required")
        .not()
        .isEmpty(),
      check("avatar", "Avatar is required")
        .not()
        .isEmpty(),
      check("breed", "Breed is required")
        .not()
        .isEmpty(),
      check("food", "Food is required")
        .not()
        .isEmpty(),
      check("slackspace", "Slack group name is required")
        .not()
        .isEmpty(),
      check("location", "Location is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      name,
      age,
      species,
      avatar,
      gallery,
      breed,
      food,
      personality,
      bio,
      slackspace,
      location,
      notes,
      adopted
    } = req.body;

    // Build Pet Object
    const petFields = {};

    petFields.shelter = req.user.id;
    if (name) petFields.name = name;
    if (age) petFields.age = age;
    if (species) petFields.species = species;
    if (avatar) petFields.avatar = avatar;
    if (personality) petFields.personality = personality;
    if (slackspace) petFields.slackspace = slackspace;
    if (location) petFields.location = location;
    if (notes) petFields.notes = notes;
    if (adopted) petFields.adopted = adopted;
    if (breed) petFields.breed = breed;
    if (bio) petFields.bio = bio;
    if (gallery) {
      petFields.gallery = gallery.split(",").map(image => image.trim());
    }
    if (food) {
      petFields.food = food.split(",").map(meal => meal.trim());
    }

    try {
      let pet = await Pet.findOne({ shelter: req.user.id });

      if (pet) {
        // Update
        pet = await Pet.findOneAndUpdate(
          { shelter: req.user.id },
          { $set: petFields },
          { new: true }
        );

        return res.json(pet);
      }

      // Create
      pet = new Pet(petFields);

      await pet.save();
      res.json(pet);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     GET api/pet/all
// @desc      Get all pets
// @access    Public

router.get("/all", async (req, res) => {
  try {
    const pets = await Pet.find();
    res.json(pets);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
