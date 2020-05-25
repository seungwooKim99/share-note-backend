import { prisma } from "../../../../generated/prisma-client";
import { hash } from "../../../utils";

export default {
    Mutation: {
        createAccount: async (_, args) => {
            const { name, password, email } = args;
            const exists = await prisma.$exists.user({ email });
            if (exists) {
                throw Error("This email is already taken");
            }
            await prisma.createUser({
                name, email, password: hash(password)
            });
            return true;
        }
    }
}