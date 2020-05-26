import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        searchUser: async (_, args, { request }) => {
            const { email } = args;
            return prisma.user({ email });
            //If not exists, return null
        }
    }
};