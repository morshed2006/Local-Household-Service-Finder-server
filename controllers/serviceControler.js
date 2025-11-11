import Service from '../models/Service.js';

export const getServices = async (req, res) => {
    const { minPrice, maxPrice } = req.query;
    const filter = {};
    if(minPrice || maxPrice) filter.price = {};
    if(minPrice) filter.price.$gte = Number(minPrice);
    if(maxPrice) filter.price.$lte = Number(maxPrice);

    try {
        const services = await Service.find(filter).limit(6); // dynamic 6 services
        res.json(services);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const addService = async (req, res) => {
    const newService = new Service(req.body);
    try {
        const saved = await newService.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const updateService = async (req, res) => {
    try {
        const updated = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const deleteService = async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: 'Service deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
