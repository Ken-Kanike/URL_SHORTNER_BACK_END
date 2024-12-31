import express from 'express';
import { urlModel } from "../models/shortUrl"; 

export const createUrl = async (
    req: express.Request, res: express.Response
) => {
    try {
        const { fullUrl } = req.body;
        console.log("The full url is : " + req.body.fullUrl);
        const urlFound = await urlModel.find({fullUrl});
        if(urlFound.length > 0){
            res.status(409);// conflict : data already exit
            res.send(urlFound);
        } else {
            const shortUrl = await urlModel.create({fullUrl});
            res.status(201).send(shortUrl); // success : new record is created
        }
    } catch (error) {
        res.status(500).send("Message : " + "Something went wrong!");   
    }
};

export const getAllUrl = async (
    req: express.Request, res: express.Response
) => {
    try {
        const shortUrl = await urlModel.find().sort({createdAt:-1});
        if(shortUrl.length < 0) {
            res.status(404).send("Message : " + "No short URL found!");
        } else {
            res.status(200).send(shortUrl); // success : get all records
        }
    } catch (error) {
        res.status(500).send("Message : " + "Something went wrong!");   
    }
};
export const getUrl = async (
    req: express.Request, res: express.Response
) => {
    try {
        const shortUrl = await urlModel.findOne({ shortUrl: req.params.id });
        if (!shortUrl) {
            res.status(404).send("Message : " + "Full URL not found!");
        } else {
            shortUrl.clicks++;
            await shortUrl.save(); // Ensure `save` is awaited
            res.redirect(`${shortUrl.fullUrl}`); // Correct template literal usage
        }
    } catch (error) {
        res.status(500).send("Message : " + "Something went wrong!");
    }
};


export const deleteUrl = async (
    req: express.Request, res: express.Response
) => {
    try {
        const shortUrl = await urlModel.findByIdAndDelete({ _id: req.params.id});
        if(shortUrl){
            res.status(200).send("Message : " + "Requested URL successfully deleted!");
        } 
    } catch (error) {
        res.status(500).send("Message : " + "Something went wrong!");   
    }
};
