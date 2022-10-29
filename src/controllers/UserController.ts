import { Request, Response } from "express";
import bcrypt from 'bcrypt';
import { BadRequestError } from "../helpers/api-errors";
import { userRepository } from "../repositories/userRepository";

export class UserController {
    async create(req: Request, res: Response){
        const { name, email, password } = req.body;

        const userExists = await userRepository.findOneBy({ email });

        if(userExists){
            throw new BadRequestError('Este e-mail já está em uso.');
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser = userRepository.create({
            name,
            email,
            password: encryptedPassword
        });

        await userRepository.save(newUser);

        const { password: _, ...user } = newUser;

        return res.status(201).json(user);
    }
}