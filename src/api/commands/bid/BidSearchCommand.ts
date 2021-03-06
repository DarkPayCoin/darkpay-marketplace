// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

import * as Bookshelf from 'bookshelf';
import * as _ from 'lodash';
import { inject, named } from 'inversify';
import { validate, request } from '../../../core/api/Validate';
import { Logger as LoggerType } from '../../../core/Logger';
import { Types, Core, Targets } from '../../../constants';
import { BidService } from '../../services/model/BidService';
import { ListingItemService } from '../../services/model/ListingItemService';
import { RpcRequest } from '../../requests/RpcRequest';
import { Bid } from '../../models/Bid';
import { RpcCommandInterface } from '../RpcCommandInterface';
import { BidSearchParams } from '../../requests/search/BidSearchParams';
import { SearchOrder } from '../../enums/SearchOrder';
import { Commands} from '../CommandEnumType';
import { BaseCommand } from '../BaseCommand';
import { MessageException } from '../../exceptions/MessageException';
import { OrderItemStatus} from '../../enums/OrderItemStatus';
import { MPAction } from 'omp-lib/dist/interfaces/omp-enums';

export class BidSearchCommand extends BaseCommand implements RpcCommandInterface<Bookshelf.Collection<Bid>> {

    public log: LoggerType;
    private DEFAULT_PAGE_LIMIT = 10;

    constructor(
        @inject(Types.Core) @named(Core.Logger) public Logger: typeof LoggerType,
        @inject(Types.Service) @named(Targets.Service.model.BidService) private bidService: BidService,
        @inject(Types.Service) @named(Targets.Service.model.ListingItemService) private listingItemService: ListingItemService
    ) {
        super(Commands.BID_SEARCH);
        this.log = new Logger(__filename);
    }

    /**
     *
     * data.params[]:
     *  [0]: page, number, optional
     *  [1]: pageLimit, number, default=10, optional
     *  [2]: ordering ASC/DESC, orders by updatedAt, optional
     *  [3]: ListingItem hash, string, * for all, optional
     *  [4]: status/type, ENUM{MPA_BID, MPA_ACCEPT, MPA_REJECT, MPA_CANCEL}
     *       or ENUM{AWAITING_ESCROW, ESCROW_LOCKED, SHIPPING, COMPLETE}, * for all, optional
     *  [5]: searchString, string, * for anything, optional
     *  [6...]: bidder: darkpay address, optional
     *
     * @param data
     * @returns {Promise<Bookshelf.Collection<Bid>>}
     */
    @validate()
    public async execute( @request(RpcRequest) data: RpcRequest): Promise<Bookshelf.Collection<Bid>> {

        const page = data.params[0];
        const pageLimit = data.params[1];
        const ordering = data.params[2];
        const listingItemHash = data.params[3];
        const type = data.params[4];
        const searchString = data.params[5];

        // TODO: also maybe we should add support for bid expiry at some point

        if (data.params[6]) {
            // shift so that data.params contains only the bidders
            data.params.shift();
            data.params.shift();
            data.params.shift();
            data.params.shift();
            data.params.shift();
            data.params.shift();
        } else {
            // no bidders
            data.params = [];
        }

        const bidSearchParams = {
            page,
            pageLimit,
            ordering,
            listingItemHash,
            type,
            searchString,
            bidders: data.params
        } as BidSearchParams;

        this.log.debug('bidSearchParams', bidSearchParams);

        return await this.bidService.search(bidSearchParams);
    }

