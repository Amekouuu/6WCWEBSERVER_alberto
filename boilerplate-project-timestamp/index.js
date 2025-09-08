var express = require('express');
var app = express();
var cors = require('cors');

app.use(cors());
app.use(express.static('public'));

// Homepage
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

// API endpoint
app.get("/api/:date?", function (req, res) {
  let dateParam = req.params.date;
  let date;

  if (!dateParam) {
    // If no date provided → current date
    date = new Date();
  } else {
    // If only digits → treat as UNIX timestamp (milliseconds or seconds)
    if (/^\d+$/.test(dateParam)) {
      // Check length: if it's 13 digits → ms, if 10 digits → seconds
      if (dateParam.length === 13) {
        date = new Date(parseInt(dateParam));
      } else {
        date = new Date(parseInt(dateParam) * 1000);
      }
    } else {
      date = new Date(dateParam);
    }
  }

  // Invalid date check
  if (date.toString() === "Invalid Date") {
    return res.json({ error: "Invalid Date" });
  }

  res.json({
    unix: date.getTime(),
    utc: date.toUTCString()
  });
});

// Start server
var listener = app.listen(process.env.PORT || 5000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
