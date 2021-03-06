// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

import { SmsgSendParams } from './SmsgSendParams';
import { KVS } from 'omp-lib/dist/interfaces/common';

/**
 *
 */
export interface ActionRequestInterface {
    sendParams: SmsgSendParams;
    objects?: KVS[];
}
