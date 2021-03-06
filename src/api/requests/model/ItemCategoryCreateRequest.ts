// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

import { IsNotEmpty } from 'class-validator';
import { RequestBody } from '../../../core/api/RequestBody';
import { ModelRequestInterface } from './ModelRequestInterface';

// tslint:disable:variable-name
export class ItemCategoryCreateRequest extends RequestBody implements ModelRequestInterface {

    // @IsNotEmpty()
    public parent_item_category_id: number;

    public key: string;
    public id: number;

    @IsNotEmpty()
    public name: string;

    public description: string;
}
// tslint:enable:variable-name
