// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

import * as resources from 'resources';
import { MessageBody } from '../../../core/api/MessageBody';
import { ProposalCategory } from '../../enums/ProposalCategory';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { ActionMessageInterface } from './ActionMessageInterface';
import { GovernanceAction } from '../../enums/GovernanceAction';
import { KVS } from 'omp-lib/dist/interfaces/common';

export class ProposalAddMessage extends MessageBody implements ActionMessageInterface {

    @IsNotEmpty()
    @IsEnum(GovernanceAction)
    public type: GovernanceAction.MPA_PROPOSAL_ADD;
    @IsNotEmpty()
    public submitter: string;
    @IsNotEmpty()
    public title: string;
    @IsNotEmpty()
    public description: string;
    @IsNotEmpty()
    public options: resources.ProposalOption[];
    @IsNotEmpty()
    public category: ProposalCategory;
    @IsNotEmpty()
    public hash: string;
    public item?: string;   // itemHash

    public objects?: KVS[];

    @IsNotEmpty()
    public generated: number;

}
