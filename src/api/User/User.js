import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        isMatched: async (parent, _, { request }) => {
            const { user } = request;
            let count = await prisma.usersConnection({ where: { following_some: { id: user.id } } })
                .aggregate()
                .count();
            console.log(count);
            if (count !== 1) {
                return false;
            }
            else {
                return true;
            }
        }
    }
}