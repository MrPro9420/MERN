
const mongoose = require('mongoose');
// const mongoDbUrl = "mongodb+srv://dbUser:dbuser@Vidley.ceabcbc.mongodb.net/vidly?retryWrites=true&w=majority";
const uri = "mongodb://dbUser:dbuser@ac-s02kii8-shard-00-00.ceabcbc.mongodb.net:27017,ac-s02kii8-shard-00-01.ceabcbc.mongodb.net:27017,ac-s02kii8-shard-00-02.ceabcbc.mongodb.net:27017/vidly?ssl=true&replicaSet=atlas-jb00dk-shard-0&authSource=admin&retryWrites=true&w=majority";
mongoose.connect(uri)
    .then(() => { console.log("Conncetd to DB") })
    .catch(err => { console.error(err) });


const courseSchema = new mongoose.Schema(
    {
        name: String,
        author: String,
        tags: [String],
        date: { type: Date, default: Date.now },
        isPublished: Boolean
    }
);

const Course = mongoose.model('Course', courseSchema);




async function createCourse() {
    const course = new Course({
        name: "Node.Js Course",
        author: "Mr.Pro",
        tags: ['node', 'backend'],
        isPublished: true
    });

    const result = await course.save();
    console.log(result)
}

createCourse();




