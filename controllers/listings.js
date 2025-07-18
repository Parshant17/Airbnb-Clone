const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index = async (req, res)=>{
   const allListings = await Listing.find({})
   res.render("listings/index.ejs", {allListings});
};

module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
    try {
        let { id } = req.params;
        const listing = await Listing.findById(id)
        .populate({
            path : "reviews",
        populate: {
            path: "author",
        },
    })
        .populate("owner");
        
        if (!listing) {
           // return res.status(404).send("Listing not found");
           req.flash("error", "Listing you requested for does not exist ");
           res.redirect("/listings");
        }
        console.log(listing);
        res.render("listings/show.ejs", { listing: listing });
    } catch (err) {
        console.error("Error fetching listing:", err);
        res.status(500).send("Error fetching listing");
    }
};

module.exports.createListing = async (req, res, next) => {
  let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 2,
  }).send();

  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;

  // ✅ Correct image assignment here
  newListing.image = {
    url: req.file.path,
    filename: req.file.filename
  };

  // ✅ Save geometry data from Mapbox
  newListing.geometry = response.body.features[0].geometry;

  const savedListing = await newListing.save();
  console.log(savedListing);

  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res)=>{
   let {id}= req.params;
   const listing =await Listing.findById(id); 
    if (!listing) {
           // return res.status(404).send("Listing not found");
           req.flash("error", "Listing you requested for does not exist ");
           res.redirect("/listings");
        }
   let originalImageUrl = listing.image.url;   
    originalImageUrl = originalImageUrl.replace("/upload", "/upload/h_300,w_250");  
   res.render("listings/edit.ejs", { listing: listing , originalImageUrl});
};
module.exports.updateListing = async (req, res) => {
    const { id } = req.params;

    // Update location → re-fetch new geometry from Mapbox
    const geoResponse = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
    }).send();

    const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing }, { new: true });

    listing.geometry = geoResponse.body.features[0].geometry;

    // ✅ If a new image is uploaded, replace the old one
    if (req.file) {
        // ❌ Optional: delete old image from Cloudinary
        // if (listing.image && listing.image.filename) {
        //     await cloudinary.uploader.destroy(listing.image.filename);
        // }

        listing.image = {
            url: req.file.path,
            filename: req.file.filename
        };
    }

    await listing.save();
    req.flash("success", "Listing updated!");
    res.redirect(`/listings/${id}`);
};
module.exports.destroyListing = async (req, res) =>{
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        req.flash("success", " Listing deleted!");
        res.redirect("/listings");
};