// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

import { IsNotEmpty, IsEnum } from 'class-validator';
import { RequestBody } from '../../../core/api/RequestBody';
import { ShippingAvailability } from '../../enums/ShippingAvailability';
import { ModelRequestInterface } from './ModelRequestInterface';

// tslint:disable:variable-name
export class ShippingDestinationUpdateRequest extends RequestBody implements ModelRequestInterface {

    @IsNotEmpty()
    public country: string;

    @IsEnum(ShippingAvailability)
    @IsNotEmpty()
    public shippingAvailability: ShippingAvailability;

}
// tslint:enable:variable-name
