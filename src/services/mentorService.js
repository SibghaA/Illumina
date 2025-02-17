import { getCollection } from '../db/mongodb.js';

async function getAllMentors() {
    const collection = getCollection('mentors');
    return await collection.find({}).toArray();
}

async function getMentorById(id) {
    const collection = getCollection('mentors');
    return await collection.findOne({ _id: id });
}

async function createMentor(mentorData) {
    const collection = getCollection('mentors');
    const result = await collection.insertOne(mentorData);
    return result.insertedId;
}

async function updateMentor(id, mentorData) {
    const collection = getCollection('mentors');
    const result = await collection.updateOne(
        { _id: id },
        { $set: mentorData }
    );
    return result.modifiedCount > 0;
}

async function deleteMentor(id) {
    const collection = getCollection('mentors');
    const result = await collection.deleteOne({ _id: id });
    return result.deletedCount > 0;
}

export {
    getAllMentors,
    getMentorById,
    createMentor,
    updateMentor,
    deleteMentor
}; 