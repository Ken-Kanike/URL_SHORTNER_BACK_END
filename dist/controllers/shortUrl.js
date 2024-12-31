"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUrl = exports.getUrl = exports.getAllUrl = exports.createUrl = void 0;
const shortUrl_1 = require("../models/shortUrl");
const createUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { fullUrl } = req.body;
        console.log("The full url is : " + req.body.fullUrl);
        const urlFound = yield shortUrl_1.urlModel.find({ fullUrl });
        if (urlFound.length > 0) {
            res.status(409); // conflict : data already exit
            res.send(urlFound);
        }
        else {
            const shortUrl = yield shortUrl_1.urlModel.create({ fullUrl });
            res.status(201).send(shortUrl); // success : new record is created
        }
    }
    catch (error) {
        res.status(500).send("Message : " + "Something went wrong!");
    }
});
exports.createUrl = createUrl;
const getAllUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrl = yield shortUrl_1.urlModel.find().sort({ createdAt: -1 });
        if (shortUrl.length < 0) {
            res.status(404).send("Message : " + "No short URL found!");
        }
        else {
            res.status(200).send(shortUrl); // success : get all records
        }
    }
    catch (error) {
        res.status(500).send("Message : " + "Something went wrong!");
    }
});
exports.getAllUrl = getAllUrl;
const getUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrl = yield shortUrl_1.urlModel.findOne({ shortUrl: req.params.id });
        if (!shortUrl) {
            res.status(404).send("Message : " + "Full URL not found!");
        }
        else {
            shortUrl.clicks++;
            yield shortUrl.save(); // Ensure `save` is awaited
            res.redirect(`${shortUrl.fullUrl}`); // Correct template literal usage
        }
    }
    catch (error) {
        res.status(500).send("Message : " + "Something went wrong!");
    }
});
exports.getUrl = getUrl;
const deleteUrl = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const shortUrl = yield shortUrl_1.urlModel.findByIdAndDelete({ _id: req.params.id });
        if (shortUrl) {
            res.status(200).send("Message : " + "Requested URL successfully deleted!");
        }
    }
    catch (error) {
        res.status(500).send("Message : " + "Something went wrong!");
    }
});
exports.deleteUrl = deleteUrl;
