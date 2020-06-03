// must restart server whenever you make changes in next.config
module.exports = {
  env: {
    MONGO_SRV: "mongodb+srv://Ruud86:Davidvilla7@reactreserve-yxar9.mongodb.net/test?retryWrites=true&w=majority",
    JWT_SECRET: "JesusChristIsTheNameAboveAllNames",
    CLOUDINARY_URL: "https://api.cloudinary.com/v1_1/dsnd07h0x/image/upload",
    // CLOUDINARY_URL: "https://apicloudinary.com/v1_1/cloud-name/image/upload",
    // CLOUDINARY_URL=cloudinary://428876222469258:ky3wqT1UFcO_cWOuO8UT0OCaRWw@dsnd07h0x
    // CLOUDINARY_URL: "cloudinary://428876222469258:ky3wqT1UFcO_cWOuO8UT0OCaRWw@dsnd07h0x",
    STRIPE_SECRET_KEY: "sk_test_s3wnrFd9idWFUMuTdUb4U1ak005dmAiKl9"
  }
};
