// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

import * as resources from 'resources';
import { MessageCreateParamsInterface } from './MessageCreateParamsInterface';
import {CryptoAddress} from 'omp-lib/dist/interfaces/crypto';

export interface ListingItemAddMessageCreateParams extends MessageCreateParamsInterface {
    listingItem: resources.ListingItem | resources.ListingItemTemplate;
    cryptoAddress: CryptoAddress;
}

