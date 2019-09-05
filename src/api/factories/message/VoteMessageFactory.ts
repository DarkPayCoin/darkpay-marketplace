// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

import * as resources from 'resources';
import { inject, named } from 'inversify';
import { Logger as LoggerType } from '../../../core/Logger';
import { Core, Targets, Types } from '../../../constants';
import { VoteMessage } from '../../messages/action/VoteMessage';
import { GovernanceAction } from '../../enums/GovernanceAction';
import { MessageFactoryInterface } from './MessageFactoryInterface';
import { VoteMessageCreateParams } from '../../requests/message/VoteMessageCreateParams';

export class VoteMessageFactory implements MessageFactoryInterface {

    public log: LoggerType;

    constructor(
        @inject(Types.Core) @named(Core.Logger) public Logger: typeof LoggerType
    ) {
        this.log = new Logger(__filename);
    }

    /**
     *
     * @param {VoteMessageType} voteMessageType
     * @param proposalHash
     * @param proposalOptionHash
     * @param voter
     * @param signature
     * @returns {Promise<VoteMessage>}
     */
    public async get(params: VoteMessageCreateParams): Promise<VoteMessage> {

        const voteMessage = {
            type: GovernanceAction.MPA_VOTE,
            proposalHash: params.proposalHash,
            proposalOptionHash: params.proposalOptionHash,
            signature: params.signature,
            voter: params.voter
        } as VoteMessage;

        return voteMessage;
    }
}
