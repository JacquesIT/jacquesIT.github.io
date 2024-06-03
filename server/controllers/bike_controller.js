import bikes from "../data/bikes_data.js"
import bids from "../data/bids_data.js"
import specs from "../data/bike_spec_data.js"
import images from "../data/bike_images.js"
import {getHighestIdOfDataSet} from "../utils/utils.js"
import fs from 'fs'
import path from 'path'
import { promisify } from "util"
import { fileURLToPath } from 'url';

const readFileAsync = promisify(fs.readFile);
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export function getAllBikes(req, res) {
    if (bikes.length != 0) res.json(bikes);
    else
        res.json({error: "There are no bikes"})
}


export function getBikeSpecByBikeId(req, res){
    const foundBike = bikes.find((b) => b.id == req.params.id);

    if (!foundBike) return res.status(404).json({ error: "Bike specs not found" });

    const bikeSpec = specs.find((s) => s.id == foundBike.spec_id);

    res.status(201).json(bikeSpec)
}


export function getAllBidsOnBikeId(req, res) {
    const foundBike = bikes.find((b) => b.id == req.params.id);

    if (!foundBike) return res.status(404).json({ error: "No bids found" });

    const foundBids = bids.filter((b) => b.bike_id == foundBike.id);

    res.status(201).json(foundBids)
}


export function getBikeById(req, res){
    const foundBike = bikes.find((b) => b.id == req.params.id);

    if (!foundBike) return res.status(404).json({ error: "Bike not found" });
    
    res.status(201).json(foundBike);
}


export async function getBikeImagesByBikeId(req, res){
    const foundBike = bikes.find((b) => b.id == req.params.id);

    if (!foundBike) return res.status(404).json({ error: "No bids found" });

    const foundImages = images.filter((i) => i.bike_id == foundBike.id);

    if (foundImages.length === 0) return res.status(404).json({ error: "No images found" });

    try {
        const imageBlobs = await Promise.all(foundImages.map(async (image) => {
            const imagePath = path.join(__dirname, image.image_location);
            const imageBuffer = await readFileAsync(imagePath);
            return {
                ...image,
                blob: Buffer.from(imageBuffer).toString('base64')
            };
        }));

        res.status(201).json(imageBlobs);
    } catch (error) {
        console.error('Error reading image files:', error);
        res.status(500).json({ error: 'Failed to process images' });
    }
}


export function addBike(req, res) {
    req.body.id = getHighestIdOfDataSet(bikes) + 1;
    req.body.spec_id = 0
    bikes.push(req.body);
    return res.status(201).json(req.body);
}


export function addBidOnBikeId(req, res) {
    const foundBike = bikes.find((b) => b.id == req.params.bikeId);

    if (!foundBike) return res.status(404).json({ error: "Bike not found" });

    req.body.id = bids.length + 1
    req.body.bike_id = foundBike.id

    bids.push(req.body);
    return res.status(201).json(req.body);
}


export function addSpecOnBikeId(req, res) {
    const foundBike = bikes.find((b) => b.id == req.params.id);

    if (!foundBike) return res.status(404).json({ error: "Bike not found" });

    if (foundBike.spec_id == 0){
        req.body.id = specs.length + 1
        foundBike.spec_id = specs.length + 1
        specs.push(req.body);
        return res.status(201).json(req.body);
    }
    return res.status(404).json({ error: "Bike already has specs" });
}


export function updateBike(req, res){
    const foundBike = bikes.find((b) => b.id == req.params.id);

    if (foundBike) {
        if (req.body.spec_id) foundBike.spec_id = req.body.spec_id;
        if (req.body.bike_name) foundBike.bike_name = req.body.bike_name;
        if (req.body.brand) foundBike.brand = req.body.brand;
        if (req.body.model_year) foundBike.model_year = req.body.model_year;
        if (req.body.original_price) foundBike.original_price = req.body.original_price;
        if (req.body.type) foundBike.type = req.body.type;
        if (req.body.start_date) foundBike.start_date = req.body.start_date;
        if (req.body.end_date) foundBike.end_date = req.body.end_date;

        res.status(200).json({message: `Bike is successfully updated`});
    } else {
        res.status(404).json({error: `Bike is not found`});
    }
}


export function updateBikeSpec(req, res){
    const foundBike = bikes.find((b) => b.id == req.params.id);

    if (!foundBike) return res.status(404).json({ error: "Bike not found" });

    const bikeSpec = specs.find((s) => s.id == foundBike.spec_id);

    if (bikeSpec) {
        if (req.body.frame) bikeSpec.frame = req.body.frame;
        if (req.body.fork) bikeSpec.fork = req.body.fork;
        if (req.body.front_derailleur) bikeSpec.front_derailleur = req.body.front_derailleur;
        if (req.body.rear_derailleur) bikeSpec.rear_derailleur = req.body.rear_derailleur;
        if (req.body.shifters) bikeSpec.shifters = req.body.shifters;
        if (req.body.crankset) bikeSpec.crankset = req.body.crankset;
        if (req.body.chain) bikeSpec.chain = req.body.chain;
        if (req.body.breaks) bikeSpec.breaks = req.body.breaks;
        if (req.body.wheels) bikeSpec.wheels = req.body.wheels;
        if (req.body.tyres) bikeSpec.tyres = req.body.tyres;
        if (req.body.stem) bikeSpec.stem = req.body.stem;
        if (req.body.handlebar) bikeSpec.handlebar = req.body.handlebar;
        if (req.body.pedals) bikeSpec.pedals = req.body.pedals;

        res.status(200).json({message: `Bike is successfully updated`});
    } else {
        res.status(404).json({error: `Bike is not found`});
    }
}


export function deleteBike(req, res){
    const foundBike = bikes.find((b) => b.id == req.params.id);

    if (foundBike !== -1 && foundBike.spec_id !== 0) {
        const foundSpec = specs.find((s) => s.id == foundBike.spec_id);
        const foundBids = bids.filter((b) => b.bike_id == foundBike.id);
        bikes.splice(foundBike, 1);
        bikes.splice(foundSpec, 1);
        bikes.splice(foundBids, foundBids.length);
        res.status(200).json({message:`Bike is successfully deleted`});
    } else {
        res.status(404).json({error: `Bike provided is not found`});
    }
}