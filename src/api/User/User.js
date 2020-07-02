import { prisma } from "../../../generated/prisma-client";

export default {
    User: {
        isMatched: ({ id }) => {
            let count = prisma.usersConnection({ where: { followers_some: { id } } })
                .aggregate()
                .count();
            if (count !== 1) {
                return false;
            }
            else {
                return true;
            }
        }
    }
}