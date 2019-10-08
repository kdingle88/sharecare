const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

const Pet = require("../../models/Pet");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

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

// @route     GET api/pet/mypets
// @desc      Show all pets managed by user
// @access    Private

router.get("/mypets", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    if (user.shelter) {
      const pets = await Pet.find({ shelter: req.user.id });

      if (!pets || pets.length === 0) {
        return res
          .status(404)
          .json({ errors: [{ msg: "No pets found for this shelter" }] });
      }
      res.json(pets);
    } else if (!user.shelter) {
      const pets = await Pet.find({ "cluster.user": req.user.id });
      if (!pets || pets.length === 0) {
        return res
          .status(404)
          .json({ errors: [{ msg: "No pets found for this user" }] });
      }
      res.json(pets);
    }
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res
        .status(404)
        .json({ errors: [{ msg: "No pets found for this user" }] });
    }

    res.status(500).send("Server Error");
  }
});
// @route     GET api/pet/mypendingpets
// @desc      Show pets with pending cluster Request by user
// @access    Private

router.get("/mypendingpets", auth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user.id });

    const pets = await Pet.find({
      "clusterRequest.user": req.user.id
    }).populate("shelter", "name");
    if (!pets || pets.length === 0) {
      return res
        .status(404)
        .json({ errors: [{ msg: "No pending requests found for this user" }] });
    }
    res.json(pets);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res
        .status(404)
        .json({ errors: [{ msg: "No pending reqests found for this user" }] });
    }

    res.status(500).send("Server Error");
  }
});

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

// @route     GET api/pet/shelter/:shelter_id
// @desc      Show all pets by shelter profile
// @access    Public

router.get("/shelter/:shelter_id", async (req, res) => {
  try {
    const pets = await Pet.find({ shelter: req.params.shelter_id });

    if (!pets || pets.length === 0) {
      return res
        .status(404)
        .json({ errors: [{ msg: "No pets found for this shelter" }] });
    }
    res.json(pets);
  } catch (err) {
    console.error(err.message);
    if (err.kind === "ObjectId") {
      return res
        .status(404)
        .json({ errors: [{ msg: "No pets found for this shelter" }] });
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
    if (req.user.shelter === false) {
      return res.status(401).json({ msg: "User not authorized" });
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
        medications,
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
      if (medications) {
        petFields.medications = medications.split(",").map(med => med.trim());
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
        medications,
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
      if (medications) {
        petFields.medications = medications.split(",").map(med => med.trim());
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

// @route     PUT api/pet/medications/:pet_id
// @desc      Add pet medications
// @access    Private

/* Changed to Array for now

router.put(
  "/medications/:pet_id",
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
      const pet = await Pet.findOne({
        shelter: req.user.id,
        _id: req.params.pet_id
      });

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
// @desc      Delete a pet medication
// @access    Private

router.delete("/medications/:pet_id/:med_id", auth, async (req, res) => {
  try {
    const pet = await Pet.findOne({
      shelter: req.user.id,
      _id: req.params.pet_id
    });

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

*/

// @route     PUT api/pet/request/:pet_id
// @desc      Request to join pet cluster
// @access    Private

router.put("/request/:pet_id", auth, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.pet_id);

    //Check if pet already has cluster request by user

    if (
      pet.clusterRequest.filter(
        request => request.user.toString() === req.user.id
      ).length > 0
    ) {
      return res
        .status(400)
        .json({ msg: "Cluster request already sent, waiting for approval" });
    }
    //Check to see if user is already in cluster
    if (
      pet.cluster.filter(request => request.user.toString() === req.user.id)
        .length > 0
    ) {
      return res.status(400).json({ msg: "You are already in cluster" });
    }
    pet.clusterRequest.push({ user: req.user.id });

    await pet.save();

    res.json(pet.clusterRequest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     Put api/pet/unrequest/:pet_id/
// @desc      User remove request to join pet cluster
// @access    Private

router.put("/unrequest/:pet_id", auth, async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.pet_id);

    //Check if pet even has cluster request by user to delete
    if (
      pet.clusterRequest.filter(
        request => request.user.toString() === req.user.id
      ).length === 0
    ) {
      return res
        .status(400)
        .json({ msg: "No cluster request has been found for this user" });
    }
    //Get the remove index
    const removeIndex = pet.clusterRequest
      .map(request => request.user.toString())
      .indexOf(req.user.id);

    pet.clusterRequest.splice(removeIndex, 1);

    await pet.save();

    res.json(pet.clusterRequest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     PUT api/pet/denyrequest/:pet_id/:cluster_req_id
// @desc      Shelter remove user request to join pet cluster
// @access    Private

router.put("/denyrequest/:pet_id/:cluster_req_id", auth, async (req, res) => {
  try {
    const pet = await Pet.findOne({
      shelter: req.user.id,
      _id: req.params.pet_id
    });

    //Check if pet even has cluster request by user to delete
    if (
      pet.clusterRequest.filter(
        request => request._id.toString() === req.params.cluster_req_id
      ).length === 0
    ) {
      return res.status(400).json({ msg: "No cluster request found" });
    }
    //Get the remove index
    const removeIndex = pet.clusterRequest
      .map(request => request._id.toString())
      .indexOf(req.params.cluster_req_id);

    pet.clusterRequest.splice(removeIndex, 1);

    await pet.save();

    res.json(pet.clusterRequest);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     PUT api/pet/approverequest/:pet_id/:user_id
// @desc      Add user in cluster request to cluster & remove from cluster Request
// @access    Private

router.put("/approverequest/:pet_id/:user_id", auth, async (req, res) => {
  try {
    const pet = await Pet.findOne({
      shelter: req.user.id,
      _id: req.params.pet_id
    });

    if (
      pet.clusterRequest.filter(
        request => request.user.toString() === req.params.user_id
      ).length === 0
    ) {
      return res.status(400).json({ msg: "No cluster request found" });
    }
    //Get the remove index
    const removeIndex = pet.clusterRequest
      .map(request => request.user.toString())
      .indexOf(req.params.user_id);

    //Remove from Cluster Request Array
    pet.clusterRequest.splice(removeIndex, 1);

    //Push user into cluster Array
    pet.cluster.push({ user: req.params.user_id });

    await pet.save();

    res.json(pet.cluster);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route     PUT api/pet/cluster/:pet_id/:cluster_id
// @desc      Remove user from Cluster
// @access    Private

router.put("/cluster/:pet_id/:cluster_id", auth, async (req, res) => {
  try {
    const pet = await Pet.findOne({
      shelter: req.user.id,
      _id: req.params.pet_id
    });

    //Check if pet has user in cluster to delete
    if (
      pet.cluster.filter(item => item._id.toString() === req.params.cluster_id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "User is not in Cluster" });
    }
    //Get the remove index
    const removeIndex = pet.cluster
      .map(item => item._id.toString())
      .indexOf(req.params.cluster_id);

    pet.cluster.splice(removeIndex, 1);

    await pet.save();

    res.json(pet.cluster);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
