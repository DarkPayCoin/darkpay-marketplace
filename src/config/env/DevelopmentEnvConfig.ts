// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

import * as _ from 'lodash';
import { EnvConfig } from './EnvConfig';

export class DevelopmentEnvConfig extends EnvConfig {

    constructor(dataDirLocation?: string) {
        super(
            dataDirLocation || './data',
            '.env'
        );
    }
}
