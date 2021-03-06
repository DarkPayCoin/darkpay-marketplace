// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

import { MarketplaceMessage } from '../MarketplaceMessage';
import { ValidationException } from '../../exceptions/ValidationException';
import { ActionMessageValidatorInterface } from './ActionMessageValidatorInterface';
import { MPActionExtended } from '../../enums/MPActionExtended';
import { MessageException } from '../../exceptions/MessageException';

/**
 *
 */
export class EscrowRefundValidator implements ActionMessageValidatorInterface {

    public static isValid(msg: MarketplaceMessage): boolean {

        if (!msg.version) {
            throw new MessageException('version: missing');
        }

        if (!msg.action) {
            throw new MessageException('action: missing');
        }

        if (!msg.action.type) {
            throw new MessageException('action.type: missing');
        }

        if (msg.action.type !== MPActionExtended.MPA_REFUND) {
            throw new ValidationException('Invalid action type.', ['Accepting only ' + MPActionExtended.MPA_REFUND]);
        }

        return true;
    }
}
