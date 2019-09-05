// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

declare module 'resources' {

    interface ListingItem {
        id: number;
        msgid: string;
        hash: string;
        seller: string;
        expiryTime: number;
        generatedAt: number;
        removed: boolean;
        receivedAt: number;
        postedAt: number;
        expiredAt: number;

        ItemInformation: ItemInformation;
        PaymentInformation: PaymentInformation;
        MessagingInformation: MessagingInformation[];
        ListingItemObjects: ListingItemObject[];
        Market: Market;
        Bids: Bid[];
        ListingItemTemplate: ListingItemTemplate;
        FlaggedItem: FlaggedItem;

        createdAt: Date;
        updatedAt: Date;
    }

}
