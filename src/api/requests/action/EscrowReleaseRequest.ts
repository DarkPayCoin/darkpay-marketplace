// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

import * as resources from 'resources';
import { IsNotEmpty } from 'class-validator';
import { RequestBody } from '../../../core/api/RequestBody';
import { ActionRequestInterface } from './ActionRequestInterface';
import { SmsgSendParams } from './SmsgSendParams';

export class EscrowReleaseRequest extends RequestBody implements ActionRequestInterface {

    @IsNotEmpty()
    public sendParams: SmsgSendParams;          // ActionRequest always needs to contain the send parameters for the message
    @IsNotEmpty()
    public bid: resources.Bid;                  // the original bid
    @IsNotEmpty()
    public bidAccept: resources.Bid;            // the accepted bid
    public memo: string;                        // todo: memo, is this needed?

    public createdBid: resources.Bid;           // the created bid id stored in here on beforePost() so that on afterPost() we can update it with the msgid

}
