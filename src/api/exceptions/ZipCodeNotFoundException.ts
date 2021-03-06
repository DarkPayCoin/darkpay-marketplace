// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

/**
 * ZipCodeNotFoundException
 * ----------------------------------------
 *
 * This should be used if zip code not found.
 */

import { Exception } from '../../core/api/Exception';


export class ZipCodeNotFoundException extends Exception {
    constructor(zipCode: string) {
        super(404, `ZipCode ${zipCode} was not found!`);
    }
}
