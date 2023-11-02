const Requests = require("../models/Requests");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const generateUniqueId = require("generate-unique-id");

exports.getAllRequest = catchAsync(async (req, res, next) => {
  try {
    const requests = await Requests.find();

    res.json(requests);
  } catch (error) {
    console.error(error);
  }
});

exports.getRequestById = catchAsync(async (req, res, next) => {
  try {
    const requests = await Requests.findById(req.params.id);

    res.json(requests);
  } catch (error) {
    console.error(error);
  }
});

exports.addRequest = catchAsync(async (req, res, next) => {
  try {
    let { category, name, email, mobnumber, message } = req.body;

    const request = new Requests({
      requestId: generateUniqueId({
        length: 8,
        useLetters: false,
      }),
      category,
      name,
      email,
      mobnumber,
      message,
    });
    await request.save();

    res.json({ success: true, message: "Request added Succesfully", request });
  } catch (error) {
    console.error(error);
  }
});

exports.updateRequest = catchAsync(async (req, res, next) => {
  try {
    let request = await Requests.findById(req.params.id);
    request.status = !request.status;

    await request.save();

    res.json({
      success: true,
      message: "Request updated Succesfully",
      request,
    });
  } catch (error) {
    console.error(error);
  }
});

exports.removeRequest = catchAsync(async (req, res, next) => {
  try {
    let request = await Requests.findByIdAndRemove(req.params.id);

    if (!request) {
      return next(new AppError("Invalid Request Id Provided"));
    }

    res.json({
      success: true,
      message: "Request removed Succesfully",
      request,
    });
  } catch (error) {
    console.error(error);
  }
});
