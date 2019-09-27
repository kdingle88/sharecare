const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Pet = require("../../models/Pet");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route     Get api/pet/:id
// @desc      Get a pet
// @access    Public
router.get("/:id", async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ errors: [{ msg: "Pet not found" }] });
    }
    res.json(pet);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Pet not found" }] });
    }

    res.status(500).send("Server Error");
  }
});

// @route     POST api/pet
// @desc      Create a pet
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

    try {
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

// @route     Put api/pet/:id
// @desc      Update a pet
// @access    Private
router.put(
  "/:id",
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

    try {
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
      let pet = await Pet.findById(req.params.id);

      if (pet) {
        // Update
        pet = await Pet.findOneAndUpdate(
          { _id: req.params.id },
          { $set: petFields },
          { new: true }
        );

        return res.json(pet);
      }

      // Else return pet not found
      return res.status(404).json({ errors: [{ msg: "Pet not found" }] });
    } catch (err) {
      console.error(err.message);
      if (err.kind === "ObjectId") {
        return res.status(404).json({ errors: [{ msg: "Pet not found" }] });
      }
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

// @route     DELETE api/pet/:id
// @desc      Delete a pet
// @access    Private

router.delete("/:id", auth, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet || err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Pet not found" }] });
    }

    if (pet.shelter.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }
    await pet.remove();
    res.json({ msg: "Pet removed" });
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Pet not found" }] });
    }

    res.status(500).send("Server Error");
  }
});

module.exports = router;

// @route     PUT api/pet/medications
// @desc      Add pet medications
// @access    Private

router.put(
  "/medications",
  [
    auth,
    [
      check("name", "Name is required")
        .not()
        .isEmpty(),
      check("condition", "Condition is required")
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, condition } = req.body;

    const newMed = {
      name,
      condition
    };

    try {
      const pet = await Pet.findOne({ shelter: req.user.id });

      pet.medications.unshift(newMed);

      await pet.save();

      res.json(pet);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

// @route     DELETE api/pet/medications/:med_id
// @desc      Delete pet medications
// @access    Private

router.delete("/medications/:med_id", auth, async (req, res) => {
  try {
    const pet = await Pet.findOne({ shelter: req.user.id });

    // Get Remove Index
    const removeIndex = pet.medications
      .map(med => med.id)
      .indexOf(req.params.med_id);

    pet.medications.splice(removeIndex, 1);

    await pet.save();

    res.json(pet);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ errors: [{ msg: "Pet not found" }] });
    }

    res.status(500).send("Server Error");
  }
});
