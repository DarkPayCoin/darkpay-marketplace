// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

import { MessageCreateParamsInterface } from './MessageCreateParamsInterface';

export interface OrderItemShipMessageCreateParams extends MessageCreateParamsInterface {
    bidHash: string;    // bid hash to reject
    memo?: string;
}


