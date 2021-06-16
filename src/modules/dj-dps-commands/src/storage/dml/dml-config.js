module.exports = {
    mongodb:{
        url: process.env.MONGOLAB_URI || process.env.MONGODB_URL || process.env.ATLAS_URL || "mongodb://localhost:27017",
        // url:"mongodb+srv://jace:jace@cluster0.kut6x.mongodb.net/dj-storage?retryWrites=true&w=majority",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    }    
}    

