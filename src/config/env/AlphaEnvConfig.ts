// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

import { EnvConfig } from './EnvConfig';

export class AlphaEnvConfig extends EnvConfig {

    constructor() {
        super();

        process.env.SWAGGER_ENABLED = false;
        // process.env.MIGRATE = false;
    }
}
