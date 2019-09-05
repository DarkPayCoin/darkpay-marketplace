// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

import * as _ from 'lodash';
import * as resources from 'resources';
import { inject, named } from 'inversify';
import { validate, request } from '../../../core/api/Validate';
import { Logger as LoggerType } from '../../../core/Logger';
import { Types, Core, Targets } from '../../../constants';
import { EscrowService } from '../../services/model/EscrowService';
import { RpcRequest } from '../../requests/RpcRequest';
import { RpcCommandInterface } from '../RpcCommandInterface';
import { Commands} from '../CommandEnumType';
import { BaseCommand } from '../BaseCommand';
import { MessageException } from '../../exceptions/MessageException';
import { ListingItemTemplateService } from '../../services/model/ListingItemTemplateService';
import { MissingParamException } from '../../exceptions/MissingParamException';
import { InvalidParamException } from '../../exceptions/InvalidParamException';
import { ModelNotFoundException } from '../../exceptions/ModelNotFoundException';
import { ModelNotModifiableException } from '../../exceptions/ModelNotModifiableException';

export class EscrowRemoveCommand extends BaseCommand implements RpcCommandInterface<void> {

    public log: LoggerType;

    constructor(
        @inject(Types.Core) @named(Core.Logger) public Logger: typeof LoggerType,
        @inject(Types.Service) @named(Targets.Service.model.ListingItemTemplateService) private listingItemTemplateService: ListingItemTemplateService,
        @inject(Types.Service) @named(Targets.Service.model.EscrowService) private escrowService: EscrowService
    ) {
        super(Commands.ESCROW_REMOVE);
        this.log = new Logger(__filename);
    }

    /**
     * data.params[]:
     *  [0]: listingItemTemplate, resources.ListingItemTemplate
     *
     */
    @validate()
    public async execute( @request(RpcRequest) data: RpcRequest): Promise<void> {
        const listingItemTemplate: resources.ListingItemTemplate = data.params[0];
        return this.escrowService.destroy(listingItemTemplate.PaymentInformation.Escrow.id);
    }

    /**
     * data.params[]:
     * [0]: listingItemTemplateId
     *
     * @param data
     * @returns {Promise<RpcRequest>}
     */
    public async validate(data: RpcRequest): Promise<RpcRequest> {

        if (data.params.length < 1) {
            throw new MissingParamException('listingItemTemplateId');
        }

        if (typeof data.params[0] !== 'number') {
            throw new InvalidParamException('listingItemTemplateId', 'number');
        }

        // make sure ListingItemTemplate with the id exists
        const listingItemTemplate: resources.ListingItemTemplate = await this.listingItemTemplateService.findOne(data.params[0])
            .then(value => {
                return value.toJSON();
            })
            .catch(reason => {
                throw new ModelNotFoundException('ListingItemTemplate');
            });

        // template already has listingitems, so it cannot be modified
        if (listingItemTemplate.ListingItems.length > 0) {
            throw new MessageException(`Escrow cannot be deleted because ListingItems already exist for the ListingItemTemplate.`);
        }

        // make sure PaymentInformation exists
        if (_.isEmpty(listingItemTemplate.PaymentInformation)) {
            throw new ModelNotFoundException('PaymentInformation');
        }

        // make sure Escrow exists
        if (_.isEmpty(listingItemTemplate.PaymentInformation.Escrow)) {
            throw new ModelNotFoundException('Escrow');
        }

        const isModifiable = await this.listingItemTemplateService.isModifiable(listingItemTemplate.id);
        if (!isModifiable) {
            throw new ModelNotModifiableException('ListingItemTemplate');
        }

        data.params[0] = listingItemTemplate;

        return data;
    }

    public usage(): string {
        return this.getName() + ' <listingItemTemplateId> ';
    }

    public help(): string {
        return this.usage() + ' -  ' + this.description() + '\n'
            + '    <listingItemTemplateId>  - Numeric - The ID belonging to the listing item \n'
            + '                                template that the escrow we want to delete is \n'
            + '                                associated with. ';
    }

    public description(): string {
        return 'Command for removing an escrow, identified by listingItemTemplateId.';
    }

    public example(): string {
        return 'escrow ' + this.getName() + ' 1 ';
    }
}
