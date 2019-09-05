// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

import * as resources from 'resources';
import { inject, named } from 'inversify';
import { Logger as LoggerType } from '../../../core/Logger';
import { Core, Targets, Types } from '../../../constants';
import { SmsgService } from '../SmsgService';
import { EventEmitter } from 'events';
import { MarketplaceMessage } from '../../messages/MarketplaceMessage';
import { SmsgSendResponse } from '../../responses/SmsgSendResponse';
import { SmsgMessageService } from '../model/SmsgMessageService';
import { ListingItemAddMessage } from '../../messages/action/ListingItemAddMessage';
import { BaseActionService } from './BaseActionService';
import { SmsgMessageFactory } from '../../factories/model/SmsgMessageFactory';
import { ListingItemAddRequest } from '../../requests/action/ListingItemAddRequest';
import { ListingItemAddValidator } from '../../messages/validator/ListingItemAddValidator';
import { ompVersion } from 'omp-lib/dist/omp';
import { ListingItemAddMessageFactory } from '../../factories/message/ListingItemAddMessageFactory';
import { ListingItemAddMessageCreateParams } from '../../requests/message/ListingItemAddMessageCreateParams';

export class ListingItemAddActionService extends BaseActionService {

    constructor(
        @inject(Types.Service) @named(Targets.Service.SmsgService) public smsgService: SmsgService,
        @inject(Types.Service) @named(Targets.Service.model.SmsgMessageService) public smsgMessageService: SmsgMessageService,
        @inject(Types.Factory) @named(Targets.Factory.model.SmsgMessageFactory) public smsgMessageFactory: SmsgMessageFactory,
        @inject(Types.Core) @named(Core.Events) public eventEmitter: EventEmitter,

        @inject(Types.Factory) @named(Targets.Factory.message.ListingItemAddMessageFactory) private listingItemAddMessageFactory: ListingItemAddMessageFactory,
        @inject(Types.Core) @named(Core.Logger) public Logger: typeof LoggerType
    ) {
        super(smsgService, smsgMessageService, smsgMessageFactory);
        this.log = new Logger(__filename);
    }

    /**
     * create the MarketplaceMessage to which is to be posted to the network
     * TODO: should we save also ListingItems locally before sending, like Proposals, Votes and Bids?
     *
     * @param params
     */
    public async createMessage(params: ListingItemAddRequest): Promise<MarketplaceMessage> {

        const actionMessage: ListingItemAddMessage = await this.listingItemAddMessageFactory.get({
            // in this case this is actually the listingItemTemplate, as we use to create the message from both
            listingItem: params.listingItem
            // cryptoAddress, we could override the payment address here
        } as ListingItemAddMessageCreateParams);

        return {
            version: ompVersion(),
            action: actionMessage
        } as MarketplaceMessage;
    }

    /**
     * validate the MarketplaceMessage to which is to be posted to the network
     *
     * @param marketplaceMessage
     */
    public async validateMessage(marketplaceMessage: MarketplaceMessage): Promise<boolean> {
        // TODO: create MessageValidator and move to base
        return ListingItemAddValidator.isValid(marketplaceMessage);
    }

    /**
     * called before post is executed and message is sent
     *
     * @param params
     * @param marketplaceMessage
     */
    public async beforePost(params: ListingItemAddRequest, marketplaceMessage: MarketplaceMessage): Promise<MarketplaceMessage> {
        return marketplaceMessage;
    }

    /**
     * called after post is executed and message is sent
     *
     * @param params
     * @param marketplaceMessage
     * @param smsgMessage
     * @param smsgSendResponse
     */
    public async afterPost(params: ListingItemAddRequest, marketplaceMessage: MarketplaceMessage, smsgMessage: resources.SmsgMessage,
                           smsgSendResponse: SmsgSendResponse): Promise<SmsgSendResponse> {
        return smsgSendResponse;
    }

}
