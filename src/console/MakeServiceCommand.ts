// Copyright (c) 2017-2019, The Darkpay Market developers
// Distributed under the GPL software license, see the accompanying
// file COPYING or https://github.com/DarkPayCoin/darkpay-market/blob/develop/LICENSE

/**
 * MakeServiceCommand
 * -------------------------------------
 *
 */
import { AbstractMakeCommand } from './lib/AbstractMakeCommand';


export class MakeServiceCommand extends AbstractMakeCommand {

    public static command = 'make:service';
    public static description = 'Generate new service';

    public type = 'Service';
    public suffix = 'Service';
    public template = 'service.hbs';
    public target = 'api/services';

}
