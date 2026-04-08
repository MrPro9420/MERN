require('dotenv').config();
const mongoose = require('mongoose');



mongoose.connect(process.env.MONGO_DB_URL)
    .then(() => {
        console.log("Conncetd to DB")
        console.log(mongoose.connection.name)
    })
    .catch(err => { console.error(err) });


const courseSchema = new mongoose.Schema(
    {
        _id: String,
        name: String,
        author: String,
        tags: [String],
        date: { type: Date, default: Date.now },
        price: Number,
        isPublished: Boolean
    }
);

const Course = mongoose.model('Course', courseSchema);




async function createCourse() {
    const course = new Course({
        name: "MongoDB Course",
        author: "None",
        price: 11000,
        tags: ['backend', 'database'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result)
}

// createCourse();

async function getAllCourse() {
    // const course = await Course.find({ price: { $gt: 11000, $lte: 20000 } }).limit(10).select({ name: 1, author: 1, _id: 0 });
    // const course = await Course.find().or([{ price: { $lt: 21000 } }, { tag: 'backend' }]).limit(10).select({ name: 1, author: 1, _id: 0 });
    // const course = await Course.find().or([{ price: { $lt: 21000 } }, { tag: 'backend' }]).limit(10).countDocuments(); //  //getting count of result
    // let pagenumber = 2, limit = 2;
    // const course = await Course.find().limit(limit).skip((pagenumber - 1) * limit);  

    // Exercise 1
    // const course = await Course.find({ isPublished: true, tags: 'backend' }).sort('name').select({ name: 1, author: 1 })

    //    Exercise 2
    // const course = await Course.find({ isPublished: true }).or([{ tags: 'frontend' }, { tags: 'backend' }]).sort('-price').select('name author');

    //    Exercise 3
    const course = await Course.find({ isPublished: true }).or([{ price: { $gte: 15 } }, { name: /.*by.*/i }]);
    console.log(course)
}

// getAllCourse();

async function updateCourse() {
    const course = await Course.findOne({ _id: "5a68fdc3615eda645bc6bdec" });
    if (!course) {
        console.log("No course found")
        return;
    }
    course.author = 'Mosh Updated';
    course.price = 100;
    // course.set({
    //     author: 'Mosh Updated',
    //     price: 100
    // })
    const result = await course.save()
    console.log(result)

}

// updateCourse()

async function updateCourseById(id) {
    // const result = await Course.findOneAndUpdate({ _id: id }, { author: 'Mosh Updated 4' })
    const result = await Course.updateOne({ _id: id }, {
        $set: {
            author: "No Author"
        }
    })
    console.log(result)
}

// updateCourseById("5a68fdc3615eda645bc6bdec")

async function removeCourseById(id) {

    const result = await Course.deleteOne({ _id: id })
    console.log(result)
}
removeCourseById("5a68fdc3615eda645bc6bdec")






