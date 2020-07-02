import { generateToken, hash } from "../../../utils";
import { prisma } from "../../../../generated/prisma-client";

export default {
    Mutation: {
        generateToken: async (_, args) => {
            const { email, password } = args;
            const user = await prisma.user({ email });
            if (!user) {
                throw Error("잘못된 이메일 입니다.")
            }
            if (user.password === hash(password)) {
                return generateToken(user.id);
            }
            else {
                throw Error("잘못된 비밀번호 입니다.")
            }
        }
    }
};