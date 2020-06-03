import connectDb from '../../utils/connectDb';
import User from '../../models/User';
import Cart from '../../models/Cart';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import JWT_SECRET from '../../next.config';
import isEmail from 'validator/lib/isEmail';
import isLength from 'validator/lib/isLength';

connectDb();

export default async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // 1) Validate name / email / password
        if (!isLength(name, { min: 3, max: 30 })) {
            return res.status(422).send("Le Nom doit avoir entre 3 et 30 caractères");
        } else if (!isLength(password, { min: 6 })) {
            return res.status(422).send("Le mot de passe doit contenir au moins 6 caractères");
        } else if (!isEmail(email)) {
            return res.status(422).send("L'email doit être valide");
        }
        // 2) Check to see if the user already exists in the db
        const user = await User.findOne({ email });
        if (user) {
            return res.status(422).send(`Un utilisateur existe déjà avec l'email ${email}`);
        }
        // 3) --if not, hash their password
        const hash = await bcrypt.hash(password, 10);
        // 4) create user
        const newUser = await new User({
            name,
            email,
            password: hash
        }).save();
        // console.log({ newUser });
        // 5) create a car for the new user
        await new Cart({ user: newUser._id }).save();
        // 5) create token for the new user
        const token = jwt.sign({ userId: newUser._id }, 
            process.env.JWT_SECRET, { expiresIn: '7d' });
        // 6) Send back token
        res.status(201).json(token);
    } catch(error) {
        console.error(error);
        res.status(500).send("Error sign up user. Try again later");       
    }
};