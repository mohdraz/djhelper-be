const express = require('express');
const db = require('../models/models.js');

const router = express.Router();

/* ***********************************************************
  publicRouter
  -----------------------------------------------------------
  This file serves informational routes that
  are not protected and serves information that
  is available to the general public.
  -----------------------------------------------------------
  It is primarily for advertising of DJs and events.
  -----------------------------------------------------------
  The private versions of these routes are located
  under the authRouter endpoints.
  ******************************************************** */

// ----------------- DJs -----------------
// TODO: Filter out private information
// (Username, Password)

// Get all DJs
router.get('/djs', (req, res) => {
  db.getAllDJs()
    .then(info => {
      res.status(200).json(info);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Get DJ by ID
router.get('/dj/:id', (req, res) => {
  const { id } = req.params;
  db.findDJById(id)
    .then(info => {
      res.status(200).json(info);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// ----------------- Events -----------------
// TODO: Filter out private information (notes)

router.get('/events', (req, res) => {
  db.getAllEvents()
    .then(info => {
      res.status(200).json(info);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.get('/event/:id', (req, res) => {
  const { id } = req.params;
  db.findEventById(id)
    .then(info => {
      res.status(200).json(info);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// ----------------- Locations -----------------
// TODO: Filter out private information?

// get all Locations
router.get('/locations', (req, res) => {
  db.getAllLocations()
    .then(info => {
      res.status(200).json(info);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Get a single location
router.get('/location/:id', (req, res) => {
  const { id } = req.params;
  db.findLocationById(id)
    .then(info => {
      res.status(200).json(info);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// ----------------- Songs -----------------
// Get ALL Songs
// TODO: Consider pagination
router.get('/songs', (req, res) => {
  db.getAllSongs()
    .then(info => {
      res.status(200).json(info);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// Get Song by ID
router.get('/song/:id', (req, res) => {
  const { id } = req.params;
  db.getSongsByID(id)
    .then(info => {
      res.status(200).json(info);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

// ----------------- Playlists ----------------- \\

// Get playlist by event ID
// Returns array of songs that match the "event" parameter
// TODO: Switch back to using "/:event_id" instead of "/?event=n"?
router.get('/playlist/', (req, res) => {
  const { event } = req.query;

  if (!event) {
    res.status(400).json({ message: 'No event ID specified' });
  }

  db.getPlaylistByEventID(event)
    .then(info => {
      res.status(200).json(info);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

module.exports = router;
