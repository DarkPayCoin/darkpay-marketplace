// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

import * as resources from 'resources';
import { inject, named } from 'inversify';
import { Logger as LoggerType } from '../../core/Logger';
import { Types, Core, Targets } from '../../constants';
import { validate, request } from '../../core/api/Validate';
import { ListingItemTemplate } from '../models/ListingItemTemplate';
import { ListingItemTemplateService } from './model/ListingItemTemplateService';
import { ItemImageService } from './model/ItemImageService';
import { ImagePostUploadRequest } from '../requests/action/ImagePostUploadRequest';

export class ItemImageHttpUploadService {

    public log: LoggerType;

    constructor(
        @inject(Types.Service) @named(Targets.Service.model.ListingItemTemplateService) private listingItemTemplateService: ListingItemTemplateService,
        @inject(Types.Service) @named(Targets.Service.model.ItemImageService) private itemImageService: ItemImageService,
        @inject(Types.Core) @named(Core.Logger) public Logger: typeof LoggerType
    ) {
        this.log = new Logger(__filename);
    }

    /**
     * uploadRequest.listingItemTemplateId
     * uploadRequest.requestBody
     * uploadRequest.request
     * uploadRequest.request.files          - [] of something todo: add type
     *          imageFile.path
     *          imageFile.fieldname
     *          imageFile.mimetype
     *          imageFile.originalname
     *          ...?
     *
     * @param uploadRequest
     */
    @validate()
    public async httpPostImageUpload(@request(ImagePostUploadRequest) uploadRequest: ImagePostUploadRequest): Promise<resources.ItemImage[]> {

        const createdItemImages: resources.ItemImage[] = [];

        let listingItemTemplateModel: ListingItemTemplate = await this.listingItemTemplateService.findOne(uploadRequest.listingItemTemplateId);
        let listingItemTemplate: resources.ListingItemTemplate = listingItemTemplateModel.toJSON();

        for (const file of uploadRequest.request.files) {
            const createdItemImage = await this.itemImageService.createFromFile(file, listingItemTemplate.ItemInformation.id);
            createdItemImages.push(createdItemImage.toJSON());
        }

        // after upload create also the resized template images
        listingItemTemplateModel = await this.listingItemTemplateService.findOne(uploadRequest.listingItemTemplateId);
        listingItemTemplate = listingItemTemplateModel.toJSON();
        await this.listingItemTemplateService.createResizedTemplateImages(listingItemTemplate);

        return createdItemImages;
    }
}
