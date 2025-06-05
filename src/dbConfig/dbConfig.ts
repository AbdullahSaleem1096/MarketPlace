import mongoose from "mongoose";

export async function connect() {
    try {
        await mongoose.connect('mongodb+srv://abdullahsaleem1096:wgztJDL77ce1IzDr@cluster0.n55ywso.mongodb.net/Next');
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('MongoDB connected successfully');
        });

        connection.on('error', (err) => {
            console.log('Connection error. make sure your MongoDb is running ' + err);
            process.exit();
        });
    } catch (err) {
        console.log('something goes wrong');
        console.log(err);
        throw err; // Re-throw the error to handle it in the calling function
    }
}