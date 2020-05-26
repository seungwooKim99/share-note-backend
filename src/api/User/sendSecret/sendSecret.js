import { generateSecret, sendSecretMail } from "../../../utils";

export default {
    Mutation: {
        sendSecret: async (_, args, { reqeust }) => {
            const { email } = args;
            const signUpSecret = generateSecret();
            var check = sendSecretMail(email, signUpSecret);
            console.log(check);
            if (check) {
                return `${signUpSecret}`;
            }
            else {
                return ``;
            }
        }
    }
}