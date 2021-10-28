import japaneseCoreMessages from '@bicstone/ra-language-japanese';

const japaneseDomainMessages = {
    resources:{
        users: {
            name: "ユーザー",
            fields: {
                email: "メールアドレス",
                password: "パスワード"
            }
        }
    }
}

const japaneseMessages = {
    ...japaneseCoreMessages,
    ...japaneseDomainMessages
};

export default japaneseMessages;