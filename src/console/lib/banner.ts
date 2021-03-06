// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

import * as figlet from 'figlet';
import * as chalk from 'chalk';




figlet(process.argv[2], (error: any, data: any) => {
    if (error) {
        return process.exit(1);
    }
    console.log(chalk.blue(data));
    console.log('');
    process.exit(0);
});
