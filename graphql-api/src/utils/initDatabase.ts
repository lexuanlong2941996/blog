import mongoose from "mongoose"

const initDatabase = async () => {
    try {
        await mongoose.connect(`${process.env.DATABASE_URL}`, { dbName: process.env.DATABASE_NAME })
        console.log(
            "⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️ Connect to MONGODB inside docker ⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️⚡️"
        )
    } catch (error) {
        console.error(error)
        process.exit(1)
    }
}

export default initDatabase
