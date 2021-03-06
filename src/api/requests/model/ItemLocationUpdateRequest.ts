// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

import { IsNotEmpty, IsEnum } from 'class-validator';
import { RequestBody } from '../../../core/api/RequestBody';
import { LocationMarkerUpdateRequest } from './LocationMarkerUpdateRequest';
import { ModelRequestInterface } from './ModelRequestInterface';

// tslint:disable:variable-name
export class ItemLocationUpdateRequest extends RequestBody implements ModelRequestInterface {

    @IsNotEmpty()
    public country: string;
    public address: string;
    public description: string;

    public locationMarker: LocationMarkerUpdateRequest;

}
// tslint:enable:variable-name
