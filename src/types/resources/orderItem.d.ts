// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

import { OrderItemStatus } from '../../api/enums/OrderItemStatus';

declare module 'resources' {

    interface OrderItem {
        id: number;
        status: OrderItemStatus;
        itemHash: string;
        Bid: Bid;
        Order: Order;
        createdAt: Date;
        updatedAt: Date;
    }

}