    /**
     *
     * data.params[]:
     *  [0]: page, number, optional
     *  [1]: pageLimit, number, default=10, optional
     *  [2]: ordering ASC/DESC, orders by updatedAt, optional
     *  [3]: ListingItem hash, string, * for all, optional
     *  [4]: status/type, ENUM{MPA_BID, MPA_ACCEPT, MPA_REJECT, MPA_CANCEL}
     *       or ENUM{AWAITING_ESCROW, ESCROW_LOCKED, SHIPPING, COMPLETE}, * for all, optional
     *  [5]: searchString, string, * for anything, optional
     *  [6...]: bidder: darkpay address, optional
     *
     * @param {RpcRequest} data
     * @returns {Promise<RpcRequest>}
     */
    public async validate(data: RpcRequest): Promise<RpcRequest> {

        data.params[0] = data.params[0] ? data.params[0] : 0;
        if (typeof data.params[0] !== 'number') {
            throw new MessageException('parameter page should be a number.');
        }

        data.params[1] = data.params[1] ? data.params[1] : this.DEFAULT_PAGE_LIMIT;
        if (typeof data.params[0] !== 'number') {
            throw new MessageException('parameter pageLimit should be a number.');
        }

        if (data.params[2] === 'ASC') {
            data.params[2] = SearchOrder.ASC;
        } else {
            data.params[2] = SearchOrder.DESC;
        }

        data.params[3] = data.params[3] !== '*' ? data.params[3] : undefined;
        data.params[4] = data.params[4] ? this.getStatus(data.params[4]) : undefined;
        data.params[5] = data.params[5] ? (data.params[5] !== '*' ? data.params[5] : undefined) : undefined;

        return data;
    }

    public usage(): string {
        return this.getName()
            + ' [<page> [<pageLimit> [<ordering> [<itemhash> [<status> [<searchString> [<bidderAddress> ...]]] ';
    }

    public help(): string {
        return this.usage() + ' -  ' + this.description() + '\n'
            + '    <page>                   - [optional] Numeric - The number page we want to \n'
            + '                                view of searchBy listing item results. \n'
            + '    <pageLimit>              - [optional] Numeric - The number of results per page. \n'
            + '    <ordering>               - [optional] ENUM{ASC,DESC} - The ordering of the searchBy results. \n'
            + '    <itemhash>               - String - The hash of the item we want to searchBy bids for. \n'
            + '                                The value * specifies that status can be anything. \n'
            + '    <status>                 - [optional] ENUM{MPA_BID, MPA_ACCEPT, MPA_REJECT, MPA_CANCEL} - \n'
            + '                             - or ENUM{AWAITING_ESCROW, ESCROW_LOCKED, SHIPPING, COMPLETE} - \n'
            + '                                The status of the bids or status of the orderItem we want to searchBy for. \n'
            + '                                The value * specifies that status can be anything. \n'
            + '    <searchString>           - [optional] String - A string that is used to \n'
            + '                                find bids related to listing items by their titles and descriptions. \n'
            + '                                The value * specifies that status can be anything. \n'
            + '    <bidderAddress>          - [optional] String(s) - The addresses of the bidders we want to searchBy bids for. ';

    }

    public description(): string {
            return 'Search Bids by item hash, bid status, or bidder address';
    }

    public example(): string {
        return 'bid ' + this.getName() + ' a22c63bc16652bc417068754688e50f60dbf2ce6d599b4ccf800d63b504e0a88'
            + ' MPA_ACCEPT pmZpGbH2j2dDYU6LvTryHbEsM3iQzxpnj1 pmZpGbH2j2dDYU6LvTryHbEsM3iQzxpnj2';
    }

    private getStatus(status: string): MPAction | OrderItemStatus | undefined {
        switch (status) {
            case 'MPA_BID':
                return MPAction.MPA_BID;
            case 'MPA_ACCEPT':
                return MPAction.MPA_ACCEPT;
            case 'MPA_REJECT':
                return MPAction.MPA_REJECT;
            case 'MPA_CANCEL':
                return MPAction.MPA_CANCEL;
            case 'AWAITING_ESCROW':
                return OrderItemStatus.AWAITING_ESCROW;
            case 'ESCROW_LOCKED':
                return OrderItemStatus.ESCROW_LOCKED;
            case 'ESCROW_COMPLETED':
                return OrderItemStatus.ESCROW_COMPLETED;
            case 'SHIPPING':
                return OrderItemStatus.SHIPPING;
            case 'COMPLETE':
                return OrderItemStatus.COMPLETE;
            case '*':
                return undefined;
            default:
                throw new MessageException('Invalid status.');
        }
    }
}
