const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const mongoURI = "mongodb+srv://singhprashantsuresh:mern123@cluster0.o0muy89.mongodb.net/FoodWeb?retryWrites=true&w=majority&appName=Cluster0"
const mongoDB = async () => {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true }, async (err, result) => {
        if (err) console.log("---", err)
        else {
            console.log("Connected Successfully");
            const fetched_data = await mongoose.connection.db.collection("food_items");
            fetched_data.find({}).toArray(async function (err, data) {
                const foodCategory = await mongoose.connection.db.collection("food_categories");
                foodCategory.find({}).toArray(function (err, catData) {
                    if (err) console.log(err);
                    else {
                        global.food_items = data;
                        global.foodCategory=catData;
                    }
                })
            })
        }
    });
}
module.exports = mongoDB;
