const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Song = mongoose.model('Song');
const Artist = mongoose.model('Artist')
const User = mongoose.model('User')


router.post('/songs', async (req, res) => {
    const { name, releaseDate, coverImage, artists } = req.body;

    try {
        // Create the new song
        const newSong = await Song.create({ name, releaseDate, coverImage, artists });

        // Update each artist's list of songs
        for (const artistId of artists) {
            await Artist.findByIdAndUpdate(artistId, { $push: { songs: newSong._id } });
        }

        res.json(newSong);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// get all songs 
// This route uses the Song.find() method to retrieve all songs from the MongoDB database. 
// The .populate() method is used to replace the artist and user IDs with the actual artist and user details.
router.get('/songs', async (req, res) => {
    try {
        // Fetch all songs from the database
        const songs = await Song.find().populate('artist').populate('ratings.user', 'name'); // Populate artists and ratings.user fields

        res.json(songs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


router.post('/songs/:songId/rate', async (req, res) => {
    const { userId, rating } = req.body;
    const songId = req.params.songId;

    try {
        // Check if the rating is between 1 and 5
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
        }

        // Update the song's ratings
        const updatedSong = await Song.findByIdAndUpdate(
            songId,
            { $push: { ratings: { user: userId, rating } } },
            { new: true }
        );

        // Update the user's rated songs
        await User.findByIdAndUpdate(
            userId,
            { $push: { ratedSongs: { song: songId, rating } } },
            { new: true }
        );

        res.json(updatedSong);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;