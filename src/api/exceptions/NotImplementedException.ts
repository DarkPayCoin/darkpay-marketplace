// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

/**
 * NotImplementedException
 * ----------------------------------------
 *
 * This should be used when a feature is not implemented yet.
 */

import { MessageException } from './MessageException';


export class NotImplementedException extends MessageException {
    constructor() {
        super('Not implemented.');
    }
}
