// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

import { IsArray, IsNotEmpty } from 'class-validator';
import { RequestBody } from '../../core/api/RequestBody';

// tslint:disable:variable-name
export class RpcRequest extends RequestBody {

    @IsNotEmpty()
    public id: number;

    @IsNotEmpty()
    public jsonrpc: string;

    @IsNotEmpty()
    public method: string;

    @IsNotEmpty()
    @IsArray()
    public params: any[];

}
// tslint:enable:variable-name
