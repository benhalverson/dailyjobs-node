var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var MD5 = require("MD5");
var slug = require("slug");

mongoose.connect(process.env.MONGO_URL);

//Creating model for database
var Job = mongoose.model("Job", {
  slug: { type: String, required: true, unique: true },
  body: { type: String, required: true },
  email: { type: String, required: true },
  keywords: { type: String },
  createdAt: { type: Date, default: Date.now },

});
//error handling
Job.on('index', function(err) {
  if (err) {
    console.error(err);
  }
});

router.get('/upload', function(req, res, next) {
  res.render('upload', { title: 'Mongo API' });
});
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Mongo API' });
});

router.post("/jobs", function(req, res) {
  var job = new Job(req.body);

  job.slug = slug(req.body.body || '');
  job.gravatarUrl = "http://www.gravatar.com/avatar/" + MD5(req.body.email);

  job.save(function(err, savedJob) {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "Validation Failed" });
    }
    console.log("savedJob:", savedJob);
    res.json(savedJob);
  });
});

router.get("/jobs", function(req, res) {
  Job.find({}).sort({ createdAt: 'desc' }).limit(20).exec(function(err, jobs) {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "Could not read jobs data" });
    }
    res.json(jobs);
  });
});

router.get("/jobs/:jobListing", function(req, res) {
  Job.findOne({slug: req.params.jobListing}).exec(function(err, job) {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "Could not read jobs data" });
    }
    if (!job) {
      res.status(404);
    }
    res.json(job);
  });
});

router.patch("/jobs/:jobListing", function(req, res) {
  Job.findOneAndUpdate({ slug: req.params.jobListing }, req.body, { new: true }, function(err, updatedJob) {
    console.log(err, updatedJob);
    if (err) {
      console.log(err);
      res.status(400).json({ error: "Could not read jobs data" });
    }
    if (!updatedJob) {
      res.status(404);
    }
    res.json(updatedJob);
  });
});

router.delete("/jobs/:jobListing", function(req, res) {
  Job.findOneAndRemove({ slug: req.params.jobListing }, function(err, jobListing) {
    console.log(err, updatedJob);
    if (err) {
      console.log(err);
      res.status(400).json({ error: "Could not read jobs data" });
    }
    if (!updatedJob) {
      res.status(404);
    }
    res.json({message: 'job deleted'});
  });
});

module.exports = router;
