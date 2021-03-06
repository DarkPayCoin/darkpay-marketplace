// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

/**
 * MakeRequestCommand
 * -------------------------------------
 *
 */
import { AbstractMakeCommand } from './lib/AbstractMakeCommand';


export class MakeRequestCommand extends AbstractMakeCommand {

    public static command = 'make:request';
    public static description = 'Generate new request';

    public type = 'Request';
    public suffix = 'Request';
    public prefix = '';
    public template = 'request.hbs';
    public target = 'api/requests';

    constructor(context: any, prefix?: string) {
        super(context);
        this.prefix = prefix || '';
    }

}
