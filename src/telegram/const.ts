export const TmaModeDescription: { [key: string]: string } = {
    test: 'Test an email address',
    white: 'Manage the white list',
    block: 'Manage the block list',
};

export const TelegramCommands = [
    {
        command: 'id',
        description: '/id - Get your chat ID',
    },
    {
        command: 'test',
        description: `/test - ${TmaModeDescription.test}`,
    },
    {
        command: 'white',
        description: `/white - ${TmaModeDescription.white}`,
    },
    {
        command: 'block',
        description: `/block - ${TmaModeDescription.block}`,
    },
];
