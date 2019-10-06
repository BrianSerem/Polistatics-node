const express = require('express');
const router = express.Router();
const Car = require('../models/Cars');

router.get('/', async (req, res) => {

    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        res.json({
            message: 'error fetching cars',
            error
        });
    }

});
router.get('/:carId', async (req, res) => {

    const carId = req.params.carId;

    try {
        const car = await Car.findById(carId);
        res.json(car);
    } catch (error) {
        res.json({
            message: 'error fetching car',
            error
        })
    }

});

router.post('/', async (req, res) => {
    const carItems = req.body;

    const newCar = new Car({
        brand: carItems.brand,
        model: carItems.model,
        price: carItems.price,
        date: carItems.date
    });

    try {
        const savedCar = await newCar.save()
        res.json(savedCar)
    } catch (error) {
        res.status(400).json({
            message: 'error saving to the database',
            error
        });
    };
});

router.delete('/:carId', async (req, res) => {
    const carId = req.params.carId;

    try {
        const car = await Car.remove({
            _id: carId
        });
        if (car.n === 0) {
            res.json({
                message: `car with id ${carId} does not exist`
            });
        } else {
            res.json({
                car,
                message: `car with id ${carId} removed`
            });
        }
    } catch (error) {
        res.json({
            message: 'error removing car',
            error
        })
    }

});

router.patch('/:carId', async (req, res) => {
    const carId = req.params.carId;
    const updateInfo = req.body;
    try {
        const car = await Car.updateOne({
            _id: carId
        }, {
            $set: {
                brand: updateInfo.brand

            }
        });
        if (car.n === 0) {
            res.status(404).json({
                message: `Car with id ${carId} not found`
            });
        } else {
            res.json(car);
        }
    } catch (error) {
        res.status(400).json({
            message: 'error updating car'
        });
    }
});
module.exports = router;