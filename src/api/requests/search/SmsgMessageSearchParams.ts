// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

import {IsEnum} from 'class-validator';
import {RequestBody} from '../../../core/api/RequestBody';
import {SearchOrder} from '../../enums/SearchOrder';
import {SmsgMessageStatus} from '../../enums/SmsgMessageStatus';
import {ActionDirection} from '../../enums/ActionDirection';

// tslint:disable:variable-name
export class SmsgMessageSearchParams extends RequestBody {

    @IsEnum(SearchOrder)
    public order: SearchOrder = SearchOrder.DESC;
    public orderByColumn = 'received';

    @IsEnum(ActionDirection)
    public direction: ActionDirection = ActionDirection.INCOMING;

    @IsEnum(SmsgMessageStatus)
    public status: SmsgMessageStatus;

    // TODO: is there a reason, why is this any[]? FIX
    public types: any[]; // MPAction | ProposalMessageType | VoteMessageType | string;

    public page = 0;
    public pageLimit = 10;

    public age = 1000 * 60 * 2; // minimum message age in ms, 2 min

    public msgid;
}
// tslint:enable:variable-name
