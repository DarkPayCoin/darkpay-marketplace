// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

import { IsNotEmpty } from 'class-validator';
import { RequestBody } from '../../../core/api/RequestBody';
import { AddressCreateRequest } from './AddressCreateRequest';
import { CryptocurrencyAddressCreateRequest } from './CryptocurrencyAddressCreateRequest';
import { SettingCreateRequest } from './SettingCreateRequest';
import { ModelRequestInterface } from './ModelRequestInterface';

// tslint:disable:variable-name
export class ProfileCreateRequest extends RequestBody implements ModelRequestInterface {

    @IsNotEmpty()
    public name: string;

    // @IsNotEmpty()
    public address: string;         // profile address

    // related
    public shippingAddresses: AddressCreateRequest[];    // shipping addresses
    public cryptocurrencyAddresses: CryptocurrencyAddressCreateRequest[];    // cryptocurrency addresses
    public settings: SettingCreateRequest[];    // settings

}
// tslint:enable:variable-name
