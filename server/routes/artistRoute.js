const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Artist = mongoose.model('Artist');


router.post('/artists', async (req, res) => {
    try {
        const { name, dob, bio } = req.body;

        if (!name || !dob || !bio) {
            return res.status(400).json({ error: 'all details required' })
        }
        const newArtist = await Artist.create({ name, dob, bio });
        res.json(newArtist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.get('/artists/:id', async (req, res) => {
    const artistId = req.params.id;

    try {
        const artist = await Artist.findById(artistId);
        if (!artist) {
            return res.status(404).json({ error: 'Artist not found.' });
        }

        res.json(artist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API route to get all artists
router.get('/artists', async (req, res) => {
    try {
        const artists = await Artist.find();
        res.json(artists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// router.put('/artists/:id', async (req, res) => {
//     const updateArtist = await Artist.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
//     if (!updateArtist) {
//         return res.status(401).send({ error: "No artist found" })
//     }
//     return res.status(200).send({ message: "artist data updated" })
// })

// router.delete('/artists/:id', async (req, res) => {
//     const deleteArtist = await Artist.findByIdAndDelete({ _id: req.params.id })
//     return res.status(200).send({ message: "artist data deleted", deleteArtist })
// })

// API route to update a specific artist by ID
router.put('/artists/:id', async (req, res) => {
    const artistId = req.params.id;
    const { name, dob, bio } = req.body;

    try {
        const updatedArtist = await Artist.findByIdAndUpdate(artistId, { name, dob, bio }, { new: true });
        if (!updatedArtist) {
            return res.status(404).json({ error: 'Artist not found.' });
        }

        res.json(updatedArtist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/artists/:id', async (req, res) => {
    const artistId = req.params.id;
    try {
        const deleteArtist = await Artist.findByIdAndDelete({ _id: req.params.id })
        if (!deleteArtist) {
            return res.status(404).json({ error: 'Artist not found.' });
        }
        // Remove the artist reference from associated songs
        await Song.updateMany({ artists: artistId }, { $pull: { artist: artistId } });
        return res.status(200).send({ message: "artist data deleted", deleteArtist })
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
})

module.exports = router;