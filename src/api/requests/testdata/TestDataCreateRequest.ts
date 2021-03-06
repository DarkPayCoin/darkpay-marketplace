// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

import { IsNotEmpty } from 'class-validator';
import { RequestBody } from '../../../core/api/RequestBody';
import { CreatableModel } from '../../enums/CreatableModel';

// tslint:disable:variable-name
export class TestDataCreateRequest extends RequestBody {

    @IsNotEmpty()
    public model: CreatableModel;

    @IsNotEmpty()
    public data: any;

    public withRelated?: boolean;

    public timestampedHash ? = false;

}
// tslint:enable:variable-name
